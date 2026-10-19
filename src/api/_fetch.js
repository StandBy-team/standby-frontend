/**
 * Temporary stand-in for window.fetch until the backend exists.
 * Same signature as fetch(input, init); resolves to a real Response built from src/api/mock/db.json.
 *
 * Mock API contract:
 *   GET /api/main                                   -> { slides, notices, faq, banners, mediaTabs }
 *   GET /api/popups                                 -> Popup[] (newest first)
 *   GET /api/site-info                              -> { owner, postcode, address, phone, relatedSites, sns }
 *   GET /api/boards/:board                          -> { key, bbsId, name, description }
 *   GET /api/boards/:board/articles                 ?page&size&searchCnd(0 title|1 body)&searchWrd&sort&order
 *                                                   -> { total, page, size, items }
 *   GET /api/boards/:board/articles/:nttId          -> { board, article }
 *   GET /api/regions                                -> Region[]
 *   GET /api/training-types                         -> TrainingType[]
 *   GET /api/training-centers                       ?sido&keyword&page&size -> { total, page, size, items }
 *   GET /api/training-centers/:id                   -> TrainingCenter
 *   GET /api/holiday-trainings                      ?sido&month&type&keyword&onlyScheduled=Y -> HolidayTraining[]
 *   GET /api/troops/sido                            -> Sido[]
 *   GET /api/troops/sigungu                         ?sido -> Sigungu[]
 *   GET /api/troops                                 ?sigungu -> Troop[] (id, name)
 *   GET /api/troops/:id                             -> Troop
 *   GET /api/officer-promotion                      -> { applyPeriods }
 *   GET /api/codes/:group                           -> Code[] (banks|familyRelations|emailDomains|delayReasons|mailOptOuts)
 *   GET /api/addresses                              ?keyword -> Address[]
 *   GET /api/training-plans/centers                 ?type&sido -> PlanCenter[] (id, name, address, hasPlan)
 *   GET /api/training-plans                         ?type&center&from&to (YYYY-MM-DD) -> TrainingPlan[]
 *
 *   Auth (session cookie on the real backend):
 *   POST /api/auth/login                            { method } -> AuthUser
 *   POST /api/auth/logout                           -> {}
 *   GET  /api/auth/me                               -> AuthUser | 401
 *   POST /api/auth/extend                           -> AuthUser
 *
 *   Logged-in user (401 without a session):
 *   GET  /api/me/profile                            -> Profile
 *   PUT  /api/me/profile                            Partial<Profile> -> Profile
 *   GET  /api/me/training                           -> { member, year, remoteEducation, remoteTrainings, trainings, pastTrainings }
 *   GET  /api/me/trainings/:id/certificate          -> text/html 교육필증 (404 unless the training has a certificate)
 *   GET  /api/me/trainings/:id/call-up-notice       -> text/html 소집통지서 (404 unless the training has a notice)
 *   GET  /api/me/standing-reserve                   -> { member, history, trainings, pastTrainings }
 *   GET  /api/me/awards                             -> { member, awards }
 *   GET  /api/me/unit/:board                        (notices|training-notices) ?page&size&searchCnd(0 title|1 body|2 both)&searchWrd
 *                                                   -> { total, page, size, items }
 *   GET  /api/me/unit/:board/:id                    -> Post
 *   GET  /api/me/unit/qna                           ?from&to&searchType(TITLE|WRITER)&searchWrd&status&page&size
 *                                                   -> { total, page, size, items } (items carry commentCount, handoffs excluded)
 *   GET  /api/me/unit/qna/:id                       -> Question | 403 when private and not mine
 *   POST /api/me/unit/qna                           { title, body (plain text), email, public } -> Question
 *   GET  /api/me/unit/qna/:id/edit                  -> { title, body (plain text), email, public } | 403 unless canEdit
 *   PUT  /api/me/unit/qna/:id                       { title, body, email, public } -> Question | 403 unless canEdit
 *   DELETE /api/me/unit/qna/:id                     -> {} | 403 unless canEdit
 *     Question.canEdit: the writer may edit or delete the post while it holds only their own comments and AI
 *       handoffs; any answer (AI, template or staff) locks it.
 *   POST /api/me/unit/qna/:id/comments              { body, parentId? } -> Question | 403 unless the writer or staff
 *     Question.status: answered | pending | followUp, judged by the backend from the comments.
 *     Question.summary: { body (plain text), updatedAt } | null, an LLM digest of the post and its comments.
 *     Question.comments: Comment[]; Comment { id, role (writer|staff|ai|template), kind?, author, body (plain text),
 *       createdAt, sources?, template?, replies? }. Replies are one level deep; parentId must name a top-level comment.
 *     Template comments: staff write answers ahead of time for questions that keep coming up in their unit; when a
 *       question matches one, the AI posts it verbatim (author = template writer, template { id, title, updatedAt }).
 *     AI comments: when no template fits, kind "answer" only when the evidence settles the question, with sources
 *       [{ title, url }]; otherwise kind "handoff", a plain "passed to staff" message. Handoffs take no replies and
 *       are deleted once staff comments on the question.
 *   GET  /api/me/unit/free-board                    ?public(Y|N)&searchType&searchWrd&page&size -> { total, page, size, items }
 *   GET  /api/me/unit/free-board/:id                -> Post
 *   POST /api/me/unit/free-board                    { title, body, public } -> Post
 *   GET  /api/me/applicable-trainings               -> ApplicableTraining[]
 *   GET  /api/me/training-applications              ?page&size -> { total, page, size, items }
 *   GET  /api/me/training-applications/:id          -> { member, application }
 *   POST /api/me/training-applications              { kind, trainingId, planId, troopId, phone, address, detailAddress } -> Application
 *   DELETE /api/me/training-applications/:id        -> {} (only on the day of application)
 *   GET  /api/me/delay-options                      -> { trainings }
 *   GET  /api/me/delay-applications                 ?page&size -> { total, page, size, items }
 *   GET  /api/me/delay-applications/:id             -> { member, application }
 *   POST /api/me/delay-applications                 FormData { trainingId, start, end, reasonCode, files[] } -> Application
 *   GET  /api/me/hold-applications                  ?page&size -> { total, page, size, items }
 *   GET  /api/me/hold-applications/:id              -> { member, application }
 *
 *   Errors respond with { message } and a 4xx status.
 */
