// @vitest-environment node
import { afterAll, beforeAll, beforeEach, describe, it, expect, vi } from "vitest";
import { _fetch } from "./_fetch";

describe("_fetch", () => {
  it("returns a real Response with JSON for a known route", async () => {
    const res = await _fetch("/api/boards/notice");
    expect(res).toBeInstanceOf(Response);
    expect(res.ok).toBe(true);
    expect(res.headers.get("Content-Type")).toContain("application/json");
    expect(await res.json()).toMatchObject({ key: "notice", name: "공지사항" });
  });

  it("accepts URL and Request inputs like fetch", async () => {
    const fromUrl = await _fetch(new URL("http://localhost/api/regions"));
    expect(fromUrl.ok).toBe(true);
    const fromRequest = await _fetch(new Request("http://localhost/api/troops/sido"));
    expect((await fromRequest.json()).length).toBeGreaterThan(0);
  });

  it("paginates and searches board articles", async () => {
    const page2 = await (await _fetch("/api/boards/notice/articles?page=2&size=10")).json();
    expect(page2.page).toBe(2);
    expect(page2.items).toHaveLength(10);
    expect(page2.items[0]).not.toHaveProperty("body");

    const found = await (await _fetch("/api/boards/notice/articles?searchCnd=0&searchWrd=훈련연기")).json();
    expect(found.total).toBeGreaterThan(0);
    expect(found.items.every((a) => a.title.includes("훈련연기"))).toBe(true);
  });

  it("returns article detail and 404 for unknown resources", async () => {
    const list = await (await _fetch("/api/boards/cardnews/articles?size=1")).json();
    const detail = await (await _fetch(`/api/boards/cardnews/articles/${list.items[0].nttId}`)).json();
    expect(detail.article.images.length).toBeGreaterThan(0);

    expect((await _fetch("/api/boards/cardnews/articles/0")).status).toBe(404);
    expect((await _fetch("/api/unknown")).status).toBe(404);
    expect((await _fetch("/api/main", { method: "POST" })).status).toBe(404);
  });

  it("serves the main page, notices and site info", async () => {
    const main = await (await _fetch("/api/main")).json();
    expect(Object.keys(main).sort()).toEqual(["banners", "faq", "mediaTabs", "notices", "slides"]);
    expect(main.notices).toHaveLength(5);
    expect(main.slides[0]).toMatchObject({ id: expect.any(String), title: expect.any(String), link: expect.any(Object) });

    const popups = await (await _fetch("/api/popups")).json();
    const dates = popups.map((p) => p.postedAt);
    expect(dates).toEqual([...dates].sort().reverse());

    const site = await (await _fetch("/api/site-info")).json();
    expect(site.relatedSites.length).toBeGreaterThan(0);
    expect(site.sns.every((s) => s.href.startsWith("https://"))).toBe(true);
  });

  it("serves training documents as HTML only to the logged-in member", async () => {
    await _fetch("/api/auth/logout", { method: "POST" });
    expect((await _fetch("/api/me/trainings/T20261118/call-up-notice")).status).toBe(401);

    await _fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ method: "simple" }) });
    const notice = await _fetch("/api/me/trainings/T20261118/call-up-notice");
    expect(notice.headers.get("Content-Type")).toContain("text/html");
    expect(await notice.text()).toContain("소집통지서");
    expect((await _fetch("/api/me/trainings/T20260706/certificate")).status).toBe(200);
    // T20261118 has no certificate yet, and unknown kinds are rejected.
    expect((await _fetch("/api/me/trainings/T20261118/certificate")).status).toBe(404);
    expect((await _fetch("/api/me/trainings/T20261118/receipt")).status).toBe(404);

    const list = await (await _fetch("/api/me/unit/notices?size=20")).json();
    expect(list.items.some((p) => p.hasAttachment)).toBe(true);
    expect(list.items[0]).not.toHaveProperty("attachments");
  });

  it("filters training centers and holiday trainings", async () => {
    const seoul = await (await _fetch("/api/training-centers?sido=11&size=100")).json();
    expect(seoul.total).toBeGreaterThan(0);
    expect(seoul.items.every((c) => c.sidoCode === "11")).toBe(true);

    const scheduled = await (await _fetch("/api/holiday-trainings?sido=41&onlyScheduled=Y")).json();
    expect(scheduled.every((t) => t.schedules.length > 0)).toBe(true);
  });

  it("rejects with AbortError when the signal is aborted", async () => {
    const controller = new AbortController();
    const pending = _fetch("/api/main", { signal: controller.signal });
    controller.abort();
    await expect(pending).rejects.toMatchObject({ name: "AbortError" });
  });
});

