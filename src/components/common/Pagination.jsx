import Icon from "@/components/common/Icon";

const MAX_BUTTONS = 10;

function pageSlots(page, last) {
  if (last <= MAX_BUTTONS) return Array.from({ length: last }, (_, i) => i + 1);
  const inner = MAX_BUTTONS - 2;
  if (page <= inner - 2) return [...Array.from({ length: inner }, (_, i) => i + 1), "…", last];
  if (page >= last - inner + 3) return [1, "…", ...Array.from({ length: inner }, (_, i) => last - inner + 1 + i)];
  const side = Math.floor((inner - 2) / 2);
  return [1, "…", ...Array.from({ length: inner - 2 }, (_, i) => page - side + i), "…", last];
}

export default function Pagination({ page, size, total, onChange }) {
  const last = Math.max(1, Math.ceil(total / size));
  const go = (p) => p >= 1 && p <= last && p !== page && onChange(p);

  return (
    <nav className="paginate" aria-label="페이지 이동">
      <button type="button" className="nav" disabled={page <= 1} onClick={() => go(page - 1)} aria-label="이전 페이지">
        <Icon name="chevronLeft" size={16} />
      </button>
      {pageSlots(page, last).map((slot, i) =>
        slot === "…" ? (
          <span key={`e${i}`} className="ellipsis">
            …
          </span>
        ) : (
          <button
            key={slot}
            type="button"
            className={slot === page ? "current" : undefined}
            aria-current={slot === page ? "page" : undefined}
            aria-label={`${slot} 페이지`}
            onClick={() => go(slot)}
          >
            {slot}
          </button>
        )
      )}
      <button type="button" className="nav" disabled={page >= last} onClick={() => go(page + 1)} aria-label="다음 페이지">
        <Icon name="chevronRight" size={16} />
      </button>
    </nav>
  );
}
