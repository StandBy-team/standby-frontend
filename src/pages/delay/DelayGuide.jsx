import SubLayout from "@/components/layout/SubLayout";

export default function DelayGuide() {
  return (
    <SubLayout title="훈련 연기란?">
      <section>
        <div className="login-cont-box">
          <span className="img">
            <img src="/images/login/login-img1.svg" alt="예비군 마크" />
          </span>
          <div className="txt">
            <p> 예비군 훈련 소집을 통보받은 자가 정당한 사유로 훈련 일정을 미루는 것 </p>
          </div>
        </div>
      </section>{" "}
      <section className="section-box">
        <div>
          <h3 className="h3-tit">법적근거</h3>
          <div className="clearfix">
            <div className="fl">
              <h4 className="h4-tit">예비군훈련</h4>
              <ul className="txt-list bl_dot">
                <li>예비군법 제5조</li>
                <li>예비군법시행령 제14조</li>
                <li>예비군법시행규칙 제18조</li>
              </ul>
            </div>
          </div>
        </div>
      </section>{" "}
      <section className="section-box">
        <div>
          <h3 className="h3-tit">연기 절차</h3>
          <h4 className="h4-tit">일반 훈련</h4>
          <div>
            <img
              src="/images/delay-step.svg"
              alt="예비군훈련연기절차는 STEP1 훈련소집통지, 
							STEP2 연기 사유 발생, STEP3 인터넷 접속(예비군 홈페이지), STEP4 훈련 연기 메뉴 선택, 
							STEP5 훈련 연기 신청서작성, STEP6 증빙서류 발송, STEP7 연기 타당성 판단, STEP8 연기 처리 결과 통보 입니다."
            />
          </div>
        </div>
      </section>{" "}
      <section className="section-box">
        <div>
          <h3 className="h3-tit">훈련 연기 신청 또는 문의 사항</h3>
          <h4 className="h4-tit">일반훈련</h4>
          <ul className="txt-list bl_dot">
            <li>예비군 교육훈련 소집을 통지 받은 자는 소집 1일 전까지 관할 예비군부대로 신청</li>
            <li>
              다만, 그 사유가 갑자기 발생하여 연기 원서를 제출 할 시간적 여유가 없는 때에는 전신·전화 등의 방법으로
              소집일 훈련종료 전까지 신고한 후 3일(토요일과 공휴일은 미포함) 이내에 연기원서를 제출 가능
            </li>
            <li>
              본인이 제출할 수 없을 경우에는 동일 세대내의 가족 중 성년자 또는 본인의 고용주로 하여금 이를 제출 가능
            </li>
            <li>
              예비군 홈페이지에서 연기 신청하거나 소속 예비군 동대(Home&gt;나의훈련정보&gt;소속부대알림에서 확인)로 문의
            </li>
          </ul>
          <h4 className="h4-tit">동원훈련Ⅰ형</h4>
          <ul className="txt-list bl_dot">
            <li>
              {" "}
              병무청에서 통지한 동원훈련Ⅰ형(통상 2박 3일 숙박훈련)은 병무청 홈페이지(
              <a href="http://www.mma.go.kr" target="_blank" rel="noopener noreferrer" title="병무청 홈페이지 새창열기">
                http://www.mma.go.kr
              </a>
              )에서 신청하거나, 병무청(1588-9090)으로 문의
            </li>
            <li>
              {" "}
              ※간부, 공군병 전역자는 일반 훈련도 2박3일 숙박훈련을 실시하므로 병무청에서 통지한 동원훈련일지를 꼭
              확인하여야 함
            </li>
          </ul>
        </div>
      </section>{" "}
      <section className="section-box">
        <div>
          <h3 className="h3-tit">예비군훈련 연기대상(사유) 및 구비서류(제24조 관련)</h3>
          <br />
          <p style={{ fontWeight: "bold" }}>
            ※ 질병으로 인한 예비군훈련 연기 시에는 진단서 또는 진료확인서(통원치료 확인서)를 제출하여 증명할 수 있으나,{" "}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;진료확인서(통원치료 확인서)는 2회 연속하여 제출할 수 없습니다.
          </p>
          <table className="tbl type2">
            <caption>예비군훈련 연기대상(사유) 및 구비서류(제24조 관련)</caption>
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "45%" }} />
              <col style={{ width: "30%" }} />
            </colgroup>
            <thead>
              <tr>
                <th className="bl" scope="row">
                  연기사유
                </th>
                <th className="bl" scope="row">
                  처리기준
                </th>
                <th className="bl" scope="row">
                  구비서류
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>질병 또는 심신장애가 있는 사람</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>훈련일 현재 입원중이거나 거동할 수 없는 사람</li>
                    <li>정신질환이 있는 사람으로서 보호나 감시를 요하는 사람</li>
                    <li>
                      훈련에 참석이 어려울 정도로 외관상 명백한 질병 또는 심신장애가 있으며, 훈련일이 포함된 진단서를
                      제출한 사람
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>의료기관에서 발행하며 치료기간이 명시된 진단서 또는 진료확인서 (통원치료 확인서)</li>
                    <li>장애인등록증사본</li>
                    <li>입원확인서 사본</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>직계 존·비속 등의 위독 및 사망</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>직계가족(외조부모 포함) 또는 배우자의 부모가 위독하여 본인이 아니면 간호할 사람이 없는 경우</li>
                    <li>
                      직계가족(외조부모, 외증조부모 포함) 또는 배우자의 부모(조부모, 증조부모 포함), 본인 및 배우자의
                      형제자매, 백․숙부모(고모․부, 이모․부, 외숙부모 포함)의 사망한 날로부터 소집기일 포함 7일까지의
                      기간과 중복된 경우
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>의료기관에서 발행한 진단서</li>
                    <li>사망확인서 및 기타 관계증명 자료</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>천재지변 등 재난</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      천재지변 또는 기타 재난을 당하여 수습중인 때<br />
                      <span className="txt-blue">* 천재지변 및 재난 전에 연기신청한 인원은 미해당</span>
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>행정관서의 사실확인서</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>출국(예정)</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      국외체제기간(출․입국일 포함)이 소집기간과 중복된 경우 <br />- 소집일 이후 출․입국 상황을 확인,
                      직권연기 <br />
                      <span className="txt-blue">
                        * 동원훈련Ⅱ형(4일)의 경우 부과된 훈련 기간이 출ㆍ귀국일과 하루라도 중복될 경우 전 기간(4일)
                        연기처리 후 재부과
                      </span>
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>국방동원정보체계상의 출·입국자 명부</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>각종 시험응시</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      각종 시험(제한 없음) 응시원서 접수일로부터 시험 완료일까지의 기간이 소집기간과 중복된 경우 <br />-
                      5급 공개경쟁시험, 회계사, 변리사 등 관련법에 의하여 시험방법을 2차 이상으로 구분하여 실시하는
                      시험의 응시자로서 1차 또는 2차 시험합격자(합격자 발표를 기다리고 있는 사람은 해당 단계 합격
                      발표일까지 합격자로 간주한다.)는 2차 또는 3차 시험응시일 까지 연기하되 다음 시험응시일이
                      훈련소집일(최초훈련 부과일 기준) 6개월 이후에 도래되는 사람은 연기제외
                      <br />
                      <br />- 시험응시 증빙서류상 시험일이 명시되지 않는 경우 예비군부대에서 인터넷 또는 시험 시행기관에
                      확인하여 처리하고, 근거를 유지한다. <br />* 예비군 편성기간 중 통산 6회(시험응시 연기기간 중
                      부과된 훈련유형이 다를 경우에 한해 각각 차감한다)를 연기할 수 있으며, 동원훈련Ⅰ형 연기횟수를
                      포함한다.{" "}
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>응시원서 접수증, 합격증, 수험표 등 시험 응시를 증명하는 증빙서류</li>
                    <li>승진시험은 직장확인서</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>방송통신에 의한 출석수업 등</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>방송통신 또는 원격으로 수학하는 사람의 출석 수업 또는 시험과 훈련소집기간이 중복될 때</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>출석 수업통지 명단 또는 학사일정 등 출석 수업을 증명할 수 있는 서류</li>
                    <li>재학증명서 및 학사일정 등 시험을 증명할 수 있는 서류</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>본인결혼 및 부모회갑, 배우자 출산</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>본인 결혼일자가 소집일자 14일 전․후인 때</li>
                    <li>
                      본인 및 배우자의 형제자매 결혼일이 소집기간과 중복될 때⦁ 부모, 처부모의 회갑일 등이 소집기간과
                      중복될 때
                    </li>
                    <li>육아휴직자(휴직기간이 소집기간과 중복될 때)</li>
                    <li>배우자의 출산(예정)일이 소집기간 30일 전ㆍ후와 중복된 경우</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>예식장 계약서 등 그 사실을 증명할 수 있는 서류</li>
                    <li>진단서 또는 임신확인서</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>주요업무 수행</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      주요업무 수행 <br />- 교육기간(5일 이상 합숙교육은 소집기간 1일 전, 후 포함)이 소집기간과 중복된
                      경우 <br />- 국내회의 및 연구발표회의의 회의 기간이 소집기간과 중복된 경우 <br />- 대체 불가능한
                      업무수행, 납품기일 임박, 계약 / 바이어 상담 등
                    </li>
                    <li>
                      국제규모 또는 전국규모 대회 참가대상으로 확정된 자는 합숙훈련 시부터 대회 종료시까지의 기간이 훈련
                      소집기간과 중복된 경우
                    </li>
                    <li>
                      기타 부득이한 사유 <br />* 예비군 편성기간 중 통산 6회(예비군이 제시한 연속된 주요업무 수행기간 중
                      부과된 훈련유형이 다를 경우에 한해 각각 차감한다.)를 연기할 수 있으며, 동원훈련Ⅰ형 연기횟수를
                      포함한다.
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>교육확인서</li>
                    <li>주최기관 또는 단체장의 확인서</li>
                    <li>
                      주요업무수행 확인서
                      <br />
                    </li>
                    <li>
                      개인사유서
                      <br />
                    </li>
                    <br />
                    <a
                      style={{ border: "1px solid", padding: "3px 25px" }}
                      href="/files/personal_reason.hwp"
                      download="개인사유서.hwp"
                    >
                      개인사유서 다운로드(HWP)
                    </a>
                    <br />
                    <br />
                    <a
                      style={{ border: "1px solid", padding: "3px 25px" }}
                      href="/files/personal_reason.docx"
                      download="personal_reason.docx"
                    >
                      개인사유서 다운로드(DOCX)
                    </a>
                    <br />
                    <br />
                    <a
                      style={{
                        letterSpacing: "-0.02em",
                        border: "1px solid",
                        padding: "3px 25px",
                        whiteSpace: "nowrap",
                      }}
                      href="/files/work_certificate.hwp"
                      download="주요업무수행확인서.hwp"
                    >
                      주요업무수행 확인서 다운로드(HWP)
                    </a>
                    <br />
                    <br />
                    <a
                      style={{
                        letterSpacing: "-0.02em",
                        border: "1px solid",
                        padding: "3px 25px",
                        whiteSpace: "nowrap",
                      }}
                      href="/files/work_certificate.docx"
                      download="work_certificate.docx"
                    >
                      주요업무수행 확인서 다운로드(DOCX)
                    </a>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>농·어업 종사자(축산·임업 포함)</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      후계농어업인, 후계농업경영인 또는 후계어업경영인으로서 농사 및 어획에 막대한 지장이 있는
                      농번기․성어기를 고려하여 연 2회 연기 가능
                    </li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>후계농업경영인 선정확인서</li>
                    <li>후계어업경영인 선정확인서</li>
                    <li>농지대장(원부), 어업허가증 등 그 사실을 입증할 수 있는 서류</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>대체역 편입신청자, 군 동원업체 필수요원 심사대상자</td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>
                      대체역 편입신청자의 훈련소집일자가 대체역 편입 접수일로부터 편입결정일까지의 기간과 중복될 경우
                    </li>
                    <li>필수요원 선발 심사대상자(&apos;군 동원업체 업무지시&apos;를 따름)</li>
                  </ul>
                </td>
                <td className="bl" style={{ textAlign: "left" }}>
                  <ul className="txt-list bl_dot">
                    <li>병무청 접수증</li>
                    <li>선발부대의 심사확인서</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>{" "}
      <section className="section-box">
        <div>
          <h4 className="h4-tit">동원훈련Ⅰ형</h4>
          <ul className="txt-list bl_dot">
            <li>
              동원훈련Ⅰ형 연기사유 및 처리기준은 병무청 홈페이지(
              <a href="http://www.mma.go.kr" target="_blank" rel="noopener noreferrer" title="병무청 홈페이지 새창열기">
                http://www.mma.go.kr
              </a>
              )에서 확인하실 수 있습니다.
            </li>
          </ul>
        </div>
      </section>
    </SubLayout>
  );
}
