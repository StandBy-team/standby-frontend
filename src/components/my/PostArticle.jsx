/**
 * Read view of a board post: title, meta row (`meta` is [label, value] pairs), optional attachments, HTML body.
 * `children` render below the body (e.g. Q&A summary and comments).
 */
export default function PostArticle({ title, badge, meta, attachments, body, children }) {
  return (
    <article className="post-article">
      <header className="post-head">
        {badge}
        <h4 className="post-tit">{title}</h4>
        <dl className="post-meta">
          {meta
            .filter(([, value]) => value !== "" && value != null)
            .map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
        </dl>
      </header>
      {attachments && (
        <section className="post-files" aria-label="첨부파일">
          <p className="post-files-tit">첨부파일</p>
          {attachments}
        </section>
      )}
      {/* Post bodies are HTML authored in the backend editor. */}
      <div className="post-body" dangerouslySetInnerHTML={{ __html: body }} />
      {children}
    </article>
  );
}
