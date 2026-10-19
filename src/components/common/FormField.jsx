import Icon from "@/components/common/Icon";

/** Labelled form row (label above control) with optional hint and inline error. */
export default function FormField({ label, htmlFor, required, hint, error, errorId, wide, children }) {
  const text = (
    <>
      {label}
      {required && (
        <span className="form-req" aria-hidden="true">
          *
        </span>
      )}
    </>
  );
  return (
    <div className={`form-field${wide ? " is-wide" : ""}`}>
      {htmlFor ? (
        <label className="form-label" htmlFor={htmlFor}>
          {text}
        </label>
      ) : (
        <span className="form-label">{text}</span>
      )}
      <div className="form-control">{children}</div>
      {hint && <p className="form-hint">{hint}</p>}
      {error && (
        <p id={errorId} className="field-error" role="alert">
          <Icon name="alert" size={14} />
          {error}
        </p>
      )}
    </div>
  );
}
