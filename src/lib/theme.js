import { THEME_QUERY_PARAM, THEME_STORAGE_KEY } from "../constants/theme.js";

// ?theme=dark|light 가 우선, 없으면 저장된 값을 쓴다. storage 접근이 막혀 있어도 동작한다.
export function resolveInitialDark(search, storage) {
  const requested = new URLSearchParams(search).get(THEME_QUERY_PARAM);
  if (requested === "dark") return true;
  if (requested === "light") return false;
  try {
    return storage?.getItem(THEME_STORAGE_KEY) === "dark";
  } catch {
    return false;
  }
}

export function saveTheme(storage, isDark) {
  try {
    storage?.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  } catch {
    // 저장소를 쓸 수 없는 환경(사파리 비공개 모드 등)에서는 무시한다.
  }
}
