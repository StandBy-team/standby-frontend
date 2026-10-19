import SubLayout from "@/components/layout/SubLayout";

export default function HoldGuide() {
  return (
    <SubLayout title="보류란?">
      <section>
        <div className="login-cont-box">
          <span className="img">
            <img src="/images/login/login-img1.svg" alt="예비군 마크" />
          </span>
          <div className="txt">
            <p>
              예비군법과 국방부 방침으로 예비군의 동원 및 훈련소집의 전부 또는 <br /> 일부를 이수한 것으로 처리하는 것
            </p>
          </div>
        </div>
      </section>{" "}
      <section className="section-box">
        <div>
          <h3 className="h3-tit">법적근거</h3>
          <div className="clearfix">
            <div className="">
              <ul className="txt-list bl_dot">
                <li>예비군법 제5조, 6조</li>
                <li>예비군법 시행령 제13조</li>
                <li>예비군법 시행규칙 제17조, 제18조, 제19조</li>
                <li>국방부훈령 제3065호(예비군 교육훈련 훈령)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>{" "}
      <section className="section-box">
        <div>
          <h3 className="h3-tit">보류 방침</h3>
          <ol className="txt-list">
            <li>
              <strong>1</strong>. 보류 대상 직종과 자격 및 기준은 법령에 의하며, 방침보류 대상은 필요기관의 소요제기에
              따라 국방부장관이 정한다.
            </li>
            <li>
              <strong>2</strong>. 예비군 동원 및 훈련의 보류대상자는 소정의 절차에 따라 소속 예비군 지휘관이 판단 및
              결정하여 보류 조치한다.
            </li>
            <li>
              <strong>3</strong>. 보류 기간은 보류자 신분이 되었을 때 이며, 유선 등 기타 방법으로 신고를 접수한 경우
              이를 포함할 수 있다. 다만, 다음의
              <br />
              <span className="ml15">
                {" "}
                경우는 지휘관이 직권으로 보류 조치하고 본인 또는 훈련소집통지서 대리수령 가능한 사람에게 통보하며 관련
                증빙자료를
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;유지한다.
              </span>
            </li>
            <li>&nbsp;&nbsp;&nbsp;&nbsp;가. 41세 이상인 예비역의 장교, 준사관 및 부사관</li>
            <li>&nbsp;&nbsp;&nbsp;&nbsp;나. 국외 출국자로 통보 받은 사람</li>
            <li>&nbsp;&nbsp;&nbsp;&nbsp;다. 구속 수감된 사실이 확인된 사람</li>
            <li>
              &nbsp;&nbsp;&nbsp;&nbsp;라. 기타 그 사유가 명백하여 별도의 보류 신고가 없어도 예비군지휘관이 관련
              증빙자료를 유지할 수 있다고 판단하여 승인한
              <br />
              <span className="ml15">&nbsp;&nbsp;&nbsp;&nbsp; 경우 </span>
            </li>
            <li>
              <strong>4</strong>. 보류 대상자의 동원 및 훈련은 보류사유가 발생한 즉시 적용하되, 다음의 경우 별도로 정한
              기간을 충족한 경우 대상자의 훈련을 <br />
              <span className="ml15">보류 조치한다. </span>
            </li>
            <li>
              &nbsp;&nbsp;&nbsp;&nbsp;가) 외국에 여행 중이거나 체류 중인 사람은 그 기간이 365일 이상인 경우로 하며, 보류
              기간은 출국일로부터 귀국일까지로 <br />
              <span className="ml15">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;한다.</span>
            </li>
            <li>
              &nbsp;&nbsp;&nbsp;&nbsp;나) 질병 및 심신장애의 사유로 그 치료기간이 180일 이상인 진단서를 제출한 사람은
              보류원서를 제출한 날로부터 진단서 상 <br />
              <span className="ml15">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;치료가 끝나는 날까지의 기간을 보류 조치한다.
              </span>{" "}
              다만, 피부병, 불안장애 등 「병역판정 신체검사 등 검사규칙」에 준하여 <br />
              <span className="ml15">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;훈련이 가능한 경우 대대급이상 부대에서 심의(군의관 포함 5인
                이상)하여 처리한다.
              </span>
            </li>
            <li>
              &nbsp;&nbsp;&nbsp;&nbsp;다) 동원 및 훈련이 일부보류 되는자(이하 &quot;방침일부 보류자&quot;라 한다.) 해당
              직종에 종사 또는 근무한 기간이 180일 이상인 <br />
              <span className="ml15">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;경우로 하며, 보류기간은 해당 직종에 종사 또는 근무한 날로부터
                계산한다.
              </span>
            </li>
            <li>
              &nbsp;&nbsp;&nbsp;&nbsp;라) 각급학교 학생 및 기간제 교사는 180일 또는 1개 학기 이상을 재학(근무)시
              보류적용 요건을 충족한 것으로 간주하고, 재학 <br />
              <span className="ml15">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기간(각 학교 학칙에 의거 재학생으로 인정되는 기간)은 보류기간으로
                적용한다. 다만 수업연한을 초과한 복수전공·부전공·
              </span>
              <br />
              <span className="ml15">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;연계전공자,재수강자,졸업유예(연기)자,수료자,유급자 등은 학생보류
                대상에서 제외 하여 지역예비군부대에 편성한다.{" "}
              </span>
              <br />
              <span className="ml15">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 또한, 보류적용 요건을 1개 학기를 기준으로 적용시 통상적으로 1학기는
                3.1.~8.31., 2학기는 9.1.~2.28, 로 적용을 하되,{" "}
              </span>
              <br />
              <span className="ml15">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;각 학교 학칙에 의해 조정될 수 있다. 180일 또는 1개 학기를 충족하지
                않은 경우에는 신분과 연차에 맞는 훈련에서 이수한{" "}
              </span>
              <br />
              <span className="ml15">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;시간을 제외하여 실시한다. 다만, 각급학교 교사 중 6개월 미만으로
                계약을 체결한 기간제 교사는 연속하여 재계약을 할{" "}
              </span>
              <br />
              <span className="ml15">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;경우 근무기간을 합산하여 180일 이상 시 보류한다.{" "}
              </span>
            </li>
            <li>
              &nbsp;&nbsp;&nbsp;&nbsp;마) 가)~다)항의 각 기간을 충족하지 못하는 경우 그 기간동안 훈련을 연기
              처리한다.{" "}
            </li>
            <li>
              <strong>5</strong>. 법규 및 방침 전면보류자의 훈련 보류조치는 보류기간 중 부과된 해당 연도 훈련에 한해
              이수로 처리한다.
            </li>
            <li>
              <strong>6</strong>. 법규 및 방침 전면보류자는 소속 예비군부대의 훈련 주기에 따라서 훈련을 부과하고 부과된
              훈련에 대해 보류 조치한다.{" "}
            </li>
            <li>
              &nbsp;&nbsp;&nbsp;&nbsp;가) 부대훈련주기가 없어 훈련을 부과하지 못하고 법규 및 방침 전면 보류자 신분이 된
              경우도 이수한 것으로 처리힌다.
            </li>
            <li>
              &nbsp;&nbsp;&nbsp;&nbsp;나) 보류대상자가 보류원서를 제출(또는 유선 등 기타 방법으로 신고)한 시점과 보류자
              신분이 된 시점 사이에 예비군부대에서 <br />
              <span className="ml15">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;부과한 훈련이 있을 경우 이수한 것으로 처리한다.
              </span>
            </li>
          </ol>
        </div>
      </section>{" "}
      <section className="section-box">
        <div>
          <h3 className="h3-tit">보류 대상</h3>
          <h4 className="h4-tit">예비군동원 및 훈련 법규보류 직종(제32조 관련)</h4>
          <table className="tbl type2">
            <thead>
              <tr>
                <th className="bl" scope="row">
                  근 거
                </th>
                <th className="bl" scope="row">
                  기관(업체)별 보류대상
                </th>
                <th className="bl" scope="row">
                  확인책임
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  예비군법 <br />
                  제5조
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>국회의원(15.12.31부 훈련대상에 포함)</li>
                    <li>외국에 여행 중이거나 체류 중인 자</li>
                    <li>국외를 왕래하는 선박의 선원</li>
                    <li>국외를 왕래하는 항공기의 조종사와 승무원</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>국회사무처</li>
                    <li>병 무 청</li>
                    <li>소 속 장</li>
                    <li>소 속 장</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  예비군법 시행령 <br />
                  제13조
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      경찰관, 교도관 및 소방관 <br /> * 교정직 및 기술·보건·위생·관리운영·전문 경력직 교도관
                    </li>
                    <li>군부대에 근무하는 군무원</li>
                    <li>주한외국군부대에 근무하는 종업원</li>
                    <li>
                      항로표지 담당 공무원
                      <br /> * 항로표지정비 담당 공무원 및 등대나 항로표지용 선박에서 근무하는 공무원만 해당
                    </li>
                    <li>
                      항공기 정비사,항공교통관제사 및 항공 무선 표지소 근무 요원 <br /> * 국내 및 국외 노선 왕래 국내
                      항공사 소속 정비업체(하청, 계약업체 포함)의 정비사
                    </li>
                    <li>해안무선국에 근무하는 통신사 및 정비사</li>
                    <li>민방위기본법에 의하여 민방위대장으로 임명된 자</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>소속장</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  예비군법 시행규칙 <br />
                  제17조 제1항
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      대한민국과 아메리카합중국 간의 상호방위조약 제4조에 의한 시설과 구역 및 대한민국에서의 <br />
                      미합중국 군대의 지위에 관한 협정에 의하여 주한 미군부대에 고용된 종업원
                    </li>
                    <li>
                      대한민국과 아메리카합중국 간의 한국노무단의 지위에 관한 협정에 의하여 주한미군부대에 <br />
                      고용된 고용원
                    </li>
                    <li>
                      주한미군부대의 경비를 위하여 주한미군부대와 용역계약을 체결한 국내 기업체에 <br />
                      소속된 미국부대 경비요원
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>소속장</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  예비군법 시행규칙 <br />
                  제17조 제2항
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      철도종사원 <br /> * 기관사, 차량·장비관리원, 시설관리원, 전기원
                    </li>
                    <li>
                      지하철종사원 <br /> * 승무사무소의 기관사, 시설사업소의 보선원 및 철도토목사무소의 철도토목원{" "}
                      <br /> - 지하철 : 도시철도, 광역철도를 의미함
                    </li>
                    <li>외교부 외신담당 공무원</li>
                    <li>어업지도선 승선요원</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>소속장</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <h4 className="h4-tit">예비군동원 및 훈련 방침보류 직종(제23조 관련)</h4>
          <div style={{ position: "relative", display: "inline-block" }}>
            <div style={{ position: "absolute", top: "-10px", right: "-725px", fontWeight: "bold" }}>
              {" "}
              × : 보류, ○ : 참가{" "}
            </div>
          </div>
          <table className="tbl type2" style={{ width: "100%" }}>
            <colgroup>
              <col style={{ width: "auto" }} />
              <col style={{ width: "auto" }} />
              <col style={{ width: "50px" }} />
              <col style={{ width: "auto" }} />
              <col style={{ width: "50px" }} />
              <col style={{ width: "auto" }} />
              <col style={{ width: "auto" }} />
              <col style={{ width: "auto" }} />
            </colgroup>
            <thead>
              <tr>
                <th rowSpan={2} className="bl">
                  보류직종
                </th>
                <th rowSpan={2} className="bl">
                  기관(업체)별
                  <br />
                  보류대상
                </th>
                <th rowSpan={2} className="bl">
                  (재난)
                  <br />
                  동원
                </th>
                <th scope="col" colSpan={4} className="bl">
                  교육훈련
                </th>
                <th rowSpan={2} className="bl">
                  확인
                  <br />
                  책임
                </th>
              </tr>
              <tr>
                <th scope="row" className="bl">
                  {" "}
                  기본훈련
                </th>
                <th scope="row" className="bl">
                  {" "}
                  작계훈련
                </th>
                <th scope="row" className="bl">
                  {" "}
                  동원훈련 Ⅰ·Ⅱ형
                </th>
                <th scope="row" className="bl">
                  {" "}
                  예비시간
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  우편
                  <br />
                  집배원
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      우체국의 우편물 집배원 중 우편물 배달원 <br /> * 일반 및 상시 계약 집배원
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  우체국장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  41세 이상
                  <br />
                  간부
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      만 41세 이상의 예비역 장교, 준사관 및 부사관 <br /> * 만 41세가 되는 해의 1월 1일
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  직권처리{" "}
                </td>
              </tr>
              <tr>
                <td> 대통령실</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>대통령 수행비서 및 전문통역요원, 경호요원</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  비서/경호
                  <br />
                  실장{" "}
                </td>
              </tr>
              <tr>
                <td> 국군정보사</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      특수기록과 담당 <br /> * 군 : 963-5526 <br /> * 일반 : 02-2153-5526
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  정보사령관{" "}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  법무부
                  <br />
                  출입국관리직
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      출입국심사, 선박검색, 외국인보호, 체류관리 직종에 <br />
                      근무하는 자
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  국가유공자
                  <br />
                  (보훈보상 대상자)
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      국가유공자 및 보훈보상대상자인 예비군 <br /> * 전상군경, 공상군경·공무원, 재해부상, 군경·공무원의{" "}
                      <br />
                      &nbsp;&nbsp;&nbsp;사유로 국가보훈처에 등록된자
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  지방보훈
                  <br />
                  (지)청장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  군 동원업체
                  <br /> 필수 요원
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      적격업체의 필수요원으로 선발된 자 <br /> * 당해 연도 수임군부대 명령조치 또는 심의 의결자
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  수임군
                  <br />
                  부대장{" "}
                </td>
              </tr>
              <tr>
                <td>세관의 조사 공무원</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>사법경찰관리 지명을 받은 자</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  관세청장{" "}
                </td>
              </tr>
              <tr>
                <td>경찰학교</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>재학 중인 자</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  학교장{" "}
                </td>
              </tr>
              <tr>
                <td>청원 경찰</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>청원경찰법에 적용 받는 자</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>보호직</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>소년원 및 소년분류심사원의 보호직 공무원</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  질병 및 <br />
                  심신 장애인
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      180일 이상의 장기치료가 필요하다고 인정된 진단서
                      <br />
                      제출자
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  진단서{" "}
                </td>
              </tr>
              <tr>
                <td>구속 수감자</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      수감기간 <br /> * 6개월 이상 사회봉사명령 이행기간 및 가석방 기간 포함
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  교도소장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  기초생활
                  <br />
                  수급자
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>기초생활 수급자로 등록된 자</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  지자체장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  차상위 계층
                  <br />
                  이면서 한부모
                  <br />
                  가족의 가장
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>차상위계층 증명서 및 한부모 가족 증명서 제출자</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  읍·면동·장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  여군 출신
                  <br /> 예비군
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>임신시 부터 출산 후 12개월까지</li>
                    <li>
                      유산 또는 사산시 <br /> * 임신기간이 15주 이내시 : 3개월 <br /> * 임신기간이 16~27주 이내시 :
                      6개월 <br /> * 임신기간이 28주 이상시 : 12개월{" "}
                    </li>
                    <li>6세 이하의 자녀를 둔 경우</li>
                    <li>배우자가 군인, 군무원, 예비군일 경우</li>
                    <li>불임치료중인 경우</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  진단서 또는
                  <br /> 증빙 서류{" "}
                </td>
              </tr>
              <tr>
                <td>
                  심신질환으로
                  <br />
                  병역의무가
                  <br />
                  변경된자
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>현역에서 전환되어 보충역으로 근무 후 예비군에 편성된 자</li>
                    <li>심신장애 1급~9급으로 전역한 간부</li>
                    <li>병무청 신체검사 중 정신과 4급 판정을 받은 사실이 있는 자</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  직권처리{" "}
                </td>
              </tr>
              <tr>
                <td>민영 교도소 직원</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>법무부의 위탁을 받은 민영교도소의 직원</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>국정원</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>정보수사 요원</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○<br />
                  (2회){" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  국정원장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  민방공
                  <br />
                  경보요원
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>중앙통제소 및 광역시·도 경보통제소 근무자</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>법관 및 검사</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>현직판사 및 검사</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  항공기
                  <br />
                  지상조업 및<br />
                  장비 정비사
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      항공사 소속(하청, 계약 포함)의 항공기유도 및 견인, 전원공급, 급유, 지원장비 작동 및 정비 등의 직종
                      근무자
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○<br />
                  (1회){" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>특수 경비원</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>국가중요시설에 배치되어 특수경비 업무를 수행하는 자</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○<br />
                  (1회){" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  관할 경찰서장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  각급 학교
                  <br />
                  교사
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>유치원·초·중·고교에 재직 중인 교사</li>
                    <li>기술, 특수학교에 재직 중인 교사</li>
                    <li>
                      교육공무원법 제32조, 사립학교법 제54조 4의 규정에
                      <br /> 의한 기간제 교원으로서 6개월 이상 재직자 포함 <br /> * 교육감 인가를 받은 대안학교 포함{" "}
                      <br /> * 교육청 소속 6개월이상 전문상담 및 특수교육 순회 교사 <br /> * 평생 교육법 제31,32,33조
                      규정에 의한 평생교육시설에
                      <br />
                      &nbsp;&nbsp;&nbsp;재직 중인 교사 제외{" "}
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>대학 교수</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      고등교육법 제2조에 따라 설립된 대학·산업대학, 교육대학·전문대학에 재직중인 교수, 부교수, 조교수,
                      전임강사
                    </li>
                    <li>
                      특별법에 근거하여 설립한 대학에 재직중인 교수, 부교수,
                      <br />
                      조교수, 전임강사 <br /> * 그외에 학교, 사이버 등 원격교육, 방송·통신대학,
                      <br />
                      &nbsp;&nbsp;&nbsp;평생교육시설 재직자 제외 <br /> * 학문연구 전담교원과 고등교육법 제17조의 규정에
                      의한
                      <br />
                      &nbsp;&nbsp;&nbsp; 겸임교원 명예교수, 시간 강사, 초빙교수 등은 제외{" "}
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  각급 학교
                  <br />
                  학생
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      각급학교(중,고,대학,대학원)에 재학중인 학생 <br /> * 대학의 경우 고등교육법 제2조의 대학, 산업,
                      교육대학,
                      <br />
                      &nbsp;&nbsp;&nbsp;전문 대학과 특별법에 근거하여 설립한 대학의 재학생,
                      <br />
                      &nbsp;&nbsp;&nbsp;고등교육법에 따른 표준 재학기간의 학생, 재입학,
                      <br />
                      &nbsp;&nbsp;&nbsp;일반·학사편입학, 출석수업심화과정만 해당 <br /> * 국방대학교 포함{" "}
                    </li>
                    <li>
                      그 외에 학교, 논문과정 등록자, 원격 교육(사이버, 방송,
                      <br />
                      통신, 방송·통신), 평생교육시설 재학자 제외 <br /> * 「국민 평생 근로자 직업능력 개발법」에 근거한
                      기능대학 <br />
                      &nbsp;&nbsp;&nbsp;학위과정에 재학 중인 학생은 포함{" "}
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  국립해양
                  <br />
                  조사원
                  <br />
                  해상 근무자
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      국립해양 조사원 및 해양조사 사무소 측량과의 수로원 및 해양과의 해양원, 해양조사 및 측량(수심,
                      해저지형, 해안선 등), 해도 제작을 위해 연간 6개월 이상 해상 근무자
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>전파 감시직</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>중앙전파관리소, 전파관제과 요원</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  국가안보
                  <br />
                  통신요원
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>중앙 통신운용센터 근무요원</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○<br />
                  (2회){" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td rowSpan={2}>
                  철도
                  <br />
                  종사자
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>역무담당 역무원, 수송담당 역무원, 부기관사</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○<br />
                  (2회){" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>열차운용원(운전취급 및 신호기 조작), 차장</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○<br />
                  (1회){" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  철도 특별
                  <br />
                  사법 경찰관
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>철도 특별사법 경찰관</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○<br />
                  (2회){" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  소방학교
                  <br />
                  (간부후보생)
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>소방간부후보생으로 소방학교에 재학중인자</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>광부</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      채탄 및 일반광업소의 광부로서 갱내 종사자 <br /> * 간접부요원 제외
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td rowSpan={3}>
                  도시철도 및<br />
                  광역철도
                  <br />
                  특수근무자(지하철, 전철, 경전철 등)
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>관제사(사령원) : 운전, 신호, 전기</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○<br />
                  (2회){" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>역무원, 통신원, 설비원, 건축원, 신호원, 전기원</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○<br />
                  (2회){" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>차장, 검수원</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○<br />
                  (1회){" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>직업훈련 교수 및 교사</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      「국민 평생 근로자 직업능력 개발법」에 근거한 기능대학과 동법 제2조 제3호
                      <br />
                      가목의 규정에 의한 공공직업 훈련시설에 재직중인 교수(부/조교수 전임강사 포함) 및 교사 <br /> *
                      공공직업훈련시설 : 국가 및 지방 자치단체 또는 <br />
                      &nbsp;&nbsp;&nbsp;「국민 평생 직업능력 개발법 시행령」에서 정한 공공 단체가
                      &nbsp;&nbsp;&nbsp;직업능력 개발훈련을 실시하기 위하여 설치한 시설{" "}
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>직업훈련생</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      「국민 평생 직업능력 개발법」에 근거한 기능대학에 재학 중인 학생과 근로자 직업능력 개발법 제2조
                      제3호 가목의 규정에 의한 공공 직업훈련 시설에서 6개월 이상 교육과정 훈련생 <br /> * 「국민
                      평생직업능력 개발법」에 근거한 기능대학 학위과정에
                      <br />
                      &nbsp;&nbsp;&nbsp;재학 중인 학생은 제외{" "}
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>국방과학 연구직 및 기술직</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      국방과학연구소의 연구직 및 기술직, 한국 국방연구원 연구직 및 기술직, 국방기술 품질원의 연구직 및
                      기술직
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  선박, 어선
                  <br />
                  승선자
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      선박 및 어선 승선요원 <br /> * 지방해양수산청장, 지방해양경찰청장 발행 <br /> - 25톤이상 :
                      승무경력증명서 <br /> - 25톤이하 : 선원승선신고 사실확인서{" "}
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  지방해양수산청장, 지방해양경찰청장{" "}
                </td>
              </tr>
              <tr>
                <td rowSpan={2}>산불방지 헬기운용요원</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>산림청 예하 산림항공본부 및 산림항공관리소 승무원 및 정비사</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>산림청 예하 산림항공본부 및 산림항공관리소 방송통신사</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
              <tr>
                <td>
                  도로공사
                  <br />
                  근무요원
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>한국도로공사 교통정보센터(종합상황실) 근무요원</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ○{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  ×{" "}
                </td>
                <td className="bl" style={{ textAlign: "center" }}>
                  {" "}
                  소속장{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>{" "}
      <section className="section-box">
        <div>
          <h3 className="h3-tit">보류 절차</h3>
          <div className="mt20">
            <img
              src="/images/hold-step.svg"
              alt="보류절차는 STEP1 보류사유 발생,
							STEP2 인터넷 접속(예비군 홈페이지), STEP3 로그인, STEP4 훈련 보류 메뉴 선택, STEP5 보류해소 신청서 작성
							STEP6 훈련보류 증명서 제출, STEP7 보류타당성 판단(예비군 지휘관), STEP8 보류처리결과 통보 입니다."
            />
          </div>
        </div>
      </section>
    </SubLayout>
  );
}
