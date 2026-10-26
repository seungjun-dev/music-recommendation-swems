import { useEffect } from "react";

// ⌘/Ctrl + key 로 ref 요소에 포커스
export function useFocusShortcut(ref, key = "k") {
  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === key) {
        event.preventDefault();
        ref.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [ref, key]);
}
