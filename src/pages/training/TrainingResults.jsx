import { useNavigate } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import ResultTable from "@/components/common/ResultTable";
import { fetchTrainingApplications } from "@/api/services/application";
import { TRAINING_APPLICATION_KINDS } from "@/constants/applications";
import ROUTES, { detailPath } from "@/constants/routes";
import useApi from "@/hooks/useApi";
import useListNavigation from "@/hooks/useListNavigation";

const COLUMNS = [
  { label: "신청구분", render: (a) => <span className="link">{TRAINING_APPLICATION_KINDS[a.kind]}</span> },
  { label: "훈련유형", render: (a) => <span className="link">{a.typeName}</span> },
  { label: "신청일자", render: (a) => a.appliedAt },
  { label: "수정일자", render: (a) => a.updatedAt ?? "-" },
  { label: "처리일자", render: (a) => a.processedAt ?? "-" },
  { label: "처리결과", render: (a) => a.status },
];

export default function TrainingResults() {
  const navigate = useNavigate();
  const { query, setPage } = useListNavigation();
  const { data } = useApi((opts) => fetchTrainingApplications({ page: query.page }, opts), [query.page]);

  return (
    <SubLayout title="훈련신청 결과" subText="예비군 훈련과 관련된 나의 해당 사항들을 쉽게 확인할 수 있습니다.">
      <section>
        <div className="tbl-comments">
          휴일/전국단위 훈련신청 취소는 <em>신청일 당일</em>만 가능합니다.
          <br />
          신청일 이후 부득이하게 취소해야 할 경우에는 소속 예비군 부대로 문의 바랍니다.
          <br />
          휴일/전국단위 훈련신청 내역 변경(수정)은 <em>훈련일을 제외한 3일전</em>까지 <em>1회</em> 수정만 가능합니다.
        </div>
        <div className="tbl-comments">
          훈련일정 본인선택제 훈련신청 취소는 <em>신청일 당일</em>만 가능합니다.
          <br />
          신청일 이후 부득이하게 취소해야 할 경우에는 <em>훈련 연기를 신청</em>하거나 소속 예비군 부대로 문의 바랍니다.
        </div>
        <div className="pos-rel mt45">
          <h4 className="cont-tit-h4">훈련신청 결과</h4>
        </div>
        {data && (
          <ResultTable
            caption="훈련신청 결과 목록으로 번호, 신청구분, 훈련유형, 신청일자, 수정일자, 처리일자, 처리결과 정보를 제공"
            columns={COLUMNS}
            list={{ ...data, onPage: setPage }}
            onOpen={(a) => navigate(detailPath(ROUTES.TRAINING_RESULT_DETAIL, a.id))}
          />
        )}
      </section>
    </SubLayout>
  );
}
