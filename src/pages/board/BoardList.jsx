import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import Pagination from "@/components/common/Pagination";
import BoardSearch from "@/components/common/BoardSearch";
import { fetchArticles, fetchBoard } from "@/api/services/board";
import { articlePath, boardPath } from "@/constants/routes";
import { findMenuTrail } from "@/constants/menu";
import useApi from "@/hooks/useApi";
import useListNavigation from "@/hooks/useListNavigation";

const PAGE_SIZE = { cardnews: 6 };

function SortableTh({ field, query, onSort, children }) {
  const active = query.sort === field;
  return (
    <th
      scope="col"
      className={`sortable${active ? ` sort-${query.order}` : ""}`}
      aria-sort={active ? (query.order === "asc" ? "ascending" : "descending") : "none"}
      onClick={() => onSort(field)}
    >
      {children}
    </th>
  );
}

function NoticeTable({ board, list, query, onSort, linkState }) {
  const navigate = useNavigate();
  const offset = (list.page - 1) * list.size;
  return (
    <table className="dtable">
      <caption>{board} 목록으로 번호, 제목, 작성자, 작성일, 조회수 정보를 제공</caption>
      <colgroup>
        <col style={{ width: "13%" }} />
        <col />
        <col style={{ width: "15%" }} />
        <col style={{ width: "16%" }} />
        <col style={{ width: "13%" }} />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">번호</th>
          <SortableTh field="title" query={query} onSort={onSort}>
            제목
          </SortableTh>
          <SortableTh field="writer" query={query} onSort={onSort}>
            작성자
          </SortableTh>
          <SortableTh field="createdAt" query={query} onSort={onSort}>
            작성일
          </SortableTh>
          <SortableTh field="views" query={query} onSort={onSort}>
            조회수
          </SortableTh>
        </tr>
      </thead>
      <tbody>
        {list.items.length === 0 && (
          <tr>
            <td colSpan={5} className="empty">
              게시물이 없습니다.
            </td>
          </tr>
        )}
        {list.items.map((item, i) => (
          <tr
            key={item.nttId}
            className="clickable"
            onClick={() => navigate(articlePath("notice", item.nttId), { state: linkState })}
          >
            <td>{offset + i + 1}</td>
            <td className="title">
              <Link to={articlePath("notice", item.nttId)} state={linkState} onClick={(e) => e.stopPropagation()}>
                {item.important ? <b>{item.title}</b> : item.title}
              </Link>
            </td>
            <td>{item.writer}</td>
            <td>{item.createdAt}</td>
            <td>{item.views}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function VideoTable({ list, query, onSort, linkState }) {
  const navigate = useNavigate();
  return (
    <table className="dtable video-list">
      <caption>국방영상 목록으로 썸네일, 제목, 작성일자 정보를 제공</caption>
      <colgroup>
        <col style={{ width: "152px" }} />
        <col />
        <col style={{ width: "23%" }} />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">썸네일</th>
          <SortableTh field="title" query={query} onSort={onSort}>
            제목
          </SortableTh>
          <SortableTh field="createdAt" query={query} onSort={onSort}>
            작성일자
          </SortableTh>
        </tr>
      </thead>
      <tbody>
        {list.items.length === 0 && (
          <tr>
            <td colSpan={3} className="empty">
              게시물이 없습니다.
            </td>
          </tr>
        )}
        {list.items.map((item) => (
          <tr
            key={item.nttId}
            className="clickable"
            onClick={() => navigate(articlePath("video", item.nttId), { state: linkState })}
          >
            <td>
              {item.thumbnail && (
                <div className="video-thumb">
                  <img src={item.thumbnail} alt="이미지보기" />
                  <img className="play" src="/images/main/play.svg" alt="" />
                </div>
              )}
            </td>
            <td className="title">
              <Link
                to={articlePath("video", item.nttId)}
                state={linkState}
                className={item.important ? "important" : undefined}
                onClick={(e) => e.stopPropagation()}
              >
                {item.title}
              </Link>
            </td>
            <td>{item.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CardGrid({ list, linkState }) {
  if (list.items.length === 0) return <div className="no-post">게시물이 없습니다.</div>;
  return (
    <ul className="card-news-grid">
      {list.items.map((item) => (
        <li key={item.nttId}>
          <Link to={articlePath("cardnews", item.nttId)} state={linkState}>
            <div className="thumb">{item.thumbnail && <img src={item.thumbnail} alt="썸네일이미지" />}</div>
            <div className="post">
              <div className="wrap_title">
                <span className="title">{item.title}</span>
              </div>
              <div className="post_info">{item.createdAt}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function BoardList() {
  const { board } = useParams();
  const location = useLocation();
  const { query, setPage, search, toggleSort } = useListNavigation();
  const size = PAGE_SIZE[board] ?? 10;

  const info = useApi((opts) => fetchBoard(board, opts), [board]);
  const list = useApi(
    (opts) => fetchArticles(board, { ...query, size }, opts),
    [board, size, query.page, query.searchCnd, query.searchWrd, query.sort, query.order]
  );

  const menuLabel = findMenuTrail(boardPath(board))?.trail.at(-1).label;
  const name = info.data?.name ?? menuLabel ?? "";
  const linkState = { listSearch: location.search };

  if (info.error) {
    return (
      <SubLayout title="게시판">
        <p className="mt30">존재하지 않는 게시판입니다.</p>
      </SubLayout>
    );
  }

  return (
    <SubLayout title={name}>
      <div className="pos-rel mt45">
        <h4 className="cont-tit-h4">{name}</h4>
        <BoardSearch
          searchCnd={query.searchCnd}
          searchWrd={query.searchWrd}
          titleOnly={board !== "notice"}
          total={list.data?.total}
          onSearch={search}
        />
      </div>
      {list.data && (
        <>
          {board === "cardnews" && <CardGrid list={list.data} linkState={linkState} />}
          {board === "video" && <VideoTable list={list.data} query={query} onSort={toggleSort} linkState={linkState} />}
          {board !== "cardnews" && board !== "video" && (
            <NoticeTable board={name} list={list.data} query={query} onSort={toggleSort} linkState={linkState} />
          )}
          <Pagination page={list.data.page} size={list.data.size} total={list.data.total} onChange={setPage} />
        </>
      )}
      {list.error && <p className="mt30">게시물을 불러오지 못했습니다.</p>}
    </SubLayout>
  );
}
