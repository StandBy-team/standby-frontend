import { useNavigate, useParams } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import Attachments from "@/components/common/Attachments";
import { fetchHoldApplication } from "@/api/services/application";
import { fetchProfile } from "@/api/services/my";
import { API_BASE } from "@/config";
import ROUTES from "@/constants/routes";
import useApi from "@/hooks/useApi";

const Period = ({ start, end }) => (
  <>
    {start} ~ {end}
  </>
);

export default function HoldResultDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error } = useApi((opts) => fetchHoldApplication(id, opts), [id]);
  const profile = useApi((opts) => fetchProfile(opts), []);

  if (error) {
    return (
      <SubLayout title="보류 신청 결과">
        <p className="mt30">신청내역을 찾을 수 없습니다.</p>
      </SubLayout>
    );
  }
  if (!data || !profile.data) return <SubLayout title="보류 신청 결과" />;

  const { application } = data;
  const me = profile.data;

  return (
    <SubLayout title="보류 신청 결과">
      <section>
        <h4 className="cont-tit-h4">신청내용</h4>
        <table className="tbl th-c">
          <caption>보류 신청내용</caption>
          <colgroup>
            <col style={{ width: 70 }} />
            <col style={{ width: 120 }} />
            <col />
            <col style={{ width: 110 }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" rowSpan={4}>
                인적
                <br />
                사항
              </th>
              <th scope="row" className="bl">
                성명
              </th>
              <td>{me.name}</td>
              <th scope="row" className="bl">
                생년월일
              </th>
              <td>{me.birthDate}</td>
            </tr>
            <tr>
              <th scope="row" className="bl">
                주소
              </th>
              <td colSpan={3}>{me.address}</td>
            </tr>
            <tr>
              <th scope="row" className="bl">
                전화번호
              </th>
              <td>{me.cellPhone}</td>
              <th scope="row" className="bl">
                세대주(관계)
              </th>
              <td>{me.familyMaster}</td>
            </tr>
            <tr>
              <th scope="row" className="bl">
                직장 및 직위
              </th>
              <td colSpan={3}>{me.position}</td>
            </tr>
            <tr>
              <th scope="row" rowSpan={2}>
                병역
                <br />
                사항
              </th>
              <th scope="row" className="bl">
                군별
              </th>
              <td>{me.branch}</td>
              <th scope="row" className="bl">
                역종
              </th>
              <td>{me.serviceType}</td>
            </tr>
            <tr>
              <th scope="row" className="bl">
                계급
              </th>
              <td>{me.rank}</td>
              <th scope="row" className="bl">
                군번
              </th>
              <td>{me.serviceNo}</td>
            </tr>
            <tr>
              <th scope="row" colSpan={2}>
                보류기간
              </th>
              <td>
                <Period start={application.periodStart} end={application.periodEnd} />
              </td>
              <th scope="row" className="bl">
                보류사유
              </th>
              <td>{application.reason}</td>
            </tr>
            <tr>
              <th scope="row" colSpan={2}>
                보류 증빙서류 첨부
              </th>
              <td colSpan={3}>
                <Attachments
                  files={application.attachments}
                  urlOf={(file) => `${API_BASE}/me/hold-applications/${application.id}/files/${file.fileSn}`}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <h4 className="cont-tit-h4">처리 결과</h4>
        <table className="tbl th-c">
          <caption>보류 처리 결과</caption>
          <colgroup>
            <col style={{ width: 140 }} />
            <col />
            <col style={{ width: 120 }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">보류 처리결과</th>
              <td>
                <span className="txt-blue">{application.result.status}</span>
              </td>
              <th scope="row" className="bl">
                보류 신청일자
              </th>
              <td>{application.appliedAt}</td>
            </tr>
            <tr>
              <th scope="row">보류기간</th>
              <td>
                <Period start={application.result.periodStart} end={application.result.periodEnd} />
              </td>
              <th scope="row" className="bl">
                보류사유
              </th>
              <td>{application.result.reason}</td>
            </tr>
            <tr>
              <th scope="row">보류 처리결과 내용</th>
              <td colSpan={3}>{application.result.comment}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <div className="btn-box">
        <button type="button" className="btn-gradient big blue" onClick={() => navigate(ROUTES.HOLD_RESULTS)}>
          목록
        </button>
      </div>
    </SubLayout>
  );
}
