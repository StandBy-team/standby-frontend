const ROUTES = {
  MAIN: "/",
  LOGIN: "/login",
  LOGIN_GUEST: "/login/guest",
  SITEMAP: "/sitemap",
  ERROR_INQUIRY: "/support/error-inquiry",
  SUPPORT_SETTINGS: "/support/settings",
  SUPPORT_REINSTALL: "/support/reinstall",
  SUPPORT_INSTALL_FILES: "/support/install-files",

  MY_TRAINING: "/my/training",
  MY_STANDING_RESERVE: "/my/training/standing-reserve",
  MY_UNIT_NOTICES: "/my/unit/notices",
  MY_UNIT_NOTICE_DETAIL: "/my/unit/notices/:id",
  MY_TRAINING_NOTICES: "/my/unit/training-notices",
  MY_TRAINING_NOTICE_DETAIL: "/my/unit/training-notices/:id",
  MY_QNA: "/my/unit/qna",
  MY_QNA_NEW: "/my/unit/qna/new",
  MY_QNA_DETAIL: "/my/unit/qna/:id",
  MY_QNA_EDIT: "/my/unit/qna/:id/edit",
  MY_FREE_BOARD: "/my/unit/free-board",
  MY_FREE_BOARD_NEW: "/my/unit/free-board/new",
  MY_FREE_BOARD_DETAIL: "/my/unit/free-board/:id",
  MY_PROFILE: "/my/profile",
  MY_AWARDS: "/my/awards",

  TRAINING_SELF_SELECT: "/training/self-select",
  TRAINING_NATIONWIDE: "/training/nationwide",
  TRAINING_NATIONWIDE_APPLY: "/training/nationwide/apply",
  TRAINING_HOLIDAY_SCHEDULE: "/training/holiday-schedule",
  TRAINING_HOLIDAY_APPLY: "/training/holiday/apply",
  TRAINING_RESULTS: "/training/results",
  TRAINING_RESULT_DETAIL: "/training/results/:id",

  DELAY_GUIDE: "/delay/guide",
  DELAY_APPLY: "/delay/apply",
  DELAY_RESULTS: "/delay/results",
  DELAY_RESULT_DETAIL: "/delay/results/:id",

  HOLD_GUIDE: "/hold/guide",
  HOLD_RELEASE_GUIDE: "/hold/release-guide",
  HOLD_RESULTS: "/hold/results",
  HOLD_RESULT_DETAIL: "/hold/results/:id",

  INFO_HISTORY: "/info/history",
  INFO_MISSION: "/info/mission",
  INFO_MARK: "/info/mark",
  INFO_SONG: "/info/song",
  INFO_STANDING_RESERVE: "/info/standing-reserve",
  INFO_PROMOTION: "/info/promotion",
  INFO_TREATMENT: "/info/treatment",
  LAW_RESERVE_FORCES: "/info/law/reserve-forces",
  LAW_EMERGENCY: "/info/law/emergency-preparedness",
  LAW_REQUISITION: "/info/law/requisition",
  LAW_ETC: "/info/law/etc",
  LAW_PENALTY: "/info/law/penalty",

  BOARD: "/board/:board",
  BOARD_DETAIL: "/board/:board/:nttId",
  FAQ: "/inform/faq",
  SELECTION: "/inform/selection",
  SELECTION_STANDING_RESERVE: "/inform/selection/standing-reserve",
  SELECTION_STAFF: "/inform/selection/staff",

  FIND_TRAINING_CENTER: "/find/training-center",
  FIND_TROOP: "/find/troop",

  POPUP_OFFICER_PROMOTION: "/popup/officer-promotion",
  POPUP_TECH_EXPERT: "/popup/tech-expert",
  POPUP_PRIVACY: "/popup/privacy",
  POPUP_TRAINING_CENTER_IMAGE: "/popup/training-center/:id",
};

export const boardPath = (board) => ROUTES.BOARD.replace(":board", board);

export const articlePath = (board, nttId) => ROUTES.BOARD_DETAIL.replace(":board", board).replace(":nttId", nttId);

/** Fills the `:id` segment of a detail route, e.g. detailPath(ROUTES.MY_QNA_DETAIL, "QA1"). */
export const detailPath = (route, id) => route.replace(":id", encodeURIComponent(id));

export default ROUTES;
