import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import App from "@/App";
import { _fetch } from "@/api/_fetch";
import ROUTES, { detailPath } from "@/constants/routes";

const visit = async (path, { login = true } = {}) => {
  await _fetch(`/api/auth/${login ? "login" : "logout"}`, { method: "POST", body: JSON.stringify({ method: "simple" }) });
  window.history.pushState({}, "", path);
  return render(<App />);
};

describe("sub page frame", () => {
  beforeAll(() => vi.spyOn(window, "scrollTo").mockImplementation(() => {}));
  afterAll(() => vi.restoreAllMocks());
  afterEach(cleanup);

  it("opens the active sidebar group, toggles others and links the breadcrumb", async () => {
    await visit(ROUTES.INFO_MISSION, { login: false });
    const nav = await screen.findByRole("navigation", { name: "예비군 제도 안내 메뉴" });
    expect(within(nav).getByRole("link", { name: "이념/임무" })).toHaveAttribute("aria-current", "page");

    const toggle = within(nav).getByRole("button", { name: "예비군 제도 하위메뉴 열기" });
    expect(within(nav).queryByRole("link", { name: "상비예비군 제도" })).not.toBeInTheDocument();
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(within(nav).getByRole("link", { name: "상비예비군 제도" })).toBeVisible();

    const crumb = screen.getByRole("navigation", { name: "현재 위치" });
    expect(within(crumb).getByRole("link", { name: "예비군 소개" })).toHaveAttribute("href", ROUTES.INFO_HISTORY);
    expect(within(crumb).getByText("이념/임무")).toHaveAttribute("aria-current", "page");
  });

  it("adds a Q&A shortcut to the chatbot button only when logged in", async () => {
    await visit(ROUTES.INFO_MISSION, { login: false });
    await screen.findByRole("link", { name: "챗봇 상담" });
    expect(screen.queryByRole("link", { name: "질의응답" })).not.toBeInTheDocument();
    cleanup();

    await visit(ROUTES.INFO_MISSION);
    expect(await screen.findByRole("link", { name: "질의응답" })).toHaveAttribute("href", ROUTES.MY_QNA);
  });
});

