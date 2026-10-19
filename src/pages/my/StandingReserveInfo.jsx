import { useState } from "react";
import SubLayout from "@/components/layout/SubLayout";
import Icon from "@/components/common/Icon";
import PageState from "@/components/common/PageState";
import MemberSummary from "@/components/my/MemberSummary";
import TrainingTable from "@/components/my/TrainingTable";
import { fetchStandingReserve } from "@/api/services/my";
import useApi from "@/hooks/useApi";

const YEAR = new Date().getFullYear();

export default function StandingReserveInfo() {
  const { data, error } = useApi((opts) => fetchStandingReserve(opts), []);
  const [showPast, setShowPast] = useState(false);

  if (!data) {
    return (
      <SubLayout title="상비예비군">
        <PageState error={error} />
      </SubLayout>
    );
  }

  return (
    <SubLayout title="상비예비군">
      <section>
        <MemberSummary member={data.member} year={YEAR} />
      </section>
      <section>
        <h4 className="cont-tit-h4">상비예비군 편성 이력</h4>
        <table className="tbl type2">
          <caption>상비예비군 편성 이력</caption>
          <thead>
            <tr>
              <th scope="col">편성기간</th>
              <th scope="col">소집부대</th>
              <th scope="col">구분</th>
              <th scope="col">소집해제사유</th>
            </tr>
          </thead>
          <tbody>
            {data.history.length === 0 && (
              <tr>
                <td colSpan={4}>상비예비군 편성 이력이 없습니다.</td>
              </tr>
            )}
            {data.history.map((h) => (
              <tr key={h.id}>
                <td>{h.period}</td>
                <td>{h.troop}</td>
                <td>{h.type}</td>
                <td>{h.releaseReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="pos-rel">
        <h4 className="cont-tit-h4">훈련내용({YEAR}년)</h4>
        <TrainingTable rows={data.trainings} actionLabel="필증" empty="상비예비군에 대한 훈련내용이 없습니다." />
      </section>
      <section className="pos-rel">
        <h4 className="cont-tit-h4">
          훈련내용({YEAR}년 이전){" "}
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
          <TrainingTable rows={data.pastTrainings} actionLabel="필증" empty="상비예비군에 대한 훈련내용이 없습니다." />
        )}
      </section>
    </SubLayout>
  );
}
