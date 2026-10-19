import SubLayout from "@/components/layout/SubLayout";

export default function NationwideTrainingGuide() {
  return (
    <SubLayout title="휴일 및 전국단위 예비군 훈련이란?">
      <section>
        <div className="login-cont-box">
          <span className="img">
            <img src="/images/login/login-img1.svg" alt="예비군 마크" />
          </span>
          <div className="txt">
            <p>
              <strong> 휴일예비군 훈련이란?</strong>
            </p>
            <p> 예비군이 휴일에 훈련을 신청하여 시행하는 제도 </p>
            <br />
            <p>
              <strong> 전국단위 훈련이란?</strong>
            </p>
            <p> 예비군이 전국의 원하는 예비군훈련장에 훈련을 신청하여 실시하는 제도 </p>
            <p className="ref-txt txt-red">* 사전 신청을 하지 않는 경우 훈련입소가 불가합니다.</p>
          </div>
        </div>
      </section>{" "}
      <section className="section-box">
        <h4 className="h4-tit mt0">적용 대상 훈련</h4>
        <ul className="txt-list bl_hyphen">
          <li>동원훈련 II형, 기본훈련, 작계훈련 3차</li>
        </ul>
        <h4 className="h4-tit">유의사항</h4>
        <ul className="txt-list bl_hyphen">
          <li>
            당해 편성된 정상훈련과, 이전 연도에서 이월된 훈련은 휴일 및 전국단위 훈련 신청이 가능합니다.
            <br /> 단, 이월훈련의 경우 신청하려는 훈련의 계획 시간이 귀하에게 부과된 훈련의 편성 시간보다 짧을 경우
            신청이 제한됩니다.
          </li>
          <li>입영훈련은 휴일 및 전국단위 예비군 훈련에 신청할 수 없습니다. </li>
        </ul>
        <h4 className="h4-tit">휴일 및 전국단위 훈련 신청절차</h4>
        <ul className="txt-list bl_hyphen">
          <li>
            원칙적으로 훈련일 30일 전 14:00부터 훈련일정 확인 및 신청 가능
            <br /> (단, 훈련이 &quot;훈련일정 본인선택제&quot; 훈련에 해당하는 경우 훈련계획 작성 부대에서 설정한 신청
            기간 범위 내 신청 가능)
          </li>
          <li>예비군은 인터넷으로 훈련실시 3일전까지 예비군 홈페이지에서 신청</li>
          <li>훈련실시 3일 전까지 예비군 대원이 직접 예비군중대를 방문하여 신청 시 확인 후 허용</li>
          <li>휴일 및 전국단위 예비군 훈련 신청 후 불참한 예비군은 무단 불참 처리</li>
        </ul>
        <p className="txt-list-sub"> ※ 예비군부대 연락처는 예비군 홈페이지에서 확인할 수 있습니다. </p>
      </section>{" "}
      <section className="section-box">
        <div>
          <h3 className="h3-tit">신청 절차</h3>
          <div>
            <img
              src="/images/2-3-1-img1.svg"
              alt="전국단위훈련 신청절차는 STEP01 인터넷 접속, STEP 02 예비군 홈페이지 접속 , STEP 03 로그인, STEP 04 전국단위 훈련 메뉴 선택, STEP 05 훈련신청 메뉴 선택, STEP 06 신청서 작성, STEP 07 통지서 출력, STEP 08 훈련 참석 입니다."
            />
          </div>
          <ul className="txt-list">
            <li>
              - 휴일 및 전국단위 훈련 <span className="txt-blue">신청 삭제(취소)는 신청일 당일까지만 가능</span>하며,
              이후에는 불가합니다.
            </li>
          </ul>
          <p className="txt-list-sub2">
            {" "}
            ※ 신청일 이후 부득이 하게 취소(또는 연기)해야 할 경우에는 본인의 원소속 예비군부대로 문의 바랍니다.{" "}
          </p>
          <ul className="txt-list">
            <li>
              - 휴일 및 전국단위 훈련 <span className="txt-blue">신청내역 변경(수정)은 1회로 제한</span>되며{" "}
              <span className="txt-blue">훈련일 을 제외한 3일전까지</span>만 가능합니다.
            </li>
          </ul>
          <p className="txt-list-sub3"></p>
          <div className="mt30">
            <img src="/images/2-3-1-img2.svg" alt="신청한 훈련일: 7.27~29, 7.23일 23:59까지 수정가능" />
          </div>
        </div>
      </section>{" "}
      <section className="section-box">
        <div>
          <h3 className="h3-tit">훈련 결과 처리</h3>
          <ul className="txt-list">
            <li>- 훈련을 신청한 예비군은 지정된 일시 및 장소에 입소</li>
            <li>- 전국단위 훈련 신청 후 불참한 예비군은 무단불참 처리</li>
            <li>- 3차 훈련 신청 후 무단 불참시는 신청자료를 근거로 고발조치</li>
          </ul>
        </div>
      </section>
    </SubLayout>
  );
}