import db from "./mock/db.json";
import { getSessionItem, setSessionItem } from "@/utils/storage";

const LATENCY_MS = 120;
const SESSION_MS = 15 * 60 * 1000;
const STORE_KEY = "mock-db-v5";

const omit = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

const summarize = (article) => ({
  ...omit(article, ["body", "attachments", "images"]),
  hasAttachment: article.attachments.length > 0,
});

const paginate = (rows, query, defaultSize = 10) => {
  const size = Math.max(1, Number(query.get("size")) || defaultSize);
  const page = Math.max(1, Number(query.get("page")) || 1);
  return {
    total: rows.length,
    page,
    size,
    items: rows.slice((page - 1) * size, page * size),
  };
};

const findBoard = (key) => db.boards.find((b) => b.key === key || b.bbsId === key);

const boardInfo = (board) => omit(board, ["articles"]);

const sortRows = (rows, sort, order) => {
  if (!sort) return rows;
  const dir = order === "desc" ? -1 : 1;
  return [...rows].sort((a, b) => (a[sort] > b[sort] ? dir : a[sort] < b[sort] ? -dir : 0));
};

// Collections the mock can change; persisted per browser tab so a reload keeps the session and new records.
const MUTABLE = ["session", "me", "qna", "freeBoard", "trainingApplications", "delayApplications"];

const store = {
  ...structuredClone(Object.fromEntries(MUTABLE.map((key) => [key, db[key]]))),
  ...getSessionItem(STORE_KEY),
};

const save = () => setSessionItem(STORE_KEY, store);

class MockHttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const fail = (status, message) => {
  throw new MockHttpError(status, message);
};

