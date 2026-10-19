import { Link, useLocation, useNavigate } from "react-router-dom";
import SubLayout from "@/components/layout/SubLayout";
import Pagination from "@/components/common/Pagination";
import BoardSearch from "@/components/common/BoardSearch";
import Icon from "@/components/common/Icon";
import PageState from "@/components/common/PageState";
import { fetchUnitPosts } from "@/api/services/unit";
import { detailPath } from "@/constants/routes";
import useApi from "@/hooks/useApi";
import useListNavigation from "@/hooks/useListNavigation";
import { UNIT_BOARDS } from "./unitBoards";

const SEARCH_CONDITIONS = [
  { value: "0", label: "제목" },
  { value: "1", label: "내용" },
  { value: "2", label: "제목+내용" },
];

/** Unit notices and training notices: same list layout, different board. */
export default function UnitPostList({ board }) {
  const config = UNIT_BOARDS[board];
  const navigate = useNavigate();
  const location = useLocation();
  const { query, setPage, search } = useListNavigation();
  const list = useApi(
    (opts) => fetchUnitPosts(board, query, opts),
    [board, query.page, query.searchCnd, query.searchWrd]
  );
  const linkState = { listSearch: location.search };

  return (
    <SubLayout title={config.name}>
      <BoardSearch
        searchCnd={query.searchCnd}
        searchWrd={query.searchWrd}
        titleOnly={board === "training-notices"}
        conditions={SEARCH_CONDITIONS}
        total={list.data?.total}
        onSearch={search}
      />
      {!list.data && <PageState error={list.error && { message: "게시물을 불러오지 못했습니다." }} />}
      {list.data && (
        <>
          <table className="dtable">
            <caption>{config.name} 목록으로 번호, 제목, 작성일, 조회수 정보를 제공</caption>
            <colgroup>
              <col style={{ width: 80 }} />
              <col />
              <col style={{ width: 108 }} />
              <col style={{ width: 108 }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">번호</th>
                <th scope="col">제목</th>
                <th scope="col">작성일자</th>
                <th scope="col">조회수</th>
              </tr>
            </thead>
            <tbody>
              {list.data.items.length === 0 && (
                <tr>
                  <td colSpan={4} className="empty">
                    검색된 데이터가 없습니다.
                  </td>
                </tr>
              )}
              {list.data.items.map((item, i) => (
                <tr
                  key={item.id}
                  className="clickable"
                  onClick={() => navigate(detailPath(config.detail, item.id), { state: linkState })}
                >
                  <td>{(list.data.page - 1) * list.data.size + i + 1}</td>
                  <td className="title">
                    <Link
                      to={detailPath(config.detail, item.id)}
                      state={linkState}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.title}
                    </Link>
                    {item.hasAttachment && <Icon name="paperclip" size={14} label="첨부파일 있음" className="title-icon" />}
                  </td>
                  <td>{item.createdAt}</td>
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
