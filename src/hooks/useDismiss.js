import { useEffect, useLayoutEffect, useRef } from "react";

/** Closes a dropdown on Escape or a pointer press outside the returned ref's element. */
export function useDismiss(open, onClose) {
  const ref = useRef(null);
  const onCloseRef = useRef(onClose);
  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (!ref.current?.contains(e.target)) onCloseRef.current();
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return ref;
}

export default useDismiss;
