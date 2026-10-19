import SubLayout from "@/components/layout/SubLayout";

export default function ReserveForcesLaw() {
  return (
    <SubLayout title="예비군법">
      <section>
        <div className="requisition-law-box">
          <ul>
            <li>
              <div className="box-inner">
                <div className="tac">
                  <img src="/images/icon/icon-ordinance1.svg" alt="예비군법" />
                </div>
                <h4>예비군법</h4>
                <div className="txt-sub">
                  {" "}
                  이 법은 지역을 방위하기 위하여 예비군(鄕土豫備軍)의 설치·조직· 편성 및 동원(動員) 등에 관한 사항을
                  정함을 목적으로 한다.{" "}
                </div>
                <a
                  href="http://www.law.go.kr/법령/예비군법"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-detail"
                >
                  <img src="/images/btn/btn-detail.svg" alt="예비군법 자세히 보기, 국가법령정보센터로 이동" />
                </a>
              </div>
            </li>
            <li>
              <div className="box-inner">
                <div className="tac">
                  <img src="/images/icon/icon-ordinance2.svg" alt="예비군법 시행령" />
                </div>
                <h4>예비군법 시행령</h4>
                <div className="txt-sub">
                  이 영은 「예비군법」에서 위임된 사항과 그 시행에 필요한 사항을 규정함을 목적으로 한다.{" "}
                </div>
                <a
                  href="http://www.law.go.kr/법령/예비군법시행령"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-detail"
                >
                  <img src="/images/btn/btn-detail.svg" alt="예비군법 시행령 자세히 보기, 국가법령정보센터로 이동" />
                </a>
              </div>
            </li>
            <li>
              <div className="box-inner">
                <div className="tac">
                  <img src="/images/icon/icon-ordinance3.svg" alt="예비군법 시행 규칙" />
                </div>
                <h4>예비군법 시행 규칙</h4>
                <div className="txt-sub">
                  이 규칙은 「예비군법」 및 같은 법 시행령에서 위임된 사항과 그 시행에 필요한 사항을 규정함을 목적으로
                  한다.{" "}
                </div>
                <a
                  href="http://www.law.go.kr/법령/예비군법시행규칙"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-detail"
                >
                  <img src="/images/btn/btn-detail.svg" alt="예비군법 시행규칙 자세히 보기, 국가법령정보센터로 이동" />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </SubLayout>
  );
}
