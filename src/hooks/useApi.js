import { useEffect, useRef, useState } from "react";
import { logger } from "@/utils/logger";

const sameDeps = (a, b) => a.length === b.length && a.every((v, i) => Object.is(v, b[i]));

/**
 * Runs `loader(signal)` whenever `deps` change and exposes { data, loading, error }.
 * Pass `enabled: false` to skip loading (e.g. until a required filter is chosen).
 */
export function useApi(loader, deps, { enabled = true } = {}) {
  const [state, setState] = useState({ data: null, loading: enabled, error: null });
  const allDeps = [enabled, ...deps];
  const [prevDeps, setPrevDeps] = useState(allDeps);
  if (!sameDeps(prevDeps, allDeps)) {
    setPrevDeps(allDeps);
    setState(enabled ? (prev) => ({ ...prev, loading: true, error: null }) : { data: null, loading: false, error: null });
  }

  const loaderRef = useRef(loader);
  useEffect(() => {
    loaderRef.current = loader;
  });

  useEffect(() => {
    if (!enabled) return undefined;
    const controller = new AbortController();
    loaderRef
      .current({ signal: controller.signal })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name === "AbortError") return;
        logger.error("api request failed", error);
        setState({ data: null, loading: false, error });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, allDeps);

  return state;
}

export default useApi;
