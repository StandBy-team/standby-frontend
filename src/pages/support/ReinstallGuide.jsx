import SubLayout from "@/components/layout/SubLayout";

export default function ReinstallGuide() {
  return (
    <SubLayout title="증명서 발급 프로그램 재설치">
      <section>
        <div className="section-box">
          <ul className="txt-list bl_dot">
            <li>예비군 홈페이지 시스템 환경에 맞게 기본 설정을 먼저 수행합니다.</li>
            <li>모든 웹브라우저를 종료합니다.</li>
            <li>
              작업 표시줄의 돋보기를 클릭하고 &apos;프로그램 추가/제거&apos;를 검색합니다.
              <br />
              <img src="/images/login_error_img/program_add_remove.jpg" alt="프로그램 추가/제거 검색" width="600" />
            </li>
            <li>앱 및 기능의 검색창에 &apos;markany&apos;를 검색합니다.</li>
            <li>
              검색 결과에 나온 2개의 앱을 각각 클릭하여 &apos;제거&apos;를 클릭하면 프로그램이 삭제됩니다.
              <br />
              <img src="/images/login_error_img/search_markany.jpg" alt="증명서발급시스템 삭제" width="600" />
            </li>
            <li>
              다시 예비군홈페이지에 접속하여 Home &gt; 홈페이지 장애 문의 &gt; 설치 파일 메뉴에서 위변조 방지 솔루션
              프로그램을 내려받아 설치합니다.
            </li>
          </ul>
        </div>
      </section>
    </SubLayout>
  );
}
