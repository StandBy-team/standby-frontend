import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import { deleteTrainingApplication, fetchTrainingApplication } from "@/api/services/application";
import ROUTES from "@/constants/routes";
import useApi from "@/hooks/useApi";

export default function TrainingResultDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error } = useApi((opts) => fetchTrainingApplication(id, opts), [id]);
  const [deleting, setDeleting] = useState(false);

  const remove = async () => {
    if (!window.confirm("훈련신청을 삭제하시겠습니까?")) return;
    setDeleting(true);
    try {
      await deleteTrainingApplication(id);
      window.alert("삭제되었습니다.");
      navigate(ROUTES.TRAINING_RESULTS);
    } catch (e) {
      window.alert(e.message);
      setDeleting(false);
    }
  };

  if (error) {
    return (
      <SubLayout title="훈련신청 결과">
        <p className="mt30">신청내역을 찾을 수 없습니다.</p>
      </SubLayout>
    );
  }
  if (!data) return <SubLayout title="훈련신청 결과" />;

  const { member, application } = data;

  return (
    <SubLayout title="훈련신청 결과" subText="예비군훈련에 관한 내용을 보실 수 있습니다.">
      <section>
        <div className="sub-tit">
          <span className="txt-blue">[{member.name}]</span> 님이 신청하신{" "}
          <span className="txt-blue">&lt;휴일 및 전국단위 훈련&gt;</span> 일자는{" "}
          <span className="txt-blue">{application.trainingDate}</span> 입니다.
        </div>
      </section>
      <section>
        <h4 className="cont-tit-h4">인적사항</h4>
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
              <td>{member.unit.platoon}</td>
              <th scope="row" className="bl">
                계급
              </th>
              <td>{member.rank}</td>
            </tr>
            <tr>
              <th scope="row" colSpan={2}>
                군번
              </th>
              <td>{member.serviceNo}</td>
              <th scope="row" className="bl">
                성명
              </th>
              <td>{member.name}</td>
            </tr>
            <tr>
              <th scope="row" colSpan={2}>
                연락처
              </th>
              <td>{application.phone}</td>
              <th scope="row" className="bl">
                전역연도
              </th>
              <td>{member.dischargeYear}년</td>
            </tr>
            <tr>
              <th scope="row" rowSpan={2}>
                현재사는 곳
              </th>
              <th scope="row" className="bl">
                기본주소
              </th>
              <td colSpan={3}>{application.address}</td>
            </tr>
            <tr>
              <th scope="row" className="bl">
                상세주소
              </th>
              <td colSpan={3}>{application.detailAddress}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <div className="txt-box">
          <p>-휴일 및 전국단위훈련 신청 삭제(취소)는 신청일 당일까지만 가능하며, 이후에는 불가합니다.</p>
          <p className="txt-blue pl5">※ 신청일 이후 부득이 하게 취소해야 할 경우에는 소속 예비군 부대로 문의 바랍니다.</p>
          <p className="mt25">
            -휴일 및 전국단위 훈련 신청내용 변경(수정)은 1회로 제한되며 신청 훈련일을 제외한 3일전까지만 가능합니다.
          </p>
          <p className="txt-blue pl5">예) 7월8일 훈련의 경우 7월4일(23:59)까지 수정 가능합니다.</p>
        </div>
      </section>
      <section className="pos-rel">
        <h4 className="cont-tit-h4">신청내용</h4>
        <table className="tbl th-c">
          <caption>신청내용</caption>
          <colgroup>
            <col style={{ width: 140 }} />
            <col />
            <col style={{ width: 100 }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">훈련유형</th>
              <td>
                {application.typeName} {application.round}
              </td>
              <th scope="row" className="bl">
                훈련시간
              </th>
              <td>{application.hours}</td>
            </tr>
            <tr>
              <th scope="row">훈련명</th>
              <td colSpan={3}>{application.trainingName}</td>
            </tr>
            <tr>
              <th scope="row">훈련일자</th>
              <td>{application.trainingDate}</td>
              <th scope="row" className="bl">
                입소시간
              </th>
              <td>{application.entryTime}</td>
            </tr>
            <tr>
              <th scope="row">신청훈련장</th>
              <td colSpan={3}>
                {application.centerName}
                {application.centerPhone && ` (☎${application.centerPhone})`}
              </td>
            </tr>
            <tr>
              <th scope="row">훈련신청 예비군부대</th>
              <td colSpan={3}>
                {application.troopName}
                {application.troopPhone && `(☎${application.troopPhone})`}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <div className="btn-box">
        <button type="button" className="btn-gradient big blue" onClick={() => navigate(ROUTES.TRAINING_RESULTS)}>
          목록
        </button>{" "}
        <button type="button" className="btn-gradient big blue" disabled={deleting} onClick={remove}>
          삭제
        </button>
      </div>
    </SubLayout>
  );
}
