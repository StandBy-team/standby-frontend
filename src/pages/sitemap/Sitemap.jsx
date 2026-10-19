import SubLayout from "@/components/layout/SubLayout";
import MenuTree from "@/components/layout/MenuTree";
import { SECTIONS, SITEMAP_COLUMNS } from "@/constants/menu";

function SitemapSection({ section, className }) {
  return (
    <div className={className}>
      <h4 className="sitemap-tit">{section.sitemapLabel ?? section.label}</h4>
      <MenuTree section={section} className="sitemap-list" subClassName="sitemap-list-sub" />
    </div>
  );
}

export default function Sitemap() {
  return (
    <SubLayout title="사이트맵" subText="상비군 수준의 정예화된 예비군, 국방부가 만들어 갑니다.">
      <ul className="sitemap-layout">
        {SITEMAP_COLUMNS.map((column, i) => (
          <li key={i}>
            {column.map(([key, className]) => (
              <SitemapSection key={key} section={SECTIONS.find((s) => s.key === key)} className={className} />
            ))}
          </li>
        ))}
      </ul>
    </SubLayout>
  );
}
