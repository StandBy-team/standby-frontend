import { useState } from "react";
import FormField from "@/components/common/FormField";
import { fetchProfile } from "@/api/services/my";
import useApi from "@/hooks/useApi";
import { useConfirm, useToast } from "@/hooks/useFeedback";
import { byteLength, maskPhone } from "@/utils/text";

const MAX_BYTES = 3000;

const EMPTY = { title: "", body: "", email: "", public: true };

/**
 * Write form of the unit Q&A and free board.
 * `onSubmit({ title, body, email, public })` resolves when saved; `withEmail` shows the E-mail field (Q&A only).
 * `initial` fills the fields when editing.
 */
export default function PostForm({ bodyLabel, withEmail = false, initial, onSubmit, footer }) {
  const profile = useApi((opts) => fetchProfile(opts), []);
  const toast = useToast();
  const confirm = useConfirm();
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const bytes = byteLength(form.body);

  const validate = (next) => {
    const found = {};
    if (!next.title.trim()) found.title = "제목을 입력하세요.";
    if (!next.body.trim()) found.body = `${bodyLabel}을 입력하세요.`;
    else if (byteLength(next.body) > MAX_BYTES) found.body = `${bodyLabel}은 ${MAX_BYTES} byte를 초과할 수 없습니다.`;
    return found;
  };

  const set = (key) => (e) => {
    const next = { ...form, [key]: e.target.value };
    setForm(next);
    if (errors[key]) setErrors({ ...errors, [key]: validate(next)[key] });
  };

  const save = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(found.title ? "title" : "p_contents")?.focus();
      return;
    }
    if (!(await confirm("저장하시겠습니까?"))) return;
    setSaving(true);
    try {
      await onSubmit({ ...form, title: form.title.trim() });
    } catch (error) {
      toast(error.message, { tone: "error" });
      setSaving(false);
    }
  };

  const me = profile.data;

  return (
    <form className="my-form post-form" onSubmit={save} noValidate>
      <dl className="post-author" aria-label="작성자 정보">
        <div>
          <dt>소속</dt>
          <dd>{me?.unit.name}</dd>
        </div>
        <div>
          <dt>성명</dt>
          <dd>{me?.name}</dd>
        </div>
        <div>
          <dt>연락처</dt>
          <dd>{maskPhone(me?.cellPhone)}</dd>
        </div>
      </dl>
      <section className="form-card">
        <div className="form-grid">
          {withEmail && (
            <FormField label="E-mail" htmlFor="emailAddress" hint="답변 알림을 받을 주소입니다.">
              <input id="emailAddress" type="email" className="inp-box" value={form.email} onChange={set("email")} />
            </FormField>
          )}
          <fieldset className={`form-field${withEmail ? "" : " is-wide"}`}>
            <legend className="form-label">공개여부</legend>
            <div className="segmented">
              <input
                type="radio"
                name="p_secret"
                id="p_secret_Y"
                checked={form.public}
                onChange={() => setForm({ ...form, public: true })}
              />
              <label htmlFor="p_secret_Y">공개</label>
              <input
                type="radio"
                name="p_secret"
                id="p_secret_N"
                checked={!form.public}
                onChange={() => setForm({ ...form, public: false })}
              />
              <label htmlFor="p_secret_N">비공개</label>
            </div>
          </fieldset>
          <FormField label="제목" htmlFor="title" required error={errors.title} errorId="title-error" wide>
            <input
              id="title"
              type="text"
              className="inp-box"
              maxLength={100}
              aria-required="true"
              aria-invalid={errors.title ? true : undefined}
              aria-describedby={errors.title ? "title-error" : undefined}
              value={form.title}
              onChange={set("title")}
            />
          </FormField>
          <FormField label={bodyLabel} htmlFor="p_contents" required error={errors.body} errorId="body-error" wide>
            <textarea
              id="p_contents"
              className="inp-box post-textarea"
              aria-required="true"
              aria-invalid={errors.body ? true : undefined}
              aria-describedby={`body-count${errors.body ? " body-error" : ""}`}
              value={form.body}
              onChange={set("body")}
            />
            <p id="body-count" className={`byte${bytes > MAX_BYTES ? " is-over" : ""}`}>
              {bytes.toLocaleString()} / {MAX_BYTES.toLocaleString()} byte
            </p>
          </FormField>
        </div>
      </section>
      <div className="form-actions">
        {footer}
        <button type="submit" className="btn-gradient big blue" disabled={saving}>
          {saving ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
