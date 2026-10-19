import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import DateInput from "@/components/common/DateInput";
import Modal from "@/components/common/Modal";
import ApplicantTable from "@/components/my/ApplicantTable";
import { createDelayApplication, fetchDelayOptions } from "@/api/services/application";
import { fetchCodes } from "@/api/services/codes";
import { fetchProfile } from "@/api/services/my";
import ROUTES from "@/constants/routes";
import useApi from "@/hooks/useApi";
import { formatPeriod, today } from "@/utils/date";

const OTHER = "other";
const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const EXTENSIONS = ["hwp", "hwpx", "xls", "xlsx", "jpg", "jpeg", "gif", "png", "bmp", "pdf", "docx"];

const EMPTY_FORM = { trainingId: "", start: "", end: "", reasonCode: "", files: [] };

const extensionOf = (name) => name.split(".").pop().toLowerCase();

// "2026.11.18" or "2026.04.07~2026.04.09" -> ["2026-11-18", "2026-11-18"]
const periodOf = (date) => {
  const [start, end = start] = date.split("~").map((d) => d.trim().replaceAll(".", "-"));
  return [start, end];
};

function ConfirmLayer({ profile, training, form, reasonName, onConfirm, onClose }) {
  const [checked, setChecked] = useState(false);

  const confirm = () => {
    if (!checked) {
      window.alert("확인을 선택해야 다음으로 진행할 수 있습니다.");
      return;
    }
    onConfirm();
  };

  return (
    <Modal
      title="훈련연기 신청 확인"
      width={640}
      onClose={onClose}
      footer={
        <div className="btn-box">
          <button type="button" className="btn-gradient big blue" onClick={confirm}>
            신청
          </button>{" "}
          <button type="button" className="btn-gradient big gray" onClick={onClose}>
            취소
          </button>
        </div>
      }
    >
      <table className="tbl th-c">
        <caption>연기신청 내용 확인</caption>
        <colgroup>
          <col style={{ width: 130 }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">성명</th>
            <td>{profile.name}</td>
          </tr>
          <tr>
            <th scope="row">군번 / 계급</th>
            <td>
              {profile.serviceNo} / {profile.rank}
            </td>
          </tr>
          <tr>
            <th scope="row">훈련유형</th>
            <td>{training?.name ?? "기타"}</td>
          </tr>
          <tr>
            <th scope="row">훈련장소</th>
            <td>{training?.center}</td>
          </tr>
          <tr>
            <th scope="row">희망연기기간</th>
            <td>{formatPeriod(form.start, form.end)}</td>
          </tr>
          <tr>
            <th scope="row">연기사유</th>
            <td>{reasonName}</td>
          </tr>
          <tr>
            <th scope="row">증빙서류</th>
            <td>
              {form.files.map((f) => (
                <div key={f.name}>{f.name}</div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
      <p className="mt10 tac">
        <input type="checkbox" id="hold_info" checked={checked} onChange={(e) => setChecked(e.target.checked)} />{" "}
        <label htmlFor="hold_info">위 신청내용을 확인하였습니다.</label>
      </p>
    </Modal>
  );
}

export default function DelayApply() {
  const navigate = useNavigate();
  const profile = useApi((opts) => fetchProfile(opts), []);
  const options = useApi((opts) => fetchDelayOptions(opts), []);
  const reasons = useApi((opts) => fetchCodes("delayReasons", opts), []);
  const [form, setForm] = useState(EMPTY_FORM);
  const [confirming, setConfirming] = useState(false);
  const [saving, setSaving] = useState(false);

  const training = options.data?.trainings.find((t) => t.id === form.trainingId);
  const reason = reasons.data?.find((r) => r.code === form.reasonCode);

  const selectTraining = (trainingId) => {
    const next = options.data.trainings.find((t) => t.id === trainingId);
    const [start, end] = next ? periodOf(next.date) : ["", ""];
    setForm({ ...form, trainingId, start, end });
  };

  const addFiles = (e) => {
    const picked = [...e.target.files];
    e.target.value = "";
    const invalid = picked.find((f) => !EXTENSIONS.includes(extensionOf(f.name)) || f.size > MAX_FILE_SIZE);
    if (invalid) {
      window.alert(`'${EXTENSIONS.join("', '")}' 파일만 첨부 가능합니다. (최대 10MB)`);
      return;
    }
    if (form.files.length + picked.length > MAX_FILES) {
      window.alert(`최대 ${MAX_FILES}개까지 첨부 가능합니다.`);
      return;
    }
    setForm({ ...form, files: [...form.files, ...picked] });
  };

  const next = () => {
    if (!form.trainingId) return window.alert("훈련과정을 입력하세요");
    if (!form.start) return window.alert("희망연기시작일을 입력하세요");
    if (!form.end) return window.alert("희망연기종료일을 입력하세요");
    if (form.start > form.end) return window.alert("희망연기종료일자가 희망연기시작일자보다 빠를 수 없습니다.");
    if (form.start < today()) return window.alert("희망연기시작일자가 현재일자보다 이후 이어야 합니다.");
    if (!form.reasonCode) return window.alert("연기사유를 선택하세요.");
    if (form.files.length === 0) return window.alert("연기신청 증빙서류를 첨부해주시기 바랍니다.");
    setConfirming(true);
  };

  const submit = async () => {
    setSaving(true);
    try {
      await createDelayApplication({
        trainingId: form.trainingId === OTHER ? "" : form.trainingId,
        start: form.start,
        end: form.end,
        reasonCode: form.reasonCode,
        files: form.files,
      });
      window.alert("저장되었습니다.");
      navigate(ROUTES.DELAY_RESULTS);
    } catch (error) {
      window.alert(error.message);
      setConfirming(false);
      setSaving(false);
    }
  };

  const toList = () => {
    if (window.confirm("신청을 중단하고 목록으로 이동하시겠습니까?")) navigate(ROUTES.DELAY_RESULTS);
  };

  return (
    <SubLayout title="훈련연기 신청">
      <div className="tbl-comments">
        <em>증빙서류를 위조</em>하였거나 <em>허위로 작성된 서류를 송부</em>하였을 시 관련규정에 의해 처벌 받게 됩니다.
      </div>
      <div className="tbl-comments">
        <a className="kyocho-link" href="https://www.mma.go.kr/contents.do?mc=usr0000195" target="_blank" rel="noopener noreferrer">
          동원훈련Ⅰ형에 대한 연기신청은 병무청에서 직접 신청하셔야 합니다.(병무민원상담소:1588-9090)
        </a>
      </div>
      <section className="pos-rel mt70">
        <h4 className="cont-tit-h4">훈련 연기신청</h4>
        {profile.data && <ApplicantTable profile={profile.data} />}
        <table className="tbl th-c">
          <caption>연기신청 내용</caption>
          <colgroup>
            <col style={{ width: 180 }} />
            <col />
            <col style={{ width: 110 }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <span className="txt-red">*</span> <label htmlFor="traId">훈련유형</label>
              </th>
              <td>
                <select id="traId" className="sel-box" value={form.trainingId} onChange={(e) => selectTraining(e.target.value)}>
                  <option value="">선택하세요</option>
                  {options.data?.trainings.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                  <option value={OTHER}>기타</option>
                </select>
              </td>
              <th scope="row" className="bl">
                <label htmlFor="traCenterNm">훈련장소</label>
              </th>
              <td>
                <input id="traCenterNm" type="text" className="inp-box" readOnly value={training?.center ?? ""} />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <span className="txt-red">*</span> 희망연기기간
              </th>
              <td colSpan={3}>
                <DateInput
                  id="delayExpeStartDt"
                  title="희망연기시작일자"
                  value={form.start}
                  min={today()}
                  onChange={(start) => setForm({ ...form, start })}
                />{" "}
                ~{" "}
                <DateInput
                  id="delayExpeEndDt"
                  title="희망연기종료일자"
                  value={form.end}
                  min={form.start || today()}
                  onChange={(end) => setForm({ ...form, end })}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <span className="txt-red">*</span> <label htmlFor="delayReasonCd">연기사유</label>
              </th>
              <td colSpan={3}>
                <select
                  id="delayReasonCd"
                  className="sel-box"
                  value={form.reasonCode}
                  onChange={(e) => setForm({ ...form, reasonCode: e.target.value })}
                >
                  <option value="">선택하세요</option>
                  {reasons.data?.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <span className="txt-red">*</span> 연기신청
                <br />
                증빙서류 첨부
              </th>
              <td colSpan={3}>
                {form.files.length < MAX_FILES ? (
                  <input
                    type="file"
                    multiple
                    title="증빙서류 첨부"
                    accept={EXTENSIONS.map((ext) => `.${ext}`).join(",")}
                    onChange={addFiles}
                  />
                ) : (
                  <p>더 이상 파일을 첨부할 수 없습니다.</p>
                )}
                <p className="mt5">
                  ※ &apos;{EXTENSIONS.join("', '")}&apos; 파일만 첨부 가능합니다. (최대 10MB)
                  <br />※ 최대 {MAX_FILES}개까지 첨부 가능합니다.
                </p>
                <ul className="file-list">
                  {form.files.map((file, i) => (
                    <li key={`${file.name}-${i}`}>
                      <span className="file_add">{file.name}</span>{" "}
                      <button
                        type="button"
                        className="btn-gradient small white"
                        onClick={() => setForm({ ...form, files: form.files.filter((_, j) => j !== i) })}
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">
                주요업무수행에 따른
                <br />
                훈련연기 신청서 양식
              </th>
              <td colSpan={3}>
                <a href="/files/personal_reason.hwp" download="개인사유서.hwp">
                  개인사유서(HWP)
                </a>{" "}
                <a href="/files/work_certificate.hwp" download="주요업무수행확인서.hwp">
                  주요업무수행 확인서(HWP)
                </a>
                <br />
                <a href="/files/personal_reason.docx" download="개인사유서.docx">
                  개인사유서(DOCX)
                </a>{" "}
                <a href="/files/work_certificate.docx" download="주요업무수행확인서.docx">
                  주요업무수행 확인서(DOCX)
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <div className="btn-box">
        <button type="button" className="btn-gradient big blue" onClick={toList}>
          목록
        </button>{" "}
        <button type="button" className="btn-gradient big blue" disabled={saving} onClick={next}>
          다음
        </button>{" "}
        <button type="button" className="btn-gradient big white" onClick={() => setForm(EMPTY_FORM)}>
          초기화
        </button>
      </div>
      {confirming && profile.data && (
        <ConfirmLayer
          profile={profile.data}
          training={training}
          form={form}
          reasonName={reason?.name}
          onConfirm={submit}
          onClose={() => setConfirming(false)}
        />
      )}
    </SubLayout>
  );
}
