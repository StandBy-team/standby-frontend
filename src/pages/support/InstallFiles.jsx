import SubLayout from "@/components/layout/SubLayout";

export default function InstallFiles() {
  return (
    <SubLayout title="설치 파일">
      <section className="section-box">
        <div>
          <h3 className="h3-tit">예비군 홈페이지에서 제공하는 보안 프로그램을 설치합니다.</h3>
          <ul className="txt-list bl_dot">
            <li>예비군의 안전한 서비스 이용을 위해서 보안프로그램들을 설치하셔야 합니다. </li>
            <li>필요한 서비스에 따라 아래의 솔루션을 설치하시기 바랍니다.</li>
            <li>컴퓨터 성능에 따라 10초 ~ 1분 정도 소요될 수 있습니다.</li>
          </ul>
          <br />
          <div className="tbl-outer1">
            <table className="tbl-st01">
              <caption>보안 프로그램 설치 파일 목록</caption>
              <thead>
                <tr>
                  <th scope="col">프로그램명</th>
                  <th scope="col">기능 </th>
                  <th scope="col">설치 </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a href="https://www.yebigun1.mil.kr/markany/bin/Setup_ePageSafer.exe">
                      {" "}
                      위변조 방지 솔루션 <br />
                      (e-Page SAFER For NoAX){" "}
                    </a>
                  </td>
                  <td> 인터넷 문서 발급을 위한 위변조 방지 솔루션 </td>
                  <td>
                    <a href="https://www.yebigun1.mil.kr/markany/bin/Setup_ePageSafer.exe"> 내려받기(클릭) </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://www.yebigun1.mil.kr/dmobis/rfh/rgt/info/VC_redist.x64_14.44.35211.exe">
                      {" "}
                      국동체 DRM 패치파일{" "}
                    </a>
                  </td>
                  <td>
                    {" "}
                    국동체 DRM 설치 시 &apos;return zero&apos; 오류 시 사용
                    <br /> 국방동원정보체계 사용자용이므로 예비군 사용자에게는 해당 없음{" "}
                  </td>
                  <td>
                    <a href="https://www.yebigun1.mil.kr/dmobis/rfh/rgt/info/VC_redist.x64_14.44.35211.exe">
                      {" "}
                      내려받기(클릭){" "}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </SubLayout>
  );
}