describe("/my pages", () => {
  beforeAll(() => vi.spyOn(window, "scrollTo").mockImplementation(() => {}));
  afterAll(() => vi.restoreAllMocks());
  afterEach(cleanup);

  it("shows profile errors inline and saves after confirmation", async () => {
    await visit(ROUTES.MY_PROFILE);
    const emailId = await screen.findByLabelText("E-mail");
    fireEvent.change(emailId, { target: { value: "bad id" } });
    fireEvent.click(screen.getByRole("button", { name: "저장" }));

    expect(await screen.findByText("E-mail 형식이 올바르지 않습니다.")).toBeInTheDocument();
    expect(emailId).toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();

    fireEvent.change(emailId, { target: { value: "john.doe" } });
    expect(screen.queryByText("E-mail 형식이 올바르지 않습니다.")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "저장" }));
    const dialog = await screen.findByRole("alertdialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "확인" }));
    expect(await screen.findByText("저장되었습니다.")).toBeInTheDocument();
  });

  it("asks for consent before showing the call-up notice", async () => {
    await visit(ROUTES.MY_TRAINING);
    fireEvent.click(await screen.findByRole("button", { name: "소집통지서" }));
    const dialog = await screen.findByRole("dialog", { name: "소집통지서 출력 안내" });

    fireEvent.click(within(dialog).getByRole("button", { name: "동의" }));
    expect(within(dialog).getByRole("alert")).toHaveTextContent("동의란에 체크하신 후");

    fireEvent.click(within(dialog).getByRole("checkbox"));
    fireEvent.click(within(dialog).getByRole("button", { name: "동의" }));
    const frame = await screen.findByTitle("소집통지서");
    expect(frame.getAttribute("srcdoc")).toContain("예비군 훈련 소집통지서");
    expect(screen.getByRole("button", { name: "인쇄" })).toBeEnabled();
  });

  it("keeps private Q&A posts closed with a toast", async () => {
    await visit(ROUTES.MY_QNA);
    const locked = (await screen.findAllByRole("img", { name: "비공개" }))[0].closest("tr");
    fireEvent.click(locked);
    expect(await screen.findByText("비공개 글은 작성자만 조회할 수 있습니다.")).toBeInTheDocument();
    expect(window.location.pathname).toBe(ROUTES.MY_QNA);
  });

  it("lets the writer reply to a Q&A comment and shows the new status", async () => {
    await visit(detailPath(ROUTES.MY_QNA_DETAIL, "QA1969"));
    expect(await screen.findByText("답변 요약")).toBeInTheDocument();
    expect(screen.getByText("답변완료")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "답글 달기" }));
    const input = screen.getByLabelText("개포1동대장 댓글에 답글 작성");
    await waitFor(() => expect(input).toHaveFocus());
    const form = input.closest("form");
    fireEvent.click(within(form).getByRole("button", { name: "등록" }));
    expect(await within(form).findByText("댓글 내용을 입력하세요.")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "훈련 당일 준비물도 알려주세요." } });
    fireEvent.click(within(form).getByRole("button", { name: "등록" }));
    expect(await screen.findByText("댓글이 등록되었습니다.")).toBeInTheDocument();
    expect(screen.getByText("훈련 당일 준비물도 알려주세요.")).toBeInTheDocument();
    expect(screen.getByText("추가문의")).toBeInTheDocument();
    expect(screen.getByText(/담당자에게 전달했습니다/)).toBeInTheDocument();
    expect(screen.queryByLabelText("개포1동대장 댓글에 답글 작성")).not.toBeInTheDocument();
  });

  it("shows AI answers with their sources and keeps handoff messages reply-free", async () => {
    await visit(detailPath(ROUTES.MY_QNA_DETAIL, "QA1976"));
    expect(await screen.findByText("답변 근거")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "훈련 연기 안내" })).toHaveAttribute("href", ROUTES.DELAY_GUIDE);
    expect(screen.getByRole("button", { name: "답글 달기" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "수정" })).not.toBeInTheDocument();
    cleanup();

    await visit(detailPath(ROUTES.MY_QNA_DETAIL, "QA1994"));
    expect(await screen.findByText(/담당자에게 전달했습니다/)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "답글 달기" })).toHaveLength(1);
    cleanup();

    await visit(detailPath(ROUTES.MY_QNA_DETAIL, "QA1977"));
    expect(await screen.findByText("사전작성")).toBeInTheDocument();
    expect(screen.getByText(/담당자가 미리 작성한 답변을 AI가 그대로 안내했습니다/)).toHaveTextContent("셔틀버스 신청 및 안내문자");
  });

  it("keeps Q&A comments closed to other members", async () => {
    await visit(detailPath(ROUTES.MY_QNA_DETAIL, "QA1998"));
    expect(await screen.findByText("댓글은 게시글 작성자와 담당자만 작성할 수 있습니다.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "답글 달기" })).not.toBeInTheDocument();
    expect(screen.queryByLabelText("댓글 작성")).not.toBeInTheDocument();
  });

  it("edits and deletes the writer's own Q&A post before staff comments", async () => {
    await visit(detailPath(ROUTES.MY_QNA_DETAIL, "QA1994"));
    fireEvent.click(await screen.findByRole("button", { name: "수정" }));
    const title = await screen.findByLabelText(/제목/);
    expect(title).toHaveValue("교육필증 발급 문의");
    expect(screen.getByLabelText(/질의내용/)).toHaveValue("훈련 관련하여 문의드립니다.\n확인 부탁드립니다.");

    fireEvent.change(title, { target: { value: "교육필증 재발급 문의" } });
    fireEvent.click(screen.getByRole("button", { name: "저장" }));
    fireEvent.click(within(await screen.findByRole("alertdialog")).getByRole("button", { name: "확인" }));
    expect(await screen.findByRole("heading", { name: "교육필증 재발급 문의" })).toBeInTheDocument();
    expect(window.location.pathname).toBe(detailPath(ROUTES.MY_QNA_DETAIL, "QA1994"));

    fireEvent.click(screen.getByRole("button", { name: "삭제" }));
    fireEvent.click(within(await screen.findByRole("alertdialog")).getByRole("button", { name: "확인" }));
    expect(await screen.findByText("삭제되었습니다.")).toBeInTheDocument();
    expect(window.location.pathname).toBe(ROUTES.MY_QNA);
    cleanup();

    await visit(detailPath(ROUTES.MY_QNA_DETAIL, "QA1983"));
    await screen.findByText("답변 요약");
    expect(screen.queryByRole("button", { name: "수정" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "삭제" })).not.toBeInTheDocument();
  });

  it("validates the write form inline", async () => {
    await visit(ROUTES.MY_FREE_BOARD_NEW);
    fireEvent.click(await screen.findByRole("button", { name: "저장" }));
    expect(await screen.findByText("제목을 입력하세요.")).toBeInTheDocument();
    expect(screen.getByText("내용을 입력하세요.")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText(/제목/)).toHaveFocus());
  });
});
