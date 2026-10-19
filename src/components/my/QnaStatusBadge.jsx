import { QNA_STATUSES } from "@/constants/qna";

export default function QnaStatusBadge({ status }) {
  const { label, tone } = QNA_STATUSES[status] ?? QNA_STATUSES.pending;
  return <span className={`ui-badge${tone ? ` ${tone}` : ""}`}>{label}</span>;
}
