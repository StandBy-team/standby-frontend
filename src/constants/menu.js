import ROUTES, { boardPath } from "./routes";

/*
 * Navigation structure shared by the GNB, LNB, breadcrumb and sitemap.
 * Section shape: { key, label, crumb, lnbTitle?, lnbClass?, link?, items }
 * Item shape: { label, path | href | popup, auth?, locked?, gnbLabel?, sitemapLabel?, sitemapHidden?, expanded?, children? }
 *   auth   - the page requires login; anonymous visitors are sent to the login page first
 *   locked - login-only page that is not implemented yet (see MISSING_PAGES.md); links to the login page
 *   href  - external site, opened in a new window
 *   popup - opened with window.open (see utils/popup.js)
 */

export const POPUPS = {
  officerPromotion: { path: ROUTES.POPUP_OFFICER_PROMOTION, name: "op", width: 900, height: 950 },
  techExpert: { path: ROUTES.POPUP_TECH_EXPERT, name: "expert", width: 900, height: 800 },
  privacy: { path: ROUTES.POPUP_PRIVACY, name: "privacy", width: 825, height: 685 },
};

const locked = (label, extra) => ({ label, path: ROUTES.LOGIN, auth: true, locked: true, ...extra });

const mine = (label, path, extra) => ({ label, path, auth: true, ...extra });

export const SECTIONS = [
  {
    key: "my",
    label: "나의 훈련정보",
    crumb: "나의 훈련정보",
    lnbClass: "lnb-bg2",
    items: [
      mine("훈련 정보", ROUTES.MY_TRAINING, {
        gnbLabel: "훈련정보",
        children: [mine("훈련정보", ROUTES.MY_TRAINING), mine("상비예비군", ROUTES.MY_STANDING_RESERVE)],
      }),
      mine("소속부대 알림", ROUTES.MY_UNIT_NOTICES, {
        gnbLabel: "소속부대알림",
        children: [
          mine("소속부대 공지사항", ROUTES.MY_UNIT_NOTICES),
          mine("훈련안내", ROUTES.MY_TRAINING_NOTICES),
          mine("나의 질의응답", ROUTES.MY_QNA),
          mine("자유게시판", ROUTES.MY_FREE_BOARD),
        ],
      }),
      mine("개인정보수정", ROUTES.MY_PROFILE, { sitemapHidden: true }),
      mine("예비군 상훈", ROUTES.MY_AWARDS, { sitemapHidden: true }),
    ],
  },
  {
    key: "training",
    label: "훈련 신청",
    crumb: "훈련신청",
    lnbTitle: "훈련신청",
    sitemapLabel: "훈련신청",
    link: { path: ROUTES.TRAINING_NATIONWIDE },
    items: [
      { label: "훈련일정 자율선택이란?", path: ROUTES.TRAINING_SELF_SELECT },
      locked("훈련일정 자율선택"),
      locked("훈련일정 본인선택제 훈련신청"),
      { label: "휴일 및 전국단위 훈련이란?", gnbLabel: "휴일/전국단위 훈련이란?", path: ROUTES.TRAINING_NATIONWIDE },
      mine("전국단위 훈련신청", ROUTES.TRAINING_NATIONWIDE_APPLY),
      { label: "휴일예비군 훈련일정 조회", path: ROUTES.TRAINING_HOLIDAY_SCHEDULE },
      mine("휴일예비군 훈련신청", ROUTES.TRAINING_HOLIDAY_APPLY),
      mine("훈련신청 결과", ROUTES.TRAINING_RESULTS),
    ],
  },
  {
    key: "delay",
    label: "훈련 연기",
    crumb: "훈련연기",
    lnbTitle: "훈련연기",
    items: [
      { label: "훈련연기란?", gnbLabel: "훈련 연기란?", sitemapLabel: "훈련 연기란?", path: ROUTES.DELAY_GUIDE },
      mine("훈련연기 신청", ROUTES.DELAY_APPLY, { gnbLabel: "훈련 연기신청", sitemapLabel: "훈련 연기신청" }),
      mine("연기신청 결과", ROUTES.DELAY_RESULTS),
    ],
  },
  {
    key: "hold",
    label: "보류·해소",
    crumb: "보류·해소",
    items: [
      { label: "보류란?", path: ROUTES.HOLD_GUIDE },
      locked("보류 신청"),
      { label: "보류해소란?", path: ROUTES.HOLD_RELEASE_GUIDE },
      locked("해소 신청"),
      mine("보류·해소 신청결과", ROUTES.HOLD_RESULTS),
    ],
  },
  {
    key: "info",
    label: "예비군 제도안내",
    crumb: "예비군 제도 안내",
    lnbTitle: "예비군 제도 안내",
    lnbClass: "lnb-bg6",
    sitemapLabel: "예비군 제도 안내",
    items: [
      {
        label: "예비군 소개",
        path: ROUTES.INFO_HISTORY,
        children: [
          { label: "연혁/활동", path: ROUTES.INFO_HISTORY },
          { label: "이념/임무", path: ROUTES.INFO_MISSION },
          { label: "예비군 마크", path: ROUTES.INFO_MARK },
          { label: "예비군 군가", path: ROUTES.INFO_SONG },
        ],
      },
      {
        label: "예비군 제도",
        path: ROUTES.INFO_STANDING_RESERVE,
        children: [
          { label: "상비예비군 제도", path: ROUTES.INFO_STANDING_RESERVE },
          { label: "예비역 간부 진급 및 임용 안내", path: ROUTES.INFO_PROMOTION },
          { label: "치료 및 휴업보상 제도", path: ROUTES.INFO_TREATMENT },
        ],
      },
      {
        label: "관련 법령",
        path: ROUTES.LAW_RESERVE_FORCES,
        children: [
          { label: "예비군법", path: ROUTES.LAW_RESERVE_FORCES },
          { label: "비상대비에 관한 법률", path: ROUTES.LAW_EMERGENCY },
          { label: "징발법", sitemapLabel: "징발법(시행령 포함)", path: ROUTES.LAW_REQUISITION },
          { label: "기타규정", path: ROUTES.LAW_ETC },
          { label: "훈련 위반 처벌 규정", path: ROUTES.LAW_PENALTY },
        ],
      },
    ],
  },
  {
    key: "inform",
    label: "알림마당",
    crumb: "알림마당",
    items: [
      { label: "공지사항", path: boardPath("notice") },
      { label: "카드뉴스", path: boardPath("cardnews") },
      { label: "국방영상", path: boardPath("video") },
      { label: "자주 묻는 질문", path: ROUTES.FAQ },
      locked("사이버 설문 조사"),
      locked("혁신 아이디어 공모전"),
      {
        label: "선발 안내 및 신청",
        path: ROUTES.SELECTION,
        expanded: true,
        children: [
          { label: "예비역 간부 진급 및 임용 신청", popup: POPUPS.officerPromotion },
          { label: "상비예비군 지원접수", path: ROUTES.SELECTION_STANDING_RESERVE },
          locked("주요직위자 신청"),
          { label: "예비전력관리 업무담당자 선발", path: ROUTES.SELECTION_STAFF },
          { label: "군병과 경력인증 범위", href: "http://www.q-net.or.kr/crf006.do?id=crf00641&gSite=Q&gId=" },
          { label: "예비전력 첨단기술 전문가 신청", popup: POPUPS.techExpert },
        ],
      },
    ],
  },
  {
    key: "find",
    label: "훈련장 및 부대 찾기",
    crumb: "훈련장 및 부대 찾기",
    lnbTitle: "훈련장·부대 찾기",
    items: [
      { label: "예비군 훈련장 찾기", path: ROUTES.FIND_TRAINING_CENTER },
      { label: "예비군부대 찾기", path: ROUTES.FIND_TROOP },
    ],
  },
];

