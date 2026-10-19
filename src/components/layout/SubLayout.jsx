import { useEffect, useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ROUTES from "@/constants/routes";
import { findMenuTrail } from "@/constants/menu";
import Icon from "@/components/common/Icon";
import MenuLink from "@/components/common/MenuLink";

function SideGroup({ item, trail, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const active = trail[0] === item;

  return (
    <li className={`side-nav-group${active ? " active" : ""}${open ? " open" : ""}`}>
      <div className="side-nav-row">
        <MenuLink item={item} className="side-nav-link" aria-current={active && trail.length === 1 ? "page" : undefined} />
        <button
          type="button"
          className="side-nav-toggle"
          aria-expanded={open}
          aria-controls={id}
          aria-label={`${item.label} 하위메뉴 ${open ? "닫기" : "열기"}`}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name="chevronDown" size={16} />
        </button>
      </div>
      <ul id={id} className="side-nav-sub" hidden={!open}>
        {item.children.map((child) => (
          <li key={child.label} className={trail[1] === child ? "active" : undefined}>
            <MenuLink item={child} aria-current={trail[1] === child ? "page" : undefined} />
          </li>
        ))}
      </ul>
    </li>
  );
}

function SideNav({ section, trail }) {
  const title = section.lnbTitle ?? section.label;
  return (
    <nav className="side-nav" aria-label={`${title} 메뉴`}>
      <h2 className={`side-nav-tit${section.lnbTitleSmall ? " small" : ""}`}>{title}</h2>
      <ul className="side-nav-list">
        {section.items.map((item) =>
          item.children ? (
            <SideGroup key={item.label} item={item} trail={trail} defaultOpen={trail[0] === item || !!item.expanded} />
          ) : (
            <li key={item.label} className={trail[0] === item ? "active" : undefined}>
              <MenuLink item={item} className="side-nav-link" aria-current={trail[0] === item ? "page" : undefined} />
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

function Breadcrumb({ section, trail, crumbs }) {
  const current = trail.at(-1);
  const links = crumbs
    ? crumbs.map((label) => ({ label }))
    : [
        section.crumb && { label: section.crumb, item: section.link ?? section.items[0] },
        ...trail.slice(0, -1).map((item) => ({ label: item.label, item })),
      ].filter(Boolean);

  return (
    <nav className="sub-crumb" aria-label="현재 위치">
      <ol>
        <li>
          <Link to={ROUTES.MAIN} className="sub-crumb-home" aria-label="홈">
            <Icon name="home" size={14} />
          </Link>
        </li>
        {links.map(({ label, item }, i) => (
          <li key={`${i}-${label}`}>{item ? <MenuLink item={item}>{label}</MenuLink> : <span>{label}</span>}</li>
        ))}
        <li>
          <span aria-current="page">{current.label}</span>
        </li>
      </ol>
    </nav>
  );
}

/**
 * Sub page frame: sidebar, breadcrumb and page title, derived from the menu tree for the current path.
 * `crumbs` overrides the breadcrumb labels between "Home" and the current page.
 */
export default function SubLayout({ title, subText, crumbs, children }) {
  const { pathname } = useLocation();
  const menu = findMenuTrail(pathname);

  useEffect(() => {
    document.title = title || menu?.trail.at(-1)?.label || "예비군";
  }, [title, menu]);

  if (!menu) return <div className="wide sub-plain">{children}</div>;

  const { section, trail } = menu;

  return (
    <div className="wide sub-frame">
      <SideNav key={section.key} section={section} trail={trail} />
      <div className="sub-content">
        <Breadcrumb section={section} trail={trail} crumbs={crumbs} />
        {title && (
          <div className="sub-head">
            <h3 className="sub-head-tit">{title}</h3>
            {subText && <p className="sub-head-desc">{subText}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
