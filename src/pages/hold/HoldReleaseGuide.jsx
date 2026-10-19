import SubLayout from "@/components/layout/SubLayout";

export default function HoldReleaseGuide() {
  return (
    <SubLayout title="보류해소란?">
      <section>
        <div className="login-cont-box">
          <span className="img">
            <img src="/images/login/login-img1.svg" alt="예비군 마크" />
          </span>
          <div className="txt">
            <p>
              예비군법과 국방부 방침으로 동원 또는 훈련을 보류받던 자가 <br />
              면직, 퇴직, 제적, 휴학 등의 이유로 그 보류사유가 해소되어 해당 예비군훈련에 편성되는 것
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
                <li>예비군법 시행규칙 제19조</li>
              </ul>
            </div>
          </div>
        </div>
      </section>{" "}
      <section className="section-box">
        <div>
          <h3 className="h3-tit">보류 해소 절차</h3>
          <ul className="hid">
            <li>STEP 01 보류 해소 사유 발생</li>
            <li>STEP 02인터넷 접속(예비군 홈페이지)</li>
            <li>STEP 03 로그인(아이디/비밀번호)</li>
            <li>STEP 04훈련 보류 해소 메뉴선택</li>
            <li>STEP 05 보류 해소 신청서 작성</li>
          </ul>
          <div className="mt20">
            <img
              src="/images/delay-cancel-step.svg"
              alt="보류해소절차는 STEP1 보류 해소 사유 발생,
							STEP2 인터넷 접속(예비군 홈페이지), STEP3 로그인, STEP4 훈련 보류 해소 메뉴 선택, STEP5 보류 해소 신청서 작성 입니다."
            />
          </div>
        </div>
      </section>{" "}
      <section className="section-box">
        <div>
          <h3 className="h3-tit">보류해소신고</h3>
          <ol className="txt-list">
            <li>
              1. 동원 또는 훈련을 보류 받던 자가 면직, 퇴직, 제적 등으로 그 보류사유가 해소된 때에는 해소된 날로부터
              14일 이내에 <br />
              <span className="ml15">인터넷 예비군홈페이지, 또는 소속(거주지) 예비군지휘관에게 신고하여야 한다.</span>
            </li>
            <li>
              2. 유선 등의 기타 방법으로 보류해소 신고사실을 통보받았을 때에는 보류해소 30일 이내 해소신고서를 제출토록
              <br />
              <span className="ml15">조치한다.</span>
            </li>
            <li>
              3. 휴학, 졸업, 유급, 면직 및 퇴직, 신고된 기간 만료 등 보류 사유 해소사실이 명백한 경우는 지휘관 직권으로
              해소할 수 있으며, <br />
              <span className="ml15">
                관련근거 등을 기록(증명할 수 있는 서류 첨부)하고 보류해소 사실을 당사자에게 통보한다.
              </span>
            </li>
            <li>
              4. 예비군지휘관은 보류해소 사유가 발생한 예비군에 대해서는 14일 이내에 국방동원정보체계에 입력 조치하여야
              한다.
            </li>
            <li>5. 보류해소신고 지연 시 예비군법 제15조 제12항에 의거 200만원 이하의 벌금이나 구류에 처한다.</li>
          </ol>
        </div>
      </section>
    </SubLayout>
  );
}
