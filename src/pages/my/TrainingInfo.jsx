import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import Icon from "@/components/common/Icon";
import PageState from "@/components/common/PageState";
import DocumentDialog from "@/components/my/DocumentDialog";
import MemberSummary from "@/components/my/MemberSummary";
import TrainingTable from "@/components/my/TrainingTable";
import { fetchMyTraining } from "@/api/services/my";
import ROUTES from "@/constants/routes";
import useApi from "@/hooks/useApi";

function TrainingActions({ training, onOpen }) {
  return (
    <div className="btn-stack">
      {training.notice && (
        <button type="button" className="my-doc-btn" onClick={() => onOpen(training, "call-up-notice")}>
          <Icon name="file" size={14} />
          소집통지서
        </button>
      )}
      {training.certificate && (
        <button type="button" className="my-doc-btn" onClick={() => onOpen(training, "certificate")}>
          <Icon name="file" size={14} />
          교육필증
        </button>
      )}
    </div>
  );
}

export default function TrainingInfo() {
  const navigate = useNavigate();
  const { data, error } = useApi((opts) => fetchMyTraining(opts), []);
  const [showPast, setShowPast] = useState(false);
  const [doc, setDoc] = useState(null);

  if (!data) {
    return (
      <SubLayout title="훈련정보">
        <PageState error={error} />
      </SubLayout>
    );
  }

  const shortYear = String(data.year).slice(2);
  const renderAction = (training) => (
    <TrainingActions training={training} onOpen={(t, kind) => setDoc({ training: t, kind })} />
  );

  return (
    <SubLayout title="훈련정보">
      <section>
        <MemberSummary member={data.member} year={data.year}>
          {" "}
          아래는 <strong>{data.year}년 훈련 내용</strong>입니다.
        </MemberSummary>
      </section>
      <section>
        <h4 className="cont-tit-h4">{shortYear}년 원격교육</h4>
        <table className="tbl type2">
          <caption>원격교육 선정내용</caption>
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "80%" }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">선정여부</th>
              <th scope="col">제외사유</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.remoteEducation.status}</td>
              <td>{data.remoteEducation.reason}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h4 className="cont-tit-h4">원격교육 훈련내용</h4>
        <table className="tbl type2">
          <caption>원격교육 훈련내용</caption>
          <thead>
            <tr>
              <th scope="col">년도</th>
              <th scope="col">훈련명</th>
              <th scope="col">교육기간</th>
              <th scope="col">훈련결과</th>
              <th scope="col">인정 훈련시간</th>
              <th scope="col">비고</th>
            </tr>
          </thead>
          <tbody>
            {data.remoteTrainings.length === 0 && (
              <tr>
                <td colSpan={6}>원격교육에 대한 훈련내용이 없습니다.</td>
              </tr>
            )}
            {data.remoteTrainings.map((t) => (
              <tr key={t.id}>
                <td>{t.year}</td>
                <td>{t.name}</td>
                <td>{t.period}</td>
                <td>{t.result}</td>
                <td>{t.hours}</td>
                <td>{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="pos-rel">
        <h4 className="cont-tit-h4">훈련내용({data.year}년)</h4>
        <div className="cont-tit-btn">
          <button type="button" className="btn-gradient normal white small-txt" disabled title="준비 중">
            훈련일정 자율선택 <span className="ui-badge">준비 중</span>
          </button>
          <button
            type="button"
            className="btn-gradient normal white small-txt"
            onClick={() => navigate(ROUTES.TRAINING_NATIONWIDE_APPLY)}
          >
            전국단위 훈련신청
          </button>
          <button
            type="button"
            className="btn-gradient normal white small-txt"
            onClick={() => navigate(ROUTES.TRAINING_HOLIDAY_APPLY)}
          >
            휴일예비군 훈련신청
          </button>
          <button type="button" className="btn-gradient normal white small-txt" disabled title="준비 중">
            훈련일정 본인선택제 <span className="ui-badge">준비 중</span>
          </button>
        </div>
        <TrainingTable
          id="detailTb"
          rows={data.trainings}
          total
          empty="훈련내용이 없습니다."
          renderAction={renderAction}
        />
        <div className="my-note">
          ※소속 예비군부대에 따라 전/후반기 작계훈련 부과시간이 서로 다를 수 있습니다.
          <br />
          &nbsp;&nbsp;&nbsp;(예: 전반기 8시간, 후반기 4시간)
          <br />
          <br />
          ※실제 신청한 훈련시간과 &apos;나의 훈련정보&apos;에 표시되는 계획시간이 다르게 보일 수 있으며, &apos;나의
          훈련정보&apos;의 계획시간은 부대에서 최초 부과한 계획시간 기준으로 표시됩니다.
          <br />
          <br />
          ※예를 들어, 전반기 부대에서 최초 부과한 훈련시간이 8시간인 경우, 전국단위로 6시간 훈련을 받게 되더라도 계획시간은
          8시간으로 표시될 수 있으며, 이 경우 나머지 2시간은 후반기에 추가로 부과될 수 있습니다.
          <br />
          <br />
          ※실제 신청한 교육시간 내역은 &apos;신청 상세정보&apos;에서 확인하여 주시기 바랍니다.
        </div>
      </section>
      <section className="pos-rel">
        <h4 className="cont-tit-h4">
          훈련내용({data.year}년 이전){" "}
          <button
            type="button"
            className={`btn-toggle${showPast ? " open" : ""}`}
            aria-expanded={showPast}
            onClick={() => setShowPast(!showPast)}
          >
            {showPast ? "이전 훈련내용 닫기" : "이전 훈련내용 열기"}
            <Icon name="chevronDown" size={14} />
          </button>
        </h4>
        {showPast && (
          <TrainingTable
            id="detail2"
            rows={data.pastTrainings}
            empty="훈련내용이 없습니다."
            renderAction={renderAction}
          />
        )}
        <ul className="state-list" aria-label="계획시간 색상 안내">
          <li className="state3-sm">훈련일정 변경불가</li>
          <li className="state2-sm">훈련일정 변경가능</li>
          <li className="state1-sm">훈련일정 종료</li>
        </ul>
      </section>
      {doc && <DocumentDialog training={doc.training} kind={doc.kind} onClose={() => setDoc(null)} />}
    </SubLayout>
  );
}
