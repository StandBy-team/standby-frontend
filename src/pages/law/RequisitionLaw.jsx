import SubLayout from "@/components/layout/SubLayout";

export default function RequisitionLaw() {
  return (
    <SubLayout title="징발법">
      <section>
        <div className="requisition-law-box">
          <ul>
            <li>
              <div className="box-inner">
                <div className="tac">
                  <img src="/images/icon/icon-ordinance1.svg" alt="징발법" />
                </div>
                <h4>징발법</h4>
                <div className="txt-sub">
                  이 법은 전시·사변 또는 이에 준하는 비상사태하에서 군작전을 수행하기 위하여 필요한 토지, 물자, 시설
                  또는 권리의 징발(徵發)과...{" "}
                </div>
                <a
                  href="http://www.law.go.kr/법령/징발법"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-detail"
                >
                  <img src="/images/btn/btn-detail.svg" alt="징발법 자세히 보기, 국가법령정보센터로 이동" />
                </a>
              </div>
            </li>
            <li>
              <div className="box-inner">
                <div className="tac">
                  <img src="/images/icon/icon-ordinance2.svg" alt="징발법 시행령" />
                </div>
                <h4>징발법 시행령</h4>
                <div className="txt-sub">
                  이 영은 「징발법」에서 위임된 사항과 그 시행에 필요한 사항을 규정함을 목적으로 한다.{" "}
                </div>
                <a
                  href="http://www.law.go.kr/법령/징발법 시행령"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-detail"
                >
                  <img src="/images/btn/btn-detail.svg" alt="징발법 시행령 자세히 보기, 국가법령정보센터로 이동" />
                </a>
              </div>
            </li>
            <li>
              <div className="box-inner">
                <div className="tac">
                  <img src="/images/icon/icon-ordinance3.svg" alt="징발법 시행 규칙" />
                </div>
                <h4>징발법 시행 규칙</h4>
                <div className="txt-sub">
                  이 규칙은 「징발법」 및 같은 법 시행령에서 위임된 사항과 그 시행에 필요한 사항을 규정함을 목적으로
                  한다.{" "}
                </div>
                <a
                  href="http://www.law.go.kr/법령/징발법 시행 규칙"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-detail"
                >
                  <img src="/images/btn/btn-detail.svg" alt="징발법 시행 규칙 자세히 보기, 국가법령정보센터로 이동" />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </SubLayout>
  );
}
