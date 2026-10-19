# Modernization audit

Snapshot of the React port as of 2026-10-14, judged against modern desktop web conventions for users mostly under 40. Mobile and tablet are out of scope. File and line references may drift as the code changes.

The underlying engineering is solid. The look and interaction patterns are still 2010s Korean government site, which is what [CLAUDE.md](CLAUDE.md) currently asks for ("look and behave like the original site", reuse the legacy class names). How far modernization should go is the decision that gates most items under "Misaligned"; CLAUDE.md should be updated to match whatever is decided.

## Current state

- **Stack:** Vite 7, React 18, react-router 6, plain JS with an `@/` alias, Vitest. 36/36 tests pass; the build succeeds.
- **Scope:** about 70 pages: 33 public routes, 23 login-only routes, 4 `window.open` popup routes. 11 menu entries are still `locked` (unbuilt) in [menu.js](src/constants/menu.js).
- **Architecture:** page → service → `client.js` → `_fetch` (mock answering from `db.json`). One menu tree drives the GNB, LNB, breadcrumb and sitemap. List filters and page numbers live in the URL.
- **Styling:** global CSS reusing the legacy class names (`tbl`, `dtable`, `btn-gradient`, …) plus utility classes (`mt20`, `wd110`, …).

## Already aligned

- **A1. Routing.** Back/forward, deep links and shareable list URLs work. After login, users return to the page they came from.
- **A2. Search modals.** Address, troop and training-plan lookups are in-page modals rather than new windows.
- **A3. Session handling.** Visible countdown and a "로그인 연장" (extend) button.
- **A4. Basic accessibility.** Skip link, table captions, `label`/`htmlFor` pairs, Escape closes modals, GNB opens on keyboard focus.
- **A5. Login.** 간편인증 (Kakao, Naver, PASS, etc.) is offered first, which matches what this age group uses.

## Misaligned

### M1. Fixed-width layout
- `body { min-width: 1280px }` with content at 980px ([base.css](src/css/base.css)).
- On a 1366px laptop with a browser sidebar, or in split-screen, the page scrolls sideways. On wide monitors about 60% of the screen is empty.
- Many elements sit at exact pixel positions: footer links (`left: 280px`), each GNB column width, the LNB ([layout.css](src/css/layout.css)).

### M2. Text size and fonts
- Most tables, forms and buttons use 12px text (48 rules at 10–12px). Body text is 14px with `line-height: 1`.
- Current norm is 15–16px body text, line-height around 1.5, in Pretendard or the system UI font.
- Nanum Gothic is served as woff/ttf, not woff2.

> 14px looks fine on a typical monitor; any above is rather too big. line-height might be adjusted only a little, but 1.5 is too high, maybe 1.2, 1.25 or at maximum 1.4.
>
> Get Pretendard GOV. Do not use a CDN source; download to ./public/fonts

### M3. Visual language
- Gradient buttons and gray-ruled tables throughout.
- Main-page notice popups mimic jQuery UI dialogs: draggable, with "하루닫기" ([LayerPopups.jsx](src/components/layout/LayerPopups.jsx)).
- The chatbot banner blinks indefinitely, which also fails WCAG 2.2.2 ([ChatbotBanner.jsx](src/components/layout/ChatbotBanner.jsx)).
- Key elements are images of text: hero image, banners, quick links, step diagrams such as `delay-step.svg`. They cannot be selected, translated or resized.
- Only 7 hover rules and no transitions; the UI gives almost no interaction feedback.

