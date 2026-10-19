import ROUTES from "@/constants/routes";

export const UNIT_BOARDS = {
  notices: { name: "소속부대 공지사항", list: ROUTES.MY_UNIT_NOTICES, detail: ROUTES.MY_UNIT_NOTICE_DETAIL },
  "training-notices": { name: "훈련안내", list: ROUTES.MY_TRAINING_NOTICES, detail: ROUTES.MY_TRAINING_NOTICE_DETAIL },
};
