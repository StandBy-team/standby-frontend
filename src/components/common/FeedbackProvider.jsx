import { useCallback, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/common/Icon";
import { FeedbackContext } from "@/hooks/useFeedback";
import useDialog from "@/hooks/useDialog";

const TOAST_MS = 3000;

function ConfirmDialog({ request, onAnswer }) {
  const ref = useDialog(Boolean(request), () => onAnswer(false));
  if (!request) return null;

  return createPortal(
    <div
      className="ui-dialog-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onAnswer(false);
      }}
    >
      <div
        ref={ref}
        className="ui-dialog ui-confirm"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="ui-confirm-msg"
        tabIndex={-1}
      >
        <p id="ui-confirm-msg" className="ui-confirm-msg">
          {request.message}
        </p>
        <div className="ui-dialog-foot">
          <button type="button" className="btn-gradient big white" onClick={() => onAnswer(false)}>
            취소
          </button>
          <button type="button" className="btn-gradient big blue" onClick={() => onAnswer(true)}>
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** App-wide toasts and confirm dialog, replacing window.alert / window.confirm. */
export default function FeedbackProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [request, setRequest] = useState(null);
  const nextId = useRef(0);

  const toast = useCallback((message, { tone = "info" } = {}) => {
    const id = ++nextId.current;
    setToasts((list) => [...list, { id, message, tone }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), TOAST_MS);
  }, []);

  const confirm = useCallback((message) => new Promise((resolve) => setRequest({ message, resolve })), []);

  const answer = (ok) => {
    request?.resolve(ok);
    setRequest(null);
  };

  const value = useMemo(() => ({ toast, confirm }), [toast, confirm]);

  return (
    <FeedbackContext.Provider value={value}>
      {children}
      <div className="ui-toasts" role="status" aria-live="polite">
        {toasts.map((t) => (
          <p key={t.id} className={`ui-toast is-${t.tone}`}>
            <Icon name={t.tone === "error" ? "alert" : "check"} size={16} />
            {t.message}
          </p>
        ))}
      </div>
      <ConfirmDialog request={request} onAnswer={answer} />
    </FeedbackContext.Provider>
  );
}
