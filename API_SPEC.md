# API 명세

현재 프론트엔드(`src/api/services/*`, `src/api/_fetch.js`, `src/api/mock/db.json`)가 기대하는 백엔드 계약을 정리한 문서입니다. 백엔드가 이 계약대로 응답하면 `client.js`에서 `_fetch`를 `fetch`로 바꾸는 것만으로 연동됩니다.

- **범위:** 인덱스 페이지, 공용 레이아웃(헤더·푸터·알림), 로그인, `/my` 아래 페이지.
- **제외:** 훈련/연기/보류 신청, 공개 게시판, 훈련장·부대 찾기, 팝업 페이지에서만 쓰는 API와 필드.
- **DB 구조:** [DB_SPEC.md](DB_SPEC.md)
- **기준:** 2026-10-18 작업 트리(커밋되지 않은 Q&A 사전작성 답변 기능 포함).

## 1. 공통 규칙

| 항목 | 규칙 |
| --- | --- |
| Base URL | `/api` (`VITE_APP_API_BASE`로 변경 가능) |
| 형식 | 요청과 응답 모두 `application/json; charset=utf-8`. 예외: 문서 출력은 `text/html`, 첨부파일은 바이너리 |
| 인증 | 세션 쿠키. 프론트는 모든 요청을 `credentials: "include"`로 보냄 |
| `/me/*` | 세션이 없거나 만료되면 `401` |
| 오류 | `4xx` 상태와 `{ "message": "..." }`. `message`는 사용자에게 그대로 보이므로 한국어 문장으로 작성 |
| 없는 리소스 | `404` + `{ "message": "Not Found" }` (또는 안내 문구) |
| 빈 쿼리 | 값이 없는 쿼리 파라미터는 아예 보내지 않음 |
| 페이지네이션 | `page`(1부터, 기본 1), `size`(기본 10). 응답은 `{ total, page, size, items }` |
| 날짜 | 기본 `YYYY-MM-DD`, 일시는 `YYYY-MM-DD HH:mm`(KST). 화면용 문자열 필드는 아래 각 항목에 형식을 적어 둠 |

```json
{ "total": 40, "page": 1, "size": 10, "items": [] }
```

## 2. 엔드포인트 목록

| # | 메서드 | 경로 | 인증 | 사용처 |
| --- | --- | --- | --- | --- |
| 1 | GET | `/main` | - | 인덱스 |
| 2 | GET | `/popups` | - | 헤더 알림(NoticeBell) |
| 3 | GET | `/site-info` | - | 푸터 |
| 4 | POST | `/auth/login` | - | 로그인 |
| 5 | POST | `/auth/logout` | - | 헤더 |
| 6 | GET | `/auth/me` | 세션 | 앱 시작 시 로그인 상태 복원 |
| 7 | POST | `/auth/extend` | 세션 | 헤더 "로그인 연장" |
| 8 | GET | `/me/profile` | 세션 | 개인정보수정, 글쓰기 폼 작성자 정보 |
| 9 | PUT | `/me/profile` | 세션 | 개인정보수정 |
| 10 | GET | `/codes/:group` | - | 개인정보수정 선택 항목 |
| 11 | GET | `/me/training` | 세션 | 훈련정보, 인덱스 개인 카드, 로그인 직후 훈련정보 팝업 |
| 12 | GET | `/me/trainings/:id/certificate` | 세션 | 교육필증 출력 |
| 13 | GET | `/me/trainings/:id/call-up-notice` | 세션 | 소집통지서 출력 |
| 14 | GET | `/me/standing-reserve` | 세션 | 상비예비군 |
| 15 | GET | `/me/awards` | 세션 | 예비군 상훈 |
| 16 | GET | `/me/unit/:board` | 세션 | 소속부대 공지사항, 훈련안내 목록 |
| 17 | GET | `/me/unit/:board/:id` | 세션 | 위 게시판 상세 |
| 18 | GET | `/me/unit/:board/:id/files/:fileSn` | 세션 | 첨부파일 다운로드 |
| 19 | GET | `/me/unit/qna` | 세션 | 나의 질의응답 목록 |
| 20 | GET | `/me/unit/qna/:id` | 세션 | 질의응답 상세 |
| 21 | POST | `/me/unit/qna` | 세션 | 질의 작성 |
| 22 | GET | `/me/unit/qna/:id/edit` | 세션 | 질의 수정 폼 |
| 23 | PUT | `/me/unit/qna/:id` | 세션 | 질의 수정 |
| 24 | DELETE | `/me/unit/qna/:id` | 세션 | 질의 삭제 |
| 25 | POST | `/me/unit/qna/:id/comments` | 세션 | 댓글, 답글 작성 |
| 26 | GET | `/me/unit/free-board` | 세션 | 자유게시판 목록 |
| 27 | GET | `/me/unit/free-board/:id` | 세션 | 자유게시판 상세 |
| 28 | POST | `/me/unit/free-board` | 세션 | 자유게시판 글쓰기 |

