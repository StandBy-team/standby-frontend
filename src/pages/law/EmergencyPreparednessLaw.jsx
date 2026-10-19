import SubLayout from "@/components/layout/SubLayout";

export default function EmergencyPreparednessLaw() {
  return (
    <SubLayout title="비상대비에 관한 법률">
      <section>
        <div className="requisition-law-box">
          <ul>
            <li>
              <div className="box-inner">
                <div className="tac">
                  <img src="/images/icon/icon-ordinance1.svg" alt="비상대비에 관한 법률" />
                </div>
                <h4>비상대비에 관한 법률</h4>
                <div className="txt-sub">
                  {" "}
                  이 법은 전시·사변 또는 이에 준하는 비상시(이하 &quot;비상사태&quot;라 한다)에 국가의 인력·물자 등
                  자원을 효율적으로 활용할 수 있도록...{" "}
                </div>
                <a
                  href="http://www.law.go.kr/법령/비상대비에 관한 법률"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-detail"
                >
                  <img
                    src="/images/btn/btn-detail.svg"
                    alt="비상대비에 관한 법률 자세히 보기, 국가법령정보센터로 이동"
                  />
                </a>
              </div>
            </li>
            <li>
              <div className="box-inner">
                <div className="tac">
                  <img src="/images/icon/icon-ordinance2.svg" alt="비상대비에 관한 법률 시행령" />
                </div>
                <h4>비상대비에 관한 법률 시행령</h4>
                <div className="txt-sub">
                  이 영은 「비상대비에 관한 법률」에서 위임된 사항과 그 시행에 필요한 사항을 규정함을 목적으로 한다.
                  <br />
                  <br />
                </div>
                <a
                  href="http://www.law.go.kr/법령/비상대비에 관한 법률 시행령"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-detail"
                >
                  <img
                    src="/images/btn/btn-detail.svg"
                    alt="비상대비에 관한 법률 시행령 자세히 보기, 국가법령정보센터로 이동"
                  />
                </a>
              </div>
            </li>
            <li>
              <div className="box-inner">
                <div className="tac">
                  <img src="/images/icon/icon-ordinance3.svg" alt="비상대비에 관한 법률 시행규칙" />
                </div>
                <h4>
                  비상대비에 관한 법률 <br />
                  시행규칙
                </h4>
                <div className="txt-sub">
                  이 규칙은 「비상대비에 관한 법률」 및 같은 법 시행령에서 위임된 사항과 그 시행에 필요한 사항을
                  규정함을 목적으로 한다.
                  <br />
                  <br />
                </div>
                <a
                  href="http://www.law.go.kr/법령/비상대비에 관한 법률 시행규칙"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-detail"
                >
                  <img
                    src="/images/btn/btn-detail.svg"
                    alt="비상대비에 관한 법률 시행규칙 자세히 보기, 국가법령정보센터로 이동"
                  />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </SubLayout>
  );
}
