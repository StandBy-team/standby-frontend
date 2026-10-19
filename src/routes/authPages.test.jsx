import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import App from "@/App";
import { _fetch } from "@/api/_fetch";
import ROUTES, { detailPath } from "@/constants/routes";

const PAGES = [
  [ROUTES.MY_TRAINING, "훈련정보"],
  [ROUTES.MY_STANDING_RESERVE, "상비예비군 편성 이력"],
  [ROUTES.MY_UNIT_NOTICES, "소속부대 공지사항"],
  [detailPath(ROUTES.MY_UNIT_NOTICE_DETAIL, "UN1000"), "첨부파일"],
  [ROUTES.MY_TRAINING_NOTICES, "훈련안내"],
  [detailPath(ROUTES.MY_TRAINING_NOTICE_DETAIL, "TN1000"), "첨부파일"],
  [ROUTES.MY_QNA, "처리결과"],
  [ROUTES.MY_QNA_NEW, "질의내용"],
  [detailPath(ROUTES.MY_QNA_DETAIL, "QA1998"), "답변 요약"],
  [detailPath(ROUTES.MY_QNA_EDIT, "QA1994"), "질의내용"],
  [ROUTES.MY_FREE_BOARD, "게시자"],
  [ROUTES.MY_FREE_BOARD_NEW, "공개여부"],
  [detailPath(ROUTES.MY_FREE_BOARD_DETAIL, "FB3000"), "게시일자"],
  [ROUTES.MY_PROFILE, "소집통지서 수신 방법"],
  [ROUTES.MY_AWARDS, "상훈 이력이 없습니다."],
  [ROUTES.TRAINING_NATIONWIDE_APPLY, "훈련 신청 내용"],
  [ROUTES.TRAINING_HOLIDAY_APPLY, "훈련 신청 내용"],
  [ROUTES.TRAINING_RESULTS, "처리결과"],
  [detailPath(ROUTES.TRAINING_RESULT_DETAIL, "TA202606250001"), "신청훈련장"],
  [ROUTES.DELAY_APPLY, "희망연기기간"],
  [ROUTES.DELAY_RESULTS, "검색된 데이터가 없습니다."],
  [ROUTES.HOLD_RESULTS, "보류자 신청"],
  [detailPath(ROUTES.HOLD_RESULT_DETAIL, "HA202603240001"), "보류 처리결과 내용"],
];

const visit = (path) => {
  window.history.pushState({}, "", path);
  return render(<App />);
};

describe("login-only pages", () => {
  beforeAll(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterAll(() => vi.restoreAllMocks());

  it("redirects anonymous visitors to the login page", async () => {
    await _fetch("/api/auth/logout", { method: "POST" });
    visit(ROUTES.MY_TRAINING);
    expect(await screen.findByText("간편인증 로그인")).toBeInTheDocument();
    expect(window.location.pathname).toBe(ROUTES.LOGIN);
    cleanup();
  });

  it.each(PAGES)("renders %s after login", async (path, text) => {
    await _fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ method: "simple" }) });
    visit(path);
    expect((await screen.findAllByText(text, {}, { timeout: 3000 })).length).toBeGreaterThan(0);
    expect(screen.getByText("님 환영합니다.", { exact: false })).toBeInTheDocument();
    cleanup();
  });
});
