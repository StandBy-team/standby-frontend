import SubLayout from "@/components/layout/SubLayout";
import PageState from "@/components/common/PageState";
import MemberSummary from "@/components/my/MemberSummary";
import { fetchAwards } from "@/api/services/my";
import useApi from "@/hooks/useApi";

const YEAR = new Date().getFullYear();

export default function Awards() {
  const { data, error } = useApi((opts) => fetchAwards(opts), []);

  if (!data) {
    return (
      <SubLayout title="예비군 상훈">
        <PageState error={error} />
      </SubLayout>
    );
  }

  return (
    <SubLayout title="예비군 상훈">
      <section>
        <MemberSummary member={data.member} year={YEAR} />
      </section>
      <section>
        <h4 className="cont-tit-h4">상훈</h4>
        <table className="tbl type2">
          <caption>상훈</caption>
          <thead>
            <tr>
              <th scope="col">일자</th>
              <th scope="col">명령근거</th>
              <th scope="col">기타</th>
            </tr>
          </thead>
          <tbody>
            {data.awards.length === 0 && (
              <tr>
                <td colSpan={3}>상훈 이력이 없습니다.</td>
              </tr>
            )}
            {data.awards.map((a) => (
              <tr key={a.id}>
                <td>{a.date}</td>
                <td>{a.order}</td>
                <td>{a.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </SubLayout>
  );
}
