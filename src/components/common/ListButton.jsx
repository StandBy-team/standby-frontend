import Icon from "@/components/common/Icon";

/** "목록" button under detail and form pages. */
export default function ListButton({ onClick }) {
  return (
    <button type="button" className="btn-gradient big white btn-list" onClick={onClick}>
      <Icon name="list" size={16} />
      목록
    </button>
  );
}
