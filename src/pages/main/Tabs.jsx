/** Accessible tab list (arrow keys, Home/End); the caller renders the panel with `tabPanelProps`. */
export default function Tabs({ id, label, tabs, active, onChange, className }) {
  const select = (i) => {
    const next = (i + tabs.length) % tabs.length;
    onChange(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  const onKeyDown = (e) => {
    const moves = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: tabs.length - 1 };
    if (!(e.key in moves)) return;
    e.preventDefault();
    select(moves[e.key]);
  };

  return (
    <div role="tablist" aria-label={label} className={`ui-tabs ${className ?? ""}`} onKeyDown={onKeyDown}>
      {tabs.map((tab, i) => (
        <button
          key={tab.key}
          id={`${id}-tab-${i}`}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-controls={`${id}-panel`}
          tabIndex={i === active ? 0 : -1}
          onClick={() => onChange(i)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
