import SubLayout from "@/components/layout/SubLayout";

export default function Promotion() {
  return (
    <SubLayout title="예비역 간부 진급 및 임용 안내">
      <section>
        <h4 className="cont-tit-h4">1. 목적</h4>
        <ul className="txt-list bl_dot mb45">
          <li>전시 소요대비 부족한 동원 예비군 간부자원 확보</li>
          <li>예비역 간부의 사기 및 근무 의욕 증진</li>
        </ul>
      </section>{" "}
      <section className="section-box">
        <h4 className="cont-tit-h4 mt0">2. 방침</h4>
        <ul className="txt-list bl_dot">
          <li>상위 계급 임무수행 고려 장기복무자 우선 선발</li>
          <li>전역 당시 계급의 한단계 상위계급에 한하여 진급 및 임용 시행</li>
          <li>예비역 진급 및 임용자는 우선 동원지정하고 퇴역시까지 활용</li>
        </ul>
      </section>{" "}
      <section className="section-box">
        <h4 className="cont-tit-h4 mt0">3. 대상</h4>
        <ul className="txt-list bl_dot">
          <li>동원자원 : 최저복무기간과 연령기준을 충족하는 예비역</li>
        </ul>
        <table className="tbl type2">
          <caption>예비역 간부 진급 및 임용 대상</caption>
          <colgroup>
            <col style={{ width: "12.5%" }} />
            <col style={{ width: "12.5%" }} />
            <col style={{ width: "12.5%" }} />
            <col style={{ width: "12.5%" }} />
            <col style={{ width: "12.5%" }} />
            <col style={{ width: "12.5%" }} />
            <col style={{ width: "12.5%" }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="row">구분</th>
              <th className="bl" scope="row">
                병장→하사
              </th>
              <th className="bl" scope="row">
                하사→중사
              </th>
              <th className="bl" scope="row">
                중사→상사
              </th>
              <th className="bl" scope="row">
                중위→대위
              </th>
              <th className="bl" scope="row">
                대위→소령
              </th>
              <th className="bl" scope="row">
                소령→중령
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                복무기간
                <br />
                (현역+예비역)
              </td>
              <td className="bl">
                병장으로 2년
                <br />
                (예비역 1년차부터)
              </td>
              <td className="bl">하사로서 7년</td>
              <td className="bl">중사로서 12년</td>
              <td className="bl">중위로서 6년</td>
              <td className="bl">대위로서 7년</td>
              <td className="bl">소령으로서 7년</td>
            </tr>
            <tr>
              <td>연령</td>
              <td className="bl">만37세 이하</td>
              <td className="bl">만42세 이하</td>
              <td className="bl">만50세 이하</td>
              <td className="bl">만40세 이하</td>
              <td className="bl">만43세 이하</td>
              <td className="bl">만50세 이하</td>
            </tr>
          </tbody>
        </table>
        <div className="mb10"> * 기타 당해연도 진급 및 임용대상자 자격요건은 각 군 선발공고 참조 </div>
      </section>{" "}
      <section className="section-box">
        <h4 className="cont-tit-h4 mt0 mb10">4. 구비 서류</h4>
        <div style={{ lineHeight: "200%" }}>
          {" "}
          - (필수) 지원서 1부
          <br /> - (필수) 개인정보 수집・이용・제공 동의서 1부
          <br /> - (필수) 칼라사진(4cm*5cm, 최근 6개월 이내 촬영) 2매
          <br />
          <span className="ml10">* 인터넷 접수시 jpg파일로 제출</span>
          <br /> - (필수) 신체검사 검진결과
          <br />
          <span className="ml10">* 1차 서류 합격자에 해당</span>
          <br /> - (선택) 기타 전역 이후 받은 상훈 및 자격증 사본(해당자만)
          <br />
        </div>
      </section>{" "}
      <section className="section-box">
        <h4 className="cont-tit-h4 mt0">5. 심사</h4>
        <ul className="txt-list bl_dot">
          <li>1차 서류심사, 2차 신체검사</li>
        </ul>
      </section>{" "}
      <section className="section-box">
        <h4 className="cont-tit-h4 mt0">6. 선발절차 및 시기</h4>
        <ul className="txt-list bl_dot">
          <li>각 군 당해연도 선발 공고문 참조</li>
        </ul>
      </section>{" "}
      <section className="section-box">
        <h4 className="cont-tit-h4 mt0">7. 진급 및 임용 대상자 교육</h4>
        <ul className="txt-list bl_dot">
          <li>목표</li>
        </ul>
        <ul className="txt-list bl_hyphen mt0 ml10">
          <li>계급별 전시 임무수행능력 배양</li>
          <li>투철한 국가관 확립 및 안보의식 제고</li>
        </ul>
        <ul className="txt-list bl_dot">
          <li>교육기간 : 2박 3일</li>
        </ul>
      </section>{" "}
      <section className="section-box">
        <h4 className="cont-tit-h4 mt0">8. 명령발령 / 병적정리</h4>
        <ul className="txt-list bl_dot">
          <li>교육수료와 동시 발령하며, 장교는 국방부장관, 부사관은 참모총장이 임명장 수여</li>
          <li>각 군에서 대상자 명부를 병무청장에게 송부하고, 지방병무청장이 병적정리</li>
        </ul>
      </section>
    </SubLayout>
  );
}
