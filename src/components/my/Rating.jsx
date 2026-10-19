import Icon from "@/components/common/Icon";

/** Satisfaction score (0-5) as stars. */
export default function Rating({ value }) {
  return (
    <span className="rating" role="img" aria-label={`만족도 ${value}점`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={14} className={i < value ? "is-on" : undefined} />
      ))}
    </span>
  );
}