## 3. 인덱스와 공용 레이아웃

### 3.1 `GET /main`

인덱스 페이지 콘텐츠를 한 번에 내려줍니다.

```json
{
  "slides": [Slide],
  "notices": [NoticeSummary],
  "faq": [{ "id": 1, "question": "소속 예비군 중대 확인" }],
  "banners": [Banner],
  "mediaTabs": [MediaTab]
}
```

| 타입 | 필드 | 설명 |
| --- | --- | --- |
| Slide | `id` | 문자열 키 (`"smart-defense"`) |
| | `eyebrow`, `title`, `description` | `title`은 `\n`으로 줄바꿈 |
| | `link` | `{ label, path }` 또는 `{ label, href }`. 없으면 버튼을 숨김. `path`는 사이트 내부 경로, `href`는 외부 URL(새 창) |
| | `theme` | `navy` \| `blue` \| `sky` |
| | `art` | `image`가 없을 때 그리는 일러스트 키 (`shield`, `calendar`, `map`) |
| | `image` | 선택. 이미지 URL |
| NoticeSummary | `nttId`, `title`, `createdAt`, `important` | 공지사항 게시판(`notice`) 상위 5건, 중요 공지 먼저. 클릭하면 `/board/notice/:nttId`로 이동 |
| faq 항목 | `id`, `question` | `id`는 FAQ 페이지 문항 번호. 클릭하면 `/inform/faq?faq=:id`로 이동 |
| Banner | `id`, `title`, `description`, `icon` | `icon`: `pin`, `care`, `rank`, `external` 등 아이콘 키 |
| | `path` 또는 `href` | 둘 중 하나. `href`면 외부 링크 |
| MediaTab | `key`, `label` | `key`가 `video`로 시작하면 재생 아이콘을 표시 |
| | `items[]` | `{ title, image, board, nttId }`. 클릭하면 `/board/:board/:nttId`로 이동하고, 첫 항목의 `board`로 "더보기" 링크를 만듦 |

### 3.2 `GET /popups`

헤더 알림 목록입니다. 최신순 배열로 내려주며, 페이지 로드 때 자동으로 띄우지는 않습니다. 열람 여부는 브라우저 localStorage에만 저장합니다.

```json
[{ "id": "POPUP_00000023001024", "title": "홈페이지 정기 점검 안내", "postedAt": "2026-10-08", "content": "..." }]
```

- `content`: 관리자가 작성한 HTML(링크 포함 가능)로, 그대로 렌더링합니다. 줄바꿈은 `\n`이며 CSS가 줄바꿈을 유지합니다. **서버에서 HTML sanitize가 필요합니다.**
- 노출 기간이 지난 알림은 서버에서 걸러서 내려줍니다.

### 3.3 `GET /site-info`

```json
{
  "owner": "국방부 예비전력정책관실",
  "postcode": "04383",
  "address": "서울특별시 용산구 이태원로 22",
  "phone": "02-0000-0000",
  "relatedSites": [{ "group": "국방부·군 기관", "items": [{ "label": "국방부", "href": "https://www.mnd.go.kr" }] }],
  "sns": [{ "key": "youtube", "label": "국방부 유튜브", "href": "https://..." }]
}
```

- `sns[].key`는 아이콘 키로도 쓰입니다: `youtube`, `blog`, `instagram`, `facebook`, `x`.

## 4. 인증

세션은 15분이고 연장할 때마다 15분이 다시 주어집니다. 프론트는 `expiresAt`까지 남은 시간을 헤더에 표시하고, 시간이 다 되면 로그아웃 처리합니다.

