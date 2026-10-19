import Pagination from "@/components/common/Pagination";

/**
 * Paged result list used by the application result pages.
 * `columns`: [{ label, render(item) }]; rows open `onOpen(item)` when given.
 */
export default function ResultTable({ caption, columns, list, onOpen }) {
  return (
    <>
      <table className="dtable">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">번호</th>
            {columns.map((c) => (
              <th key={c.label} scope="col">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.items.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="empty">
                검색된 데이터가 없습니다.
              </td>
            </tr>
          )}
          {list.items.map((item, i) => (
            <tr key={item.id} className={onOpen ? "clickable" : undefined} onClick={onOpen && (() => onOpen(item))}>
              <td>{(list.page - 1) * list.size + i + 1}</td>
              {columns.map((c) => (
                <td key={c.label}>{c.render(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={list.page} size={list.size} total={list.total} onChange={list.onPage} />
    </>
  );
}
