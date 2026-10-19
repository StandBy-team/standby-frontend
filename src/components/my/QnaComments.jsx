import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/common/Icon";
import { addQuestionComment } from "@/api/services/unit";
import { useToast } from "@/hooks/useFeedback";
import { byteLength } from "@/utils/text";

const MAX_BYTES = 1000;

const validate = (text) => {
  if (!text.trim()) return "댓글 내용을 입력하세요.";
  if (byteLength(text) > MAX_BYTES) return `댓글은 ${MAX_BYTES.toLocaleString()} byte를 초과할 수 없습니다.`;
  return "";
};

function CommentForm({ id, label, focusOnMount = false, onSubmit, onCancel }) {
  const toast = useToast();
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const inputRef = useRef(null);
  const bytes = byteLength(body);

  useEffect(() => {
    if (focusOnMount) inputRef.current?.focus();
  }, [focusOnMount]);

  const change = (e) => {
    setBody(e.target.value);
    if (error) setError(validate(e.target.value));
  };

  const submit = async (e) => {
    e.preventDefault();
    const message = validate(body);
    setError(message);
    if (message) {
      inputRef.current?.focus();
      return;
    }
    setSaving(true);
    try {
      await onSubmit(body.trim());
      setBody("");
    } catch (err) {
      toast(err.message, { tone: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="qna-comment-form" onSubmit={submit} noValidate>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        ref={inputRef}
        className="inp-box"
        placeholder="댓글을 입력하세요"
        aria-invalid={error ? true : undefined}
        aria-describedby={`${id}-count${error ? ` ${id}-error` : ""}`}
        value={body}
        onChange={change}
      />
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          <Icon name="alert" size={14} />
          {error}
        </p>
      )}
      <div className="qna-comment-form-foot">
        <p id={`${id}-count`} className={`byte${bytes > MAX_BYTES ? " is-over" : ""}`}>
          {bytes.toLocaleString()} / {MAX_BYTES.toLocaleString()} byte
        </p>
        {onCancel && (
          <button type="button" className="btn-gradient normal white" onClick={onCancel}>
            취소
          </button>
        )}
        <button type="submit" className="btn-gradient normal blue" disabled={saving}>
          {saving ? "등록 중…" : "등록"}
        </button>
      </div>
    </form>
  );
}

const ROLES = {
  writer: { label: "작성자", badge: "" },
  staff: { label: "담당자", badge: " is-blue" },
  ai: { label: "AI", badge: " is-ai" },
  template: { label: "사전작성", badge: " is-green" },
};

const isHandoff = (comment) => comment.role === "ai" && comment.kind === "handoff";

function Sources({ sources }) {
  return (
    <div className="qna-sources">
      <p className="qna-sources-tit">답변 근거</p>
      <ul>
        {sources.map(({ title, url }) => (
          <li key={title}>
            {!url ? (
              title
            ) : url.startsWith("/") ? (
              <Link to={url}>{title}</Link>
            ) : (
              <a href={url} target="_blank" rel="noopener noreferrer" title={`${title} 새창열기`}>
                {title}
                <Icon name="external" size={12} />
              </a>
            )}
          </li>
        ))}
      </ul>
      <p className="qna-sources-note">AI가 근거 자료를 바탕으로 작성한 답변입니다. 더 궁금한 점은 답글로 남겨 주세요.</p>
    </div>
  );
}

function Comment({ comment, children }) {
  const role = ROLES[comment.role] ?? ROLES.writer;
  const handoff = isHandoff(comment);
  return (
    <li className={`qna-comment is-${comment.role}${handoff ? " is-handoff" : ""}`}>
      <div className="qna-comment-head">
        <strong className="qna-comment-author">{comment.author}</strong>
        <span className={`ui-badge${role.badge}`}>{role.label}</span>
        <span className="qna-comment-time">{comment.createdAt}</span>
      </div>
      <p className="qna-comment-body">{comment.body}</p>
      {comment.role === "ai" && !handoff && comment.sources?.length > 0 && <Sources sources={comment.sources} />}
      {comment.template && (
        <p className="qna-template-note">
          <Icon name="file" size={14} />
          <span>
            담당자가 미리 작성한 답변을 AI가 그대로 안내했습니다. (<strong>{comment.template.title}</strong>,{" "}
            {comment.template.updatedAt} 작성)
          </span>
        </p>
      )}
      {children}
    </li>
  );
}

/**
 * Comment threads of a Q&A post: top-level comments with one level of replies.
 * Only the post writer and staff may write (`question.canComment`); `onChange` receives the updated question.
 * Template comments are staff answers written in advance that the AI posts verbatim.
 * AI comments either answer with sources or hand off to staff; handoffs take no replies since staff replaces them.
 */
export default function QnaComments({ question, onChange }) {
  const toast = useToast();
  const [replyTo, setReplyTo] = useState(null);
  const { comments, canComment } = question;
  const count = comments.reduce((sum, c) => sum + 1 + (c.replies?.length ?? 0), 0);

  const submit = async (body, parentId) => {
    onChange(await addQuestionComment(question.id, { body, parentId }));
    setReplyTo(null);
    toast("댓글이 등록되었습니다.", { tone: "success" });
  };

  return (
    <section className="qna-comments" aria-labelledby="qna-comments-tit">
      <h5 id="qna-comments-tit" className="qna-comments-tit">
        댓글 <span className="txt-blue">{count}</span>
      </h5>
      {comments.length === 0 ? (
        <p className="qna-comments-empty">아직 등록된 댓글이 없습니다.</p>
      ) : (
        <ol className="qna-thread">
          {comments.map((comment) => {
            const replying = replyTo === comment.id;
            const replies = comment.replies ?? [];
            return (
              <Comment key={comment.id} comment={comment}>
                {canComment && !replying && !isHandoff(comment) && (
                  <button type="button" className="qna-reply-btn" onClick={() => setReplyTo(comment.id)}>
                    <Icon name="chat" size={14} />
                    답글 달기
                  </button>
                )}
                {(replies.length > 0 || replying) && (
                  <ol className="qna-replies">
                    {replies.map((reply) => (
                      <Comment key={reply.id} comment={reply} />
                    ))}
                    {replying && (
                      <li className="qna-reply-form">
                        <CommentForm
                          id={`reply-${comment.id}`}
                          label={`${comment.author} 댓글에 답글 작성`}
                          focusOnMount
                          onSubmit={(body) => submit(body, comment.id)}
                          onCancel={() => setReplyTo(null)}
                        />
                      </li>
                    )}
                  </ol>
                )}
              </Comment>
            );
          })}
        </ol>
      )}
      {canComment ? (
        <CommentForm id="qna-comment" label="댓글 작성" onSubmit={(body) => submit(body)} />
      ) : (
        <p className="qna-comments-note">댓글은 게시글 작성자와 담당자만 작성할 수 있습니다.</p>
      )}
    </section>
  );
}
