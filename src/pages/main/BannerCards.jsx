import Icon from "@/components/common/Icon";
import MenuLink from "@/components/common/MenuLink";

export default function BannerCards({ banners }) {
  return (
    <ul className="home-banners" aria-label="주요 안내 바로가기">
      {banners.map((banner) => (
        <li key={banner.id}>
          <MenuLink item={banner} className={`home-banner${banner.href ? " is-external" : ""}`}>
            <span className="home-banner-icon">
              <Icon name={banner.icon} size={24} />
            </span>
            <span className="home-banner-text">
              <strong>{banner.title}</strong>
              <span>{banner.description}</span>
            </span>
            <Icon name={banner.href ? "external" : "arrowRight"} size={18} className="home-banner-go" />
            {banner.href && <span className="sr-only">(새 창)</span>}
          </MenuLink>
        </li>
      ))}
    </ul>
  );
}
