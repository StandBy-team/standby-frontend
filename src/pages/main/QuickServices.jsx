import { useState } from "react";
import { MAIN_QUICK_MENU } from "@/constants/menu";
import MenuLink from "@/components/common/MenuLink";
import useDismiss from "@/hooks/useDismiss";

const TileFace = ({ item, index }) => (
  <>
    <span className="home-quick-icon">
      <img src={`/images/main/icon-m${index + 1}.svg`} alt="" />
    </span>
    <span className="home-quick-label">{item.label}</span>
  </>
);

function GroupTile({ item, index }) {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  const id = `home-quick-sub-${index}`;

  return (
    <li ref={ref} className="home-quick-group">
      <button
        type="button"
        className="home-quick-tile"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        <TileFace item={item} index={index} />
      </button>
      {open && (
        <ul id={id} className="home-quick-sub">
          {item.children.map((child) => (
            <li key={child.label}>
              <MenuLink item={child} onClick={() => setOpen(false)} />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function QuickServices() {
  return (
    <section className="home-quick" aria-labelledby="home-quick-tit">
      <h2 id="home-quick-tit" className="home-sec-tit">
        자주 찾는 서비스
      </h2>
      <ul className="home-quick-list">
        {MAIN_QUICK_MENU.map((item, i) =>
          item.children ? (
            <GroupTile key={item.label} item={item} index={i} />
          ) : (
            <li key={item.label}>
              <MenuLink item={item} className="home-quick-tile">
                <TileFace item={item} index={i} />
              </MenuLink>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
