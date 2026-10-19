import SubLayout from "@/components/layout/SubLayout";

export default function StandingReserve() {
  return (
    <SubLayout title="상비예비군 제도">
      <section>
        <h4 className="cont-tit-h4"> • 상비예비군 제도란?</h4>
        <ul className="txt-list bl_hyphen mb45">
          <li>
            유사시 예비군으로 다수 충원되는 동원위주부대(동원사단, 동원보충대대, 동원자원호송단 등)에서
            <br /> 주요 직책을 수행하게 될 예비역(장교, 부사관, 병)을 평시에 소집 및 훈련시켜, 전시 동일한 직책으로
            <br /> 동원하여 즉시 임무수행이 가능하도록 운용하는 제도
          </li>
        </ul>
      </section>{" "}
      <section className="section-box">
        <h4 className="cont-tit-h4 mt0"> • 선발시기 및 절차</h4>
        <ul className="txt-list bl_hyphen">
          <li>
            자격요건 : 예비역인 장교, 준사관, 부사관, <strong>병</strong>
          </li>
          <span className="ml10">
            <strong>* 병사는 연차 구분 없이 만 40세까지 지원 가능</strong>
          </span>
          <br />
          <br />
          <li>선발시기</li>
          <table className="tbl type2">
            <caption>선발시기</caption>
            <colgroup>
              <col style={{ width: "14%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "14%" }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="row">절 차</th>
                <th className="bl" scope="row">
                  시 기
                </th>
                <th className="bl" scope="row">
                  기 타
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>선발 공고</td>
                <td rowSpan={2} className="bl">
                  1~8월(매년 수시)
                  <br />
                  9~10월(매년 정기)
                </td>
                <td rowSpan={2} className="bl">
                  {" "}
                  • 각 군 · 예비군 홈페이지
                  <br />
                  공고 및 지원서 교부 접수
                </td>
              </tr>
              <tr>
                <td>지원서 접수</td>
              </tr>
              <tr>
                <td>선발심사</td>
                <td className="bl">
                  수시 : 1~8월(필요시)
                  <br /> 정기 : 10월(연 1회)
                </td>
                <td className="bl"> • 선발기준 : 병과, 계급, 예비군 연차 등</td>
              </tr>
              <tr>
                <td>선발통보</td>
                <td className="bl">일정 고려</td>
                <td className="bl"> • 개별 통보 / 공고</td>
              </tr>
            </tbody>
          </table>
          <br />
          <li>운영부대 : 육 · 해 · 공군 · 해병대, 국직부대 중 선발공고부대</li>
          <span className="ml10">* 매년 인력운영계획에 따라 변동 가능</span>
        </ul>
      </section>{" "}
      <section className="section-box">
        <h4 className="cont-tit-h4 mt0"> • 훈련 (복무)기간 및 보상</h4>
        <ul className="txt-list bl_dot">
          <table className="tbl type2">
            <caption>훈련 (복무)기간 및 보상</caption>
            <colgroup>
              <col style={{ width: "14%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "14%" }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="row">구 분</th>
                <th className="bl" scope="row">
                  소집기간
                </th>
                <th className="bl" scope="row">
                  훈련 보상비
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  단기
                  <br />
                  상비예비군
                </td>
                <td className="bl">연 30일 이내 (15일 내외, 월 1~2회)</td>
                <td className="bl">평일 10만원, 휴일 15만원</td>
              </tr>
              <tr>
                <td>
                  장기
                  <br />
                  상비예비군
                </td>
                <td className="bl">
                  {" "}
                  연 180일 이내 (40일~180일 이내 선택) <br />
                  <span style={{ color: "red" }}>
                    <u>*개인사정에 따라 소집일수 선택가능</u>
                  </span>
                </td>
                <td className="bl">15만원 (평일 · 휴일 동일)</td>
              </tr>
            </tbody>
          </table>
        </ul>
      </section>{" "}
      <section className="section-box">
        <h4 className="cont-tit-h4 mt0 mb10"> • 훈련 (복무)시 혜택</h4>
        <div style={{ lineHeight: "200%" }}>
          {" "}
          - 본인에 한하여 연중 군 마트(PX) / 소속 부대 복지회관 이용 가능
          <br /> - 소집 기간 중 중식 제공, 소집 기간 중 부상 시 군 병원 진료 가능
          <br /> - 예비역 간부 진급 및 임용 희망시 가점 부여
          <br /> - 우수복무자는 예비군의 날 모범예비군 추천
          <br /> - 1년 단위 훈련(복무) 결과를 반영하여 재복무자 선발 시 우대{" "}
        </div>
      </section>{" "}
      <section className="section-box">
        <h4 className="cont-tit-h4 mt0 mb10"> • 연락 및 문의처</h4>
        <ul className="txt-list bl_hyphen">
          <li>자세한 사항, &apos;예비군 홈페이지&apos;의 알림마당 - 공지사항 - 모집공고문 참조</li>
          <span className="ml10">* (https://www.yebigun1.mil.kr) home&gt;알림마당&gt;공지사항 참조</span>
        </ul>
      </section>
    </SubLayout>
  );
}
