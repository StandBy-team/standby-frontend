import Modal from "@/components/common/Modal";
import { fetchTrainingPlans } from "@/api/services/application";
import useApi from "@/hooks/useApi";
import { dotDate, formatPeriod } from "@/utils/date";

/** Lists the plans of the chosen training center within the search period; `onSelect(plan)`. */
export default function TrainingPlanModal({ criteria, centerName, onSelect, onClose }) {
  const { type, center, from, to } = criteria;
  const { data, loading } = useApi(
    (opts) => fetchTrainingPlans({ type, center, from, to }, opts),
    [type, center, from, to]
  );

  return (
    <Modal title="훈련계획 선택" width={700} onClose={onClose}>
      <p className="mb10">
        <b className="txt-blue">{centerName}</b> 훈련계획 ({dotDate(from)} ~ {dotDate(to)})
      </p>
      <div className="pop-scroll">
        <table className="tbl type2">
          <caption>훈련계획 목록</caption>
          <thead>
            <tr>
              <th scope="col">훈련명</th>
              <th scope="col">훈련일자</th>
              <th scope="col">입소시간</th>
              <th scope="col">훈련시간</th>
              <th scope="col">선택</th>
            </tr>
          </thead>
          <tbody>
            {!loading && data?.length === 0 && (
              <tr>
                <td colSpan={5}>검색기간 내 신청 가능한 훈련계획이 없습니다.</td>
              </tr>
            )}
            {data?.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.name}</td>
                <td>{formatPeriod(plan.start, plan.end)}</td>
                <td>{plan.entryTime}</td>
                <td>{plan.hours}</td>
                <td>
                  <button type="button" className="btn-gradient normal blue" onClick={() => onSelect(plan)}>
                    선택
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