const pad = (n) => String(n).padStart(2, "0");

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const now = () => {
  const d = new Date();
  return `${today()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

let idSeq = 0;
const newId = (prefix) => `${prefix}${Date.now()}${++idSeq}`;

const mask = (name) => {
  const s = name.replace(/\s/g, "");
  return s.length < 3 ? `${s[0]}*` : s[0] + "*".repeat(s.length - 2) + s.at(-1);
};

const hasSession = () => !!store.session && store.session.expiresAt > Date.now();

const authUser = () => ({
  name: store.me.name,
  unit: { name: store.me.unit.name, phone: store.me.unit.phone },
  expiresAt: store.session.expiresAt,
});

const member = () => {
  const { name, rank, serviceNo, branch, yearsOfService, mobilization, dischargeYear, position, unit } = store.me;
  return { name, rank, serviceNo, branch, yearsOfService, mobilization, dischargeYear, position, unit };
};

const PROFILE_FIELDS = [
  "familyMaster",
  "familyMasterRelation",
  "homePhone",
  "companyPhone",
  "cellPhone",
  "bank",
  "account",
  "email",
  "noticeWay",
  "mailOptOut",
  "birthdaySmsOptOut",
  "outingArea",
  "outingStart",
  "outingEnd",
  "outingPurpose",
  "outingPhone",
  "proxyName",
  "proxyPhone",
];

const required = (body, fields) => {
  const missing = fields.find(([key]) => body[key] === undefined || String(body[key]).trim() === "");
  if (missing) fail(400, `${missing[1]}을(를) 입력하세요.`);
};

const textSearch = (rows, query) => {
  const word = (query.get("searchWrd") || "").trim();
  if (!word) return rows;
  const cnd = query.get("searchCnd");
  return rows.filter((r) =>
    cnd === "1" ? r.body.includes(word) : cnd === "2" ? r.title.includes(word) || r.body.includes(word) : r.title.includes(word)
  );
};

const writerSearch = (rows, query) => {
  const word = (query.get("searchWrd") || "").trim();
  if (!word) return rows;
  return rows.filter((r) => (query.get("searchType") === "WRITER" ? r.writer.includes(word) : r.title.includes(word)));
};

const postSummary = (post) => ({
  ...omit(post, ["body", "attachments", "summary", "comments", "email", "phone"]),
  ...(post.attachments && { hasAttachment: post.attachments.length > 0 }),
});

const escapeHtml = (text) =>
  String(text ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

const DOCUMENTS = {
  certificate: {
    title: "교육필증",
    flag: "certificate",
    statement: (t) => `위 사람은 ${t.date} ${t.typeName} ${t.round}을(를) 이수하였음을 증명합니다.`,
  },
  "call-up-notice": {
    title: "예비군 훈련 소집통지서",
    flag: "notice",
    statement: (t) => `위 사람은 ${t.date} ${t.center}에서 실시하는 ${t.typeName} ${t.round}에 소집되었음을 통지합니다.`,
  },
};

/** Printable sample document, standing in for the PDF/HTML a real backend would render. */
const trainingDocument = (kind, id) => {
  const doc = DOCUMENTS[kind] ?? fail(404, "Not Found");
  const training = [...db.myTraining.trainings, ...db.myTraining.pastTrainings].find((t) => t.id === id);
  if (!training || !training[doc.flag]) fail(404, `${doc.title}을(를) 발급할 수 없는 훈련입니다.`);
  const m = member();
  const rows = [
    ["성명", m.name],
    ["계급 / 군번", `${m.rank} / ${m.serviceNo}`],
    ["소속", `${m.unit.name} ${m.unit.platoon ?? ""}`],
    ["훈련", `${training.typeName} ${training.round}`],
    ["훈련일자", training.date],
    ["훈련장", training.center],
    ["계획시간", `${training.plannedHours}시간`],
  ];
  return `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><title>${doc.title}</title>
<style>
  body { margin: 0; padding: 48px; font-family: "Pretendard GOV", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif; color: #1b1d22; }
  .sheet { position: relative; max-width: 640px; margin: 0 auto; padding: 48px; border: 2px solid #14244a; }
  .sheet::after { position: absolute; top: 40%; left: 50%; font-size: 72px; font-weight: 700; color: rgba(224, 65, 47, 0.12); transform: translate(-50%, -50%) rotate(-20deg); content: "견본"; }
  h1 { margin: 0 0 32px; font-size: 28px; text-align: center; letter-spacing: 0.2em; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th, td { padding: 10px 12px; border: 1px solid #cfd4dc; text-align: left; }
  th { width: 28%; background: #f5f6f8; }
  p { margin: 32px 0 0; font-size: 15px; line-height: 1.7; }
  .issuer { margin-top: 48px; font-size: 18px; font-weight: 700; text-align: center; }
  .note { margin-top: 24px; font-size: 12px; color: #858b97; text-align: center; }
  @media print { body { padding: 0; } }
</style></head>
<body><div class="sheet">
  <h1>${doc.title}</h1>
  <table>${rows.map(([k, v]) => `<tr><th>${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}</table>
  <p>${escapeHtml(doc.statement(training))}</p>
  <p class="issuer">${escapeHtml(m.unit.name)} 예비군 지휘관</p>
  <p class="note">모의 데이터로 만든 견본 문서입니다.</p>
</div></body></html>`;
};

const maskEmail = (email) => email.replace(/^(.{1,3})[^@]*/, "$1*****");

const textToHtml = (text) =>
  text
    .trim()
    .split(/\r?\n/)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");

const htmlToText = (markup) =>
  markup
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");

const canEditQuestion = (question) =>
  question.mine && allComments(question).every((c) => c.role === "writer" || isHandoff(c));

const questionView = (question) => ({
  ...question,
  email: maskEmail(question.email),
  canComment: question.mine,
  canEdit: canEditQuestion(question),
});

const editableQuestion = (id) => {
  const question = store.qna.find((q) => q.id === id) ?? fail(404, "게시글을 찾을 수 없습니다.");
  if (!question.mine) fail(403, "본인이 작성한 글만 수정/삭제할 수 있습니다.");
  if (!canEditQuestion(question)) fail(403, "답변이 등록된 글은 수정/삭제할 수 없습니다.");
  return question;
};

const isHandoff = (comment) => comment.role === "ai" && comment.kind === "handoff";

const allComments = (question) => question.comments.flatMap((c) => [c, ...(c.replies ?? [])]);

/**
 * Mock AI reply to new writer text: a unit template whose keyword appears in the text (each used once per question),
 * else one handoff message until staff replies. It never generates an answer itself.
 */
const aiReply = (question, text) => {
  const used = new Set(allComments(question).map((c) => c.template?.id));
  const template = db.qnaTemplates.find(
    (t) => t.troopId === store.me.unit.troopId && !used.has(t.id) && t.keywords.some((k) => text.includes(k))
  );
  if (template) {
    question.status = "answered";
    question.answeredAt ||= now().slice(5).replace("-", ".");
    return {
      id: `${question.id}-${newId("TP")}`,
      role: "template",
      author: template.author,
      body: template.body,
      createdAt: now(),
      template: { id: template.id, title: template.title, updatedAt: template.updatedAt },
    };
  }
  if (allComments(question).some(isHandoff)) return null;
  return {
    id: `${question.id}-${newId("AI")}`,
    role: "ai",
    kind: "handoff",
    author: "AI 상담",
    body: "문의하신 내용을 담당자에게 전달했습니다. 담당자가 확인한 뒤 답변드리겠습니다.",
    createdAt: now(),
  };
};

const UNIT_BOARDS = { notices: "unitNotices", "training-notices": "trainingNotices" };

const unitBoard = (board) => db[UNIT_BOARDS[board]] ?? fail(404, "Not Found");

const PLAN_HOURS = { "02": 32, "03": 8, "04": 6, "05": 6 };

const planName = (typeName, start) => `[${Number(start.slice(5, 7))}. ${Number(start.slice(8, 10))}.] ${typeName}`;

const plansOf = (holidayTraining) =>
  holidayTraining.schedules.map((s) => ({
    id: `${holidayTraining.id}~${s.start}~${s.end}`,
    name: planName(holidayTraining.trainingTypeName, s.start),
    start: s.start,
    end: s.end,
    entryTime: "09:00",
    hours: PLAN_HOURS[holidayTraining.trainingTypeCode] ?? 8,
    centerName: holidayTraining.centerName,
    address: holidayTraining.address,
  }));

const findPlan = (planId) => {
  const holidayTraining = db.holidayTrainings.find((t) => planId.startsWith(`${t.id}~`));
  return holidayTraining && plansOf(holidayTraining).find((p) => p.id === planId);
};

const toDotDate = (date) => date.replaceAll("-", ".");

const delayTrainings = () =>
  db.myTraining.trainings
    .filter((t) => t.scheduleState === 2)
    .map((t) => ({ id: t.id, name: `${t.typeName} ${t.round}`.trim(), center: t.center, date: t.date }));

const listItem = (application) => {
  const { id, kind, typeName, appliedAt, updatedAt, processedAt, status } = application;
  return { id, kind, typeName, appliedAt, updatedAt, processedAt, status };
};

function parseBody(body) {
  if (body == null) return {};
  if (body instanceof FormData) {
    const out = {};
    for (const [key, value] of body.entries()) {
      const item = typeof value === "string" ? value : { name: value.name, size: value.size };
      out[key] = key in out ? [].concat(out[key], item) : item;
    }
    return out;
  }
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return {};
}

const routes = [
  [
    "GET",
    "/main",
    () => {
      const notice = findBoard("notice");
      return {
        slides: db.mainSlides,
        notices: notice.articles.slice(0, 5).map(summarize),
        faq: db.mainFaq,
        banners: db.mainBanners,
        mediaTabs: db.mainMedia,
      };
    },
  ],

  ["GET", "/popups", () => db.popups],
  ["GET", "/site-info", () => db.siteInfo],

  [
    "GET",
    "/boards/:board",
    ({ board }) => {
      const found = findBoard(board);
      return found ? boardInfo(found) : null;
    },
  ],

  [
    "GET",
    "/boards/:board/articles",
    ({ board }, query) => {
      const found = findBoard(board);
      if (!found) return null;
      const word = (query.get("searchWrd") || "").trim();
      const field = query.get("searchCnd") === "1" ? "body" : "title";
      let rows = word ? found.articles.filter((a) => a[field].includes(word)) : found.articles;
      rows = sortRows(rows, query.get("sort"), query.get("order"));
      const result = paginate(rows, query);
      return { ...result, items: result.items.map(summarize) };
    },
  ],

  [
    "GET",
    "/boards/:board/articles/:nttId",
    ({ board, nttId }) => {
      const found = findBoard(board);
      if (!found) return null;
      const article = found.articles.find((a) => String(a.nttId) === nttId);
      return article ? { board: boardInfo(found), article } : null;
    },
  ],

  ["GET", "/regions", () => db.regions],

  ["GET", "/training-types", () => db.trainingTypes],

  [
    "GET",
    "/training-centers",
    (_, query) => {
      const sido = query.get("sido");
      const keyword = (query.get("keyword") || "").trim();
      const rows = db.trainingCenters.filter(
        (c) => (!sido || c.sidoCode === sido) && (!keyword || c.name.includes(keyword))
      );
      return paginate(rows, query);
    },
  ],

  ["GET", "/training-centers/:id", ({ id }) => db.trainingCenters.find((c) => c.id === id) || null],

  [
    "GET",
    "/holiday-trainings",
    (_, query) => {
      const sido = query.get("sido");
      const month = Number(query.get("month")) || null;
      const type = query.get("type");
      const keyword = (query.get("keyword") || "").trim();
      const onlyScheduled = query.get("onlyScheduled") === "Y";
      return db.holidayTrainings
        .filter((t) => !sido || t.sidoCode === sido)
        .filter((t) => !type || t.trainingTypeCode === type)
        .filter((t) => !keyword || t.centerName.includes(keyword))
        .map((t) => ({
          ...t,
          schedules: month
            ? t.schedules.filter((s) => Number(s.start.slice(5, 7)) === month || Number(s.end.slice(5, 7)) === month)
            : t.schedules,
        }))
        .filter((t) => !onlyScheduled || t.schedules.length > 0);
    },
  ],

  ["GET", "/troops/sido", () => db.troopSido],

  ["GET", "/troops/sigungu", (_, query) => db.troopSigungu.filter((s) => s.sidoCode === query.get("sido"))],

  [
    "GET",
    "/troops",
    (_, query) => db.troops.filter((t) => t.sigunguCode === query.get("sigungu")).map(({ id, name }) => ({ id, name })),
  ],

  ["GET", "/troops/:id", ({ id }) => db.troops.find((t) => t.id === id) || null],

  ["GET", "/officer-promotion", () => db.officerPromotion],

  ["GET", "/codes/:group", ({ group }) => db.codes[group] ?? null],

  [
    "GET",
    "/addresses",
    (_, query) => {
      const keyword = (query.get("keyword") || "").trim();
      if (!keyword) fail(400, "검색어를 입력하세요.");
      return db.addresses.filter((a) => a.road.includes(keyword) || a.jibun.includes(keyword));
    },
  ],

  [
    "GET",
    "/training-plans/centers",
    (_, query) =>
      db.holidayTrainings
        .filter((t) => t.sidoCode === query.get("sido") && t.trainingTypeCode === query.get("type"))
        .map((t) => ({
          id: t.id.slice(0, -(t.trainingTypeCode.length + 1)),
          name: t.centerName,
          address: t.address,
          hasPlan: t.schedules.some((s) => s.start >= today()),
        })),
  ],

  [
    "GET",
    "/training-plans",
    (_, query) => {
      const holidayTraining = db.holidayTrainings.find((t) => t.id === `${query.get("center")}-${query.get("type")}`);
      const from = query.get("from") || today();
      const to = query.get("to") || "9999-12-31";
      return holidayTraining
        ? plansOf(holidayTraining).filter((p) => p.start >= from && p.start <= to && p.start >= today())
        : [];
    },
  ],

  [
    "POST",
    "/auth/login",
    () => {
      store.session = { loggedInAt: Date.now(), expiresAt: Date.now() + SESSION_MS };
      save();
      return authUser();
    },
  ],

  [
    "POST",
    "/auth/logout",
    () => {
      store.session = null;
      save();
      return {};
    },
  ],

  ["GET", "/auth/me", () => (hasSession() ? authUser() : fail(401, "로그인이 필요합니다."))],

  [
    "POST",
    "/auth/extend",
    () => {
      if (!hasSession()) fail(401, "로그인 세션 연장을 실패하였습니다. 다시 로그인 해주시기 바랍니다.");
      store.session.expiresAt = Date.now() + SESSION_MS;
      save();
      return authUser();
    },
  ],

  ["GET", "/me/profile", () => store.me],

  [
    "PUT",
    "/me/profile",
    (_, __, body) => {
      PROFILE_FIELDS.forEach((key) => {
        if (key in body) store.me[key] = body[key];
      });
      if (store.me.outingStart && store.me.outingEnd && store.me.outingStart > store.me.outingEnd) {
        fail(400, "출타 종료일자가 시작일자보다 빠를 수 없습니다.");
      }
      save();
      return store.me;
    },
  ],

  ["GET", "/me/training", () => ({ member: member(), ...db.myTraining })],

  ["GET", "/me/trainings/:id/:kind", ({ id, kind }) => html(trainingDocument(kind, id))],

  ["GET", "/me/standing-reserve", () => ({ member: member(), ...db.standingReserve })],

  ["GET", "/me/awards", () => ({ member: member(), awards: db.awards })],

  [
    "GET",
    "/me/unit/qna",
    (_, query) => {
      const from = query.get("from");
      const to = query.get("to");
      const status = query.get("status");
      const rows = writerSearch(store.qna, query)
        .filter((q) => (!from || q.createdAt >= from) && (!to || q.createdAt <= to))
        .filter((q) => !status || q.status === status);
      const result = paginate(rows, query);
      return {
        ...result,
        items: result.items.map((q) => ({
          ...postSummary(q),
          commentCount: allComments(q).filter((c) => !isHandoff(c)).length,
        })),
      };
    },
  ],

  [
    "GET",
    "/me/unit/qna/:id",
    ({ id }) => {
      const question = store.qna.find((q) => q.id === id);
      if (question && !question.public && !question.mine) fail(403, "비공개 글은 작성자만 조회할 수 있습니다.");
      return question ? questionView(question) : null;
    },
  ],

  [
    "POST",
    "/me/unit/qna",
    (_, __, body) => {
      required(body, [
        ["title", "제목"],
        ["body", "질의내용"],
      ]);
      const question = {
        id: newId("QA"),
        title: body.title.trim(),
        writer: mask(store.me.name),
        mine: true,
        createdAt: today(),
        public: body.public !== false,
        views: 0,
        status: "pending",
        answeredAt: "",
        rating: 0,
        phone: store.me.cellPhone.replace(/^(\d{3})-?\d{3,4}-?(\d{4})$/, "$1****$2"),
        email: body.email || "",
        body: textToHtml(body.body),
        summary: null,
        comments: [],
      };
      question.comments.push({ ...aiReply(question, `${body.title} ${body.body}`), replies: [] });
      store.qna.unshift(question);
      save();
      return questionView(question);
    },
  ],

  [
    "GET",
    "/me/unit/qna/:id/edit",
    ({ id }) => {
      const question = editableQuestion(id);
      return { title: question.title, body: htmlToText(question.body), email: question.email, public: question.public };
    },
  ],

  [
    "PUT",
    "/me/unit/qna/:id",
    ({ id }, __, body) => {
      const question = editableQuestion(id);
      required(body, [
        ["title", "제목"],
        ["body", "질의내용"],
      ]);
      Object.assign(question, {
        title: body.title.trim(),
        body: textToHtml(body.body),
        email: body.email || "",
        public: body.public !== false,
      });
      save();
      return questionView(question);
    },
  ],

  [
    "DELETE",
    "/me/unit/qna/:id",
    ({ id }) => {
      const question = editableQuestion(id);
      store.qna.splice(store.qna.indexOf(question), 1);
      save();
      return {};
    },
  ],

  [
    "POST",
    "/me/unit/qna/:id/comments",
    ({ id }, __, body) => {
      const question = store.qna.find((q) => q.id === id) ?? fail(404, "게시글을 찾을 수 없습니다.");
      // The mock user is never staff, so only the writer may comment.
      if (!question.mine) fail(403, "댓글은 게시글 작성자와 담당자만 작성할 수 있습니다.");
      required(body, [["body", "댓글"]]);
      const parent = body.parentId && (question.comments.find((c) => c.id === body.parentId) ?? fail(400, "답글을 달 댓글을 찾을 수 없습니다."));
      if (parent && isHandoff(parent)) fail(400, "AI 안내 메시지에는 답글을 달 수 없습니다.");
      const comment = {
        id: `${question.id}-${newId("C")}`,
        role: "writer",
        author: question.writer,
        body: body.body.trim(),
        createdAt: now(),
      };
      const thread = parent ?? { ...comment, replies: [] };
      if (parent) parent.replies = [...(parent.replies ?? []), comment];
      else question.comments.push(thread);
      // Stand-in for the backend's judgement: a writer comment after an answer is a follow-up question.
      if (question.status === "answered") question.status = "followUp";
      const reply = aiReply(question, comment.body);
      if (reply) thread.replies.push(reply);
      save();
      return questionView(question);
    },
  ],

  [
    "GET",
    "/me/unit/free-board",
    (_, query) => {
      const visibility = query.get("public");
      const rows = writerSearch(store.freeBoard, query).filter(
        (p) => !visibility || p.public === (visibility === "Y")
      );
      const result = paginate(rows, query);
      return { ...result, items: result.items.map(postSummary) };
    },
  ],

  [
    "GET",
    "/me/unit/free-board/:id",
    ({ id }) => {
      const post = store.freeBoard.find((p) => p.id === id);
      if (post && !post.public && !post.mine) fail(403, "비공개 글은 작성자만 조회할 수 있습니다.");
      return post ?? null;
    },
  ],

  [
    "POST",
    "/me/unit/free-board",
    (_, __, body) => {
      required(body, [
        ["title", "제목"],
        ["body", "내용"],
      ]);
      const post = {
        id: newId("FB"),
        title: body.title.trim(),
        writer: mask(store.me.name),
        mine: true,
        createdAt: today(),
        public: body.public !== false,
        views: 0,
        body: body.body,
      };
      store.freeBoard.unshift(post);
      save();
      return post;
    },
  ],

  [
    "GET",
    "/me/unit/:board",
    ({ board }, query) => {
      const result = paginate(textSearch(unitBoard(board), query), query);
      return { ...result, items: result.items.map(postSummary) };
    },
  ],

  ["GET", "/me/unit/:board/:id", ({ board, id }) => unitBoard(board).find((p) => p.id === id) ?? null],

  ["GET", "/me/applicable-trainings", () => db.applicableTrainings],

  [
    "GET",
    "/me/training-applications",
    (_, query) => {
      const result = paginate(store.trainingApplications, query);
      return { ...result, items: result.items.map(listItem) };
    },
  ],

  [
    "GET",
    "/me/training-applications/:id",
    ({ id }) => {
      const application = store.trainingApplications.find((a) => a.id === id);
      return application ? { member: member(), application } : null;
    },
  ],

  [
    "POST",
    "/me/training-applications",
    (_, __, body) => {
      required(body, [
        ["trainingId", "훈련유형"],
        ["planId", "훈련계획"],
        ["troopId", "훈련신청 예비군부대"],
        ["phone", "연락처"],
        ["address", "기본주소"],
        ["detailAddress", "상세주소"],
      ]);
      const training = db.applicableTrainings.find((t) => t.id === body.trainingId) ?? fail(400, "훈련유형을 선택하세요.");
      const plan =
        findPlan(body.planId) ??
        fail(409, "훈련신청 중 훈련계획이 변경되었습니다. 훈련계획 조회 후 다시 신청해 주시기 바랍니다.");
      const troop = db.troops.find((t) => t.id === body.troopId) ?? fail(400, "훈련신청 예비군부대를 선택하세요.");
      if (store.trainingApplications.some((a) => a.trainingId === training.id)) {
        fail(409, "이미 휴일/전국단위 예비군 훈련을 신청한 훈련입니다. 신청결과를 확인 하십시요.");
      }
      const application = {
        id: newId("TA"),
        kind: body.kind === "holiday" ? "holiday" : "nationwide",
        trainingId: training.id,
        typeName: training.typeName,
        round: training.round,
        hours: plan.hours,
        appliedAt: today(),
        updatedAt: null,
        processedAt: null,
        status: "신청",
        trainingName: plan.name,
        trainingDate: plan.start === plan.end ? toDotDate(plan.start) : `${toDotDate(plan.start)}~${toDotDate(plan.end)}`,
        entryTime: plan.entryTime,
        centerName: plan.centerName,
        centerPhone: db.trainingCenters.find((c) => plan.id.startsWith(`${c.id}-`))?.phone ?? "",
        troopName: troop.name,
        troopPhone: troop.phone,
        phone: body.phone,
        address: body.address,
        detailAddress: body.detailAddress,
      };
      store.trainingApplications.unshift(application);
      save();
      return application;
    },
  ],

  [
    "DELETE",
    "/me/training-applications/:id",
    ({ id }) => {
      const application = store.trainingApplications.find((a) => a.id === id);
      if (!application) return null;
      if (application.appliedAt !== today()) {
        fail(400, "휴일/전국단위 훈련신청 취소는 신청일 당일만 가능합니다.\n소속 예비군 부대로 문의 바랍니다.");
      }
      store.trainingApplications = store.trainingApplications.filter((a) => a.id !== id);
      save();
      return {};
    },
  ],

  ["GET", "/me/delay-options", () => ({ trainings: delayTrainings() })],

  [
    "GET",
    "/me/delay-applications",
    (_, query) => {
      const result = paginate(store.delayApplications, query);
      return { ...result, items: result.items.map(listItem) };
    },
  ],

  [
    "GET",
    "/me/delay-applications/:id",
    ({ id }) => {
      const application = store.delayApplications.find((a) => a.id === id);
      return application ? { member: member(), application } : null;
    },
  ],

  [
    "POST",
    "/me/delay-applications",
    (_, __, body) => {
      required(body, [
        ["start", "희망연기시작일"],
        ["end", "희망연기종료일"],
        ["reasonCode", "연기사유"],
      ]);
      if (body.start > body.end) fail(400, "희망연기종료일자가 희망연기시작일자보다 빠를 수 없습니다.");
      if (body.start < today()) fail(400, "희망연기시작일자가 현재일자보다 이후 이어야 합니다.");
      const files = [].concat(body.files ?? []);
      if (files.length === 0) fail(400, "연기신청 증빙서류를 첨부해주시기 바랍니다.");
      if (files.length > 5 || files.some((f) => f.size > 10 * 1024 * 1024)) {
        fail(400, "첨부서류 확장자/특수문자 및 용량을 확인하세요.");
      }
      const training = delayTrainings().find((t) => t.id === body.trainingId);
      const reason = db.codes.delayReasons.find((r) => r.code === body.reasonCode) ?? fail(400, "연기사유를 선택하세요.");
      const application = {
        id: newId("DA"),
        kind: "연기신청",
        trainingId: training?.id ?? "",
        trainingName: training?.name ?? "기타",
        centerName: training?.center ?? "",
        appliedAt: today(),
        updatedAt: null,
        processedAt: null,
        status: "접수",
        periodStart: body.start,
        periodEnd: body.end,
        reason: reason.name,
        attachments: files.map((f, fileSn) => ({ fileSn, ...f })),
      };
      store.delayApplications.unshift(application);
      save();
      return application;
    },
  ],

  [
    "GET",
    "/me/hold-applications",
    (_, query) => {
      const result = paginate(db.holdApplications, query);
      return { ...result, items: result.items.map(listItem) };
    },
  ],

  [
    "GET",
    "/me/hold-applications/:id",
    ({ id }) => {
      const application = db.holdApplications.find((a) => a.id === id);
      return application ? { member: member(), application } : null;
    },
  ],
].map(([method, pattern, handler]) => {
  const keys = [];
  const regex = new RegExp("^" + pattern.replace(/:(\w+)/g, (_, key) => (keys.push(key), "([^/]+)")) + "/?$");
  return { method, regex, keys, handler };
});

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

const html = (body, status = 200) =>
  new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });

const delay = (ms, signal) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("The operation was aborted.", "AbortError"));
    });
  });

export async function _fetch(input, init = {}) {
  const request = input instanceof Request ? input : null;
  const rawUrl = request ? request.url : input instanceof URL ? input.href : String(input);
  const method = (init.method || request?.method || "GET").toUpperCase();
  const signal = init.signal || request?.signal;

  if (signal?.aborted) throw new DOMException("The operation was aborted.", "AbortError");
  await delay(LATENCY_MS, signal);

  const url = new URL(rawUrl, "http://mock.local");
  const path = url.pathname.replace(/^\/api(?=\/)/, "");

  for (const route of routes) {
    if (route.method !== method) continue;
    const match = path.match(route.regex);
    if (!match) continue;
    const params = Object.fromEntries(route.keys.map((k, i) => [k, decodeURIComponent(match[i + 1])]));
    const requestBody = parseBody(init.body ?? (request && method !== "GET" ? await request.text() : null));
    try {
      if (path.startsWith("/me/") && !hasSession()) fail(401, "로그인이 필요합니다.");
      const body = route.handler(params, url.searchParams, requestBody);
      if (body instanceof Response) return body;
      return body === null ? json({ message: "Not Found" }, 404) : json(body);
    } catch (error) {
      if (error instanceof MockHttpError) return json({ message: error.message }, error.status);
      throw error;
    }
  }

  return json({ message: `No mock route for ${method} ${url.pathname}` }, 404);
}

export default _fetch;