// Sections that only appear through the LNB (not in the GNB).
export const STANDALONE_SECTIONS = [
  {
    key: "login",
    lnbTitle: "로그인",
    items: [
      { label: "로그인", path: ROUTES.LOGIN },
      { label: "로그인(민간인)", path: ROUTES.LOGIN_GUEST },
    ],
  },
  {
    key: "sitemap",
    lnbTitle: "사이트맵",
    lnbClass: "lnb-bg6",
    items: [{ label: "사이트맵", path: ROUTES.SITEMAP }],
  },
  {
    key: "support",
    lnbTitle: "홈페이지 장애 문의",
    lnbClass: "lnb-bg5",
    lnbTitleSmall: true,
    crumb: "홈페이지 장애 문의",
    items: [
      { label: "장애 문의", path: ROUTES.ERROR_INQUIRY },
      { label: "환경설정 변경 안내", path: ROUTES.SUPPORT_SETTINGS },
      { label: "증명서 발급 프로그램 재설치", path: ROUTES.SUPPORT_REINSTALL },
      { label: "설치 파일", path: ROUTES.SUPPORT_INSTALL_FILES },
    ],
  },
];

// Sitemap columns: [sectionKey, extra class for vertical spacing]
export const SITEMAP_COLUMNS = [
  [["my"], ["delay", "mt55"], ["inform", "mt88"]],
  [["training"], ["hold", "mt55"], ["find", "mt55"]],
  [["info"]],
];

export const MAIN_QUICK_LINKS = [
  {
    label: "나의 정보",
    image: "/images/main/banner-mypage.svg",
    items: [
      mine("훈련 정보", ROUTES.MY_TRAINING),
      mine("소속부대 공지사항", ROUTES.MY_UNIT_NOTICES),
      mine("나의 질의 응답", ROUTES.MY_QNA),
      mine("개인정보 수정", ROUTES.MY_PROFILE),
      mine("예비군 상훈", ROUTES.MY_AWARDS),
    ],
  },
  {
    label: "훈련 신청",
    image: "/images/main/banner-request.svg",
    items: [
      locked("훈련일정 자율선택"),
      mine("전국단위 훈련신청", ROUTES.TRAINING_NATIONWIDE_APPLY),
      mine("휴일예비군 훈련신청", ROUTES.TRAINING_HOLIDAY_APPLY),
      mine("훈련연기 신청", ROUTES.DELAY_APPLY),
      { label: "훈련 보류·해소 신청", path: ROUTES.HOLD_GUIDE },
    ],
  },
  {
    label: "조회 서비스",
    image: "/images/main/banner-service.svg",
    items: [
      mine("신청결과 확인", ROUTES.TRAINING_RESULTS),
      // Call-up notices and certificates are printed from the buttons on the training info page.
      mine("소집통지서 인쇄", ROUTES.MY_TRAINING),
      mine("교육필증 인쇄", ROUTES.MY_TRAINING),
      { label: "훈련장 찾기", path: ROUTES.FIND_TRAINING_CENTER },
      { label: "예비군 부대 찾기", path: ROUTES.FIND_TROOP },
    ],
  },
];