const getJson = async (url, init) => (await _fetch(url, init)).json();

const send = (url, method, body) =>
  _fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

describe("_fetch logged-in routes", () => {
  beforeAll(() => {
    // Mock training plans are dated around October 2026.
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-13T10:00:00"));
  });

  afterAll(() => vi.useRealTimers());

  beforeEach(async () => {
    await send("/api/auth/logout", "POST");
  });

  it("requires a session for /me routes and manages it through /auth", async () => {
    expect((await _fetch("/api/me/training")).status).toBe(401);
    expect((await _fetch("/api/auth/me")).status).toBe(401);

    const user = await (await send("/api/auth/login", "POST", { method: "simple" })).json();
    expect(user).toMatchObject({ name: "John Doe", unit: { name: expect.any(String) } });
    expect(user.expiresAt).toBeGreaterThan(Date.now());

    expect((await getJson("/api/auth/me")).name).toBe("John Doe");
    const training = await getJson("/api/me/training");
    expect(training.member.name).toBe("John Doe");
    expect(training.trainings.length).toBeGreaterThan(0);

    await send("/api/auth/logout", "POST");
    expect((await _fetch("/api/me/profile")).status).toBe(401);
  });

  it("updates only editable profile fields", async () => {
    await send("/api/auth/login", "POST", { method: "simple" });
    const updated = await (
      await send("/api/me/profile", "PUT", { name: "Someone Else", homePhone: "02-000-0000" })
    ).json();
    expect(updated.name).toBe("John Doe");
    expect(updated.homePhone).toBe("02-000-0000");

    const invalid = await send("/api/me/profile", "PUT", { outingStart: "2026-12-01", outingEnd: "2026-11-01" });
    expect(invalid.status).toBe(400);
    expect((await invalid.json()).message).toContain("출타");
  });

  it("filters, creates and protects unit Q&A posts", async () => {
    await send("/api/auth/login", "POST", { method: "simple" });
    const unanswered = await getJson("/api/me/unit/qna?status=pending&size=100");
    expect(unanswered.items.every((q) => q.status === "pending")).toBe(true);
    expect(unanswered.items[0]).not.toHaveProperty("body");
    expect(unanswered.items[0]).not.toHaveProperty("comments");
    expect(unanswered.items[0]).toHaveProperty("commentCount");
    // QA2000 holds only an AI handoff.
    expect(unanswered.items.find((q) => q.id === "QA2000").commentCount).toBe(0);

    expect((await send("/api/me/unit/qna", "POST", { title: "", body: "x" })).status).toBe(400);
    const created = await (await send("/api/me/unit/qna", "POST", { title: "새 질문", body: "내용", public: false })).json();
    expect(created).toMatchObject({ mine: true, public: false, writer: "J*****e" });
    expect((await getJson("/api/me/unit/qna?searchType=TITLE&searchWrd=새 질문")).total).toBe(1);
    const fetched = await getJson(`/api/me/unit/qna/${created.id}`);
    expect(fetched).toMatchObject({ title: "새 질문", status: "pending", canComment: true });
    expect(fetched.comments).toMatchObject([{ role: "ai", kind: "handoff" }]);
    const handoffReply = await send(`/api/me/unit/qna/${created.id}/comments`, "POST", { body: "x", parentId: fetched.comments[0].id });
    expect(handoffReply.status).toBe(400);

    const all = await getJson("/api/me/unit/qna?size=100");
    const othersPrivate = all.items.find((q) => !q.public && !q.mine);
    const forbidden = await _fetch(`/api/me/unit/qna/${othersPrivate.id}`);
    expect(forbidden.status).toBe(403);
  });

  it("lets the writer edit or delete a Q&A post until it is answered", async () => {
    await send("/api/auth/login", "POST", { method: "simple" });
    const created = await (
      await send("/api/me/unit/qna", "POST", { title: "수정 전", body: "첫 줄\n<둘째 줄>", email: "john.doe@example.com" })
    ).json();
    // Only the AI handoff so far, plus the writer's own comment.
    expect(created).toMatchObject({ canEdit: true, email: "joh*****@example.com" });
    const withComment = await (await send(`/api/me/unit/qna/${created.id}/comments`, "POST", { body: "보충 설명" })).json();
    expect(withComment.canEdit).toBe(true);
    expect(created.body).toBe("<p>첫 줄</p><p>&lt;둘째 줄&gt;</p>");
    expect(await getJson(`/api/me/unit/qna/${created.id}/edit`)).toEqual({
      title: "수정 전",
      body: "첫 줄\n<둘째 줄>",
      email: "john.doe@example.com",
      public: true,
    });

    const updated = await (await send(`/api/me/unit/qna/${created.id}`, "PUT", { title: "수정 후", body: "내용", public: false })).json();
    expect(updated).toMatchObject({ title: "수정 후", body: "<p>내용</p>", public: false });
    expect((await send(`/api/me/unit/qna/${created.id}`, "DELETE")).status).toBe(200);
    expect((await _fetch(`/api/me/unit/qna/${created.id}`)).status).toBe(404);

    const all = await getJson("/api/me/unit/qna?size=100");
    const staffCommented = await getJson(`/api/me/unit/qna/${all.items.find((q) => q.mine && q.status === "answered").id}`);
    expect(staffCommented.canEdit).toBe(false);
    expect((await send(`/api/me/unit/qna/${staffCommented.id}`, "DELETE")).status).toBe(403);
    expect((await getJson("/api/me/unit/qna/QA1976")).canEdit).toBe(false);
    const templated = await (await send("/api/me/unit/qna", "POST", { title: "셔틀버스 문의", body: "신청 방법" })).json();
    expect(templated.canEdit).toBe(false);
    expect((await send(`/api/me/unit/qna/${templated.id}`, "PUT", { title: "x", body: "y" })).status).toBe(403);
    const others = all.items.find((q) => q.public && !q.mine);
    expect((await _fetch(`/api/me/unit/qna/${others.id}/edit`)).status).toBe(403);
  });

  it("lets the writer comment and reply on their Q&A post", async () => {
    await send("/api/auth/login", "POST", { method: "simple" });
    const all = await getJson("/api/me/unit/qna?size=100");
    const others = all.items.find((q) => q.public && !q.mine);
    expect((await getJson(`/api/me/unit/qna/${others.id}`)).canComment).toBe(false);
    expect((await send(`/api/me/unit/qna/${others.id}/comments`, "POST", { body: "x" })).status).toBe(403);

    const answered = all.items.find((q) => q.mine && q.status === "answered");
    const url = `/api/me/unit/qna/${answered.id}/comments`;
    expect((await send(url, "POST", { body: " " })).status).toBe(400);
    expect((await send(url, "POST", { body: "x", parentId: "missing" })).status).toBe(400);

    const before = await getJson(`/api/me/unit/qna/${answered.id}`);
    const parent = before.comments[0];
    const updated = await (await send(url, "POST", { body: "추가 문의", parentId: parent.id })).json();
    expect(updated.status).toBe("followUp");
    expect(updated.comments[0].replies.slice(-2)).toMatchObject([
      { role: "writer", body: "추가 문의" },
      { role: "ai", kind: "handoff" },
    ]);

    // Only one handoff waits for staff at a time.
    const commented = await (await send(url, "POST", { body: "새 댓글" })).json();
    expect(commented.comments.at(-1)).toMatchObject({ role: "writer", body: "새 댓글", replies: [] });

    // A unit template matching the follow-up is posted as is, once per question.
    const templated = await (await send(url, "POST", { body: "전투복 대여도 되나요?" })).json();
    expect(templated.status).toBe("answered");
    expect(templated.comments.at(-1).replies).toMatchObject([{ role: "template", template: { id: "TPL002" } }]);
    const again = await (await send(url, "POST", { body: "전투복 사이즈는요?" })).json();
    expect(again.comments.at(-1).replies).toEqual([]);
  });

  it("answers a new Q&A post from the unit's templates before handing off", async () => {
    await send("/api/auth/login", "POST", { method: "simple" });
    const matched = await (await send("/api/me/unit/qna", "POST", { title: "셔틀버스 문의", body: "신청 방법이 궁금합니다." })).json();
    expect(matched.status).toBe("answered");
    expect(matched.comments).toMatchObject([{ role: "template", author: "개포1동대장", template: { id: "TPL001" } }]);

    const unmatched = await (await send("/api/me/unit/qna", "POST", { title: "기타 문의", body: "확인 부탁드립니다." })).json();
    expect(unmatched.status).toBe("pending");
    expect(unmatched.comments).toMatchObject([{ role: "ai", kind: "handoff" }]);
  });

  it("searches unit notices by title and body", async () => {
    await send("/api/auth/login", "POST", { method: "simple" });
    const list = await getJson("/api/me/unit/notices?searchCnd=0&searchWrd=상비예비군");
    expect(list.total).toBeGreaterThan(0);
    expect(list.items.every((n) => n.title.includes("상비예비군"))).toBe(true);
    expect((await _fetch("/api/me/unit/unknown")).status).toBe(404);
  });

  it("applies for a training with a plan and rejects duplicates", async () => {
    await send("/api/auth/login", "POST", { method: "simple" });
    const [training] = await getJson("/api/me/applicable-trainings");
    const holiday = await getJson("/api/holiday-trainings");
    const target = holiday.find(
      (t) => t.trainingTypeCode === training.typeCode && t.schedules.some((s) => s.start >= "2026-10-13")
    );
    const centers = await getJson(`/api/training-plans/centers?type=${training.typeCode}&sido=${target.sidoCode}`);
    const center = centers.find((c) => c.hasPlan);
    const plans = await getJson(
      `/api/training-plans?type=${training.typeCode}&center=${center.id}&from=2026-10-13&to=2026-12-31`
    );
    expect(plans.length).toBeGreaterThan(0);

    const body = {
      kind: "holiday",
      trainingId: training.id,
      planId: plans[0].id,
      troopId: "8000A14306",
      phone: "010-1234-5678",
      address: "서울특별시 강남구 예시로 1",
      detailAddress: "101호",
    };
    const created = await (await send("/api/me/training-applications", "POST", body)).json();
    expect(created).toMatchObject({ kind: "holiday", status: "신청", appliedAt: "2026-10-13" });
    expect((await send("/api/me/training-applications", "POST", body)).status).toBe(409);

    const detail = await getJson(`/api/me/training-applications/${created.id}`);
    expect(detail.application.trainingName).toBe(plans[0].name);
    expect((await send(`/api/me/training-applications/${created.id}`, "DELETE")).status).toBe(200);

    const old = (await getJson("/api/me/training-applications")).items.find((a) => a.appliedAt !== "2026-10-13");
    expect((await send(`/api/me/training-applications/${old.id}`, "DELETE")).status).toBe(400);
  });

  it("accepts multipart delay applications with evidence files", async () => {
    await send("/api/auth/login", "POST", { method: "simple" });
    const form = new FormData();
    form.append("trainingId", "");
    form.append("start", "2026-11-01");
    form.append("end", "2026-11-02");
    form.append("reasonCode", "01");
    const noFile = await _fetch("/api/me/delay-applications", { method: "POST", body: form });
    expect(noFile.status).toBe(400);

    form.append("files", new File(["pdf"], "진단서.pdf", { type: "application/pdf" }));
    const created = await (await _fetch("/api/me/delay-applications", { method: "POST", body: form })).json();
    expect(created).toMatchObject({ trainingName: "기타", status: "접수" });
    expect(created.attachments).toEqual([{ fileSn: 0, name: "진단서.pdf", size: 3 }]);
    expect((await getJson("/api/me/delay-applications")).items[0].id).toBe(created.id);
  });
});
