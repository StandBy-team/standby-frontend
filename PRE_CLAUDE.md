# CLAUDE.md

## What this project is
A React (Vite, React 18, react-router 6) visual copy of https://www.yebigun1.mil.kr/ (예비군 홈페이지). It should look and behave like the original site, rebuilt as idiomatic React. Do not port the legacy structure (jQuery, DataTables, JSP forms).

## Data rule (most important)
- Pages never hold data that a backend would provide. That includes lists, details, user info, and select options such as banks or reasons (`/codes/:group`).
- Flow: page → `src/api/services/*.js` → `src/api/client.js` (`apiGet/apiPost/apiPut/apiDelete`) → `src/api/_fetch.js`.
- `_fetch` is a drop-in for `window.fetch` that answers from `src/api/mock/db.json`. Going live means swapping `_fetch` for `fetch` in `client.js`; nothing else should change. So:
  - New endpoints go into the `_fetch` route table and its contract comment at the top of the file.
  - New mock data goes into `db.json`; collections the mock can change are listed in `MUTABLE` and persisted to sessionStorage.
  - Don't build URLs or read mock data outside the service layer (document URLs such as `certificateUrl` live in services too).
- Errors come back as `{ message }` with a 4xx status and surface as `ApiError` (`error.status`, `error.message`).
- `/me/*` routes need the mock session (`POST /api/auth/login`); they return 401 without it.

## Personal data
Never put real personal data in mock data or code. The logged-in user is **John Doe**. Use clearly fake values for everything else: `010-1234-5678`, `john.doe@example.com`, `예시로` addresses, masked names like `J*****e`. Organization data already in `db.json` (troops, training centers) is fine.

## Structure and conventions
- Menu: `src/constants/menu.js` is the single source for the GNB, LNB, breadcrumb and sitemap. Routes are in `src/constants/routes.js` and get registered in `src/routes/index.jsx` (`PAGES` public, `AUTH_PAGES` behind `RequireAuth`).
  - `mine(label, path)`: login-only page that exists. `locked(label)`: login-only page not built yet (links to `/login`).
  - Detail/new pages need no menu entry; `findMenuTrail` falls back to the parent path.
- Auth: `useAuth()` (`src/hooks/useAuth.js`) is provided by `components/common/AuthProvider`. `MenuLink` sends anonymous users through the login page and back.
- Pages use `SubLayout` (LNB, breadcrumb, title), `useApi(loader, deps)` for loading, and `useListNavigation(filters)` + `Pagination` for lists (state in the URL). Detail pages keep the list query in `location.state.listSearch`.
- Shared pieces: `components/common` (Modal, DateInput, PhoneField, Attachments, ResultTable, ListButton, BoardSearch), `components/my` (MemberSummary, TrainingTable, PostForm, ApplicantTable), `components/apply` (address, troop and training-plan lookups).
- Styles: reuse the legacy class names (`tbl th-c`, `tbl type2`, `dtable`, `btn-gradient big blue`, `cont-tit-h4`, `txt-box`, `tbl-comments`, …) in `src/css/*.css`; add new rules there rather than inline styles. Static assets live in `public/` (images under `/images/...`, downloadable forms under `/files/...`).
- Lint rule `react-refresh/only-export-components`: component files export only components. Put shared constants in `constants/` or plain `.js` files.
- Comments in English, sparse.

## Commands
- `pnpm dev`: dev server on :3000
- `pnpm test:run`: Vitest (mock API tests in `src/api/_fetch.test.js`, page smoke tests in `src/routes/authPages.test.jsx`; add new login-only pages there)
- `pnpm lint`: must pass with zero warnings
- `pnpm build`

Never commit or push; the user controls git history.
