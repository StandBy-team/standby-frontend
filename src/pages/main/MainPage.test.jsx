import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import App from "@/App";
import { _fetch } from "@/api/_fetch";
import db from "@/api/mock/db.json";
import { removeLocalItem } from "@/utils/storage";

const visitHome = () => {
  window.history.pushState({}, "", "/");
  return render(<App />);
};

describe("main page", () => {
  beforeAll(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterAll(() => vi.restoreAllMocks());

  beforeEach(async () => {
    removeLocalItem("notice_seen");
    await _fetch("/api/auth/logout", { method: "POST" });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("shows hero slides with working controls", async () => {
    const { container } = visitHome();
    expect(await screen.findByRole("heading", { name: /스마트 국방!/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "다음 슬라이드" }));
    expect(container.querySelector(".home-hero-slide.is-active")).toHaveTextContent(db.mainSlides[1].eyebrow);

    fireEvent.click(screen.getByRole("button", { name: "자동 넘김 정지" }));
    expect(screen.getByRole("button", { name: "자동 넘김 시작" })).toBeInTheDocument();
  });

  it("switches board and media tabs", async () => {
    visitHome();
    const notice = db.boards.find((b) => b.key === "notice").articles[0];
    expect(await screen.findByText(notice.title)).toBeInTheDocument();
    expect(screen.queryByText(db.mainFaq[0].question)).not.toBeInTheDocument();

    fireEvent.click(await screen.findByRole("tab", { name: "자주 묻는 질문" }));
    expect(screen.getByText(db.mainFaq[0].question)).toBeInTheDocument();

    const [first, second] = db.mainMedia;
    expect(screen.getByText(first.items[0].title)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: second.label }));
    expect(screen.getByText(second.items[0].title)).toBeInTheDocument();
    expect(screen.queryByText(first.items[0].title)).not.toBeInTheDocument();
  });

  it("lists notices behind the bell and opens them in a dialog", async () => {
    visitHome();
    const bell = await screen.findByRole("button", { name: `알림, 새 알림 ${db.popups.length}건` });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(bell);
    fireEvent.click(screen.getByRole("button", { name: new RegExp(db.popups[0].title) }));
    const dialog = screen.getByRole("dialog", { name: db.popups[0].title });
    expect(dialog).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(screen.getByRole("button", { name: `알림, 새 알림 ${db.popups.length - 1}건` })).toBeInTheDocument();
  });

  it("opens one mega menu panel per section", async () => {
    const { container } = visitHome();
    const item = (await screen.findByRole("link", { name: "알림마당" })).closest("li");
    fireEvent.mouseEnter(item);
    expect(container.querySelectorAll(".hd-mega")).toHaveLength(1);
    expect(within(item).getByRole("link", { name: "카드뉴스" })).toBeInTheDocument();
  });

  it("shows the member card with the next training after login", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-15T09:00:00"));
    await _fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ method: "simple" }) });
    visitHome();

    expect(await screen.findByRole("heading", { name: "John Doe 님" })).toBeInTheDocument();
    expect(await screen.findByText("작계훈련(후반기) 1차")).toBeInTheDocument();
    expect(screen.getByText("2026.11.18")).toBeInTheDocument();
  });
});
