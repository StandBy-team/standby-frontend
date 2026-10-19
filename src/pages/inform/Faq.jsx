import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ROUTES from "@/constants/routes";
import SubLayout from "@/components/layout/SubLayout";

const CATEGORIES = [
  { label: "전 체", ids: null },
  { label: "정보확인", ids: [1, 2] },
  { label: "제도관련", ids: [4, 5, 10, 11, 20, 21, 22, 27] },
  { label: "절차관련", ids: [3] },
  { label: "훈련보류관련", ids: [12, 16, 17, 18, 25] },
  { label: "훈련연기관련", ids: [8] },
  { label: "훈련관련", ids: [6, 7, 9, 13, 14, 15, 23, 24] },
  { label: "기타민원", ids: [19, 26, 28, 29] },
];

function FaqItem({ id, title, question, open, onToggle, hidden, children }) {
  if (hidden) return null;
  return (
    <li className={`article ${open ? "show" : "hide"}`}>
      <p className="q">
        <button type="button" className="trigger" aria-expanded={open} onClick={() => onToggle(id)}>
          <span className="tit">{title}</span>
          <span className="txt">{question}</span>
        </button>
      </p>
      {open && <div className="a">{children}</div>}
    </li>
  );
}

export default function Faq() {
  const [params] = useSearchParams();
  const [category, setCategory] = useState(0);
  const [openId, setOpenId] = useState(() => Number(params.get("faq")) || null);

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));
  const visible = (id) => !CATEGORIES[category].ids || CATEGORIES[category].ids.includes(id);

  return (
    <SubLayout title="자주 묻는 질문">
      <table className="tbl th-c faq-tabs">
        <caption>자주 묻는 질문 항목</caption>
        <tbody>
          {[0, 4].map((start) => (
            <tr key={start}>
              {CATEGORIES.slice(start, start + 4).map((c, i) => (
                <th key={c.label} scope="col" className={category === start + i ? "active" : undefined}>
                  <button type="button" onClick={() => setCategory(start + i)}>
                    {c.label}
                  </button>
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <div className="faq-wrap no-border">
        <ul>
          <FaqItem
            id={1}
            title={<>소속 예비군 부대 확인</>}
            question={<>제가 소속된 예비군 부대가 궁금합니다. 어떻게 확인할 수 있나요?</>}
            open={openId === 1}
            onToggle={toggle}
            hidden={!visible(1)}
          >
            <ul className="bl_bar">
              <li>
                {" "}
                본인의 소속 예비군부대는 인터넷 ‘예비군홈페이지’ 또는 모바일 ‘예비군 앱’ 로그인을 통해 확인 가능합니다.
                <br />
                <br />
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={2}
            title={<>예비군 훈련대상/유형</>}
            question={<>올해 병장으로 전역한 예비군입니다. 앞으로 받아야 할 예비군훈련에 대해 알고 싶습니다.</>}
            open={openId === 2}
            onToggle={toggle}
            hidden={!visible(2)}
          >
            <ul className="bl_bar">
              <li>예비군훈련은 예비군 편성기간(8년) 중 1~6년차까지 부과되며,</li>
              <li>
                1~4년차 중 동원지정자는 2박3일 동원훈련Ⅰ형을, 동원미지정자는 동원훈련Ⅱ형 4일(32H) 또는 2박3일을
                이수하여야 합니다.
              </li>
              <li>5~6년차 예비군의 경우 기본훈련(8H), 전·후반기 작계훈련(12H)을 이수하여야 합니다.</li>
            </ul>
          </FaqItem>
          <FaqItem
            id={3}
            title={<>훈련일정 자율선택 절차</>}
            question={<>인터넷으로 훈련일정 자율선택을 신청하는 절차 및 방법은?</>}
            open={openId === 3}
            onToggle={toggle}
            hidden={!visible(3)}
          >
            <ul className="bl_bar">
              <li>
                인터넷 훈련 신청절차는 ① 인터넷 예비군 홈페이지 접속(
                <Link to={ROUTES.MAIN}>https://www.yebigun1.mil.kr</Link>) → ② 로그인(휴대폰 본인인증, 간편인증, 아이핀
                등) → ③ 훈련일정 자율선택을 &quot;클릭&quot;하여 훈련을 신청하시면 됩니다.
              </li>
              <li>
                참고로 훈련일정 자율선택은 동원훈련Ⅱ형 및 기본훈련과 작계훈련 3차(수임군부대장 판단 하 가능)만 훈련
                신청이 가능합니다.
              </li>
              <li>필요시 소속 예비군부대에 문의하시면 됩니다.</li>
            </ul>
          </FaqItem>
          <FaqItem
            id={4}
            title={<>전국단위 훈련제도</>}
            question={<>주소지는 서울이나 실 거주지는 부산입니다. 부산에서 훈련을 받을 수 있는 방법은 없나요?</>}
            open={openId === 4}
            onToggle={toggle}
            hidden={!visible(4)}
          >
            <ul className="bl_bar">
              <li>
                전국단위 훈련을 신청하면 됩니다. 가까운 예비군중대 또는 예비군홈페이지(모바일 앱) ‘전국단위 훈련’에서
                신청 가능합니다.
              </li>
            </ul>{" "}
            *신청가능 훈련 : 동원훈련Ⅱ형, 기본훈련, 작계훈련 3차(수임군부대장 판단 하 가능){" "}
          </FaqItem>
          <FaqItem
            id={5}
            title={<>휴일예비군 훈련제도</>}
            question={<>휴일에도 실시하는 예비군훈련이 있나요?</>}
            open={openId === 5}
            onToggle={toggle}
            hidden={!visible(5)}
          >
            <ul className="bl_bar">
              <li>
                휴일 예비군훈련은 훈련장별로 일정을 수립하여 실시하고 있으며, 자세한 일정은 공지사항에 게시되어
                있습니다.
              </li>
              <li>휴일훈련은 1개월 전에 인터넷에 공지하고 신청을 받아 실시합니다.</li>
            </ul>{" "}
            *신청가능 훈련 : 동원훈련Ⅱ형, 기본훈련, 작계훈련 3차(수임군부대장 판단 하 가능){" "}
          </FaqItem>
          <FaqItem
            id={6}
            title={<>예비군훈련 입소시간</>}
            question={<>훈련 입소시간을 다소 넘겨 도착할 경우 어떻게 되나요?</>}
            open={openId === 6}
            onToggle={toggle}
            hidden={!visible(6)}
          >
            <ul className="bl_bar">
              <li>훈련소집 통지상에 명시된 입소시간을 반드시 확인하여 입소하셔야 합니다.</li>
              <li>입소시간을 넘길 경우 지연도착으로 처리되어 무단불참 됩니다.</li>
              <li>
                단, 천재지변, 교통수단 고장 및 사고로 불가피 상황으로 지연도착한자(09:30분까지)는 훈련부대장의 판단하에
                입소여부를 결정할 수 있습니다.
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={7}
            title={<>예비군훈련 불참에 따른 불이익</>}
            question={<>예비군훈련을 불참하면 바로 고발되나요?</>}
            open={openId === 7}
            onToggle={toggle}
            hidden={!visible(7)}
          >
            <ul className="bl_bar">
              <li>동원훈련Ⅰ형의 경우에는 무단불참하게 되면 병역법에 따라 바로 고발됩니다.</li>
              <li>
                이와 달리, 동원훈련Ⅱ형·작계·기본훈련은 유형별로 1차, 2차를 무단불참할 경우 훈련 차수 증가 외에 불이익은
                없습니다. 다만, 3차 훈련을 무단불참할 경우에는 예비군법에 따라 고발됩니다.
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={8}
            title={<>예비군훈련 연기사유</>}
            question={<>회사 업무로 예비군훈련을 연기할 수 있나요?</>}
            open={openId === 8}
            onToggle={toggle}
            hidden={!visible(8)}
          >
            <ul className="bl_bar">
              <li>
                회사 업무로 인한 훈련연기는 주요업무수행 사유로 가능합니다. 다만, 주요업무수행은 횟수가 정해져 있으므로
                소속 예비군부대 및 지방병무청에 문의바랍니다.{" "}
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={9}
            title={<>질병으로 인한 훈련면제 기준</>}
            question={
              <> 현역시절 “디스크”란 병으로 수술을 받아 5급 판정을 받았습니다. 훈련 면제로 알고 있는데 가능한지요? </>
            }
            open={openId === 9}
            onToggle={toggle}
            hidden={!visible(9)}
          >
            <ul className="bl_bar">
              <li>
                예비군대원이 질병 등으로 예비군복무를 감당할 수 없을 시, 병역법 제65조(병역처분 변경 등) 및 동법 시행령
                제135조에 의거 거주지 지방병무청장에게 병역처분변경원서를 신청하여 지정된 신체검사 기관 및 군 병원에서
                실시하는 신체검사 결과에 따라 전시근로역에 편입되거나 병역면제 처분을 받을 수 있습니다.
              </li>
              <li>
                그러므로 5급부터 6급까지 판정을 받으신분은 예비군훈련 면제가 가능하므로 병무청에 병역처분 변경을
                신청하시기 바랍니다.
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={10}
            title={<>예비군훈련 중 부상 시 치료 및 보상</>}
            question={
              <>
                {" "}
                예비군훈련 중에 넘어지면서 무릎 전방십자인대가 파열되는 부상을 입고 퇴소한 경우에 군의 치료 및 보상
                지원은?{" "}
              </>
            }
            open={openId === 10}
            onToggle={toggle}
            hidden={!visible(10)}
          >
            <ul className="bl_bar">
              <li>
                예비군이 훈련 중에 부상을 입으면 예비군법 제8조의2, 제9조에 따라 군병원을 포함하여 국가나 지방자치단체
                의료시설에서 치료를 받을 수 있습니다. 그러나 예비군이 임의로 민간의료 시설에서 치료를 받게 되면 군에서는
                치료비를 지원하지 않습니다. 아울러, 부상치료로 인해 생업에 종사하지 못한 경우에는 휴업보상금을 지급받을
                수 있습니다.
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={11}
            title={<>환자의 예비군 훈련 보류/연기</>}
            question={
              <> 만성간염으로 건강이 악화되어 훈련 받을 형편이 못됩니다. 훈련 보류 또는 완치 후 훈련받을 방법은? </>
            }
            open={openId === 11}
            onToggle={toggle}
            hidden={!visible(11)}
          >
            <ul className="bl_bar">
              <li>질병으로 훈련을 받을 수 없어 진단서를 제출한 경우 예비군 훈련을 연기 또는 보류 받을 수 있습니다.</li>
              <li>① 180일 미만의 진단서를 제출한 경우는 훈련 연기</li>
              <li>② 180일 이상 진단서를 제출한 경우는 진단서 상 치료가 끝나는 날까지 보류 조치</li>
              <li>
                1차 진단서에 이어서 동일 병명(합병증)에 의한 사유의 치료 기간이 연속된 2차 추가 진단서를 제출하면 1차
                치료 기간과 합산하여 계산됩니다.
              </li>
              <li>훈련연기 신청은 인터넷 예비군 홈페이지 또는 소속 예비군부대로 하시면 됩니다.</li>
            </ul>
          </FaqItem>
          <FaqItem
            id={12}
            title={<>평생교육법에 따른 교육시설의 방침보류 적용여부</>}
            question={
              <>
                {" "}
                평생교육법에 의해 설립된 교육시설에 다니고 있는 학생입니다. 고등교육법에 의해 설립된 대학 예비군과
                동일하게 방침보류 훈련시간을 적용받을 수는 없는지요?{" "}
              </>
            }
            open={openId === 12}
            onToggle={toggle}
            hidden={!visible(12)}
          >
            <ul className="bl_bar">
              <li>
                평생교육법 제25조의 규정에 의한 평생교육시설 교육생은 방침보류 대상에 해당되지 않아 일반 예비군과 동일한
                훈련시간을 부과하고 있습니다.
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={13}
            title={<>기간제 교사의 훈련시간</>}
            question={
              <> 기간제 교사로 종사하고 있습니다. 저의 경우 일반 교사와 같이 방침보류자 훈련시간이 적용되는지요? </>
            }
            open={openId === 13}
            onToggle={toggle}
            hidden={!visible(13)}
          >
            <ul className="bl_bar">
              <li>
                각급학교 교사 중 기간제 교사는 재학기간이 1개 학기 이상인 경우 180일 이상의 기준을 충족한 것으로
                처리하며, 재학기간 중 1학기는 3. 1∼8. 31, 2학기는 9. 1∼2월말로 하며, 각 학교 학칙에 의해 조정될 수
                있습니다. 1개 학기를 충족하지 않은 경우에는 신분과 연차에 맞는 훈련에서 이수한 시간을 제외하여 훈련을
                부과합니다. 학기를 적용하지 않는 기간제 교사의 경우 연간 근무기간을 합산하여 180일 이상 시 보류처리
                됩니다.
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={14}
            title={<>대학교 복학예정자의 예비군 훈련</>}
            question={<> 다음 학기 복학예정인데 동원훈련Ⅱ형이 부과되었습니다. 불참하면 어떻게 되나요? </>}
            open={openId === 14}
            onToggle={toggle}
            hidden={!visible(14)}
          >
            <ul className="bl_bar">
              <li>
                복학 이전에 무단불참한 동원훈련Ⅱ형의 차수에 따라 달라집니다.{" "}
                <ul>
                  <li>1. 동원훈련Ⅱ형 1차를 무단불참하고 복학한 경우</li>
                  <li> → 기본훈련 2차(8H)을 이수하면 해당연도 훈련 종결</li>
                  <li>2. 동원훈련Ⅱ형 2차를 무단불참하고 복학한 경우</li>
                  <li> → 동원훈련Ⅱ형 3차(32H)를 이수해야 해당연도 훈련 종결</li>
                  <li>3. 동원훈련Ⅱ형 3차를 무단불참하고 복학한 경우</li>
                  <li> → 훈련 불참에 따른 고발 후 동원훈련Ⅱ형 3차(32H)를 이수해야 해당연도 훈련 종결</li>
                </ul>
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={15}
            title={<>예비군 훈련 일정조정</>}
            question={
              <>
                {" "}
                외국으로 오래동안 출국할 예정으로 출국하기 전에 올 해 훈련을 모두 받고 싶은데, 훈련일정 조정이
                가능한지요?{" "}
              </>
            }
            open={openId === 15}
            onToggle={toggle}
            hidden={!visible(15)}
          >
            <ul className="bl_bar">
              <li>동원훈련Ⅰ형과 작계훈련은 훈련일정 및 장소 변경이 불가하며,</li>
              <li>
                동원훈련Ⅱ형과 기본훈련은 예비군 홈페이지에서 휴일 및 전국단위 예비군 훈련제도 신청을 통해 훈련일정
                선택이 가능합니다.
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={16}
            title={<>국외 이주자의 훈련보류 및 면제</>}
            question={
              <>
                {" "}
                올 해 3월에 일본으로 출국해서 일본인과 결혼 후 현지에서 정착해 살고 있는 중입니다. 그런데 제가 7월에
                잠시 귀국해서 8월에 출국할 예정입니다. 이 기간 동안에 부과된 훈련을 받아야 하는지요?{" "}
              </>
            }
            open={openId === 16}
            onToggle={toggle}
            hidden={!visible(16)}
          >
            <ul className="bl_bar">
              <li>
                병역법에 의하여 예비역으로서 국외에서 가족과 같이 영주권을 얻거나, 영주권 제도가 없는 나라에서 무기한
                체류자격을 얻은 사람의 경우에는, 병역면제 처분을 받을 수 있으며 이 경우 예비군 편성에서제외되어 훈련이
                부과되지 않습니다. 따라서 귀하께서는 일본 이주로 병역면제 처분을 받으시려면 주민센터에 국외이주 신고 후
                재외공관에 병역 면제원을 출원해야 합니다.
              </li>
              <li>다만, 아직까지 이러한 절차가 이루어지지 않았다면 부과된 훈련은 받아야 합니다.</li>
            </ul>
          </FaqItem>
          <FaqItem
            id={17}
            title={<>유학생의 보류적용</>}
            question={
              <>
                {" "}
                저는 유학 비자를 받고 300일 이상 국외에서 유학중인 사람으로 유학생에게 보류제도가 적용이 되는지 알고
                싶습니다.{" "}
              </>
            }
            open={openId === 17}
            onToggle={toggle}
            hidden={!visible(17)}
          >
            <ul className="bl_bar">
              <li>
                국외출국자는 출국자 명부를 근거로 연기처리 후 365일 이상 체류 시 보류 처리되며, 일시 귀국 시 국내
                체류일이 14일 이내인 경우는 합산되어 처리되며, 출국일과 귀국 당일은 국외 체류기간에 포함합니다.
              </li>
              <li>365일 미만 국외체류를 하면 보류대상이 안되며, 연기된 훈련은 귀국 후 부과됩니다.</li>
            </ul>
          </FaqItem>
          <FaqItem
            id={18}
            title={<>법규보류 신고/해소 절차</>}
            question={
              <> 예비군 부대에서 보류해소 신고를 안했다는 이유로 고발조치하였다는 연락을 받았는데 맞는 건가요? </>
            }
            open={openId === 18}
            onToggle={toggle}
            hidden={!visible(18)}
          >
            <ul className="bl_bar">
              <li>
                동원 또는 훈련을 보류 받던 자가 면직, 퇴직, 제적 등으로 그 보류 사유가 해소된 때에는 해소된 날로부터
                14일 이내에 인터넷 예비군 홈페이지, FAX 또는 소속 예비군부대에 신고하여야 합니다.
              </li>
              <li>
                또한 유선 등의 기타 방법으로 보류해소 사실을 통보받았을 때에도 보류해소 사유 발생일로부터 30일 이내
                해소신고서를 제출해야 합니다.
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={19}
            title={<>예비군 훈련참가비 문의</>}
            question={<>예비군 훈련 시 보상비, 식비, 교통비 등은 얼마나 지급되나요?</>}
            open={openId === 19}
            onToggle={toggle}
            hidden={!visible(19)}
          >
            <table className="tbl type2">
              <thead>
                <tr>
                  <th rowSpan={1} id="faq_19_19_a" scope="row" style={{ cursor: "default", width: "auto" }}>
                    구분
                  </th>
                  <th
                    colSpan={2}
                    id="faq_19_19_b"
                    className="bl"
                    scope="row"
                    style={{ cursor: "default", width: "auto" }}
                  >
                    동원예비군훈련
                  </th>
                  <th
                    colSpan={2}
                    id="faq_19_19_c"
                    className="bl"
                    scope="row"
                    style={{ cursor: "default", width: "auto" }}
                  >
                    지역예비군훈련
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: "bold" }}>훈련종류</td>
                  <td className="bl" style={{ fontWeight: "bold" }}>
                    동원훈련Ⅰ형 (숙영)
                  </td>
                  <td className="bl" style={{ fontWeight: "bold" }}>
                    동원훈련Ⅱ형 (비숙영)
                  </td>
                  <td className="bl" style={{ fontWeight: "bold" }}>
                    기본훈련
                  </td>
                  <td className="bl" style={{ fontWeight: "bold" }}>
                    작계훈련
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>기간</td>
                  <td className="bl">2박3일</td>
                  <td className="bl">4일( 8H×4 )</td>
                  <td className="bl">1일( 8H )</td>
                  <td className="bl">4일( 6H×2 )</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>보상비</td>
                  <td className="bl">95,000원</td>
                  <td className="bl">
                    50,000원
                    <br />
                    <span style={{ fontSize: "10px" }}>* 12,500원 / 1일</span>
                  </td>
                  <td className="bl">10,000원</td>
                  <td className="bl">5,000원 / 1일</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>식비</td>
                  <td className="bl">부대급식</td>
                  <td colSpan={3} className="bl">
                    9,000원 / 1일
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>교통비</td>
                  <td className="bl">
                    거리에 따른
                    <br /> 차등지급{" "}
                  </td>
                  <td colSpan={2} className="bl">
                    (일반 예비군훈련장) 8,000원 <br /> (과학화 예비군훈련장) 131.82원 / km{" "}
                  </td>
                  <td className="bl"> 3,000원 / 1일</td>
                </tr>
              </tbody>
            </table>
          </FaqItem>
          <FaqItem
            id={20}
            title={<>병력동원소집 개념과 통지방법</>}
            question={
              <>
                {" "}
                저는 1년차 예비군으로 소집통지서를 받았는데, 어떤 내용인지 잘 모르겠습니다. 병력동원 소집은 무엇이며
                어떻게 통지하나요?{" "}
              </>
            }
            open={openId === 20}
            onToggle={toggle}
            hidden={!visible(20)}
          >
            <ul className="bl_bar">
              <li>
                병력동원소집은 전시․사변 또는 이에 준하는 국가비상사태시 군 작전을 위해 예비군을 동원하는 것이며, 이를
                위해 동원될 부대를 평시에 정해서 관리하고 있습니다.
              </li>
              <li>
                병력동원소집 대상자는 병무청에서 본인이 수신 동의한 이메일 또는 등기우편으로 통지서를 교부하는데 총동원,
                부분동원, 동원훈련Ⅰ형 소집통지서의 3종류가 있으며, 각각 색상이 상이 하므로 주의해야 합니다.
              </li>
              <li>
                소집통지서 중 총동원 통지서는 분홍색이고, 부분동원 통지서는 흰색이며, 동원훈련Ⅰ형 통지서는 파란색입니다.
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={21}
            title={<>병력동원소집대상자 / 기간</>}
            question={<>병력동원 소집대상자 및 기간은 어떻게 되나요?</>}
            open={openId === 21}
            onToggle={toggle}
            hidden={!visible(21)}
          >
            <ul className="bl_bar">
              <li>병력동원 훈련소집 대상자는 다음과 같습니다.</li>
              <li>1. 대상자 : 긴급단계 / 지속 4단계, 증.창설부대 동원지정자</li>
              <li>가. 장교, 준사관, 부사관 : 예비군 복무 1 ~ 6년차</li>
              <li>나. 병 : 예비군 복무 1 ~ 4년차</li>
              <li>2. 훈련기간 : 2박 3일(28시간)</li>
            </ul>
          </FaqItem>
          <FaqItem
            id={22}
            title={<>병력동원훈련 훈련관련</>}
            question={<>병력동원 소집 통지서를 이메일로 받았는데, 출력해서 가져가야하나요?</>}
            open={openId === 22}
            onToggle={toggle}
            hidden={!visible(22)}
          >
            <ul className="bl_bar">
              <li>
                메일로 온 병력동원 소집통지서를 그냥 출력해서 가져오시면 되고, 부득이하게 출력 못하면, 그냥 오셔도
                무관합니다.
              </li>
              <li>소속 부대 전산에 기록이 되어 있어서, 참가 하는데는 문제없습니다.</li>
            </ul>
          </FaqItem>
          <FaqItem
            id={23}
            title={<>예비군훈련 시기</>}
            question={<>여름철 또는 겨울철 훈련지침은 어떻게 되나요?</>}
            open={openId === 23}
            onToggle={toggle}
            hidden={!visible(23)}
          >
            <ul className="bl_bar">
              <li>
                예비군훈련은 3월부터 11월까지 실시하며, 가급적 혹서기, 연휴기간 등을 피해 실시하고 있으나, 해당 부대별
                여건 등을 고려하여 훈련시기는 조정될 수 있습니다.
              </li>
              <li>
                훈련중 폭염 또는 한파 시 각 군에서 정한 온도기준 범위 내에서 현장 지휘관 판단하에 훈련을 통제하고
                있습니다.
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={24}
            title={<>예비군훈련 규정</>}
            question={<>미세먼지 수준에 따른 야외훈련 지침은 어떻게 되나요?</>}
            open={openId === 24}
            onToggle={toggle}
            hidden={!visible(24)}
          >
            <ul className="bl_bar">
              <li>
                예비군훈련 간 미세먼지 경보 발령에 따른 조치는 환경부의 대기오염 경보발령을 기준으로 실시하고 있습니다.
              </li>
              <li>
                1. 미세먼지 주의보 발령시 : 장시간 또는 무리한 야외훈련(구보, 행군 등) 금지, 훈련부대장(지휘관) 판단하여
                실내훈련 전환 가능
              </li>
              <li>2. 미세먼지 경보 발령시 : 야외훈련 중지, 실내훈련으로 전환</li>
            </ul>
          </FaqItem>
          <FaqItem
            id={25}
            title={<>현역부적합 보류 관련</>}
            question={<>현역 부적합자의 경우 예비군훈련과 관련하여 궁금합니다?</>}
            open={openId === 25}
            onToggle={toggle}
            hidden={!visible(25)}
          >
            <ul className="bl_bar">
              <li>
                현역부적합 사유로 사회복무요원으로 복무전환 되거나 최초부터 사회복무요원으로 군복무를 마친 경우는 보충역
                신분으로「예비군법」 제3조 규정에 의거 예비군에 편성되어 예비군 훈련이 부과됩니다.
              </li>
              <li>
                다만, 현역부적합자 사유 중 “정신이상, 성격장애”에 한정하여 예비군훈련 보류 대상자로 적용하고 있습니다.
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={26}
            title={<>예비군훈련 보안 규정</>}
            question={<>예비군훈련간 휴대폰 사용 규정은 어떻게 되나요?</>}
            open={openId === 26}
            onToggle={toggle}
            hidden={!visible(26)}
          >
            <ul className="bl_bar">
              <li>
                예비군훈련간 개인소유정보통신(스마트폰 등)장비의 사용통제는 「국방보안업무훈령」에 의거 무단반입을
                금지하고 있으며, 훈련부대의 승인 없이 사용시는 강제퇴소처리 합니다.
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={27}
            title={<>직장 보장 관련</>}
            question={<>예비군훈련 참가시 직장에서 공가 처리가 되나요?</>}
            open={openId === 27}
            onToggle={toggle}
            hidden={!visible(27)}
          >
            <ul className="bl_bar">
              <li>
                근로자인 경우,「근로기준법」제10조(공민권 행사의 보장)는 예비군 대원으로 동원되거나 훈련을 받는 것과
                같이 법령에 근거를 두고 있는 공적인 직무에 해당되는 한, 사용자는 근로자가 근무시간 중에 이를 위한 필요한
                시간(공가)을 청구하면 거부하지 못하도록 규정하고 있습니다.
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={28}
            title={<>군복 대여</>}
            question={<> 체형의 변화로 예비군복이 맞지 않아 착용이 불가합니다. 이런 경우 어떻게 해야 하나요? </>}
            open={openId === 28}
            onToggle={toggle}
            hidden={!visible(28)}
          >
            <ul className="bl_bar">
              <li>
                예비군훈련시 복장은 현역 복무 또는 훈련소 입소 시 지급되는 군복을 계속 착용하는 것으로, 예비군 피복의
                추가 지급은 없습니다.
              </li>
              <li>
                복장을 갖추지 못하였거나, 체형변화로 복장이 맞지 않아 착용이 제한되어 정상적인 훈련을 받기 어려운 경우,
                훈련 7일전까지 소속 예비군 중대를 방문(또는 전화)하여, 예비군복 대여 신청서를 작성/제출하고 신청할 수
                있습니다.
              </li>
              <li>
                훈련복장은 훈련 입,퇴소시 훈련장에서 대여 및 반납이 가능합니다. (기존 복장 휴대하 1:1 교체대여를
                원칙으로 합니다.)
              </li>
              <li>
                자세한 내용은 지역예비군 훈련의 경우 소속예비군 부대에 동원예비군 훈련의 경우 소집부대에 문의 하시기
                바랍니다.
              </li>
            </ul>
          </FaqItem>
          <FaqItem
            id={29}
            title={<>예비군이 이용 가능한 군마트</>}
            question={<>소집되어 훈련중인 예비군은 어떤 마트를 이용할 수 있나요.?</>}
            open={openId === 29}
            onToggle={toggle}
            hidden={!visible(29)}
          >
            <ul className="bl_bar">
              <li>영내 마트만 이용 가능합니다. (영외마트 이용불가) </li>
              <li>
                훈련 관리상 지휘관 재량에 따라 운영시간이 조정될 수 있습니다. <br />
              </li>
            </ul>
          </FaqItem>
        </ul>
      </div>
    </SubLayout>
  );
}
