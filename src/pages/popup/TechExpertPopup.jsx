import PopupLayout from "@/components/layout/PopupLayout";
import PopupTabs from "@/components/layout/PopupTabs";

const TABS = ["소개", "신청서 작성", "신청 결과", "모집자 안내"];

export default function TechExpertPopup() {
  return (
    <PopupLayout title="예비전력 첨단기술 전문가 신청">
      <div className="promotion-tab tab-style1">
        <PopupTabs tabs={TABS} />
        <div className="tab_cts">
          <div className="pop-stit-wrap">
            <p className="pop-tit1 fl">1. 모집 대상</p>
          </div>
          <div className="details last">
            <ul>
              <li>
                전시/사변 또는 국가비상사태시 국방에 기여할 의지가 있고 첨단기술 전문성을 갖춘 대한민국 성인남녀 누구나
              </li>
              <li>
                <span className="b">지원자격 제한</span>
                <br />
                ▴전시 고유임무가 있는 현역군인 및 공무원(군무원·경찰관·소방관 등 포함) <br />
                ▴이미 모집분야에 관련된 병과·특기가 부여되어있는 예비군{" "}
              </li>
            </ul>
          </div>
          <div className="pop-stit-wrap">
            <p className="pop-tit1 fl">2. 모집 기간</p>
          </div>
          <div className="details last">
            <ul>
              <li>연중 상시</li>
            </ul>
          </div>
          <div className="pop-stit-wrap">
            <p className="pop-tit1 fl">3. 모집 분야 및 지원 자격</p>
          </div>
          <div className="details last">
            <table className="tbl type2">
              <caption>모집 분야 및 지원 자격</caption>
              <colgroup>
                <col style={{ width: "16%" }} />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">모집 분야</th>
                  <th scope="col">지원 자격 (1개 이상 해당)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">드론</th>
                  <td>
                    <ul>
                      <li>국가기술자격 보유자(초경량비행장치조종 등)</li>
                      <li>관련분야 학위 보유자(박사, 석사, 학사)</li>
                      <li>국방부 드론경연대회 입상자, 대한민국 드론 공방전 입상자, 기타 국내외 대회 입상자</li>
                      <li>드론 제조·운용 기업 종사자</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th scope="row">로봇</th>
                  <td>
                    <ul>
                      <li>관련분야 학위 보유자(박사, 석사, 학사)</li>
                      <li>국내외 로봇 관련 대회 입상자</li>
                      <li>로봇 제조·운용 기업 종사자</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th scope="row">AI</th>
                  <td>
                    <ul>
                      <li>관련분야 학위 보유자(박사, 석사, 학사)</li>
                      <li>국방부 MAICON 입상자, 과기정통부 전국민 대회 입상자, 기타 국내외 대회 입상자</li>
                      <li>AI 서비스·인프라 등 기업 종사자</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th scope="row">사이버</th>
                  <td>
                    <ul>
                      <li>국가기술자격 보유자(정보보안기능사·기사 등)</li>
                      <li>관련분야 학위 보유자(박사, 석사, 학사)</li>
                      <li>국방부·국정원 화이트햇 콘테스트 입상자, 기타 국내외 유명 대회 입상자</li>
                      <li>정보보안 서비스·제품개발 등 기업 종사자</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pop-stit-wrap">
            <p className="pop-tit1 fl">4. 지원 서류</p>
          </div>
          <div className="details last">
            <ul>
              <li>지원서</li>
              <li>개인정보 이용 동의서</li>
              <li>개인정보 제3자 제공 동의서</li>
              <li>자격증명서·학위증명서·직장 경력증명서·수상증명서(각각 해당자)</li>
            </ul>
          </div>
          <div className="pop-stit-wrap">
            <p className="pop-tit1 fl">5. 신청자 유의사항</p>
          </div>
          <div className="details last">
            <ul>
              <li>
                ｢병역법｣ 및 ｢비상대비에 관한 법률｣에 따라 전시 병력동원 또는 기술인력동원 대상자 등으로 지정될 수 있음
              </li>
            </ul>
          </div>
          <div className="pop-stit-wrap">
            <p className="pop-tit1 fl">6. 모집 절차</p>
          </div>
          <div className="details last">
            <ul>
              <li>예비군 홈페이지에 지원서 접수</li>
              <li>軍 승인(수임군부대) 및 결과 통지</li>
            </ul>
          </div>
          <div className="pop-stit-wrap">
            <p className="pop-tit1 fl">7. 문의처</p>
          </div>
          <div className="details last">
            <ul>
              <li>국방부 예비전력정책관실 자원동원과: 02-748-5224</li>
            </ul>
          </div>
        </div>
      </div>
    </PopupLayout>
  );
}