**AuthUser**

```json
{ "name": "John Doe", "unit": { "name": "개포1동대", "phone": "02-579-1113" }, "expiresAt": 1792300000000 }
```

- `expiresAt`: 세션 만료 시각(epoch ms).

| API | 요청 | 응답 | 오류 |
| --- | --- | --- | --- |
| `POST /auth/login` | `{ "method": "simple" \| "phone" \| "ipin" }` | AuthUser + `Set-Cookie` | 인증 실패 시 4xx `{ message }` (프론트가 alert으로 표시) |
| `POST /auth/logout` | 없음 | `{}` | 실패해도 프론트는 로그아웃 처리 |
| `GET /auth/me` | 없음 | AuthUser | `401 로그인이 필요합니다.` |
| `POST /auth/extend` | 없음 | AuthUser (`expiresAt` 갱신) | `401 로그인 세션 연장을 실패하였습니다. 다시 로그인 해주시기 바랍니다.` |

- `method`는 로그인 화면에서 고른 본인확인 수단(간편인증, 휴대폰 본인인증, 아이핀)입니다. 실제 외부 인증 연동(창 호출, 콜백)은 아직 프론트 계약에 없습니다. 7절을 참고하세요.

## 5. `/my`: 내 정보와 훈련

### 5.1 `GET /me/profile`

**Profile**

| 필드 | 타입 | 수정 | 설명 |
| --- | --- | --- | --- |
| `name` | string | X | 성명 |
| `unit` | `{ troopId, name, phone, platoon }` | X | 소속 예비군부대. `platoon`은 소대/분대 (`"1소대 1분대"`) |
| `familyMaster` | string | O | 세대주 성명 |
| `familyMasterRelation` | code | O | 세대주와의 관계 (`familyRelations` 코드, 빈 문자열 가능) |
| `cellPhone`, `homePhone`, `companyPhone` | string | O | 하이픈 포함 (`010-1234-5678`), 빈 문자열 가능 |
| `email` | string | O | `id@domain` 또는 빈 문자열 |
| `bank` | code | O | `banks` 코드 |
| `account` | string | O | 숫자와 `-`만 사용 |
| `noticeWay` | `"Y"` \| `"N"` | O | 소집통지서 수신 방법. `Y` 이메일, `N` 이메일 + 우편 |
| `mailOptOut` | code[] | O | 수신 거부한 메일 (`mailOptOuts` 코드) |
| `birthdaySmsOptOut` | boolean | O | 생일문자 수신 거부 |
| `outingArea`, `outingPurpose` | string | O | 출타 지역, 목적 |
| `outingStart`, `outingEnd` | `YYYY-MM-DD` \| `""` | O | 출타 기간 |
| `outingPhone` | string | O | 출타 중 연락처 |
| `proxyName`, `proxyPhone` | string | O | 대리 수령인과 연락처 |

> 범위 밖 페이지(훈련/보류 신청)는 같은 응답에서 `birthDate`, `serviceType`, `address`, `position`, `dischargeYear`도 읽습니다. 이 문서에서는 다루지 않습니다.

### 5.2 `PUT /me/profile`

- **요청:** 프론트는 Profile 객체 전체를 보냅니다. 서버는 위 표에서 "수정 O"인 필드만 반영하고 나머지는 무시합니다.
- **응답:** 저장된 Profile.
- **검증:**
  - `outingStart > outingEnd`이면 `400 출타 종료일자가 시작일자보다 빠를 수 없습니다.`
  - 이메일 형식은 `^[\w.+-]+@[\w-]+(\.[\w-]+)+$`. 프론트도 같은 규칙으로 검사합니다.

### 5.3 `GET /codes/:group`

```json
[{ "code": "004", "name": "국민은행" }]
```

| group | 용도 |
| --- | --- |
| `banks` | 급여계좌 은행 |
| `familyRelations` | 세대주와의 관계 |
| `emailDomains` | 이메일 도메인 선택지 (`code` = `name` = 도메인) |
| `mailOptOuts` | 이메일 수신 거부 항목 (`info`, `trainfo`, `command`, …) |

정의되지 않은 group은 `404`를 반환합니다. 범위 밖 그룹(`delayReasons`)은 생략했습니다.

