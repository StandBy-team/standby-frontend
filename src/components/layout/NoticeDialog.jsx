import { createPortal } from "react-dom";
import Icon from "@/components/common/Icon";
import useDialog from "@/hooks/useDialog";

/** Shows one site notice (formerly a layer popup) as a centred modal. */
export default function NoticeDialog({ notice, onClose }) {
  const ref = useDialog(Boolean(notice), onClose);
  if (!notice) return null;

  return createPortal(
    <div
      className="notice-dialog-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        className="notice-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notice-dialog-title"
        tabIndex={-1}
      >
        <div className="notice-dialog-head">
          {notice.postedAt && <span className="notice-dialog-date">{notice.postedAt}</span>}
          <h2 id="notice-dialog-title">{notice.title}</h2>
          <button type="button" className="notice-dialog-close" onClick={onClose} aria-label="닫기">
            <Icon name="close" />
          </button>
        </div>
        {/* Notice content is authored by site admins in the backend and may contain links. */}
        <div className="notice-dialog-body" dangerouslySetInnerHTML={{ __html: notice.content }} />
        <div className="notice-dialog-foot">
          <button type="button" className="ui-btn ui-btn-primary" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
