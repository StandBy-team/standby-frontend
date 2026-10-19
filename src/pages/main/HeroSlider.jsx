import Icon from "@/components/common/Icon";
import MenuLink from "@/components/common/MenuLink";
import HeroArt from "./HeroArt";
import useSlider from "@/hooks/useSlider";

const pad = (n) => String(n).padStart(2, "0");

export default function HeroSlider({ slides }) {
  const { index, go, next, prev, playing, toggle, hold } = useSlider(slides.length, { interval: 6000 });

  return (
    <section
      className="home-hero"
      aria-roledescription="carousel"
      aria-label="주요 안내"
      onMouseEnter={() => hold(true)}
      onMouseLeave={() => hold(false)}
      onFocus={() => hold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) hold(false);
      }}
    >
      <div className="home-hero-track" aria-live={playing ? "off" : "polite"}>
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.id}
              className={`home-hero-slide theme-${slide.theme}${active ? " is-active" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${slides.length}`}
              aria-hidden={!active}
            >
              <div className="home-hero-text">
                <p className="home-hero-eyebrow">{slide.eyebrow}</p>
                <h2 className="home-hero-title">{slide.title}</h2>
                <p className="home-hero-desc">{slide.description}</p>
                {slide.link && (
                  <MenuLink item={slide.link} className="home-hero-cta" tabIndex={active ? 0 : -1}>
                    {slide.link.label}
                    <Icon name="arrowRight" size={18} />
                  </MenuLink>
                )}
              </div>
              <div className={`home-hero-art${slide.image ? " has-photo" : ""}`}>
                {slide.image ? <img src={slide.image} alt="" /> : <HeroArt name={slide.art} />}
              </div>
            </div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <div className="home-hero-controls">
          <span className="home-hero-count">
            <strong>{pad(index + 1)}</strong>
            <span aria-hidden="true"> / </span>
            <span className="sr-only">번째 슬라이드, 전체 </span>
            {pad(slides.length)}
          </span>
          <ol className="home-hero-dots">
            {slides.map((slide, i) => (
              <li key={slide.id}>
                <button
                  type="button"
                  aria-label={`${i + 1}번 슬라이드 보기`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => go(i)}
                />
              </li>
            ))}
          </ol>
          <button type="button" className="home-hero-btn" onClick={prev} aria-label="이전 슬라이드">
            <Icon name="chevronLeft" size={18} />
          </button>
          <button
            type="button"
            className="home-hero-btn"
            onClick={toggle}
            aria-label={playing ? "자동 넘김 정지" : "자동 넘김 시작"}
          >
            <Icon name={playing ? "pause" : "play"} size={16} />
          </button>
          <button type="button" className="home-hero-btn" onClick={next} aria-label="다음 슬라이드">
            <Icon name="chevronRight" size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