export const MAIN_SIMPLE_AUTH_ICONS = [
  { name: "kakao", image: "/images/main/kakao.png" },
  { name: "kb", image: "/images/main/kb.png" },
  { name: "pass", image: "/images/main/pass.png" },
  { name: "samsung", image: "/images/main/samsung.png" },
  { name: "naver", image: "/images/main/naver.png" },
  { name: "shinhan", image: "/images/main/shinhan.png" },
];

export const MAIN_QUICK_MENU = [
  locked("훈련일정\n자율선택"),
  mine("전국단위\n훈련신청", ROUTES.TRAINING_NATIONWIDE_APPLY),
  mine("휴일예비군\n훈련신청", ROUTES.TRAINING_HOLIDAY_APPLY),
  {
    label: "훈련연기\n보류신청",
    children: [mine("훈련연기 신청", ROUTES.DELAY_APPLY), locked("훈련보류 신청")],
  },
  mine("훈련신청\n결과확인", ROUTES.TRAINING_RESULTS),
  { label: "훈련장\n찾기", path: ROUTES.FIND_TRAINING_CENTER },
  { label: "예비군 부대\n찾기", path: ROUTES.FIND_TROOP },
  mine("소집통지서 및\n교육필증 인쇄", ROUTES.MY_TRAINING),
  { label: "훈련 위반\n처벌 규정", path: ROUTES.LAW_PENALTY },
  { label: "국방민원\n신청하기", href: "https://mnd.go.kr/mnd/99/subview.do" },
];

export const MAIN_SELECTION = [
  { label: "예비역 간부 진급 및 임용 신청", popup: POPUPS.officerPromotion },
  { label: "상비예비군 지원접수", path: ROUTES.SELECTION_STANDING_RESERVE },
  locked("주요직위자 신청"),
  { label: "예비전력관리 담당자 선발 안내", path: ROUTES.SELECTION_STAFF },
  { label: "군 병과 경력인증 범위 안내", href: "http://www.q-net.or.kr/crf006.do?id=crf00641&gSite=Q&gId=" },
  { label: "예비전력 첨단기술 전문가 신청", popup: POPUPS.techExpert },
];

export const FOOTER_TEXT_LINKS = [
  { label: "예비군 훈련 문의", path: ROUTES.FIND_TROOP },
  { label: "홈페이지 장애 문의", path: ROUTES.ERROR_INQUIRY },
  { label: "사이트맵", path: ROUTES.SITEMAP },
];

export const FOOTER_ORG_LINKS = [
  { href: "http://www.mnd.go.kr/", image: "/images/common/ft-link-1.png", alt: "대한민국 국방부" },
  { href: "http://www.mma.go.kr/", image: "/images/common/ft-link-2.svg", alt: "병무청" },
];

export const FOOTER_APP_LINKS = [
  { href: "https://itunes.apple.com/kr/app/yebigun/id501320155", image: "/images/btn/btn-ios.svg", alt: "ios" },
  {
    href: "https://play.google.com/store/apps/details?id=com.yebigun4.ex",
    image: "/images/btn/btn-and.svg",
    alt: "안드로이드",
  },
];

export const CHATBOT_LINK = "https://chatbot.gov.kt-aicc.com/client/GCL-02-C-00000046-0001/chat.html";

export const MMA_LINK = "http://www.mma.go.kr";

/**
 * Finds the section and the item chain (top-level -> leaf) matching a pathname.
 * Pages without their own entry (detail, write) fall back to the closest parent path, e.g. /board/notice/1 -> /board/notice.
 */
export function findMenuTrail(pathname) {
  for (let path = pathname; path; path = path.replace(/\/[^/]*$/, "")) {
    const found = findExactTrail(path);
    if (found) return found;
  }
  return null;
}

function findExactTrail(pathname) {
  const sections = [...SECTIONS, ...STANDALONE_SECTIONS];
  const walk = (items, trail) => {
    for (const item of items) {
      const next = [...trail, item];
      if (item.children) {
        const found = walk(item.children, next);
        if (found) return found;
      }
      if (item.path && !item.locked && item.path === pathname) return next;
    }
    return null;
  };
  for (const section of sections) {
    const trail = walk(section.items, []);
    if (trail) return { section, trail };
  }
  return null;
}
