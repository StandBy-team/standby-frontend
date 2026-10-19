import { useCallback, useEffect, useState } from "react";

const prefersReducedMotion = () => {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
};

/**
 * Index state for a carousel of `count` slides. With `interval` (ms) it autoplays,
 * except when the viewer prefers reduced motion. `hold` pauses it temporarily (hover/focus)
 * without changing the user's play/pause choice.
 */
export function useSlider(count, { interval = 0 } = {}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(() => interval > 0 && !prefersReducedMotion());
  const [held, setHeld] = useState(false);

  const current = count ? index % count : 0;

  const go = useCallback((i) => setIndex(count ? (i + count) % count : 0), [count]);
  const next = useCallback(() => setIndex((i) => (count ? (i + 1) % count : 0)), [count]);
  const prev = useCallback(() => setIndex((i) => (count ? (i - 1 + count) % count : 0)), [count]);

  useEffect(() => {
    if (!playing || held || count < 2) return undefined;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [playing, held, count, interval, next]);

  return {
    index: current,
    go,
    next,
    prev,
    playing,
    toggle: () => setPlaying((p) => !p),
    hold: setHeld,
  };
}

export default useSlider;
