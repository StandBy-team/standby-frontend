import SubLayout from "@/components/layout/SubLayout";

export default function SettingsGuide() {
  return (
    <SubLayout title="환경설정 변경 안내">
      <section className="section-box">
        <div>
          <h3 className="h3-tit">예비군 홈페이지 이용에 필요한 환경설정 변경을 안내합니다.</h3>
          <ul className="txt-list bl_dot">
            <li>예비군 홈페이지를 이용하기 위해서는 환경설정 변경이 필요할 수 있습니다.</li>
            <li>아래의 이용방법 안내에 따라 환경설정을 변경하십시오.</li>
          </ul>
          <h4 className="h4-tit">이용방법</h4>
          <p className="num-tit">
            <span className="num">1</span>신뢰할 수 있는 사이트 추가
            <br />- 인터넷창 상단의 도구 &gt; 인터넷옵션 &gt;보안탭 &gt; 신뢰할 수 있는 사이트에 예비군홈페이지 URL 추가
          </p>
          <div className="smart-certic-pic">
            <img src="/images/prm-setting-pic1.png" alt="신뢰할 수 있는 사이트 추가" />
          </div>
          <p className="num-tit">
            <span className="num">2</span> 팝업차단 해제 설정
            <br /> - 도구 &gt; 팝업차단 &gt; 팝업차단설정에서 허용할 웹사이트로 추가하거나
            <br /> - 도구 &gt; 팝업차단 &gt; 팝업차단 해제를 클릭해 주세요{" "}
          </p>
          <div className="smart-certic-pic">
            <img src="/images/prm-setting-pic2-1.png" alt="팝업차단 추가" />
            &nbsp;&nbsp;&nbsp; <img src="/images/common/step_arr_right.svg" alt="화살표" />
            &nbsp;&nbsp;&nbsp; <img src="/images/prm-setting-pic2-2.png" alt="팝업차단 해제" />
          </div>
          <p className="num-tit">
            <span className="num">3</span> 호환성 보기 설정
            <br /> - 도구 &gt; 호환성 보기 설정에서 예비군홈페이지를 추가해주세요{" "}
          </p>
          <div className="smart-certic-pic">
            <img src="/images/prm-setting-pic3-1.png" alt="호환성 보기 설정화면 진입경로" />
            &nbsp;&nbsp;&nbsp; <img src="/images/common/step_arr_right.svg" alt="화살표" />
            &nbsp;&nbsp;&nbsp; <img src="/images/prm-setting-pic3-2.png" alt="호환성 보기 설정 추가" />
          </div>
          <p className="num-tit">
            <span className="num">4</span> 인터넷 익스플로러 설정 확인
            <br /> -인터넷 옵션 <br /> 인터넷 익스플로러의 경우 연결설정에 따라 보안프로그램이 정상동작하지 않을 수
            있습니다.
            <br /> [인터넷 옵션]의 [연결]의 [LAN 설정]을 클릭하신 후 다음의 설정을 변경해 주세요.
            <br /> -LAN 설정 <br /> &quot;자동 구성 스크립트 사용&quot; 항목의 체크를 해제해 주세요.{" "}
          </p>
          <div className="smart-certic-pic">
            <img src="/images/prm-setting-pic4-1.png" alt="인터넷 옵션" />
            &nbsp;&nbsp;&nbsp; <img src="/images/common/step_arr_right.svg" alt="화살표" />
            &nbsp;&nbsp;&nbsp; <img src="/images/prm-setting-pic4-2.png" alt="LAN 설정" />
          </div>
          <p className="num-tit">
            <span className="num">5</span> 인터넷 익스플로러 보안 설정
            <br /> -인터넷 옵션 <br /> 인터넷 익스플로러의 경우 보안설정에 따라 보안프로그램이 정상동작하지 않을 수
            있습니다. <br /> [인터넷 옵션]의 [보안]을 클릭하신 후 다음의 설정을 변경해 주세요.
            <br /> -보안 <br /> 먼저 [인터넷]을 선택하시고 [사용자 지정 수준]을 클릭하세요
            <br /> -보안 설정 <br /> [설정] 창에서 &quot;다른 도메인 사이에서 창과 프레임 탐색&quot; 항목을
            &quot;사용&quot; 으로 선택하시고 [확인] 버튼을 눌러주세요.{" "}
          </p>
          <div className="smart-certic-pic">
            <img src="/images/prm-setting-pic5-1.png" alt="브라우저 설정 메뉴의 인터넷 설정" />
            &nbsp;&nbsp;&nbsp; <img src="/images/common/step_arr_right.svg" alt="화살표" />
            &nbsp;&nbsp;&nbsp;{" "}
            <img src="/images/prm-setting-pic5-2.png" alt="인터넷 옵션 > 보안 탭 > 인터넷 > 사용자 지정 수준" />
            &nbsp;&nbsp;&nbsp; <img src="/images/prm-setting-pic5-3.png" alt="보안 설정 > 다른 도메인 사용 체크" />
            &nbsp;&nbsp;&nbsp; <img src="/images/common/step_arr_right.svg" alt="화살표" />
            &nbsp;&nbsp;&nbsp;{" "}
            <img
              src="/images/prm-setting-pic5-4.png"
              alt="인터넷 옵션 > 보안 탭 > 신뢰할 수 있는 사이트 > 사용자 지정 수준"
            />
            &nbsp;&nbsp;&nbsp; <img src="/images/prm-setting-pic5-5.png" alt="보안 설정 > 다른 도메인 사용 체크" />
          </div>
          <p className="num-tit">
            <span className="num">6</span> 디버깅 툴 제거 <br /> 프로그램 설치 또는 실행시 시스템에 프로세스
            감시툴(디버깅툴)이 설치되어 있는 경우 설치진행이 안되는 경우가 <br />
            있습니다. 해당 프로그램을 제거하신 후 보안프로그램 설치를 진행해 주시거나 또는 컴퓨터를 재시작한 후 <br />
            다시 시도해 주세요.{" "}
          </p>
          <div className="smart-certic-pic">
            <img src="/images/prm-setting-pic6.png" alt="툴 제거" />
          </div>
          <p className="num-tit">
            <span className="num">7</span> 개인방화벽, 개인정보보호프로그램 등 설정 확인 업무진행이 안되는 경우
            Windows에서 보안프로그램의 동작을 막는 경우가 있습니다. 이 경우 재부팅 후 개인방화벽, 백신,
            개인정보보호프로그램 등을 임시로 중지시킨 후 다시 업무처리를 진행해 주세요.{" "}
          </p>
        </div>
      </section>
    </SubLayout>
  );
}
