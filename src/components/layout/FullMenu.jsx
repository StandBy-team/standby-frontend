import { createPortal } from "react-dom";
import Icon from "@/components/common/Icon";
import MenuTree from "@/components/layout/MenuTree";
import { SECTIONS } from "@/constants/menu";
import useDialog from "@/hooks/useDialog";

/** Overlay with the whole menu tree (same entries as the sitemap page). */
export default function FullMenu({ open, onClose }) {
  const ref = useDialog(open, onClose);
  if (!open) return null;

  return createPortal(
    <div
      ref={ref}
      className="full-menu"
      role="dialog"
      aria-modal="true"
      aria-label="전체메뉴"
      tabIndex={-1}
      onClick={(e) => {
        if (e.target.closest("a")) onClose();
      }}
    >
      <div className="full-menu-top">
        <div className="wide full-menu-head">
          <strong>전체메뉴</strong>
          <button type="button" className="hd-icon-btn" onClick={onClose} aria-label="전체메뉴 닫기">
            <Icon name="close" size={26} />
          </button>
        </div>
      </div>
      <div className="wide full-menu-grid">
        {SECTIONS.map((section) => (
          <section key={section.key} className="full-menu-section">
            <h2>{section.sitemapLabel ?? section.label}</h2>
            <MenuTree section={section} subClassName="full-menu-sub" />
          </section>
        ))}
      </div>
    </div>,
    document.body,
  );
}