### 5.4 `GET /me/training`

```json
{
  "member": Member,
  "year": 2026,
  "remoteEducation": { "status": "비대상", "reason": "최초 제외" },
  "remoteTrainings": [RemoteTraining],
  "trainings": [Training],
  "pastTrainings": [Training]
}
```

- `trainings`는 `year` 연도의 훈련이고, `pastTrainings`는 그 이전 연도의 훈련입니다.
- 인덱스 개인 카드는 `trainings` 가운데 시작일이 오늘 이후인 가장 이른 훈련을 "다가오는 훈련"으로 보여줍니다.

**Member** (소속 표에 쓰는 요약)

| 필드 | 예 |
| --- | --- |
| `name` | `"John Doe"` |
| `rank` | `"병장"` |
| `serviceNo` | `"22-00000001"` |
| `branch` | `"육군"` |
| `yearsOfService` | `2` (예비군 연차) |
| `mobilization` | `"미지정"` (동원구분) |
| `unit` | `{ troopId, name, phone, platoon }` |

**Training**

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `id` | string | 훈련 ID. 문서 출력 경로에 사용 |
| `typeCode`, `typeName` | string | 훈련 유형 (`"03"`, `"기본훈련"`) |
| `round` | string | 차수 (`"1차"`, 없으면 `""`) |
| `date` | string | **화면용 문자열**: `YYYY.MM.DD` 또는 `YYYY.MM.DD~YYYY.MM.DD` |
| `plannedHours`, `doneHours`, `remainingHours` | number | 계획, 실시, 잔여 시간 |
| `result` | string | 훈련결과 문구 (`"참석"`, `"통지취소"`, 미실시면 `""`) |
| `resultType` | `attend` \| `defer` \| `""` | 배지 색 (attend 초록, defer 주황) |
| `scheduleState` | 1 \| 2 \| 3 | 1 종료, 2 일정 변경 가능, 3 변경 불가 |
| `center` | string | 훈련장 이름 또는 주소 |
| `certificate` | boolean | 교육필증 발급 가능 여부 (버튼 노출) |
| `notice` | boolean | 소집통지서 발급 가능 여부 (버튼 노출) |

**RemoteTraining**: `{ id, year, name, period, result, hours, note }` (모두 화면용 문자열이나 숫자)

### 5.5 `GET /me/trainings/:id/certificate`, `GET /me/trainings/:id/call-up-notice`

- **응답:** `text/html` 인쇄용 문서 한 장. iframe `srcDoc`에 넣고 iframe 안에서 `print()`를 호출합니다(sandbox `allow-same-origin allow-modals`). CSS를 포함한 독립 문서여야 하며 외부 스크립트는 실행되지 않습니다.
- **오류:**
  - 본인 훈련이 아니거나 플래그(`certificate`/`notice`)가 false이면 `404`.
  - 메시지 예: `교육필증을(를) 발급할 수 없는 훈련입니다.`
- 소집통지서는 출력 전에 프론트에서 열람 동의를 받습니다. 7절을 참고하세요.

### 5.6 `GET /me/standing-reserve`

```json
{ "member": Member, "history": [StandingHistory], "trainings": [Training], "pastTrainings": [Training] }
```

- **StandingHistory:** `{ id, period, troop, type, releaseReason }`. 편성기간, 소집부대, 구분, 소집해제사유이며 모두 화면용 문자열입니다.
- `trainings`/`pastTrainings`는 상비예비군 훈련만 담고, 기준 연도는 올해입니다. 문서 버튼은 없습니다.

### 5.7 `GET /me/awards`

```json
{ "member": Member, "awards": [{ "id": "...", "date": "2025-05-01", "order": "명령근거", "note": "기타" }] }
```

## 6. `/my`: 소속부대 게시판

모든 게시판은 **로그인한 사용자의 소속 부대(`unit.troopId`) 글만** 다룹니다.

### 6.1 소속부대 공지사항과 훈련안내

`:board`는 `notices`(소속부대 공지사항) 또는 `training-notices`(훈련안내)이고, 그 밖의 값은 `404`입니다.

**`GET /me/unit/:board`**: `?page&size&searchCnd&searchWrd`

