import SubLayout from "@/components/layout/SubLayout";

export default function Treatment() {
  return (
    <SubLayout title="치료 및 휴업보상 제도">
      <section>
        <h4 className="cont-tit-h4">치료 제도</h4>
        <ul className="txt-list bl_dot mb10">
          <li>
            예비군대원으로서 동원되어 임무수행 또는 훈련중에 부상을 입은 경우에는 예비군법 제9조(보상 및 치료)에 따라
            국가나
            <br /> 지방자치단체 의료시설(군 보건의료기관, 국공립병원, 특별자치시·시·군·자치구의 보건소)에서 치료를 받을
            수 있습니다.
          </li>
          <li>
            응급환자인 경우는 가장 가까운 민간의료시설에서 치료를 받을 수 있으나, 응급상황이 종료된 경우에는 3일 이내에
            국가나 <br /> 지방자치단체 의료시설로 옮겨야 합니다. 다만, 후송하면 부상이 악화되거나 국가나 지방자치단체
            의료시설에서 적절한 <br /> 치료를 할 수 없다고 인정되는 경우에는 민간의료시설에서 치료기간을 연장할 수
            있습니다.
          </li>
          <li>
            특히, 유의해야 할 점은 예비군 훈련 퇴소 후 임의로 민간의료시설에 치료를 받는 경우에는 군에서 치료비 지원이
            <br /> 제한된다는 것입니다.
          </li>
        </ul>
        <h4 className="cont-tit-h4 mt0">보상 제도</h4>
        <ul className="txt-list bl_dot mb10">
          <li>
            예비군이 훈련 중에 입은 부상 치료로 인하여 생업에 종사하지 못하는 경우에는 예비군법 제8조의2(재해 등에 대한
            보상)에
            <br /> 따라 휴업보상금을 지급받을 수 있습니다.
          </li>
          <li>부상 정도가 심하여 군인연금법 제32조(장애보상금)에 해당하는 경우에는 장애보상금이 지급될 수 있습니다.</li>
          <li>
            또한, 국가 유공자 등 예우 및 지원에 관한 법률 제4조의 공상군경이나 보훈보상대상자 지원에 관한 법률 제2조의
            <br /> 재해부상군경으로 등록되는 경우에는 각각의 법률에 따라 보상을 받을 수 있습니다.
          </li>
        </ul>
        <h4 className="cont-tit-h4 mt0">치료비 및 휴업보상금 청구 절차</h4>
        <ul className="txt-list bl_dot mb10">
          <li>
            <span>신청대상</span>
          </li>
          <span className="cureml10">
            * 예비군대원으로 동원되어 임무수행 또는 훈련 중(동원 명령 또는 훈련 소집에 응하여 지정된 장소로 이동
            중이거나 <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;동원 해제 또는 훈련 종료 후 귀가중인경우를 포함)에 부상을 입어
            치료하거나 그 부상 치료로 인하여 생업에 종사하지 <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;못한 사람
          </span>
          <br />
          <br />
          <li>
            <span>신청서류</span>
          </li>
          <span className="cureml10">
            * 보상 청구서 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            <a href="/files/compensation_claim.hwp" download="보상청구서.hwp">
              <img src="/images/btn/btn-download.svg" alt="다운로드" />
            </a>
          </span>
          <br />
          <span className="cureml10">* 4대 보험 가입확인서</span>
          <br />
          <span className="cureml10">
            * 치료비 계산서·영수증, 진단서, 진료기록부, 재직증명서, 휴직증명서, 통장사본, 계좌이력, 건강보험공단 요양{" "}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;급여내역서 등 보상관계서류(치료비 지급의 경우는 직업과 관계되는
            재직․휴직증명서 등 관련서류 생략 가능)
          </span>
          <br />
          <span className="cureml10">
            * 이동경로도, 교통사고 사실확인원, 보험금 지급내역서, 합의서 등 통상적인 경로와 방법으로 이동 중 부상에 대한{" "}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;보상관계 서류
          </span>
          <br />
          <br />
          <li>
            <span>서류 제출처</span>
          </li>
          <span className="cureml10">* 소속 군부대의 장 등에게 제출</span>
          <br />
          <li>심사결과</li>
          <span className="cureml10">* &apos;보상결정통지서&apos;로 결과 발송</span>
          <br />
          <li>관련문의</li>
          <span className="cureml10">
            * 소속 군부대 (국방 전화번호 통합안내소 (02-748-0114)를 통해 소속 군부대 전화번호 확인 가능)
          </span>
          <br />
          <li>관련법령</li>
          <span className="cureml10">
            <a
              href="http://www.law.go.kr/행정규칙/예비군휴업보상과 치료등에 관한 훈령"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-detail"
            >
              <span>* 「예비군 휴업보상과 치료 등에 관한 훈령」</span>
            </a>
          </span>
          <br />
          <span className="cureml10">
            <a
              href="http://www.law.go.kr/법령/군인연금법"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-detail"
            >
              <span>* 「군인연금법」</span>
            </a>
          </span>
          <br />
          <span className="cureml10">
            <a
              href="http://www.law.go.kr/법령/국가유공자 등 예우 및 지원에 관한 법률"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-detail"
            >
              <span>* 「국가유공자 등 예우 및 지원에 관한 법률」</span>
            </a>
          </span>
          <br />
          <span className="cureml10">
            <a
              href="http://www.law.go.kr/법령/보훈보상대상자 지원에 관한 법률"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-detail"
            >
              <span>* 「보훈보상대상자 지원에 관한 법률」</span>
            </a>
          </span>
          <br />
        </ul>
      </section>
    </SubLayout>
  );
}
