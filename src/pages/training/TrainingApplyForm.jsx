import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import DateInput from "@/components/common/DateInput";
import Modal from "@/components/common/Modal";
import PhoneField from "@/components/common/PhoneField";
import AddressSearchModal from "@/components/apply/AddressSearchModal";
import TroopSearchModal from "@/components/apply/TroopSearchModal";
import TrainingPlanModal from "@/components/apply/TrainingPlanModal";
import {
  createTrainingApplication,
  fetchApplicableTrainings,
  fetchPlanCenters,
} from "@/api/services/application";
import { fetchRegions } from "@/api/services/finder";
import { fetchProfile } from "@/api/services/my";
import ROUTES, { detailPath } from "@/constants/routes";
import useApi from "@/hooks/useApi";
import { addMonths, formatPeriod, today } from "@/utils/date";

const KINDS = {
  nationwide: { title: "전국단위 훈련신청", name: "전국단위훈련" },
  holiday: { title: "휴일예비군 훈련신청", name: "휴일예비군훈련" },
};

const initialForm = () => ({
  from: today(),
  to: addMonths(today(), 2),
  trainingId: "",
  sido: "",
  centerId: "",
  plan: null,
  troop: null,
  phone: "",
  address: "",
  detailAddress: "",
});

const trainingLabel = (t) => `${t.typeName} ${t.round} (${t.hours}H)`;