- `searchCnd`: `0` 제목, `1` 내용, `2` 제목+내용. 훈련안내 화면은 제목 검색만 제공합니다.
- `searchWrd`: 최대 35자.
- `items[]`: `{ id, title, createdAt, views, hasAttachment }`

**`GET /me/unit/:board/:id`**

```json
{
  "id": "UN1000",
  "title": "[개포1동대] ...",
  "createdAt": "2026-09-16",
  "views": 4,
  "body": "<p>...</p>",
  "attachments": [{ "fileSn": 0, "name": "안내문.hwp", "size": 31744 }]
}
```

- `body`: 부대 담당자가 에디터로 작성한 HTML로, 그대로 렌더링합니다(sanitize 필요).
- 상세를 조회할 때마다 조회수를 1 올립니다(권장, mock은 구현하지 않음).

**`GET /me/unit/:board/:id/files/:fileSn`**: 첨부파일 바이너리를 내려줍니다. `<a href download>`로 직접 여는 링크이므로 세션 쿠키로 인증하고 `Content-Disposition`에 파일명을 담습니다. 현재 mock에는 이 경로가 없습니다.

### 6.2 나의 질의응답 (Q&A)

같은 부대 예비군의 질의를 모두 보여주는 게시판입니다. 질의가 등록되면 AI가 먼저 처리하고, 필요하면 담당자(동대장 등)가 답합니다.

**QuestionSummary** (목록 항목)

| 필드 | 설명 |
| --- | --- |
| `id`, `title`, `createdAt`(`YYYY-MM-DD`), `views` | |
| `writer` | 마스킹한 작성자명 (`J*****e`: 첫 글자와 끝 글자만 노출. 2자 이하면 `X*`) |
| `mine` | 요청자가 쓴 글인지 여부 |
| `public` | 공개 여부. 비공개 글도 목록에는 나오며(자물쇠 아이콘), 열람은 막힘 |
| `status` | `answered`(답변완료) \| `pending`(미답변) \| `followUp`(추가문의) |
| `answeredAt` | **화면용 문자열** `MM.DD HH:mm`, 미답변이면 `""` |
| `rating` | 만족도 0~5 (0이면 미평가) |
| `commentCount` | 답글을 포함한 댓글 수. AI 전달 안내(handoff)는 세지 않음 |

**Question** (상세): QuestionSummary 필드(`commentCount` 제외)에 아래 필드가 더해집니다.

| 필드 | 설명 |
| --- | --- |
| `phone` | 작성자 휴대폰, 마스킹 (`010****5678`) |
| `email` | 답변 알림 이메일, 마스킹 (`joh*****@example.com`), 없으면 `""` |
| `body` | HTML. 작성할 때 받은 일반 텍스트를 서버가 이스케이프한 뒤 줄마다 `<p>`로 감쌈 |
| `summary` | `{ body (일반 텍스트), updatedAt (YYYY-MM-DD HH:mm) }` 또는 `null`. 게시글과 댓글을 LLM으로 요약한 내용 |
| `comments` | Comment[] (오래된 순) |
| `canComment` | 댓글 작성 가능 여부 (작성자 본인 또는 담당자) |
| `canEdit` | 수정·삭제 가능 여부 (아래 규칙) |

**Comment**

| 필드 | 설명 |
| --- | --- |
| `id` | |
| `role` | `writer` 작성자, `staff` 담당자, `ai` AI, `template` 사전작성 답변 |
| `kind` | `role = ai`일 때만 사용. `answer`(근거가 있는 답변) \| `handoff`(담당자 전달 안내) |
| `author` | 표시 이름: 작성자는 마스킹 이름, 담당자는 직함(`개포1동대장`), AI는 `AI 상담`, 템플릿은 템플릿 작성자 |
| `body` | **일반 텍스트**(줄바꿈 `\n`). 프론트가 텍스트로 출력 |
| `createdAt` | `YYYY-MM-DD HH:mm` |
| `sources` | `ai/answer`에만 사용. `[{ title, url }]`. `url`이 `/`로 시작하면 사이트 내부 링크, 아니면 새 창, 비어 있으면 텍스트만 표시 |
| `template` | `template`에만 사용. `{ id, title, updatedAt (YYYY-MM-DD) }` |
| `replies` | 최상위 댓글에만 있음. Comment[] (한 단계까지만) |

