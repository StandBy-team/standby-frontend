import { Link } from "react-router-dom";
import ROUTES from "@/constants/routes";
import SubLayout from "@/components/layout/SubLayout";

export default function ErrorInquiry() {
  return (
    <SubLayout title="장애 문의">
      <section>
        <div className="section-box">
          <ul className="txt-list bl_dot">
            <li>접속량에 따라 상담이 제한될 수 있습니다.</li>
            <li>접속량에 많을 경우 각 소속 부대에 문의바라며 소속부대 질의응답 게시판을 이용하셔도 됩니다.</li>
          </ul>
        </div>
        <div className="tbl-outer1">
          <table className="tbl-st01">
            <caption>장애문의 전화번호</caption>
            <thead>
              <tr>
                <th scope="col">구분</th>
                <th scope="col">기관</th>
                <th scope="col">홈페이지</th>
                <th scope="col">전화번호</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>예비군홈페이지</td>
                <td>국방부</td>
                <td>
                  <Link to={ROUTES.MAIN}>www.yebigun1.mil.kr</Link>
                </td>
                <td>1551-9090</td>
              </tr>
              <tr>
                <td>휴대폰 본인확인</td>
                <td>SCI평가정보 사이렌24</td>
                <td>
                  <a
                    href="https://www.siren24.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="SCI평가정보 사이렌24 홈페이지 새창 열기"
                  >
                    www.siren24.com
                  </a>
                </td>
                <td>1577-1006</td>
              </tr>
              <tr>
                <td>아이핀(I-PIN)</td>
                <td>SCI평가정보 사이렌24</td>
                <td>
                  <a
                    href="https://www.siren24.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="SCI평가정보 사이렌24 홈페이지 새창 열기"
                  >
                    www.siren24.com
                  </a>
                </td>
                <td>1577-1006</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </SubLayout>
  );
}
