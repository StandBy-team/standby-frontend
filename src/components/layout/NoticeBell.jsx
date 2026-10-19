import { useRef, useState } from "react";
import Icon from "@/components/common/Icon";
import NoticeDialog from "./NoticeDialog";
import { fetchPopups } from "@/api/services/main";
import useApi from "@/hooks/useApi";
import useDismiss from "@/hooks/useDismiss";
import { getLocalItem, setLocalItem } from "@/utils/storage";

const SEEN_KEY = "notice_seen";

const readSeen = () => {
  const ids = getLocalItem(SEEN_KEY);
  return Array.isArray(ids) ? ids : [];
};

/** Header bell: lists site notices and counts the ones this browser hasn't opened yet. */
export default function NoticeBell() {
  const { data } = useApi((opts) => fetchPopups(opts), []);
  const [seen, setSeen] = useState(readSeen);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const buttonRef = useRef(null);
  const ref = useDismiss(open, () => setOpen(false));

  const notices = data ?? [];
  const unseen = notices.filter((n) => !seen.includes(n.id)).length;

  const show = (notice) => {
    setOpen(false);
    // The dialog returns focus to whatever had it when it opened; the list item is about to unmount.
    buttonRef.current?.focus();
    setActive(notice);
    if (!seen.includes(notice.id)) {
      const next = [...seen, notice.id];
      setSeen(next);
      setLocalItem(SEEN_KEY, next);
    }
  };

  return (
    <div className="hd-bell" ref={ref}>
      <button
        ref={buttonRef}
        type="button"
        className="hd-icon-btn"
        aria-expanded={open}
        aria-controls="hd-bell-list"
        aria-label={unseen ? `알림, 새 알림 ${unseen}건` : "알림"}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="bell" size={22} />
        {unseen > 0 && (
          <span className="hd-badge" aria-hidden="true">
            {unseen}
          </span>
        )}
      </button>
      {open && (
        <div id="hd-bell-list" className="hd-dropdown hd-bell-list">
          <p className="hd-dropdown-tit">알림</p>
          {notices.length ? (
            <ul>
              {notices.map((n) => {
                const isNew = !seen.includes(n.id);
                return (
                  <li key={n.id}>
                    <button type="button" className={isNew ? "is-new" : undefined} onClick={() => show(n)}>
                      <span className="hd-bell-title">
                        {isNew && <span className="sr-only">새 알림, </span>}
                        {n.title}
                      </span>
                      {n.postedAt && <span className="hd-bell-date">{n.postedAt}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="hd-dropdown-empty">새 알림이 없습니다.</p>
          )}
        </div>
      )}
      <NoticeDialog notice={active} onClose={() => setActive(null)} />
    </div>
  );
}