```json
{
  "id": "QA1976-C1", "role": "ai", "kind": "answer", "author": "AI 상담",
  "body": "일반 훈련은 소집 1일 전까지 ...", "createdAt": "2026-05-07 11:20",
  "sources": [{ "title": "훈련 연기 안내", "url": "/delay/guide" }],
  "replies": []
}
```

**업무 규칙** (백엔드가 판단)

- **작성 직후 AI 처리:** 새 질의나 작성자의 새 댓글이 들어오면 순서대로 확인합니다.
  1. 소속 부대의 사전작성 답변(템플릿) 가운데 키워드가 맞고 이 질의에서 아직 쓰지 않은 것이 있으면, 그 본문을 그대로 `template` 댓글로 게시합니다. `status = answered`가 되고, `answeredAt`이 비어 있으면 채웁니다.
  2. 맞는 템플릿이 없으면, AI가 근거로 답을 확정할 수 있을 때만 `ai/answer` 댓글을 근거(`sources`)와 함께 게시합니다.
  3. 둘 다 아니면 `ai/handoff` 안내를 게시합니다. 질의당 1개만 둡니다.
- **답글 위치:** 새 질의에 대한 AI 응답은 최상위 댓글로, 작성자 댓글에 대한 응답은 그 댓글 스레드의 답글로 붙입니다.
- **handoff:** 답글을 받을 수 없습니다. 담당자가 댓글을 달면 그 질의의 handoff는 삭제합니다.
- **status:** 서버가 댓글을 보고 판정합니다. 답변이 달린 뒤 작성자가 다시 댓글을 달면 `followUp`이 됩니다.
- **canEdit:** 작성자 본인이고, 달린 댓글이 작성자 본인 댓글과 handoff뿐일 때만 true입니다. AI 답변, 템플릿, 담당자 댓글이 하나라도 있으면 수정과 삭제가 잠깁니다.
- **summary:** 답변이 생기거나 바뀔 때 다시 생성합니다.

**`GET /me/unit/qna`**: `?from&to&searchType&searchWrd&status&page&size`

- `from`, `to`: `YYYY-MM-DD`. 작성일 기준이며 양 끝을 포함합니다. 프론트가 `from <= to`를 검사합니다.
- `searchType`: `TITLE` \| `WRITER`. `searchWrd`가 있으면 필수이고, `searchWrd`는 최대 35자입니다.
- `status`: `answered` \| `pending` \| `followUp`.
- 응답: `{ total, page, size, items: QuestionSummary[] }`. 최신순입니다.

**`GET /me/unit/qna/:id`** → Question

- 비공개이면서 내 글이 아니면 `403 비공개 글은 작성자만 조회할 수 있습니다.`

**`POST /me/unit/qna`** → Question

```json
{ "title": "제목", "body": "일반 텍스트\n여러 줄", "email": "john.doe@example.com", "public": true }
```

- `title`: 필수, 최대 100자. 비어 있으면 `400 제목을(를) 입력하세요.`
- `body`: 필수, 최대 3000 byte(한글 2 byte). 비어 있으면 `400 질의내용을(를) 입력하세요.`
- `email`: 선택. `public`: 생략하면 true.
- 서버가 채우는 값: 작성자, 소속 부대, 연락처, `status = pending`, `views = 0`, `rating = 0`. 이어서 AI 처리를 실행합니다.

**`GET /me/unit/qna/:id/edit`** → `{ title, body (일반 텍스트), email (마스킹 안 함), public }`

**`PUT /me/unit/qna/:id`**: 요청 형식과 검증은 POST와 같고, Question을 반환합니다.

**`DELETE /me/unit/qna/:id`** → `{}`

- 수정, 삭제, 수정 폼 조회 공통 오류:
  - 없는 글이면 `404 게시글을 찾을 수 없습니다.`
  - 남의 글이면 `403 본인이 작성한 글만 수정/삭제할 수 있습니다.`
  - 답변이 있으면 `403 답변이 등록된 글은 수정/삭제할 수 없습니다.`

**`POST /me/unit/qna/:id/comments`** → 갱신된 Question 전체

```json
{ "body": "댓글 내용", "parentId": "QA1976-C1" }
```

