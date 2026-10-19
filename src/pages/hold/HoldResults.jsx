import { useNavigate } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import ResultTable from "@/components/common/ResultTable";
import { fetchHoldApplications } from "@/api/services/application";
import ROUTES, { detailPath } from "@/constants/routes";
import useApi from "@/hooks/useApi";
import useListNavigation from "@/hooks/useListNavigation";

const COLUMNS = [
  { label: "신청구분", render: (a) => <span className="link">{a.kind}</span> },
  { label: "신청일자", render: (a) => a.appliedAt },
  { label: "처리일자", render: (a) => a.processedAt ?? "-" },
  { label: "처리결과", render: (a) => a.status },
];

export default function HoldResults() {
  const navigate = useNavigate();
  const { query, setPage } = useListNavigation();
  const { data } = useApi((opts) => fetchHoldApplications({ page: query.page }, opts), [query.page]);

  return (
    <SubLayout title="보류·해소 신청 결과">
      <section>
        {data && (
          <ResultTable
            caption="보류·해소 신청 결과 목록으로 번호, 신청구분, 신청일자, 처리일자, 처리결과 정보를 제공"
            columns={COLUMNS}
            list={{ ...data, onPage: setPage }}
            onOpen={(a) => navigate(detailPath(ROUTES.HOLD_RESULT_DETAIL, a.id))}
          />
        )}
      </section>
    </SubLayout>
  );
}
