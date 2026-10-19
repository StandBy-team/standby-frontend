import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import Icon from "@/components/common/Icon";
import PageState from "@/components/common/PageState";
import Pagination from "@/components/common/Pagination";
import { fetchFreePosts } from "@/api/services/unit";
import ROUTES, { detailPath } from "@/constants/routes";
import useApi from "@/hooks/useApi";
import { useToast } from "@/hooks/useFeedback";
import useListNavigation from "@/hooks/useListNavigation";

const FILTERS = { visibility: "", searchType: "TITLE" };

export default function FreeBoardList() {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { query, setPage, search } = useListNavigation(FILTERS);
  const [form, setForm] = useState(query);
  const [synced, setSynced] = useState(query);
  const list = useApi(
    (opts) => fetchFreePosts(query, opts),
    [query.page, query.visibility, query.searchType, query.searchWrd]
  );
  const linkState = { listSearch: location.search };

  if (synced !== query) {
    setSynced(query);
    setForm(query);
  }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    search({ visibility: form.visibility, searchType: form.searchType, searchWrd: form.searchWrd.trim() });
  };

  const open = (item) => {
    if (!item.public && !item.mine) {
      toast("비공개 글은 작성자만 조회할 수 있습니다.", { tone: "error" });
      return;
    }
    navigate(detailPath(ROUTES.MY_FREE_BOARD_DETAIL, item.id), { state: linkState });
  };

  return (
    <SubLayout title="자유게시판">
      <div className="search-head">
        <p className="search-total">
          {list.data && (
            <>
              총 <strong>{list.data.total.toLocaleString()}</strong>건
            </>
          )}
        </p>
        <form className="search-bar" role="search" onSubmit={submit}>
          <label htmlFor="q_opnpbl_yn" className="hid">
            공개여부
          </label>
          <select id="q_opnpbl_yn" className="sel-box" value={form.visibility} onChange={set("visibility")}>
            <option value="">공개여부 전체</option>
            <option value="Y">공개</option>
            <option value="N">비공개</option>
          </select>
          <label htmlFor="q_type" className="hid">
            검색조건선택
          </label>
          <select id="q_type" className="sel-box" value={form.searchType} onChange={set("searchType")}>
            <option value="TITLE">제목</option>
            <option value="WRITER">게시자</option>
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
          <button type="submit" className="btn-gradient normal blue">
            검색
          </button>
          <button type="button" className="btn-gradient normal white" onClick={() => search({ ...FILTERS, searchWrd: "" })}>
            초기화
          </button>
        </form>
      </div>
      <div className="my-list-actions">
        <button type="button" className="btn-gradient normal blue" onClick={() => navigate(ROUTES.MY_FREE_BOARD_NEW)}>
          글쓰기
        </button>
      </div>
      {!list.data && <PageState error={list.error && { message: "게시물을 불러오지 못했습니다." }} />}
      {list.data && (
        <>
          <table className="dtable">
            <caption>자유게시판 목록으로 번호, 제목, 게시자, 게시일자, 공개, 조회수 정보를 제공</caption>
            <colgroup>
              <col style={{ width: 60 }} />
              <col />
              <col style={{ width: 90 }} />
              <col style={{ width: 100 }} />
              <col style={{ width: 60 }} />
              <col style={{ width: 70 }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">번호</th>
                <th scope="col">제목</th>
                <th scope="col">게시자</th>
                <th scope="col">게시일자</th>
                <th scope="col">공개</th>
                <th scope="col">조회수</th>
              </tr>
            </thead>
            <tbody>
              {list.data.items.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty">
                    검색된 데이터가 없습니다.
                  </td>
                </tr>
              )}
              {list.data.items.map((item, i) => (
                <tr key={item.id} className="clickable" onClick={() => open(item)}>
                  <td>{(list.data.page - 1) * list.data.size + i + 1}</td>
                  <td className="title">
                    <Link
                      to={detailPath(ROUTES.MY_FREE_BOARD_DETAIL, item.id)}
                      state={linkState}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        open(item);
                      }}
                    >
                      {item.title}
                    </Link>
                    {!item.public && <Icon name="lock" size={14} label="비공개" className="title-icon" />}
                  </td>
                  <td>{item.writer}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.public ? "공개" : "비공개"}</td>
                  <td>{item.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination page={list.data.page} size={list.data.size} total={list.data.total} onChange={setPage} />
        </>
      )}
    </SubLayout>
  );
}