- `body`: 필수, 최대 1000 byte. 비어 있으면 `400 댓글을(를) 입력하세요.`
- `parentId`: 선택. 최상위 댓글의 id여야 합니다.
- 오류:
  - 없는 `parentId`이면 `400 답글을 달 댓글을 찾을 수 없습니다.`
  - handoff에 답글을 달면 `400 AI 안내 메시지에는 답글을 달 수 없습니다.`
  - 작성자나 담당자가 아니면 `403 댓글은 게시글 작성자와 담당자만 작성할 수 있습니다.`
- 저장한 뒤 AI 처리와 status 판정을 실행하고, 그 결과를 반영해 응답합니다.

### 6.3 자유게시판

**FreePost**: `{ id, title, writer (마스킹), mine, createdAt, public, views, body }`

- 목록 항목에는 `body`가 없습니다.
- 수정, 삭제, 댓글 기능은 없습니다.

**`GET /me/unit/free-board`**: `?public&searchType&searchWrd&page&size`

- `public`: `Y` \| `N`, 생략하면 전체.
- `searchType`: `TITLE` \| `WRITER`. 프론트 기본값은 `TITLE`입니다.
- 비공개 글도 목록에는 나옵니다.

**`GET /me/unit/free-board/:id`** → FreePost

- 비공개이면서 내 글이 아니면 `403 비공개 글은 작성자만 조회할 수 있습니다.`

**`POST /me/unit/free-board`** → FreePost

- 요청: `{ "title": "...", "body": "일반 텍스트", "public": true }`. Q&A와 같은 폼을 쓰므로 `email: ""`가 함께 올 수 있으며, 서버는 무시합니다.
- 검증은 Q&A와 같습니다(제목 100자, 내용 3000 byte). 메시지는 `내용을(를) 입력하세요.`입니다.
- `body`는 Q&A처럼 이스케이프한 뒤 `<p>` HTML로 바꿔 저장하거나 반환해야 합니다. 상세 화면은 `body`를 HTML로 렌더링합니다. 7절을 참고하세요.

## 7. 확인이 필요한 사항

프론트 코드를 읽다가 발견한, 백엔드 설계 전에 정해야 할 점입니다.

1. **자유게시판 본문 처리:** 현재 mock은 받은 일반 텍스트를 그대로 저장하는데, 상세 화면은 이를 HTML로 렌더링합니다. 그래서 줄바꿈이 사라지고 HTML이 주입될 수 있습니다. 백엔드는 Q&A와 같은 변환을 해야 하고, mock도 맞추는 것이 좋습니다.
2. **소집통지서 열람 동의:** "동의하면 통지서가 전달된 것으로 간주한다"는 법적 의미가 있는데, 동의 여부가 서버에 전달되지 않습니다. 예를 들어 `POST /me/trainings/:id/call-up-notice/consent`처럼 동의를 기록하는 API가 필요할 수 있습니다.
3. **본인확인 연동:** `POST /auth/login { method }`는 자리표시용입니다. 간편인증, PASS, 아이핀은 보통 리다이렉트와 콜백(또는 팝업과 토큰 교환) 방식이므로, 실제 흐름에 맞춘 계약을 따로 정해야 합니다.
4. **만족도(`rating`):** 표시만 하고 입력하는 API가 없습니다. 누가 언제 평가하는지 정해야 합니다.
5. **조회수:** 상세를 조회할 때 증가시키는지(같은 사용자의 중복 조회 처리 포함) 정해야 합니다. mock은 증가시키지 않습니다.
6. **출타 정보 삭제:** 화면에 "저장 후 삭제하려면 동대 확인 필요"라고 안내하지만, 서버 규칙이 없습니다(현재는 빈 값으로 저장할 수 있음).
7. **화면용 날짜 문자열:** `Training.date`(`YYYY.MM.DD~…`), `answeredAt`(`MM.DD HH:mm`), `StandingHistory.period`, `RemoteTraining.period`는 프론트가 그대로 출력합니다. 서버가 이 형식으로 만들어 주거나, 프론트에서 포맷하도록 바꿔야 합니다.
8. **Q&A 작성자 연락처:** 작성 시점 값을 보관할지, 회원 정보에서 매번 가져올지 정해야 합니다. mock은 작성 시점 값을 보관합니다.
