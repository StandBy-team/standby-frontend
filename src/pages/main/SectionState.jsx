/** Placeholder for a section whose data is loading or failed to load. */
export default function SectionState({ error, lines = 3, className }) {
  if (error) {
    return (
      <p className={`home-error ${className ?? ""}`} role="alert">
        정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
      </p>
    );
  }
  return (
    <div className={`home-skeleton ${className ?? ""}`} role="status" aria-busy="true" aria-label="불러오는 중">
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
