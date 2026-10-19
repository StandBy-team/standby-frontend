import { useId } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/common/Icon";
import useDialog from "@/hooks/useDialog";

/**
 * Centered dialog with a dimmed backdrop, replacing the legacy `.popup` layers and window.open lookups.
 * `footer` holds the action buttons. Focus is trapped inside and returned on close.
 */
export default function Modal({ title, width = 600, onClose, footer, className, children }) {
  const ref = useDialog(true, onClose);
  const titleId = useId();

  return createPortal(
    <div
      className="mask"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        className={`popup${className ? ` ${className}` : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        style={{ width }}
      >
        <div className="pop-header" id={titleId}>
          {title}
        </div>
        <button type="button" className="pop-btn-close" onClick={onClose} aria-label="닫기">
          <Icon name="close" size={20} />
        </button>
        <div className="pop-contents">{children}</div>
        {footer && <div className="pop-footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
