import { useNavigate, useParams } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import ListButton from "@/components/common/ListButton";
import { fetchDelayApplication } from "@/api/services/application";
import ROUTES from "@/constants/routes";
import useApi from "@/hooks/useApi";
import { formatPeriod } from "@/utils/date";

// No reference page for this view; it follows the hold result detail (HoldPsnReqRsltDetail).
export default function DelayResultDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error } = useApi((opts) => fetchDelayApplication(id, opts), [id]);

  return (
    <SubLayout title="연기신청 결과">
      {error && <p className="mt30">신청내역을 찾을 수 없습니다.</p>}
      {data && (
        <section>
          <h4 className="cont-tit-h4">신청내용</h4>
          <table className="tbl th-c">
            <caption>연기신청 내용</caption>
            <colgroup>
              <col style={{ width: 140 }} />
              <col />
              <col style={{ width: 110 }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">성명</th>
                <td>{data.member.name}</td>
                <th scope="row" className="bl">
                  군번
                </th>
                <td>{data.member.serviceNo}</td>
              </tr>
              <tr>
                <th scope="row">훈련유형</th>
                <td>{data.application.trainingName}</td>
                <th scope="row" className="bl">
                  훈련장소
                </th>
                <td>{data.application.centerName}</td>
              </tr>
              <tr>
                <th scope="row">희망연기기간</th>
                <td>{formatPeriod(data.application.periodStart, data.application.periodEnd)}</td>
                <th scope="row" className="bl">
                  연기사유
                </th>
                <td>{data.application.reason}</td>
              </tr>
              <tr>
                <th scope="row">증빙서류</th>
                <td colSpan={3}>
                  {data.application.attachments.map((f) => (
                    <div key={f.fileSn}>
                      {f.name}&nbsp;[{f.size}&nbsp;byte]
                    </div>
                  ))}
                </td>
              </tr>
              <tr>
                <th scope="row">신청일자</th>
                <td>{data.application.appliedAt}</td>
                <th scope="row" className="bl">
                  처리결과
                </th>
                <td>
                  <span className="txt-blue">{data.application.status}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      )}
      <div className="btn-box">
        <ListButton onClick={() => navigate(ROUTES.DELAY_RESULTS)} />
      </div>
    </SubLayout>
  );
}
