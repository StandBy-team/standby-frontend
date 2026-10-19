import { useState } from "react";
import PopupLayout from "@/components/layout/PopupLayout";
import PopupTabs from "@/components/layout/PopupTabs";
import { fetchOfficerPromotion } from "@/api/services/training";
import useApi from "@/hooks/useApi";

const TABS = ["소개", "지원서 작성", "지원 확인", "합격자 안내"];
const BRANCHES = ["육군", "해군", "공군"];

const pad = (n) => String(n).padStart(2, "0");

// "2026-03-10T09:00:00" -> "2026년 03월 10일 09:00:00"
const formatDateTime = (value) => {
  const d = new Date(value);
  return `${d.getFullYear()}년 ${pad(d.getMonth() + 1)}월 ${pad(d.getDate())}일 ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

function ApplyPeriod({ period }) {
  return (
    <div style={{ lineHeight: "140%" }}>
      <span style={{ fontWeight: "bold" }}>* 인터넷 접수 기간 :</span>{" "}
      {period && `${formatDateTime(period.start)} 부터 ${formatDateTime(period.end)} 까지`}
    </div>
  );
}

export default function OfficerPromotionPopup() {
  const [branch, setBranch] = useState(0);
  const { data } = useApi((opts) => fetchOfficerPromotion(opts), []);
  const periods = data?.applyPeriods;

  return (
    <PopupLayout title="예비역 간부 진급 및 임용">
      <div className="promotion-tab tab-style1">
        <PopupTabs tabs={TABS} />
        <div className="tab_cts">
          <div className="details last">
            <ul>
              <li>
                현 예비역 간부 진급 및 임용 안내는{" "}
                <span className="txt-red b">
                  홈페이지 공지사항의 각 군 공고문과 내용 상이시 각 군 공고문을 우선으로 함
                </span>
                으로 인지해 주시기 바랍니다.
              </li>
              <li>
                <span className="txt-red b">
                  예비역 소령으로 진급한 자는 예비전력관리 업무 담당자 선발 시험 중 7급 군무원에 응시할 수 없음
                </span>
                을 알려드립니다.
              </li>
              <li>
                <span className="txt-red b">예비역 진급 및 임용은 1회만 가능하며, 진급 및 임용 이후 취소는 불가</span>
                합니다.
              </li>
            </ul>
          </div>
          <div className="pop-stit-wrap">
            <p className="pop-tit1 fl">1. 선발절차(26년 기준)</p>
          </div>
          <div>
            <table className="tbl type2">
              <caption>예비역 간부 진급 및 임용 선발절차</caption>
              <thead>
                <tr>
                  <th scope="col">
                    ①선발공고 및 서류접수
                    <br />
                    <span style={{ fontWeight: "normal" }}>(3.10. ~ 4.3.)</span>
                  </th>
                  <th scope="col">
                    ②서류선발 심사
                    <br />
                    <span style={{ fontWeight: "normal" }}>(4 ~ 5월)</span>
                  </th>
                  <th scope="col">
                    ③신체검사
                    <br />
                    <span style={{ fontWeight: "normal" }}>(6.8. ~ 6.26.)</span>
                  </th>
                  <th scope="col">
                    ④진급 및 임용대상자 교육
                    <br />
                    <span style={{ fontWeight: "normal" }}>(8 ~ 9월)</span>
                  </th>
                  <th scope="col">
                    ⑤진급 및 임용행사
                    <br />
                    <span style={{ fontWeight: "normal" }}>(임용기준일 : 26. 9. 30.)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>인터넷 예비군홈페이지 또는 예비군앱에서 접수</td>
                  <td>
                    {" "}
                    각 군별 심사
                    <br /> - 합격자 공고 : 6.5. (금)
                    <br /> * 향후 여건에 따라 변동 가능{" "}
                  </td>
                  <td>
                    {" "}
                    국민건강보험 관리공단 지정 민간병원
                    <br /> - 합격자 공고 : 7.3. (금){" "}
                  </td>
                  <td>
                    각 군 교육기관
                    <br />
                    <span>(2박3일, 28H)</span>
                  </td>
                  <td>교육 수료자 대상 실시</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pop-stit-wrap" style={{ marginTop: "25px" }}>
            <p className="pop-tit1 fl">2. 지원자격 및 선발인원</p>
          </div>
          <div className="army-tab tab-style1-small">
            <ul className="tab_btn">
              {BRANCHES.map((label, i) => (
                <li key={label} className={i === branch ? "on" : undefined}>
                  <button type="button" onClick={() => setBranch(i)}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            {branch === 0 && (
              <div className="tab_cts">
                <ApplyPeriod period={periods?.[0]} />
                <br />
                <table className="tbl type2">
                  <caption>선발계획(육군)</caption>
                  <colgroup>
                    <col style={{ width: "16%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">구분</th>
                      <th scope="col">병장 → 하사</th>
                      <th scope="col">하사 → 중사</th>
                      <th scope="col">중사 → 상사</th>
                      <th scope="col">중위 → 대위</th>
                      <th scope="col">대위 → 소령</th>
                      <th scope="col">소령 → 중령</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        최저복무기간
                        <br />
                        (현역+예비역)
                      </th>
                      <td>
                        병장으로 2년
                        <br />
                        <span style={{ fontSize: "11px" }}>(예비역 1년차부터)</span>
                      </td>
                      <td>하사로서 7년</td>
                      <td>중사로서 12년</td>
                      <td>중위로서 6년</td>
                      <td>대위로서 7년</td>
                      <td>소령으로서 7년</td>
                    </tr>
                    <tr>
                      <th scope="row">최종계급진급일자</th>
                      <td>25.12.31. 이전 전역</td>
                      <td>19.12.31 이전</td>
                      <td>14.12.31 이전</td>
                      <td>20.12.31 이전</td>
                      <td>19.12.31 이전</td>
                      <td>19.12.31 이전</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        진급후 3년이상
                        <br />
                        예비역복무가능자
                      </th>
                      <td>37세 까지</td>
                      <td>58세 까지</td>
                      <td>58세 까지</td>
                      <td>58세 까지</td>
                      <td>58세 까지</td>
                      <td>58세 까지</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {branch === 1 && (
              <div className="tab_cts">
                <ApplyPeriod period={periods?.[1]} />
                <br />
                <table className="tbl type2">
                  <caption>선발계획(해군)</caption>
                  <colgroup>
                    <col style={{ width: "16%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">구분</th>
                      <th scope="col">병장 → 하사</th>
                      <th scope="col">하사 → 중사</th>
                      <th scope="col">중사 → 상사</th>
                      <th scope="col">중위 → 대위</th>
                      <th scope="col">대위 → 소령</th>
                      <th scope="col">소령 → 중령</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        최저복무기간
                        <br />
                        (현역+예비역)
                      </th>
                      <td>
                        병장으로 2년
                        <br />
                        <span style={{ fontSize: "11px" }}>(예비역 1년차부터)</span>
                      </td>
                      <td>하사로서 7년</td>
                      <td>중사로서 12년</td>
                      <td>중위로서 6년</td>
                      <td>대위로서 7년</td>
                      <td>소령으로서 7년</td>
                    </tr>
                    <tr>
                      <th scope="row">최종계급진급일자</th>
                      <td>25.12.31. 이전 전역</td>
                      <td>19.12.31 이전</td>
                      <td>14.12.31 이전</td>
                      <td>20.12.31 이전</td>
                      <td>19.12.31 이전</td>
                      <td>19.12.31 이전</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        진급후 3년이상
                        <br />
                        예비역복무가능자
                      </th>
                      <td>37세 까지</td>
                      <td>42세 까지</td>
                      <td>50세 까지</td>
                      <td>40세 까지</td>
                      <td>43세 까지</td>
                      <td>50세 까지</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {branch === 2 && (
              <div className="tab_cts">
                <ApplyPeriod period={periods?.[2]} />
                <br />
                <table className="tbl type2">
                  <caption>선발계획(공군)</caption>
                  <colgroup>
                    <col style={{ width: "16%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "14%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">구분</th>
                      <th scope="col">병장 → 하사</th>
                      <th scope="col">하사 → 중사</th>
                      <th scope="col">중사 → 상사</th>
                      <th scope="col">중위 → 대위</th>
                      <th scope="col">대위 → 소령</th>
                      <th scope="col">소령 → 중령</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="left" scope="row">
                        최저복무기간
                        <br />
                        (현역+예비역)
                      </th>
                      <td>
                        병장으로 2년
                        <br />
                        <span style={{ fontSize: "11px" }}>(예비역 1년차부터)</span>
                      </td>
                      <td className="left">하사로서 7년</td>
                      <td className="left">중사로서 12년</td>
                      <td className="left">중위로서 6년</td>
                      <td className="left">대위로서 7년</td>
                      <td>소령으로서 7년</td>
                    </tr>
                    <tr>
                      <th className="left" scope="row">
                        최종계급진급일자
                      </th>
                      <td>25.12.31. 이전 전역</td>
                      <td className="left">19.12.31 이전</td>
                      <td className="left">14.12.31 이전</td>
                      <td className="left">20.12.31 이전</td>
                      <td className="left">19.12.31 이전</td>
                      <td>19.12.31 이전</td>
                    </tr>
                    <tr>
                      <th className="left" scope="row">
                        진급후 3년이상
                        <br />
                        예비역복무가능자
                      </th>
                      <td className="left">37세 까지</td>
                      <td className="left">42세 까지</td>
                      <td className="left">50세 까지</td>
                      <td className="left">40세 까지</td>
                      <td className="left">43세 까지</td>
                      <td>50세 까지</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="details last">
            <span className="mt5 b">
              * 재복무 전역한 사람은 재복무 이전 최종계급 또는 재복무시의 최종계급으로 진급 지원 가능
            </span>
            <br />
            <br />
            <ul>
              <li>
                <em>지원자격 제한</em>
                <br /> - 예비역 신분 부적합자(퇴역 등)
                <br /> - 예비역 간부 진급 및 임용 계획에 의거 기진급 및 기임용된 자<br /> - 지원자격 기준
                미달자(최저복무기간 미경과 등)
                <br />
              </li>
            </ul>
            <ul>
              <li>
                <em>선발인원</em>
                <br /> - 전시 동원자원의 결원 고려 계급별・병과별로 각 군에서 산정{" "}
              </li>
            </ul>
          </div>
          <h3 className="s-title">3. 지원서 교부/접수</h3>
          <div className="details last">
            <ul>
              <li>
                <em>접수기간:</em> <span className="txt-blue b">홈페이지 공고(공지사항 참조)</span>
              </li>
              <li>
                <em>접수방법:</em>
                <ul>
                  <li>인터넷 접수(예비군 홈페이지 또는 예비군 모바일 앱)</li>
                </ul>
              </li>
            </ul>
          </div>
          <h3 className="s-title">4. 제출서류</h3>
          <div className="details">
            <table className="tbl type1">
              <caption>예비역 간부 진급 및 임용 지원시 제출 서류</caption>
              <colgroup>
                <col style={{ width: "250px;" }} />
                <col style={{ width: "80px;" }} />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">제출서류</th>
                  <th scope="col">수량</th>
                  <th scope="col">비고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bln">① (필수) 지원서</td>
                  <td>1부</td>
                  <td>• 인터넷 접수 시 온라인 작성</td>
                </tr>
                <tr>
                  <td className="bln">
                    ② (선택) 해당 병과 및 주특기 지정 자격증 및 전역 후 취득한 상훈 등(각군 선발공고 참조)
                  </td>
                  <td>1부</td>
                  <td>• 해당자만 제출</td>
                </tr>
                <tr>
                  <td className="bln">③ (필수) 신체검사 검진결과</td>
                  <td>1부</td>
                  <td>
                    <span className="txt-red b">• 1차 서류합격자에 한함</span>
                    <br /> • 국민건강관리공단 지정병원 수검자 : 우편제출
                    <br />
                    &nbsp;&nbsp;
                    <span className="txt-blue b">
                      *신체검사 결과지는 각 군 공고문을 참고하여, 기한내 결과지를 지원서 접수시 첨부 가능
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="s-title">5. 선발자통보</h3>
          <div className="details">
            <ul>
              <li>
                <em>1차통보</em> : <em>서류심사 합격자</em>에 한하여 예비군 홈페이지, 국방부 홈페이지, 각 군 홈페이지에
                공고
              </li>
              <li>
                <em>2차통보</em> : <em>신체검사 합격자</em>에 한하여 예비군 홈페이지, 국방부 홈페이지, 각 군 홈페이지에
                공고
              </li>
            </ul>
          </div>
          <h3 className="s-title">6. 진급 및 임용대상자 교육</h3>
          <div className="details">
            <ul>
              <li>
                <em>대상</em> : 신체검사 합격자로서 군사교육소집 대상자
              </li>
              <li>
                <em>기간</em> : 2박 3일
              </li>
              <li>
                <em>장소</em> : 각 병과학교(육군), 육군대학, 국방정신전력원, 해군 리더십센터(해군), 포항
                동원훈련장(해병대), 27예비단 2교육대(공군)
                <br /> * 교육장소는 각 군에서 조정 가능{" "}
              </li>
            </ul>
          </div>
          <h3 className="s-title">7. 진급 및 임용자 혜택</h3>
          <div className="details">
            <ul>
              <li>
                진급 및 임용자 교육을 모두 이수한자는 해당연도 또는 다음연도 병력동원훈련 소집 면제 (이수 교육시간만
                면제)
                <br /> * 단, 정상적인 교육 시행이 제한되는 경우 당해연도의 국방부 지침 적용{" "}
              </li>
              <li>국방부 장관 또는 각 군 참모총장 명의 임명장 수여</li>
              <li>계급장, 기념품 제공</li>
            </ul>
          </div>
          <h3 className="s-title">8. 기타</h3>
          <div className="details">
            <ul>
              <li> 진급 및 임용대상자 교육 참석자 공가처리 : 예비역 간부가 소속된 기관의 내부규정 적용</li>
            </ul>
          </div>
          <h3 className="s-title">9. 문의처</h3>
          <div className="details last">
            <table className="tbl type1" style={{ width: "600px" }}>
              <caption>예비역 간부 진급 및 임용 관련 문의처</caption>
              <thead>
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">담당부서</th>
                  <th scope="col">전화번호</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bln">육 군</td>
                  <td>
                    {" "}
                    • 육군본부 동원참모부 예비군조직관리과
                    <br /> • 각 지역별 수임군부대 동원처 또는 예비군중대{" "}
                  </td>
                  <td>042-550-5536</td>
                </tr>
                <tr>
                  <td className="bln">해 군</td>
                  <td>• 해군본부 정보작전참모부 예비군과</td>
                  <td>042-553-3521</td>
                </tr>
                <tr>
                  <td className="bln">공 군</td>
                  <td>• 공군본부 정보작전참모부 동원과</td>
                  <td>042-552-3426</td>
                </tr>
                <tr>
                  <td rowSpan={2} className="bln">
                    국방부
                  </td>
                  <td>• 예비전력정책관실 자원동원과</td>
                  <td>02-748-5221</td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    • 국방전산정보원
                    <br />
                    <span className="txt-red">
                      {" "}
                      &nbsp;&nbsp;* 전산장애 발생시 문의
                      <br /> &nbsp;&nbsp;* 자세한 내용은 공지사항 참조
                    </span>
                  </td>
                  <td> 1551-9090 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PopupLayout>
  );
}
