import { useState } from "react";
import Icon from "@/components/common/Icon";

const CONDITIONS = [
  { value: "0", label: "제목" },
  { value: "1", label: "내용" },
];

/** Search bar row above a board list; `total` shows the result count, `children` adds controls on the right. */
export default function BoardSearch({
  searchCnd,
  searchWrd,
  titleOnly = false,
  conditions = CONDITIONS,
  total,
  onSearch,
  children,
}) {
  const [cnd, setCnd] = useState(searchCnd);
  const [wrd, setWrd] = useState(searchWrd);
  const [synced, setSynced] = useState({ searchCnd, searchWrd });

  if (synced.searchCnd !== searchCnd || synced.searchWrd !== searchWrd) {
    setSynced({ searchCnd, searchWrd });
    setCnd(searchCnd);
    setWrd(searchWrd);
  }

  const options = titleOnly ? conditions.slice(0, 1) : conditions;

  return (
    <div className="search-head">
      {total != null && (
        <p className="search-total">
          총 <strong>{total.toLocaleString()}</strong>건
        </p>
      )}
      <form
        className="search-bar"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch({ searchCnd: cnd, searchWrd: wrd.trim() });
        }}
      >
        <label htmlFor="searchCnd" className="hid">
          검색조건선택
        </label>
        <select id="searchCnd" className="sel-box" value={cnd} onChange={(e) => setCnd(e.target.value)}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <label htmlFor="searchWrd" className="hid">
          검색어입력
        </label>
        <span className="search-input">
          <Icon name="search" size={16} />
          <input
            id="searchWrd"
            className="inp-box"
            type="search"
            maxLength={35}
            placeholder="검색어를 입력하세요"
            value={wrd}
            onChange={(e) => setWrd(e.target.value)}
          />
        </span>
        <button type="submit" className="btn-gradient normal blue">
          검색
        </button>
        <button
          type="button"
          className="btn-gradient normal white"
          onClick={() => onSearch({ searchCnd: "0", searchWrd: "" })}
        >
          초기화
        </button>
        {children}
      </form>
    </div>
  );
}