function ConfirmLayer({ kind, form, training, onConfirm, onClose }) {
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
      title={`${KINDS[kind].title} 확인`}
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
        <caption>신청내용 확인</caption>
        <colgroup>
          <col style={{ width: 130 }} />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">훈련유형</th>
            <td>{`${training.typeName} ${training.round}`}</td>
          </tr>
          <tr>
            <th scope="row">훈련시간</th>
            <td>{form.plan.hours}</td>
          </tr>
          <tr>
            <th scope="row">훈련일자</th>
            <td>{formatPeriod(form.plan.start, form.plan.end)}</td>
          </tr>
          <tr>
            <th scope="row">입소시간</th>
            <td>{form.plan.entryTime}</td>
          </tr>
          <tr>
            <th scope="row">훈련장</th>
            <td>
              {form.plan.centerName}
              {form.plan.address && ` (${form.plan.address})`}
            </td>
          </tr>
          <tr>
            <th scope="row">훈련신청 예비군부대</th>
            <td>{form.troop.name}</td>
          </tr>
          <tr>
            <th scope="row">연락처</th>
            <td>{form.phone}</td>
          </tr>
          <tr>
            <th scope="row">현재 사는 곳</th>
            <td>
              {form.address} {form.detailAddress}
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

/** Nationwide and holiday training applications share this form; `kind` is "nationwide" | "holiday". */
export default function TrainingApplyForm({ kind }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [lookup, setLookup] = useState(null);
  const [saving, setSaving] = useState(false);

  const profile = useApi((opts) => fetchProfile(opts), []);
  const trainings = useApi((opts) => fetchApplicableTrainings(opts), []);
  const regions = useApi((opts) => fetchRegions(opts), []);
  const training = trainings.data?.find((t) => t.id === form.trainingId);
  const centers = useApi(
    (opts) => fetchPlanCenters({ type: training.typeCode, sido: form.sido }, opts),
    [training?.typeCode, form.sido],
    { enabled: !!training && !!form.sido }
  );
  const center = centers.data?.find((c) => c.id === form.centerId);

  useEffect(() => {
    if (trainings.data?.length === 0) {
      window.alert(
        "현재 신청가능한 훈련이 없습니다.\n\n휴일 및 전국단위훈련 적용대상 훈련에 한해,\n훈련일정이 편성된 이후 신청 가능합니다.\n\n자세한 사항은 '휴일 및 전국단위 훈련이란?' 안내를 참고하시거나\n소속부대로 문의해주시기 바랍니다."
      );
      navigate(ROUTES.MY_TRAINING, { replace: true });
    }
  }, [trainings.data, navigate]);

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const changeCenter = (centerId) => {
    const next = centers.data?.find((c) => c.id === centerId);
    if (next && !next.hasPlan) {
      window.alert("훈련이 없습니다. 다른 훈련장을 선택하세요.");
      update({ centerId: "", plan: null });
      return;
    }
    update({ centerId, plan: null });
  };

  const openPlans = () => {
    if (!training) return window.alert("훈련유형을 선택하세요.");
    if (!form.sido) return window.alert("훈련지역을 선택하세요.");
    if (!form.centerId) return window.alert("훈련장을 선택하세요.");
    if (!form.from || !form.to) return window.alert("훈련검색기간을 입력하셔야 합니다.");
    if (form.from > form.to) return window.alert("훈련희망시작일자가 훈련희망종료일자보다 이전 이어야 합니다.");
    setLookup("plan");
  };

  const openTroops = () => {
    if (!form.plan) return window.alert("훈련계획을 선택하세요.");
    setLookup("troop");
  };

  const next = () => {
    if (!form.from) return window.alert("훈련검색 시작일자를 입력하셔야 합니다.");
    if (!form.to) return window.alert("훈련검색 종료일자를 입력하셔야 합니다.");
    if (form.from > form.to) return window.alert("훈련희망시작일자가 훈련희망종료일자보다 이전 이어야 합니다.");
    if (form.to < today()) return window.alert("훈련희망종료일자가 현재일자보다 이후 이어야 합니다.");
    if (!training) return window.alert("훈련유형을 선택하세요.");
    if (!form.sido) return window.alert("훈련지역을 선택하세요.");
    if (!form.centerId) return window.alert("훈련장을 선택하세요.");
    if (!form.plan) return window.alert("훈련계획을 선택하세요.");
    if (!form.troop) return window.alert("훈련신청 예비군부대를 선택하세요.");
    if (!form.phone) return window.alert("연락처를 입력하세요.");
    if (!form.address) return window.alert("현재 사는 곳을 입력하세요.");
    if (!form.detailAddress.trim()) return window.alert("상세주소를 입력하세요.");
    if (form.detailAddress.length > 200) return window.alert("상세주소는 200자 이내로 입력하세요.");
    setLookup("confirm");
  };

  const submit = async () => {
    const remaining = training.hours - form.plan.hours;
    const message =
      "※확인 시 훈련 통지서를 전달한 것으로\n간주하며 별도 통지되지 않습니다.\n\n" +
      (remaining > 0
        ? ` ※ 부과된 훈련시간 ${training.hours}시간보다 적은 ${form.plan.hours}시간의 훈련을 선택하셨습니다.\n\n` +
          `    잔여 훈련시간 ${remaining}시간은 다음 차수에 부과됩니다.\n\n`
        : "") +
      `${KINDS[kind].name}을 신청하시겠습니까?`;
    if (!window.confirm(message)) {
      setLookup(null);
      window.alert(`${KINDS[kind].name} 신청이 중단되었습니다.`);
      return;
    }
    setSaving(true);
    try {
      const application = await createTrainingApplication({
        kind,
        trainingId: training.id,
        planId: form.plan.id,
        troopId: form.troop.id,
        phone: form.phone,
        address: form.address,
        detailAddress: form.detailAddress.trim(),
      });
      window.alert(`${KINDS[kind].name}이 정상적으로 신청 되었습니다.`);
      navigate(detailPath(ROUTES.TRAINING_RESULT_DETAIL, application.id));
    } catch (error) {
      window.alert(error.message);
      setLookup(null);
      setSaving(false);
    }
  };

  const me = profile.data;

  return (
    <SubLayout title={KINDS[kind].title}>
      <section>
        <h4 className="cont-tit-h4">훈련 신청 내용</h4>
        <table className="tbl">
          <caption>훈련 신청 내용</caption>
          <colgroup>
            <col style={{ width: 140 }} />
            <col />
            <col style={{ width: 100 }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <span className="txt-red">*</span> <label htmlFor="traStartDt">훈련검색기간</label>
              </th>
              <td>
                <DateInput
                  id="traStartDt"
                  title="훈련검색시작일자"
                  value={form.from}
                  min={today()}
                  onChange={(from) => update({ from, plan: null })}
                />{" "}
                ~{" "}
                <DateInput
                  id="traEndDt"
                  title="훈련검색종료일자"
                  value={form.to}
                  min={form.from || today()}
                  onChange={(to) => update({ to, plan: null })}
                />
              </td>
              <th scope="row" className="bl">
                <span className="txt-red">*</span> <label htmlFor="traUuid">훈련유형</label>
              </th>
              <td>
                <select
                  id="traUuid"
                  className="sel-box"
                  value={form.trainingId}
                  onChange={(e) => update({ trainingId: e.target.value, centerId: "", plan: null, troop: null })}
                >
                  <option value="">선택하세요</option>
                  {trainings.data?.map((t) => (
                    <option key={t.id} value={t.id}>
                      {trainingLabel(t)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <span className="txt-red">*</span> <label htmlFor="traAmnAddId">훈련지역</label>
              </th>
              <td>
                <select
                  id="traAmnAddId"
                  className="sel-box"
                  value={form.sido}
                  onChange={(e) => update({ sido: e.target.value, centerId: "", plan: null })}
                >
                  <option value="">선택하세요</option>
                  {regions.data?.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </td>
              <th scope="row" className="bl">
                <span className="txt-red">*</span> <label htmlFor="traTCid">훈련장</label>
              </th>
              <td>
                <select
                  id="traTCid"
                  className="sel-box wd200"
                  value={form.centerId}
                  onChange={(e) => changeCenter(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  {centers.data?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                      {c.hasPlan ? "" : "(훈련 없음)"}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <span className="txt-red">*</span> <label htmlFor="traPlanNm">훈련계획</label>
              </th>
              <td colSpan={3}>
                <input
                  id="traPlanNm"
                  type="text"
                  className="inp-box wd380"
                  readOnly
                  value={form.plan ? `${form.plan.name} ${formatPeriod(form.plan.start, form.plan.end)}` : ""}
                  onClick={openPlans}
                />{" "}
                <button type="button" className="btn-gradient normal white" onClick={openPlans}>
                  찾기
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <span className="txt-red">*</span> <label htmlFor="reTroopNm">훈련신청 예비군부대</label>
              </th>
              <td colSpan={3}>
                <input
                  id="reTroopNm"
                  type="text"
                  className="inp-box wd380"
                  readOnly
                  value={form.troop?.name ?? ""}
                  onClick={openTroops}
                />{" "}
                <button type="button" className="btn-gradient normal white" onClick={openTroops}>
                  찾기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="txt-box">
          <p>-휴일 및 전국단위 훈련신청 삭제(취소)는 신청일 당일까지만 가능하며, 이후에는 불가합니다.</p>
          <p className="txt-blue pl5">※ 신청일 이후 부득이 하게 취소해야 할 경우에는 소속 예비군부대로 문의 바랍니다.</p>
          <p className="mt25">
            -휴일 및 전국단위 훈련 신청내용 변경(수정)은 1회로 제한되며 신청 훈련일을 제외한 3일전까지만 가능합니다.
          </p>
          <p className="txt-blue pl5">예) 7월8일 훈련의 경우 7월4일(23:59)까지 수정 가능합니다.</p>
          <p className="mt25">-훈련검색기간 입력 시 시작일과 종료일을 함께 선택하여 주시기 바랍니다.</p>
        </div>
        <h4 className="cont-tit-h4 txt-blue">유의사항</h4>
        <ul className="txt-list bl_hyphen">
          <li>
            당해 편성된 정상훈련과, 이전 연도에서 이월된 훈련은 휴일 및 전국단위 훈련 신청이 가능합니다.
            <br />
            단, 이월훈련의 경우 신청하려는 훈련의 계획 시간이 귀하에게 부과된 훈련의 편성 시간보다 짧을 경우 신청이
            제한됩니다.
          </li>
          <li>입영훈련은 휴일 및 전국단위 예비군 훈련에 신청할 수 없습니다.</li>
        </ul>
      </section>
      <section className="pos-rel">
        <h4 className="cont-tit-h4">인적사항</h4>
        {me && (
          <table className="tbl th-c">
            <caption>인적사항</caption>
            <colgroup>
              <col style={{ width: 70 }} />
              <col style={{ width: 70 }} />
              <col />
              <col style={{ width: 100 }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row" colSpan={2}>
                  소속
                </th>
                <td>{me.unit.platoon}</td>
                <th scope="row" className="bl">
                  계급
                </th>
                <td>{me.rank}</td>
              </tr>
              <tr>
                <th scope="row" colSpan={2}>
                  군번
                </th>
                <td>{me.serviceNo}</td>
                <th scope="row" className="bl">
                  성명
                </th>
                <td>{me.name}</td>
              </tr>
              <tr>
                <th scope="row" colSpan={2}>
                  <span className="txt-red">*</span> <label htmlFor="telNo">연락처</label>
                </th>
                <td>
                  <PhoneField id="telNo" className="inp-box" value={form.phone} onChange={(phone) => update({ phone })} />
                </td>
                <th scope="row" className="bl">
                  전역연도
                </th>
                <td>{me.dischargeYear}년</td>
              </tr>
              <tr>
                <th scope="row" colSpan={2}>
                  주소
                </th>
                <td colSpan={3}>{me.address}</td>
              </tr>
              <tr>
                <th scope="row" rowSpan={2}>
                  현재
                  <br />
                  사는곳
                </th>
                <th scope="row" className="bl">
                  <span className="txt-red">*</span> <label htmlFor="reAddrNm">기본주소</label>
                </th>
                <td colSpan={3}>
                  <input
                    id="reAddrNm"
                    type="text"
                    className="inp-box wd380"
                    readOnly
                    value={form.address}
                    onClick={() => setLookup("address")}
                  />{" "}
                  <button type="button" className="btn-gradient normal white" onClick={() => setLookup("address")}>
                    찾기
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row" className="bl">
                  <span className="txt-red">*</span> <label htmlFor="detailAddrNm">상세주소</label>
                </th>
                <td colSpan={3}>
                  <input
                    id="detailAddrNm"
                    type="text"
                    className="inp-box wd380"
                    maxLength={200}
                    value={form.detailAddress}
                    onChange={(e) => update({ detailAddress: e.target.value })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </section>
      <div className="btn-box">
        <button type="button" className="btn-gradient big blue" disabled={saving} onClick={next}>
          다음
        </button>{" "}
        <button type="button" className="btn-gradient big gray" onClick={() => setForm(initialForm())}>
          초기화
        </button>
      </div>
      {lookup === "plan" && (
        <TrainingPlanModal
          criteria={{ type: training.typeCode, center: form.centerId, from: form.from, to: form.to }}
          centerName={center?.name}
          onSelect={(plan) => {
            update({ plan });
            setLookup(null);
          }}
          onClose={() => setLookup(null)}
        />
      )}
      {lookup === "troop" && (
        <TroopSearchModal
          onSelect={(troop) => {
            update({ troop });
            setLookup(null);
          }}
          onClose={() => setLookup(null)}
        />
      )}
      {lookup === "address" && (
        <AddressSearchModal
          onSelect={(address) => {
            update({ address: address.road });
            setLookup(null);
          }}
          onClose={() => setLookup(null)}
        />
      )}
      {lookup === "confirm" && (
        <ConfirmLayer kind={kind} form={form} training={training} onConfirm={submit} onClose={() => setLookup(null)} />
      )}
    </SubLayout>
  );
}
