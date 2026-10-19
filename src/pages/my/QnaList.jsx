import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import Pagination from "@/components/common/Pagination";
import DateInput from "@/components/common/DateInput";
import Icon from "@/components/common/Icon";
import PageState from "@/components/common/PageState";
import BoardComments from "@/components/my/BoardComments";
import QnaStatusBadge from "@/components/my/QnaStatusBadge";
import Rating from "@/components/my/Rating";
import { fetchQuestions } from "@/api/services/unit";
import { QNA_STATUSES } from "@/constants/qna";
import ROUTES, { detailPath } from "@/constants/routes";
import useApi from "@/hooks/useApi";
import useAuth from "@/hooks/useAuth";
import { useToast } from "@/hooks/useFeedback";
import useListNavigation from "@/hooks/useListNavigation";

const FILTERS = { from: "", to: "", searchType: "", status: "" };

const validate = (form) => {
  if (form.from && form.to && form.from > form.to) return "검색기간 종료일자가 시작일자보다 빠를 수 없습니다.";
  if (form.searchWrd.trim() && !form.searchType) return "검색조건을 선택해주세요.";
  return "";
};

export default function QnaList() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { query, setPage, search } = useListNavigation(FILTERS);
  const [form, setForm] = useState(query);
  const [synced, setSynced] = useState(query);
  const [error, setError] = useState("");
  const [more, setMore] = useState(Boolean(query.from || query.to));
  const list = useApi(
    (opts) => fetchQuestions(query, opts),
    [query.page, query.from, query.to, query.searchType, query.searchWrd, query.status]
  );
  const linkState = { listSearch: location.search };

  if (synced !== query) {
    setSynced(query);
    setForm(query);
  }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const message = validate(form);
    setError(message);
    if (message) {
      if (message.startsWith("검색기간")) setMore(true);
      return;
    }
    const { from, to, searchType, status } = form;
    search({ from, to, searchType, status, searchWrd: form.searchWrd.trim() });
  };

  const reset = () => {
    setError("");
    search({ ...FILTERS, searchWrd: "" });
  };

  const open = (item) => {
    if (!item.public && !item.mine) {
      toast("비공개 글은 작성자만 조회할 수 있습니다.", { tone: "error" });
      return;
    }
    navigate(detailPath(ROUTES.MY_QNA_DETAIL, item.id), { state: linkState });
  };

  return (
    <SubLayout title="나의 질의응답">
      <section>
        <BoardComments />
        <form className="my-search" onSubmit={submit} noValidate>
          <div className="search-head">
            <p className="search-total">
              {list.data && (
                <>
                  총 <strong>{list.data.total.toLocaleString()}</strong>건
                </>
              )}
            </p>
            <div className="search-bar">
              <label htmlFor="q_type" className="hid">
                검색조건
              </label>
              <select id="q_type" className="sel-box" value={form.searchType} onChange={set("searchType")}>
                <option value="">검색조건 선택</option>
                <option value="TITLE">제목</option>
                <option value="WRITER">작성자</option>
              </select>
              <label htmlFor="q_search" className="hid">
                검색어입력
              </label>
              <span className="search-input">
                <Icon name="search" size={16} />
                <input
                  id="q_search"
                  className="inp-box"
                  type="search"
                  maxLength={35}
                  placeholder="검색어를 입력하세요"
                  value={form.searchWrd}
                  onChange={set("searchWrd")}
                />
              </span>
              <label className="search-field" htmlFor="q_status">
                <span>처리결과</span>
                <select id="q_status" className="sel-box" value={form.status} onChange={set("status")}>
                  <option value="">전체</option>
                  {Object.entries(QNA_STATUSES).map(([value, { label }]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="btn-gradient normal blue">
                검색
              </button>
              <button type="button" className="btn-gradient normal white" onClick={reset}>
                초기화
              </button>
              <button
                type="button"
                className={`btn-gradient normal white search-more-btn${more ? " open" : ""}`}
                aria-expanded={more}
                aria-controls="qna-more"
                onClick={() => setMore(!more)}
              >
                상세검색
                <Icon name="chevronDown" size={14} />
              </button>
            </div>
          </div>
          <div id="qna-more" className="search-more" hidden={!more}>
            <span className="search-field">
              <span>검색기간</span>
              <DateInput id="q_fromDate" title="검색기간시작일자" value={form.from} onChange={(from) => setForm({ ...form, from })} />
              ~
              <DateInput id="q_toDate" title="검색기간종료일자" value={form.to} onChange={(to) => setForm({ ...form, to })} />
            </span>
            <span className="search-field">
              <span>소속부대</span>
              <span className="txt-blue">{user?.unit.name}</span>
            </span>
          </div>
          {error && (
            <p className="field-error" role="alert">
              <Icon name="alert" size={14} />
              {error}
            </p>
          )}
        </form>
        <div className="my-list-actions">
          <button type="button" className="btn-gradient normal blue" onClick={() => navigate(ROUTES.MY_QNA_NEW)}>
            글쓰기
          </button>
        </div>
        {!list.data && <PageState error={list.error && { message: "게시물을 불러오지 못했습니다." }} />}
        {list.data && (
          <>
            <table className="dtable">
              <caption>나의 질의응답 목록으로 번호, 제목, 작성자, 작성일자, 조회수, 처리결과, 응답시간, 만족도 정보를 제공</caption>
              <colgroup>
                <col style={{ width: 50 }} />
                <col />
                <col style={{ width: 70 }} />
                <col style={{ width: 90 }} />
                <col style={{ width: 55 }} />
                <col style={{ width: 90 }} />
                <col style={{ width: 80 }} />
                <col style={{ width: 80 }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">제목</th>
                  <th scope="col">작성자</th>
                  <th scope="col">작성일자</th>
                  <th scope="col">조회수</th>
                  <th scope="col">처리결과</th>
                  <th scope="col">응답시간</th>
                  <th scope="col">만족도</th>
                </tr>
              </thead>
              <tbody>
                {list.data.items.length === 0 && (
                  <tr>
                    <td colSpan={8} className="empty">
                      검색된 데이터가 없습니다.
                    </td>
                  </tr>
                )}
                {list.data.items.map((item, i) => (
                  <tr key={item.id} className="clickable" onClick={() => open(item)}>
                    <td>{(list.data.page - 1) * list.data.size + i + 1}</td>
                    <td className="title">
                      <Link
                        to={detailPath(ROUTES.MY_QNA_DETAIL, item.id)}
                        state={linkState}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          open(item);
                        }}
                      >
                        {item.title}
                      </Link>
                      {item.commentCount > 0 && (
                        <span className="title-count">
                          <span className="sr-only">댓글</span>[{item.commentCount}]
                        </span>
                      )}
                      {!item.public && <Icon name="lock" size={14} label="비공개" className="title-icon" />}
                    </td>
                    <td>{item.writer}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.views}</td>
                    <td>
                      <QnaStatusBadge status={item.status} />
                    </td>
                    <td>{item.answeredAt}</td>
                    <td>
                      <Rating value={item.rating} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination page={list.data.page} size={list.data.size} total={list.data.total} onChange={setPage} />
          </>
        )}
      </section>
    </SubLayout>
  );
}
