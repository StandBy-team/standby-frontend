/** Placeholder for page content that is loading or failed to load. */
export default function PageState({ error, lines = 4 }) {
  if (error) {
    return (
      <p className="page-state is-error" role="alert">
        {error.message || "정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."}
      </p>
    );
  }
  return (
    <div className="page-state" role="status" aria-busy="true" aria-label="불러오는 중">
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
