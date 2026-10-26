import { useEffect, type RefObject } from "react";

// ⌘/Ctrl + key 로 ref 요소에 포커스
export function useFocusShortcut(ref: RefObject<HTMLElement | null>, key = "k"): void {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === key) {
        event.preventDefault();
        ref.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [ref, key]);
}
