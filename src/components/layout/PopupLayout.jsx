import { useEffect } from "react";

/** Frame for pages opened through window.open (no header/footer). */
export default function PopupLayout({ title, children }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="win-pop-wrap">
      <div className="pop-inner">
        <div className="pop-tit-wrap">
          <p className="pop-tit">{title}</p>
        </div>
        <button type="button" className="btn-pop-close" onClick={() => window.close()}>
          <img src="/images/btn/btn-pop-close.svg" alt="닫기" />
        </button>
        <div className="pop-article">
          <div className="pop-article-inner">{children}</div>
        </div>
      </div>
    </div>
  );
}
