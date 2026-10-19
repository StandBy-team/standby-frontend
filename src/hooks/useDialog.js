import { useEffect, useLayoutEffect, useRef } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), select, input, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Modal behaviour for an overlay: moves focus inside on open, traps Tab, closes on Escape,
 * locks background scroll and returns focus to the previously focused element on close.
 * Returns a ref for the dialog element.
 */
export function useDialog(open, onClose) {
  const ref = useRef(null);
  const onCloseRef = useRef(onClose);
  useLayoutEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return undefined;
    const node = ref.current;
    const previous = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const focusables = () => [...(node?.querySelectorAll(FOCUSABLE) ?? [])];
    (focusables()[0] ?? node)?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus();
    };
  }, [open]);

  return ref;
}

export default useDialog;
