// Decorative illustrations for hero slides, keyed by slide.art. Drawn in white/translucent so they sit on any theme.
const ARTS = {
  calendar: (
    <>
      <rect x="70" y="60" width="260" height="220" rx="28" fill="#fff" opacity=".14" />
      <rect x="90" y="40" width="260" height="220" rx="28" fill="#fff" />
      <path d="M90 68a28 28 0 0 1 28-28h204a28 28 0 0 1 28 28v28H90Z" fill="#f58220" />
      <rect x="140" y="26" width="14" height="36" rx="7" fill="#14244a" />
      <rect x="286" y="26" width="14" height="36" rx="7" fill="#14244a" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={112 + col * 46}
            y={116 + row * 34}
            width="30"
            height="20"
            rx="6"
            fill={row === 2 && col === 3 ? "#1f5fc4" : "#e3e9f3"}
          />
        )),
      )}
      <circle cx="320" cy="248" r="44" fill="#1f5fc4" stroke="#fff" strokeWidth="8" />
      <path d="m300 248 14 14 26-28" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  map: (
    <>
      <path
        d="M60 90 150 60l100 30 90-30v210l-90 30-100-30-90 30Z"
        fill="#fff"
        opacity=".95"
      />
      <path d="M150 60v210M250 90v210" stroke="#d5deec" strokeWidth="3" />
      <path d="M80 220c40-30 70 10 110-20s70-60 120-30" fill="none" stroke="#9fb7dd" strokeWidth="6" strokeDasharray="2 14" strokeLinecap="round" />
      <g>
        <path d="M200 70c-30 0-50 22-50 50 0 36 50 86 50 86s50-50 50-86c0-28-20-50-50-50Z" fill="#f58220" />
        <circle cx="200" cy="120" r="18" fill="#fff" />
      </g>
      <g opacity=".9">
        <path d="M100 170c-15 0-25 11-25 25 0 18 25 43 25 43s25-25 25-43c0-14-10-25-25-25Z" fill="#1f5fc4" />
        <circle cx="100" cy="195" r="9" fill="#fff" />
        <path d="M300 150c-15 0-25 11-25 25 0 18 25 43 25 43s25-25 25-43c0-14-10-25-25-25Z" fill="#1f5fc4" />
        <circle cx="300" cy="175" r="9" fill="#fff" />
      </g>
    </>
  ),
  shield: (
    <>
      <circle cx="200" cy="170" r="150" fill="#fff" opacity=".08" />
      <circle cx="200" cy="170" r="110" fill="#fff" opacity=".1" />
      <path d="M200 50 300 88v74c0 66-44 112-100 132-56-20-100-66-100-132V88Z" fill="#fff" />
      <path d="M200 74 280 104v58c0 52-34 90-80 108Z" fill="#e3e9f3" />
      <path
        d="m200 118 16 33 36 5-26 25 6 36-32-17-32 17 6-36-26-25 36-5Z"
        fill="#f58220"
      />
    </>
  ),
};

export default function HeroArt({ name }) {
  return (
    <svg className="home-hero-svg" viewBox="0 0 400 340" aria-hidden="true" focusable="false">
      {ARTS[name] ?? ARTS.shield}
    </svg>
  );
}
