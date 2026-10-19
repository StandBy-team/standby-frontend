import { useState } from "react";
import { MAIN_QUICK_LINKS } from "@/constants/menu";
import Icon from "@/components/common/Icon";
import MenuLink from "@/components/common/MenuLink";
import Tabs from "./Tabs";

const TABS = MAIN_QUICK_LINKS.map((group) => ({ key: group.label, label: group.label }));

export default function ServiceTabs() {
  const [active, setActive] = useState(0);
  const group = MAIN_QUICK_LINKS[active];

  return (
    <section className="home-panel home-service" aria-labelledby="home-service-tit">
      <div className="home-panel-head">
        <h2 id="home-service-tit" className="home-sec-tit">
          서비스 바로가기
        </h2>
        <Tabs id="home-service" label="서비스 분류" tabs={TABS} active={active} onChange={setActive} />
      </div>
      <ul id="home-service-panel" role="tabpanel" aria-labelledby={`home-service-tab-${active}`} className="home-service-list">
        {group.items.map((item) => (
          <li key={item.label}>
            <MenuLink item={item}>
              <span>{item.label}</span>
              <Icon name="arrowRight" size={16} />
            </MenuLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
