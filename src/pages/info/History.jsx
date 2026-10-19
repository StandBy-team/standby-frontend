import { useState } from "react";
import SubLayout from "@/components/layout/SubLayout";

const ERAS = [
  ["1960", "1969"],
  ["1970", "1979"],
  ["1980", "1989"],
  ["1990", "1999"],
  ["2000", "2009"],
  ["2010", "2019"],
  ["2020", "현재"],
];

export default function History() {
  const [era, setEra] = useState(0);

  return (
    <SubLayout title="연혁/활동" subText="대한민국 예비군의 연혁 정보입니다.">
      <ul className="history-list">
        {ERAS.map(([from, to], i) => (
          <li key={from} className={i === era ? "active" : undefined} style={{ marginRight: "4px" }}>
            <button type="button" onClick={() => setEra(i)} aria-pressed={i === era}>
              {from}~
              <br />
              {to}
            </button>
          </li>
        ))}
      </ul>
      {era === 0 && (
        <div className="history">
          <table>
            <caption>1960~1969년 대한민국 예비군 연혁/활동</caption>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">1961</th>
                <td className="his-date">12.27</td>
                <td>향토예비군설치법 제정 공포(총 6개 조항)</td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={14} scope="row">
                  1968
                </th>
                <td className="his-date">02.07</td>
                <td>박대통령, 경전선 개통식에서 250만 향군무장 천명</td>
              </tr>
              <tr>
                <td className="his-date">02.18</td>
                <td>향토예비군 조직을 위한 법령 제정 착수</td>
              </tr>
              <tr>
                <td className="his-date">02.20</td>
                <td>각의에서 향토예비군설치법 시행령 의결</td>
              </tr>
              <tr>
                <td className="his-date">03.01</td>
                <td>육군본부 병비국을 개편하여 예비군부로 개편</td>
              </tr>
              <tr>
                <td className="his-date">03.19</td>
                <td>각 구청 또는 경찰서에 대대본부 설치</td>
              </tr>
              <tr>
                <td className="his-date">03.31</td>
                <td>예비군편성 및 조직완료</td>
              </tr>
              <tr>
                <td className="his-date">04.01</td>
                <td>대전공설운동장에서 박대통령 임석하에 창설식</td>
              </tr>
              <tr>
                <td className="his-date">04.05</td>
                <td>전국지역 및 직장예비군에게 무기지급</td>
              </tr>
              <tr>
                <td className="his-date">05.07</td>
                <td>전북 고창지역에서 해안경비 종합시범(박대통령 임석)</td>
              </tr>
              <tr>
                <td className="his-date">05.29</td>
                <td>향토예비군설치법 개정 공포(전면기정:총 6개 조항16개 조항)</td>
              </tr>
              <tr>
                <td className="his-date">06.24</td>
                <td>공비 소탕작전에 최초로 참가(강원도 고성군 현내작전)</td>
              </tr>
              <tr>
                <td className="his-date">07.24</td>
                <td>국방부 인력차관보 산하에 예비군국 창설(예비군계획과, 동원관리과)</td>
              </tr>
              <tr>
                <td className="his-date">11.02</td>
                <td>
                  울진, 삼척지역 공비소탕작전 참가
                  <br />
                  &nbsp;&nbsp;- 120명의 무장공비 침투
                  <br />
                  &nbsp;&nbsp;- 울진, 양양, 봉화, 삼척지역의 예비군 동원
                  <br />
                  &nbsp;&nbsp;- 전과 : 공비 107명 사살, 7명 생포의 대전과를 올림{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">12.28 </td>
                <td>
                  예비군편성 및 조직완료
                  <br />
                  &nbsp;&nbsp;- 국무총리 훈령 제69호에 의거 대간첩작전에 동원되어 임무수행중 전사, 순직 및 상이를
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;입은 예비군에게 원호혜택을 부여{" "}
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={2} scope="row">
                  1969
                </th>
                <td className="his-date">03.01~03.31</td>
                <td>
                  전시동원체제와 향토예비군체제에 부함된 갑호부대(현 동원예비군)와 일반예비군 부대
                  <br /> (현 예비군)로 구분 편성{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">03.01~03.31</td>
                <td>강원도주문진, 경북 영일군 오포리 작전 등 대.소작전 참가 </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {era === 1 && (
        <div className="history">
          <table className="mt45">
            <caption>1970~1979년 대한민국 예비군 연혁/활동</caption>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th rowSpan={4} scope="row">
                  1970
                </th>
                <td className="his-date">02.28 </td>
                <td>
                  국방부 예비군국 조직 개편(운영과, 편성관리과) 및 운영과에서 재향군인회 업무담당
                  <br /> (대통령령 제4688호)
                </td>
              </tr>
              <tr>
                <td className="his-date">08.20</td>
                <td>
                  국방부 예비군국에 학생훈련과 신설(대학생군사교육담당), 편성관리과를 편성동원과로 변경하고
                  재향군인회담당 업무를 편성동원과로 조정
                  <br /> (대통령령 제5280호)
                </td>
              </tr>
              <tr>
                <td className="his-date">06.26</td>
                <td>
                  경기 부천 영흥동에 침투한 무장간첩 소탕작전에 참가 조정
                  <br /> (대통령령 제5280호)
                </td>
              </tr>
              <tr>
                <td className="his-date">08.30</td>
                <td>
                  향토예비군설치법 개정
                  <br />
                  &nbsp;&nbsp;- 직장보장 의무위반자 처벌조항 신설
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th scope="row">1971</th>
                <td className="his-date">03.04~05.05</td>
                <td>
                  제주도 및 전남 완도군 금당도 등 도서지역에 침투한 무장공비 소탕 작전에 참가하여 공비를 완전 소탕
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={2} scope="row">
                  1975
                </th>
                <td className="his-date">08.28</td>
                <td>
                  국방부 예비군국을 인력차관보 산하에서 관리차관보 산하로 변경하고, 동원예비군국으로 변경
                  <br /> (동원계획과,인력동원과,물자동원과 민사고,병비과)
                  <br /> (대통령령 제7769호)
                </td>
              </tr>
              <tr>
                <td className="his-date">09.01</td>
                <td>
                  전투 및 전력화 예비군 편성
                  <br />
                  &nbsp;&nbsp;- 전방지역, 수도지역, 후방지역별로 전력화부대를 편성(200-300명 기준)
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={2} scope="row">
                  1978
                </th>
                <td className="his-date">06.16</td>
                <td>공단을 단일직장 개념으로 통합공단예비군 편성제도 신설</td>
              </tr>
              <tr>
                <td className="his-date">12.16</td>
                <td>직장예비군 여단 최초로 발대(창원공단여단) </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th scope="row">1979</th>
                <td className="his-date">08.29</td>
                <td>
                  국방부 동원예비군국의 인력동원과를 폐지하고 업무는 동원계획과로 이관
                  <br /> (대통령령 제9579호)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {era === 2 && (
        <div className="history">
          <table className="tbl-ht01">
            <caption>1980~1989년 대한민국 예비군 연혁/활동</caption>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th rowSpan={3} scope="row">
                  1980
                </th>
                <td className="his-date">07</td>
                <td>행정구역 단위의 예비군조직으로 개편</td>
              </tr>
              <tr>
                <td className="his-date">11</td>
                <td>
                  예비군 적정수준 설정, 정예화 관리
                  <br />
                  &nbsp;&nbsp;- 예비군적정수준을 300만명으로 설정하고 34-35세 자원은 행정관리
                </td>
              </tr>
              <tr>
                <td className="his-date">12</td>
                <td>
                  향토예비군설치법 개정
                  <br />
                  &nbsp;&nbsp;- 예비군 임무보완 및 구역단위 작전지원체제 확립
                  <br />
                  &nbsp;&nbsp;- 무장소요 진압임무 추가/방위협의회 설치운영{" "}
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={4} scope="row">
                  1981
                </th>
                <td className="his-date">04.17</td>
                <td>
                  향토예비군설치법 시행령 일부 개정
                  <br />
                  &nbsp;&nbsp;- 직장예비군 편성기준.방위지원위원회 신설
                </td>
              </tr>
              <tr>
                <td className="his-date">07.01</td>
                <td>
                  향토예비군설치법 시행령 일부 개정
                  <br />
                  &nbsp;&nbsp;- 학군단 지휘계통으로 지휘관리하되 편성 및 자원관리는 병무청 계통 (읍, 명, 동)으로 관장
                  <br />
                  &nbsp;&nbsp;- 1, 3군지역 : 육군종합행정학교
                  <br />
                  &nbsp;&nbsp;- 2군지역 : 육군 전투병과 교육사령관 및 군관구 사령관, 해군 제2해역 사령관, 제6해역사령관
                </td>
              </tr>
              <tr>
                <td className="his-date">11.02</td>
                <td>
                  국방부 동원예비군국 조직변동(병비과-예비군과, 민사과-민사군정과)
                  <br /> ( 대통령령 제10530호)
                </td>
              </tr>
              <tr>
                <td className="his-date">12.31</td>
                <td>
                  향토예비군설치법 일부 개정
                  <br />
                  &nbsp;&nbsp;- 직장예비군지휘관에게 예비군무기, 탄약, 장비의 유지관리 위임
                  <br />
                  &nbsp;&nbsp;- 벌금, 형량을 현실에 맞게 상향조정
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th scope="row">1983</th>
                <td className="his-date">12.31</td>
                <td>
                  향토예비군설치법 일부 개정
                  <br />
                  &nbsp;&nbsp;- 예비군대원이 임무수행중이나 훈련중 상이를 입었을 때, 국가 및 지방자치단체의
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;의료시설에서 무료 가료를 받을 수 있도록 하고 민간의료시설 가료비용은 국가에서
                  부담토록 <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;조치
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={2} scope="row">
                  1985
                </th>
                <td className="his-date">01.01</td>
                <td>육군본부에 동원참모부 청설</td>
              </tr>
              <tr>
                <td className="his-date">06.13</td>
                <td>
                  향토예비군설치법시행규칙일부 개정
                  <br />
                  &nbsp;&nbsp;- 직장예비군부대 지휘관의 예비군무기, 탄약, 장비등의 관리 업무범위 규정
                  <br />
                  &nbsp;&nbsp;- 일반 직장예비군의 편성승인절차 규정 및 서식 보완
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={3} scope="row">
                  1986
                </th>
                <td className="his-date">07.14</td>
                <td>
                  향토예비군설치법 일부 개정
                  <br />
                  &nbsp;&nbsp;- 예비군편성대상자 중 고아, 사생아, 혼혈아, 질병자, 생계유지곤란자등 예비군 조직대상자에서{" "}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;제외
                  <br />
                  &nbsp;&nbsp;- 지역 및 직장의 방위지원위원회를 방위협의회로 개칭
                </td>
              </tr>
              <tr>
                <td className="his-date">12.23</td>
                <td>
                  향토예비군설치법 시행령 일부 개정
                  <br />
                  &nbsp;&nbsp;- 예비군대원이 신상 이동시에 평시 14일이내 전시사변 등에는 7일이내에 신고하도록 조치
                  <br />
                  &nbsp;&nbsp;- 현역입영 대상자로서 예비역장교 병적에 편입된 자는 예비군대원 신고대상에서 제외
                </td>
              </tr>
              <tr>
                <td className="his-date">12.31</td>
                <td>
                  향토예비군대원 복제령 개정
                  <br />
                  &nbsp;&nbsp;- 얼룩무늬 예비군복장을 현역군 전투복의 제식으로 개정
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={2} scope="row">
                  1987
                </th>
                <td className="his-date">03.10</td>
                <td>
                  향토예비군설치법시행규칙 일부 개정
                  <br />
                  &nbsp;&nbsp;- 예비군지휘관 임명자격 기준을 육군의 보병, 포병, 기갑, 공병, 통신에 한하던 것을
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;정보병과를 추가
                </td>
              </tr>
              <tr>
                <td className="his-date">05.06</td>
                <td>
                  향토예비군설치법시행령 일부 개정
                  <br />
                  &nbsp;&nbsp;- 예비군의 명칭을 동원예비군은 제1전투군으로, 일반예비군은 지역전투군으로 변경
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={2} scope="row">
                  1988
                </th>
                <td className="his-date">02.02</td>
                <td>
                  예비역의 진급 및 장교 임용에 관한 규정 개정
                  <br />
                  &nbsp;&nbsp;- 예비역의 진급 및 장교임용에관한 규정을 대통령령으로 제정
                </td>
              </tr>
              <tr>
                <td className="his-date">03.01</td>
                <td>
                  예비군 연한제 교육훈련 실시
                  <br />
                  &nbsp;&nbsp;- 예비군 창설당시 예비군 복무연령제에 의한 교육훈련제도를 예비군 복무연한제에 의한
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;교육훈련제도로 개선
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={2} scope="row">
                  1989
                </th>
                <td className="his-date">04.25</td>
                <td>백령도 여자예비군소대 창설</td>
              </tr>
              <tr>
                <td className="his-date">12.30</td>
                <td>
                  향토예비군설치법 개정
                  <br />
                  &nbsp;&nbsp;- 지역예비군중대 편성을 2,000명 이상 자원보유시에는 1개중대를 추가편성토록 하던 것을
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;자원수 관계없이 읍.면.동 행정구역단위 중대로 편성
                  <br />
                  &nbsp;&nbsp;- 예비군 조직대상에 있어서 예비역의 병 및 보충역의 부사관.병의 복무연령을 35세에서
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;33세로 단축{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {era === 3 && (
        <div className="history">
          <table className="tbl-ht01">
            <caption>1990~1999년 대한민국 예비군 연혁/활동</caption>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">1991</th>
                <td className="his-date">04.06</td>
                <td>대청도 여자예비군소대 창설</td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th scope="row">1992</th>
                <td className="his-date">09.01</td>
                <td>대학직장예비군 지휘관리체제를 각 지역의 수임군부대에서 관장토록 조정</td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={3} scope="row">
                  1994
                </th>
                <td className="his-date">01.01</td>
                <td>
                  예비군 복무제도 개선시행(향토예비군설치법 개정, 1993.12.31)
                  <br />
                  &nbsp;&nbsp;- 예비역 및 보충역 병의 예비군 복무를 33세까지의 복무연령제에서 군 복무후 8년차까지의
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;복무연한제로 개선
                  <br />
                  &nbsp;&nbsp;- 제1 및 지역전투군의 구분을 폐지하고 복무연차 구분 없이 동원지정자 동원예비군, <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;동원미지정자는 예비군으로 복무구분정리
                </td>
              </tr>
              <tr>
                <td className="his-date">06.22</td>
                <td>예비군대원 거주지 이동신고를 주민등록 전입신고로 갈음</td>
              </tr>
              <tr>
                <td className="his-date">12.22</td>
                <td>전역후 신규편성대상자 우편신고제도 마련</td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={3} scope="row">
                  1995
                </th>
                <td className="his-date">03.10</td>
                <td>
                  육군 동원참모부가 해체되고 &apos;처&apos;급으로 규모가 축소되면서 정작참모부 동원예비군처(3개과)로
                  <br /> 편성되었고, 병력/인력동원은 인사참모부, 물자동원은 군수참모부로, 예비군교육훈련은 교육사로,
                  예비군특별감사는 국방부로 기능별 업무이관
                </td>
              </tr>
              <tr>
                <td className="his-date">04.06</td>
                <td>창원시 반림동대 여자예비소대 창설</td>
              </tr>
              <tr>
                <td className="his-date">04.12</td>
                <td>국방부 동원국의 동원계획과를 동원기획과로 개편</td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th scope="row">1997</th>
                <td className="his-date">01.01</td>
                <td>
                  육군동원참모부가 해체되면서 기능별로 이관되었던 병력 및 물자동원 업무가 정작참모부
                  <br /> 동원예비군처로 재통합
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th scope="row">1998</th>
                <td className="his-date">11.01</td>
                <td>
                  육군교육사로 이관되었던 육군예비군 훈련기능이 정작참모부동원처 동원훈련과로 재통합
                  <br /> (4개과:동원계획과, 동원과, 조직운영과,훈련과)
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th scope="row">1999</th>
                <td className="his-date">01.01</td>
                <td>
                  예비군훈련제도 개선
                  <br />
                  &nbsp;&nbsp;※ 1-4년차 : 동원예비군, 5-8년차 : 일반예비군
                  <br />
                  &nbsp;&nbsp;※ 1년차 : 소집점검 4시간
                  <br />
                  &nbsp;&nbsp;※ 2-4년차 동원지정자 : 3박4일(34시간)
                  <br />
                  &nbsp;&nbsp;※ 2-4년차 동원미지정자 : 동원훈련 II형 4일(32시간), 작계훈련 2회(12시간)
                  <br />
                  &nbsp;&nbsp;※ 5-7년차 : 기본훈련 1일(8시간)
                  <br />
                  &nbsp;&nbsp;※ 8년차 : 훈련면제
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {era === 4 && (
        <div className="history">
          <table className="tbl-ht01">
            <caption>2000~2010년 대한민국 예비군 연혁/활동</caption>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th rowSpan={2} scope="row">
                  2001
                </th>
                <td className="his-date">01.01</td>
                <td>
                  예비군지휘관 선발제도 개선
                  <br />
                  &nbsp;&nbsp;※ 필기시험과목 추가 : 통합방위법
                  <br />
                  &nbsp;&nbsp;※ 현역복무 실적반영 : 전역일 기준 최근 5년
                  <br />
                  &nbsp;&nbsp;※ 전산자격증 소지자 가산점 부여
                </td>
              </tr>
              <tr>
                <td className="his-date">08.10</td>
                <td>향토예비군 육성.지원에 관한 규칙 제정 공포 : 국방부령제529호</td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th scope="row">2002</th>
                <td className="his-date">01.01</td>
                <td>
                  동미참/기본훈련 참가자 중식비 증액지급
                  <br />
                  &nbsp;&nbsp;※ 도시지역 1,500원, 농촌지역 2,000원을 1인 2,000원
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={3} scope="row">
                  2003
                </th>
                <td className="his-date">01.01</td>
                <td>동미참/기본훈련 참가자 중식비 증액지급 : 1인 2,500원</td>
              </tr>
              <tr>
                <td className="his-date">01.01</td>
                <td>
                  예비군급식방법 개선
                  <br />
                  &nbsp;&nbsp;※ 부대급식(25개부대),훈련용식량급식(165개부대), 기존방법적용(21개부대)
                </td>
              </tr>
              <tr>
                <td className="his-date">01.01</td>
                <td>
                  예비군 부상/사망시 보상 제도 개선
                  <br />
                  &nbsp;&nbsp;※ 휴업보상금 지급율 인상(60%에서 70%로)
                  <br />
                  &nbsp;&nbsp;※ 보상금 신청 제출서류 5개로 간소화(3개 삭제)
                  <br />
                  &nbsp;&nbsp;※ 군사령부 보상금 심사기준 1주로 단축
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={2} scope="row">
                  2004
                </th>
                <td className="his-date">01.01</td>
                <td>
                  예비군 훈련 제도 개선
                  <br />
                  &nbsp;&nbsp;※ 훈련면제 대상 조정 : 8년차 → 7, 8년차
                  <br />
                  &nbsp;&nbsp;※ 1년차 동원훈련 대상자 포함
                  <br />
                  &nbsp;&nbsp;※ 동원훈련 기간 단축 : 3박 4일 → 2박 3일
                  <br />
                  &nbsp;&nbsp;※ 쌍용훈련은 3박 4일
                  <br />
                  &nbsp;&nbsp;※ 동미참 훈련 일정 단축 : 4일 → 3일
                  <br />
                  &nbsp;&nbsp;※ 동미참 / 기본훈련 훈련보상비 증액
                  <br />
                  &nbsp;&nbsp;※ 1인 2,500원 → 3,000원
                  <br />
                  &nbsp;&nbsp;※ 예비군 귀국 신고제도 폐지
                  <br />
                  &nbsp;&nbsp;※ 대학직장 예비군 지휘관 전담제 시행{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">12.31</td>
                <td>
                  예비군법 개정
                  <br />
                  &nbsp;&nbsp;※ 직장예비군부대 해체할 수 있는 근거 명시
                  <br />
                  &nbsp;&nbsp;※ 의무소방대원 복무 만료시 소방방재청장이 병부청장에게 통보
                  <br />
                  &nbsp;&nbsp;※ 신고에 의한 주민등록 말소자 처벌 근거 마련
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th scope="row">2005</th>
                <td className="his-date">01.01</td>
                <td>
                  동원훈련 입소여비 지급방법 개선
                  <br />
                  &nbsp;&nbsp;※ 우편 대체 계좌 입금 → 훈련퇴소시 부대 직접 지급
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th scope="row">2006</th>
                <td className="his-date">01.01</td>
                <td>예비군부대지휘관 선발시험 시행규칙 제정(법제화)</td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th scope="row">2007</th>
                <td className="his-date">01.01</td>
                <td>자율참여형 동원훈련시행 </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={4} scope="row">
                  2009
                </th>
                <td className="his-date">01.01</td>
                <td>
                  현역복무부대 재입영훈련 시험(5개 부대)
                  <br /> 동원훈련 불참간부 재입영훈련 전군 확대
                  <br /> 전국단위 예비군훈련 입소제도 개선
                  <br /> 예비군 훈련실비 증액지급
                  <br />
                  &nbsp;&nbsp;- 동원훈련 여비 : 92.55원 → 95.33원/km당
                  <br />
                  &nbsp;&nbsp;- 일반훈련 실비 : 7,000원 교통비(2,000원 → 3,000원), 중식비(4,000원)
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">03</td>
                <td>성과위주 측정성 합격제 훈련시행</td>
              </tr>
              <tr>
                <td className="his-date">11.12</td>
                <td>
                  「예비군부대 지휘관 선발에 관한 규칙」전면개정(국방부령 제696호)
                  <br />
                  &nbsp;&nbsp;- 신분변경 : 별정군무원 -&gt; 일반계약군무원
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">11.30</td>
                <td>
                  향토예비군설치법 시행령 일부개정(대통령령 제21859호)
                  <br />
                  &nbsp;&nbsp;- 지역예비군부대의 지휘제대에 지역대 신설
                  <br />
                  &nbsp;&nbsp;- 휴일 및 전국단위 훈련 신청절차 명시
                  <br />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {era === 5 && (
        <div className="history">
          <table className="tbl-ht01">
            <caption>2010년~2019년 대한민국 예비군 연혁/활동</caption>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th rowSpan={4} scope="row">
                  2010
                </th>
                <td className="his-date">01.01</td>
                <td>예비군 안보교육 전문강사 활용 전국 확대 </td>
              </tr>
              <tr>
                <td className="his-date">03.02</td>
                <td>
                  예비군훈련 실비 인상
                  <br />
                  &nbsp;&nbsp;- 동원훈련 : 보상비 5,000원, 여비 100.88원/Km당
                  <br />
                  &nbsp;&nbsp;- 일반훈련 : 9,000원(중식비 5,000원, 교통비 : 4,000원)
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">05.28</td>
                <td>
                  예비전력관리 업무담당자 인사관리훈령 일부 개정 (국방부훈령 1246호)
                  <br />
                  &nbsp;&nbsp;- 지역예비군중대장(별정직5급) 근무상한연령을 연차적으로(3년단위) 60세까지 연장
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">12.30</td>
                <td>
                  예비전력관리 업무담당자 인사관리훈령 일부 개정(국방부훈령 제1298호)
                  <br />
                  &nbsp;&nbsp;- 직장예비군지휘관 근무상한연령을 연차적(3년단위)으로 60세까지 연장
                  <br />
                  &nbsp;&nbsp;- 직장예비군지휘관 노동조합 가입 금지 규정 신설
                  <br />
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={3} scope="row">
                  2011
                </th>
                <td className="his-date">01.01</td>
                <td>
                  기초생활수급자 예비군훈련 전면 보류
                  <br /> 직장예비군지휘관 근무상한연령 연장
                  <br />
                  &nbsp;&nbsp;- 직장예비군 중대장 : 55세 ⇒ 60세
                  <br />
                  &nbsp;&nbsp;- 직장예비군 대대장 : 58세 ⇒ 60세
                  <br /> 예비군소대에 저격수 편성
                  <br /> 특전예비군부대 창설
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">03.02</td>
                <td>
                  향토예비군설치법시행령 전부 개정(대통령령 제22687호)
                  <br />
                  &nbsp;&nbsp;- 사망보상금의 최저 기준액을 중사 1호봉에서 상사 18호봉으로 상향 조정
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">05.19</td>
                <td>
                  향토예비군설치법 일부 개정(법률 제10650호)
                  <br />
                  &nbsp;&nbsp;- 거주불명등록자 처벌 조항 근거 마련
                  <br />
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th scope="row">2012</th>
                <td className="his-date">01.01</td>
                <td>
                  예비군훈련 실비 인상
                  <br />
                  &nbsp;&nbsp;- 동원훈련 : 보상비 5,000원, 여비 107.84원/Km 당 <br />
                  &nbsp;&nbsp;- 일반훈련 : 5,000원 → 6,000원(1,000원 인상)
                  <br />
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={2} scope="row">
                  2013
                </th>
                <td className="his-date">01.01</td>
                <td>
                  예비군지휘관 복무지침 개정
                  <br />
                  &nbsp;&nbsp;- 거주지침 현실화 등 : 관할 읍·면·동 → 수임군부대 작전관할구역 <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">02.20</td>
                <td>
                  예비군대원을 시·군·자치구내 인접지역의 부대로 편성 가능
                  <br />
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={10} scope="row">
                  2014
                </th>
                <td className="his-date">01.01</td>
                <td>
                  예비군지휘자 편성·운영 지침 하달 <br />
                  소집점검훈련 교통비 최초 지급(5천원) <br />
                  권역화 동원지정제도 시험확대 실시{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">01.16</td>
                <td>
                  예비군 육성·지원에 관한 규칙 개정
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">02.01</td>
                <td>
                  간부예비군 비상근복무제도 시험운영
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">03.06</td>
                <td>
                  공인전자주소(#메일) 활용 예비군 훈련 소집통지서 발송
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">03.11</td>
                <td>
                  예비군대원 이동 중 재해 보상근거 마련을 위한 향토예비군 설치법 개정
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">05.21</td>
                <td>
                  예비전력관리 군무원 직종통합을 위한 군무원 인사법 개정
                  <br />
                  &nbsp;&nbsp;- 일반직·별정직·계약직 → 일반직 군무원
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">06.30</td>
                <td>
                  국방동원정보체계 4단계 개발사업 착수
                  <br />
                  &nbsp;&nbsp;- 성능개선 및 능력분석 모드 개발(모의모델)
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">10.15</td>
                <td>
                  병력동원훈련 기피자 벌금 상향을 위한 향토예비군 설치법 개정
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">11.28</td>
                <td>
                  최초 여성 예비군지휘관 선발(직장연대장)
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">12.30</td>
                <td>
                  국회의원도 훈련받도록 향토예비군 설치법 개정
                  <br />
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={3} scope="row">
                  2015
                </th>
                <td className="his-date">01.01</td>
                <td>
                  예비군훈련 시 전 부대 M16 소총 활용 <br />
                  휴일 및 전국단위훈련 신청 방법 개선 &nbsp;&nbsp;- 훈련부과 이전에 훈련신청 가능토록 개선
                  <br /> 자율참여형 성과위주 예비군훈련 시행(조기 퇴소제도){" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">08.13</td>
                <td>
                  예비군교육훈련에 관한 훈령 개정
                  <br />
                  &nbsp;&nbsp;- 개인화기사격에 대한 안전대책 강구
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">12.22</td>
                <td>
                  향토예비군설치법 시행령 개정
                  <br />
                  &nbsp;&nbsp;- 지자체장 등 사회지도층에 해당하는 직종을 훈련받도록 개정
                  <br />
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={5} scope="row">
                  2016
                </th>
                <td className="his-date">01.01</td>
                <td>
                  법령, 훈령, 지침 개정사항
                  <br />
                  &nbsp;&nbsp;- 예비군 훈련참가, 훈련종료 복귀중인 예비군에 대해 보상 및 치료 보장 적용
                  <br />
                  &nbsp;&nbsp;&nbsp;(기존에는 훈련 중인 예비군만 보장)
                  <br />
                  &nbsp;&nbsp;&nbsp;* 향토예비군설치법 제9조(보상 및 치료)
                  <br />
                  &nbsp;&nbsp;- 예비군대원의 훈련관련 학업보장 적용
                  <br />
                  &nbsp;&nbsp;&nbsp;* 향토예비군설치법 제10의 2(예비군 동원 또는 훈련관련 학업보장)
                  <br /> 국회의원, 지방의회의원 등 4개 대상 예비군훈련 부과 <br />
                  해외체류자 보류기준 상향(180일 이상 → 365일 이상) 적용{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">04.01</td>
                <td>
                  예비전력관리 업무담당자 인사관리훈령 개정
                  <br />
                  &nbsp;&nbsp;- 신규합격자 명부등록, 정기전보시 계약군무원 경력인정 등<br />
                </td>
              </tr>
              <tr>
                <td className="his-date">05.29</td>
                <td>
                  예비군법 명칭 개정
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">11.30</td>
                <td>
                  예비군법 시행령, 시행규칙 용어 개정
                  <br />
                  &nbsp;&nbsp;- 향토방위 → 국가방위 또는 지역방위
                  <br />
                </td>
              </tr>
              <tr>
                <td className="his-date">6월 ~ 12월</td>
                <td>
                  예비군소대 표준화(1/45명) 편성 시험
                  <br />
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th scope="row">2017</th>
                <td className="his-date">01.01</td>
                <td>
                  예비군훈련 참가자 보상비 증액
                  <br />
                  &nbsp;&nbsp;- 동원훈련 : 7천원 → 1만원, 일반훈련(교통비) : 6천원 → 7천원
                  <br /> 지역예비군 소대장 수당 증액, 부중대장 수당 반영
                  <br />
                  &nbsp;&nbsp;- 소대장(반기) : 5만원 → 6.5만원, 부중대장(반기) : 6.5만원
                  <br /> 5~6년차 병 동원 미지정에 따른 소집점검훈련 폐지
                  <br /> 예비전력관리 7급 군무원 근속승진(7급 → 6급){" "}
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={2} scope="row">
                  2018
                </th>
                <td className="his-date">01.01</td>
                <td>
                  동원훈련 보상비 증액 : 1만원 → 1.6만원 <br />
                  과학화예비군훈련장 운영 : 5개소{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">03.20</td>
                <td>
                  예비전력관리 업무담당자 인사관리 훈령 일부개정(국방부훈령 2143호) <br />
                  &nbsp;&nbsp;- 선발 필기시험 시행 및 출제·평가 지원의 근거 마련 등 <br />
                  예비전력관리 업무담당자 선발 규칙(국방부령 제967호) <br />
                  &nbsp;&nbsp;- 7년 이상 복무한 예비역 또는 퇴역 부사관의 7급 응시자격 부여 등{" "}
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={2} scope="row">
                  2019
                </th>
                <td className="his-date">01.01</td>
                <td>
                  동원훈련 보상비 증액 : 1.6만원 → 3.2만원 <br />
                  과학화예비군훈련장 운영 : 6개소{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">01.25</td>
                <td>
                  예비전력관리 업무담당자 인사관리 훈령 일부개정(국방부훈령 2253호) <br />
                  &nbsp;&nbsp;- 동원전력사령부 창설 관련, 관할 내 보직권 및 인사위원회 등 근거 마련 등{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {era === 6 && (
        <div className="history">
          <table className="tbl-ht01">
            <caption>2020년~현재까지 대한민국 예비군 연혁/활동</caption>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th rowSpan={4} scope="row">
                  2020
                </th>
                <td className="his-date">01.01</td>
                <td>
                  코로나로 인해 예비군훈련 중지 <br />
                  예비군훈련 참가비 증액 <br />
                  &nbsp;&nbsp;- 동원훈련 보상비 : 3.2만원 → 4.2만원, 급식비 : 6천원 → 7천원 <br />
                  &nbsp;&nbsp;- 동미참훈련/기본훈련 교통비 : 7천원 → 8천원 <br />
                  과학화예비군훈련장 운영 : 11개소{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">02.19</td>
                <td>
                  예비전력관리 업무담당자 인사관리 훈령 일부개정(국방부훈령 2402호) <br />
                  &nbsp;&nbsp;- 직장예비군지휘관 전보 시 직장 구분(일반, 대학) 폐지 등{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">07.15</td>
                <td>
                  예비전력관리 업무담당자 선발 규칙(국방부령 제1028호) <br />
                  &nbsp;&nbsp;-응시자격에 육군 인사과 지휘관 직위 경력자 포함 등{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">12.30</td>
                <td>
                  예비전력관리 업무담당자 인사관리 훈령 일부개정(국방부훈령 2506호) <br />
                  &nbsp;&nbsp;- 6급 이하 보직의 통합 운용 근거 마련 등{" "}
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={2} scope="row">
                  2021
                </th>
                <td className="his-date">01.01</td>
                <td>
                  코로나로 인해 예비군훈련 중지 <br />
                  동원훈련 보상비 증액 : 4.2만원 → 4.7만원 <br />
                  과학화예비군훈련장 운영 : 15개소{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">12.31</td>
                <td>
                  예비전력관리 업무담당자 선발 규칙(국방부령 제1078호) <br />
                  &nbsp;&nbsp;- 예비역 또는 퇴역 부사관의 7급 응시자격 변경(현역복무기간 7년 이상 → 6년 이상) 등{" "}
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={3} scope="row">
                  2022
                </th>
                <td className="his-date">01.01</td>
                <td>
                  후반기부터 훈련 재개 <br />
                  &nbsp;&nbsp;※ 모든 훈련에 대해 1일 8시간만 부과 <br />
                  동원훈련 보상비 증액 : 4.7만원 → 6.2만원 <br />
                  과학화예비군훈련장 운영 : 17개소{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">02.09</td>
                <td>
                  예비전력관리 업무담당자 인사관리 훈령 일부개정(국방부훈령 2630호) <br />
                  &nbsp;&nbsp;- 다른 유형의 예비전력관리기구 간 전보 기준 명확화 등{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">08.09</td>
                <td>
                  예비전력관리 업무담당자 선발 규칙(국방부훈령 1094호) <br />
                  &nbsp;&nbsp;- 장교 또는 부사관의 경우 장기복무 여부 및 의무복무기간 만료 여부와 관계없이 현역에서 6년
                  이상 복무하면 응시자격 부여 등{" "}
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={2} scope="row">
                  2023
                </th>
                <td className="his-date">01.01</td>
                <td>
                  코로나로 인한 훈련중지 이후 예비군훈련 정상 시행 <br />
                  예비군훈련 참가비 증액 <br />
                  &nbsp;&nbsp;- 동원훈련 보상비 : 6.2만원 → 8.2만원, 급식비 : 7천원 → 8천원 <br />
                  과학화예비군훈련장 운영 : 23개소{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">03.03</td>
                <td>
                  예비전력관리 업무담당자 인사관리 훈령 일부개정(국방부훈령 2775호) <br />
                  &nbsp;&nbsp;- 예비전력관리군무원과 직장예비군지휘관 인사위원회를 별도로 규정 등{" "}
                </td>
              </tr>
              <tr>
                <td className="line" colSpan={3}></td>
              </tr>
              <tr>
                <th rowSpan={3} scope="row">
                  2024
                </th>
                <td className="his-date">01.01</td>
                <td>과학화예비군훈련장 운영 : 26개소 </td>
              </tr>
              <tr>
                <td className="his-date">05.08</td>
                <td>
                  예비전력관리 업무담당자 선발 규칙(국방부령 제1150호) <br />
                  &nbsp;&nbsp;- 6급 이하 선발시험 응시가능 계급 확대(대위 → 위관급 장교) 등{" "}
                </td>
              </tr>
              <tr>
                <td className="his-date">09.09</td>
                <td>
                  예비전력관리 업무담당자 인사관리 훈령 일부개정(국방부훈령 2971호) <br />
                  &nbsp;&nbsp;- 전보 활성화(전보 대상 확대, 보직 연장기간 축소), 일·가정 양립지원 확대 등{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </SubLayout>
  );
}
