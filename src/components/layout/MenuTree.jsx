import MenuLink from "@/components/common/MenuLink";

const sitemapLabel = (item) => item.sitemapLabel ?? item.label;

/** A section's items and their children, as shown by the full menu and the sitemap page. */
export default function MenuTree({ section, className, subClassName }) {
  return (
    <ul className={className}>
      {section.items
        .filter((item) => !item.sitemapHidden)
        .map((item) => (
          <li key={item.label}>
            <MenuLink item={item}>{sitemapLabel(item)}</MenuLink>
            {item.children && (
              <ul className={subClassName}>
                {item.children.map((child) => (
                  <li key={child.label}>
                    <MenuLink item={child}>{sitemapLabel(child)}</MenuLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
    </ul>
  );
}
