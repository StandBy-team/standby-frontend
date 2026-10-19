import SubLayout from "@/components/layout/SubLayout";

export default function TrainingSelfSelectGuide() {
  return (
    <SubLayout title="훈련일정 자율선택이란?">
      <section>
        <div className="login-cont-box">
          <span className="img">
            <img src="/images/login/login-img1.svg" alt="예비군 마크" />
          </span>
          <div className="txt">
            <p>
              {" "}
              예비군이 예비군 홈페이지/앱에 공시된 훈련 일정 중 <br />
              본인이 원하는 일자에 훈련을 신청하는 제도{" "}
            </p>
          </div>
        </div>
      </section>{" "}
      <section className="section-box">
        <h4 className="h4-tit mt0">적용 대상 훈련</h4>
        <ul className="txt-list bl_hyphen">
          <li>동원훈련 II형, 기본훈련, 작계훈련 3차</li>
          <li>
            <span className="txt-blue" style={{ leftMargin: "10px" }}>
              당해 편성된 정상훈련만 신청 가능하며 이전 연도로부터 이월된 훈련이나 입영훈련은 신청 불가합니다.
            </span>
          </li>
        </ul>
        <h4 className="h4-tit">훈련일정 자율선택 신청절차</h4>
        <ul className="txt-list bl_hyphen">
          <li>훈련소집일 1개월 전까지 홈페이지에 훈련일정 공지</li>
          <li>예비군이 훈련일정을 확인, 선택할 수 있도록 신청기간을 부여</li>
          <li>미신청자에 대해서는 훈련소집일 22일 전에 결산을 실시하여 소집통지서 교부</li>
          <li>인터넷으로 훈련을 신청한 예비군은 훈련소집통지서 미교부</li>
          <li>인터넷을 통해 훈련 신청 후 불참한 예비군에 대해서는 무단불참 처리</li>
        </ul>
      </section>
    </SubLayout>
  );
}
