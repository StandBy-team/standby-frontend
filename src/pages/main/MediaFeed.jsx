import { useState } from "react";
import { Link } from "react-router-dom";
import { articlePath, boardPath } from "@/constants/routes";
import Icon from "@/components/common/Icon";
import Tabs from "./Tabs";
import useSlider from "@/hooks/useSlider";

const PER_PAGE = 3;

function MediaCards({ items, isVideo }) {
  const pages = Math.ceil(items.length / PER_PAGE);
  const { index, next, prev } = useSlider(pages);
  const visible = items.slice(index * PER_PAGE, index * PER_PAGE + PER_PAGE);

  return (
    <>
      <ul className="home-media-list">
        {visible.map((item) => (
          <li key={`${item.board}-${item.nttId}`}>
            <Link to={articlePath(item.board, item.nttId)} className="home-media-card">
              <figure>
                <img src={item.image} alt="" loading="lazy" />
                {isVideo && (
                  <span className="home-media-play">
                    <Icon name="play" size={18} />
                  </span>
                )}
              </figure>
              <p>{item.title}</p>
            </Link>
          </li>
        ))}
      </ul>
      {pages > 1 && (
        <div className="home-media-nav">
          <button type="button" onClick={prev} aria-label="이전 목록">
            <Icon name="chevronLeft" size={18} />
          </button>
          <span>
            {index + 1} / {pages}
          </span>
          <button type="button" onClick={next} aria-label="다음 목록">
            <Icon name="chevronRight" size={18} />
          </button>
        </div>
      )}
    </>
  );
}

export default function MediaFeed({ tabs }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  const board = tab?.items[0]?.board;

  return (
    <section className="home-panel home-media" aria-labelledby="home-media-tit">
      <div className="home-panel-head">
        <h2 id="home-media-tit" className="home-sec-tit">
          예비군 소식
        </h2>
        <Tabs id="home-media" label="소식 분류" tabs={tabs} active={active} onChange={setActive} />
        {board && (
          <Link to={boardPath(board)} className="home-more" aria-label={`${tab.label} 더보기`}>
            <Icon name="plus" size={18} />
          </Link>
        )}
      </div>
      <div id="home-media-panel" role="tabpanel" aria-labelledby={`home-media-tab-${active}`}>
        {tab && <MediaCards key={tab.key} items={tab.items} isVideo={tab.key.startsWith("video")} />}
      </div>
    </section>
  );
}
