import { useState } from "react";
import { Link } from "react-router-dom";
import ROUTES, { articlePath, boardPath } from "@/constants/routes";
import { MAIN_SELECTION } from "@/constants/menu";
import Icon from "@/components/common/Icon";
import MenuLink from "@/components/common/MenuLink";
import Tabs from "./Tabs";

const TABS = [
  { key: "notice", label: "공지사항", more: boardPath("notice") },
  { key: "faq", label: "자주 묻는 질문", more: ROUTES.FAQ },
  { key: "selection", label: "선발안내 및 신청", more: ROUTES.SELECTION },
];

function NoticeList({ notices }) {
  return notices.map((n) => (
    <li key={n.nttId}>
      <Link to={articlePath("notice", n.nttId)}>
        {n.important && <span className="home-chip">중요</span>}
        <span className="home-board-title">{n.title}</span>
        <span className="home-board-date">{n.createdAt}</span>
      </Link>
    </li>
  ));
}

function FaqList({ faq }) {
  return faq.map((item) => (
    <li key={item.id}>
      <Link to={`${ROUTES.FAQ}?faq=${item.id}`}>
        <span className="home-board-q" aria-hidden="true">
          Q
        </span>
        <span className="home-board-title">{item.question}</span>
      </Link>
    </li>
  ));
}

function SelectionList() {
  return MAIN_SELECTION.map((item) => (
    <li key={item.label}>
      <MenuLink item={item}>
        <span className="home-board-title">{item.label}</span>
        <Icon name={item.href ? "external" : "chevronRight"} size={16} className="home-board-go" />
      </MenuLink>
    </li>
  ));
}

export default function BoardTabs({ notices, faq }) {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="home-panel home-board" aria-labelledby="home-board-tit">
      <div className="home-panel-head">
        <h2 id="home-board-tit" className="sr-only">
          알림
        </h2>
        <Tabs id="home-board" label="게시판" tabs={TABS} active={active} onChange={setActive} className="is-large" />
        <Link to={tab.more} className="home-more" aria-label={`${tab.label} 더보기`}>
          <Icon name="plus" size={18} />
        </Link>
      </div>
      <ul id="home-board-panel" role="tabpanel" aria-labelledby={`home-board-tab-${active}`} className="home-board-list">
        {tab.key === "notice" && <NoticeList notices={notices} />}
        {tab.key === "faq" && <FaqList faq={faq} />}
        {tab.key === "selection" && <SelectionList />}
      </ul>
    </section>
  );
}
