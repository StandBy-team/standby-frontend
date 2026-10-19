# CLAUDE.md

## What this project is
A React (Vite, React 18, react-router 6) visual copy of https://www.yebigun1.mil.kr/ (예비군 홈페이지). It should look and behave like the original site, rebuilt as idiomatic React. Do not port the legacy structure (jQuery, DataTables, JSP forms).

Exception: the redesigned parts follow a modern look modelled on https://www.busan.go.kr/index. They keep every original function but not the original look:
- the index page (`src/pages/main/*`);
- the header, footer and chatbot button;
- the sub-page frame (`SubLayout`: sidebar, breadcrumb, title);
- all `/my` pages;
- the shared components and legacy classes, restyled globally.

The content of other sub pages still follows the original site.

## Data rule (most important)
- Pages never hold data that a backend would provide. That includes lists, details, user info, and select options such as banks or reasons (`/codes/:group`).
- Flow: page → `src/api/services/*.js` → `src/api/client.js` (`apiGet/apiPost/apiPut/apiDelete`) → `src/api/_fetch.js`.
- `_fetch` is a drop-in for `window.fetch` that answers from `src/api/mock/db.json`. Going live means swapping `_fetch` for `fetch` in `client.js`; nothing else should change. So:
  - New endpoints go into the `_fetch` route table and its contract comment at the top of the file.
  - New mock data goes into `db.json`; collections the mock can change are listed in `MUTABLE` and persisted to sessionStorage.
  - Don't build URLs or read mock data outside the service layer (document fetches such as `fetchTrainingDocument` live in services too).
  - HTML (not JSON) endpoints use `apiGetText`; the mock answers them with `html()`.
- Errors come back as `{ message }` with a 4xx status and surface as `ApiError` (`error.status`, `error.message`).
- `/me/*` routes need the mock session (`POST /api/auth/login`); they return 401 without it.

## Personal data
Never put real personal data in mock data or code. The logged-in user is **John Doe**. Use clearly fake values for everything else: `010-1234-5678`, `john.doe@example.com`, `예시로` addresses, masked names like `J*****e`. Organization data already in `db.json` (troops, training centers) is fine.

## Structure and conventions
- Menu: `src/constants/menu.js` is the single source for the GNB, LNB, breadcrumb and sitemap. Routes are in `src/constants/routes.js` and get registered in `src/routes/index.jsx` (`PAGES` public, `AUTH_PAGES` behind `RequireAuth`).
  - `mine(label, path)`: login-only page that exists. `locked(label)`: login-only page not built yet (links to `/login`).
  - Detail/new pages need no menu entry; `findMenuTrail` falls back to the parent path.
- Auth: `useAuth()` (`src/hooks/useAuth.js`) is provided by `components/common/AuthProvider`. `MenuLink` sends anonymous users through the login page and back.
- Pages use `SubLayout` (accordion sidebar, linked breadcrumb, title), `useApi(loader, deps)` for loading (`PageState` for loading/error), and `useListNavigation(filters)` + `Pagination` for lists (state in the URL). Detail pages keep the list query in `location.state.listSearch`.
- Feedback: use `useToast()` / `useConfirm()` (`src/hooks/useFeedback.js`, provided by `components/common/FeedbackProvider`) and inline `field-error` messages instead of `window.alert`/`confirm`. Validate whole forms at once and focus the first invalid field.
- Header: `NoticeBell` lists `/popups` notices (nothing pops up on load; seen ids in localStorage) and opens them in `NoticeDialog`. `FullMenu` is the sitemap overlay. Overlays use `useDialog` (focus trap, Escape, scroll lock); dropdowns use `useDismiss`.
- Shared pieces:
  - `components/common`:
    - Modal: portal + focus trap.
    - DateInput: typing `YYYY-MM-DD`/`YYYYMMDD` or picking.
    - PhoneField: a single input formatted by `formatPhone`.
    - FormField: label above control, with hint and error.
    - BoardSearch: search bar with `total`.
    - PageState, Attachments, ResultTable, ListButton, Icon.
  - `components/my`:
    - MemberSummary, TrainingTable.
    - PostForm, PostArticle: board read view.
    - DocumentDialog: 소집통지서/교육필증 in an iframe, with Print.
    - ApplicantTable.
    - QnaComments, QnaStatusBadge: Q&A comment threads (one reply level; writer, staff, AI answer/handoff and staff-template comments) and the backend-judged status.
  - `components/apply`: address, troop and training-plan lookups.
- Styles: add rules in `src/css/*.css` rather than inline styles. Static assets live in `public/` (images under `/images/...`, downloadable forms under `/files/...`).
  - Sub pages: content keeps the legacy class names (`tbl th-c`, `tbl type2`, `dtable`, `btn-gradient big blue`, `cont-tit-h4`, `txt-box`, `tbl-comments`, …). Those rules are restyled globally in `base.css`/`content.css` (Busan tables with a navy top rule, solid/outline buttons, 12px as before), so prefer them over new one-off styles.
  - Redesigned areas:
    - Use the tokens in `src/css/tokens.css` (`--c-*` colours, `--radius-*`, `--shadow-*`) and the fluid `.wide` container (max 1280px).
    - Use the prefixed classes:
      - `hd-*` header, `ft-*` footer, `home-*` index (`main.css`);
      - `sub-*`/`side-nav*` frame, `search-*` list filters, `ui-*` shared controls/badges/toasts (`layout.css`);
      - `/my` pages in `my.css` (`form-*`, `post-*`, `my-*`).
    - Draw button borders with `box-shadow`, since `base.css` adds a border to focused buttons.
  - Type: Pretendard GOV for the whole site, 14px body, line-height 1.3, desktop only (`body` min-width 1080px). Fonts are stock files self-hosted in `public/fonts/` and declared in `base.css`: the GOV subset first, stock Pretendard for the remaining Hangul syllables, full Pretendard GOV for everything else. Never load fonts from a CDN.
- Lint rule `react-refresh/only-export-components`: component files export only components. Put shared constants in `constants/` or plain `.js` files.
- Comments in English, sparse.

## Commands
- `pnpm dev`: dev server on :3000
- `pnpm test:run`: Vitest. Tests live in:
  - `src/api/_fetch.test.js`: mock API.
  - `src/routes/authPages.test.jsx`: page smoke tests; add new login-only pages here.
  - `src/pages/main/MainPage.test.jsx`: index page.
  - `src/pages/my/myPages.test.jsx`: sub-page frame and /my behaviour.
  - `src/components/common/inputs.test.jsx`: phone and date inputs.
- `pnpm lint`: must pass with zero warnings
- `pnpm build`

Never commit or push; the user controls git history.