### M4. Messages are browser dialogs (72 `window.alert`/`confirm` calls)
- Validation, success ("저장되었습니다.") and server errors all use blocking browser dialogs.
- [DelayApply.jsx:141-149](src/pages/delay/DelayApply.jsx#L141-L149) validates one field at a time and stops at the first problem.
- Expected: errors next to the field, toasts for success, submit disabled until the form is valid.

### M5. No loading states, patchy error handling
- `useApi` exposes `loading`, but only one component uses it ([TrainingPlanModal.jsx](src/components/apply/TrainingPlanModal.jsx)).
- Elsewhere, sections stay blank until data arrives (e.g. the main-page notice list renders empty).
- About 9 places render an error message; the rest fail silently.

### M6. Forms that fight the user
- [DateInput.jsx:44](src/components/common/DateInput.jsx#L44) blocks typing; dates can only be picked from the calendar.
- [PhoneField.jsx](src/components/common/PhoneField.jsx) is a read-only field that opens a modal with three inputs. Expected: one field that formats as you type, with `autocomplete="tel"`.
- File upload is a bare `<input type="file">`: no drag-and-drop, no file sizes shown.

### M7. New windows and hover-only menus
- Officer promotion, tech expert, privacy policy, training-center photos, the Kakao map and training plans open via `window.open` ([popup.js](src/utils/popup.js)). Popup blockers catch these and separate windows feel dated.
- Some popup tabs redirect the *opener* window to login ([PopupTabs.jsx](src/components/layout/PopupTabs.jsx)).
- The GNB opens every column at once in a 310px panel on hover ([Header.jsx](src/components/layout/Header.jsx)).
- Main-page quick links and quick menu only work on hover, using `href="#none"` ([MainPage.jsx](src/pages/main/MainPage.jsx)).

### M8. Navigation gaps
- The breadcrumb is plain text, not links ([SubLayout.jsx](src/components/layout/SubLayout.jsx)).
- Pagination says "Previous/Next" in English on a Korean site ([Pagination.jsx](src/components/common/Pagination.jsx)).
- No site-wide search.
- `locked` menu items always link to `/login`, so a logged-in user lands on the login page again: a dead end.

### M9. Content pages are hard-coded text
- 1,096 `&nbsp;`/`<br/>` occurrences under `src/pages`, hand-tuned for the 980px width.
- [HoldGuide.jsx](src/pages/hold/HoldGuide.jsx) is 1,973 lines and [History.jsx](src/pages/info/History.jsx) 1,280 lines of fixed JSX.
- Long legal text would read better as accordions, step indicators or summary cards.
- Hard-coding also blocks moving the content to a backend or CMS later.

### M10. Work lost on session expiry
- On expiry an alert appears and the user is logged out; anything typed into a form is lost ([AuthProvider.jsx](src/components/common/AuthProvider.jsx)).
- Expected: a warning a minute or two before expiry with a one-click extend, and saved drafts.

### M11. Leftovers from the original site
- The login page still lists a "키보드 보안 (nProtect)" plugin table; its "사용" button does nothing ([LoginContent.jsx](src/pages/login/LoginContent.jsx)).
- The "이 누리집은 대한민국 공식 전자정부 누리집입니다" banner is required on government sites and stays; the rest of the header could be simplified.

### M12. Accessibility beyond the basics
- 17 `aria-*` attributes in the whole app.
- Buttons have `outline: none`; their focus style is a 1px border that shifts layout. Links and inputs get no focus style.
- [Modal.jsx](src/components/common/Modal.jsx) has no focus trap, doesn't return focus on close, and doesn't lock background scroll.
- Forms are laid out with tables.
- Footer text is `#8a8a8a` at 12px, about 3.4:1 contrast, below WCAG AA.

### M13. Performance
- Production JS is a single 1.2 MB chunk (257 KB gzipped), including the 600 KB mock `db.json` and every page; no route splitting.
- `chunkSizeWarningLimit: 100000000` hides the size warning ([vite.config.js](vite.config.js)).
- `public/images` is 33 MB, mostly PNG screenshots.

## Housekeeping

- **H1. Lint doesn't run.** `pnpm lint` passes `--ext`, which flat config rejects. [eslint.config.js](eslint.config.js) uses v9 APIs (`eslint/config`) while `package.json` pins `eslint ^8`.
- **H2. Template leftovers:** `src/App.css`, `src/index.css`, `public/index.html` (CRA), the template README, `src/reportWebVitals.js`, a `"proxy"` field Vite ignores, and both `@vitejs/plugin-react` and `@vitejs/plugin-react-swc` installed.
- **H3. Two lockfiles:** `package-lock.json` and `pnpm-lock.yaml`.
- **H4. Missing file:** `MISSING_PAGES.md` is referenced in [menu.js](src/constants/menu.js) but no longer exists.
- **H5. Upgrades worth considering:** React 19, react-router 7, TypeScript, before the codebase grows further.

## Suggested order

1. Decide on the faithful-copy rule and update CLAUDE.md.
2. H1–H4, and route-level code splitting (M13).
3. M4 and M5: inline errors, toasts, loading and error states. Biggest change in feel for the least work, no redesign needed.
4. M1 and M2: fluid layout within a max width, updated type scale and spacing.
5. M7: replace `window.open` popups and hover-only menus.
6. M9: move static guide content out of JSX.
