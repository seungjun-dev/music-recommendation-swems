import { THEME_QUERY_PARAM, THEME_STORAGE_KEY } from "../constants/theme.ts";

// storage 는 getItem/setItem 만 있으면 된다 (검증 스크립트에서 가짜 객체를 넘긴다).
// ?theme=dark|light 가 우선, 없으면 저장된 값을 쓴다. storage 접근이 막혀 있어도 동작한다.
export function resolveInitialDark(search: string, storage: Pick<Storage, "getItem"> | null): boolean {
  const requested = new URLSearchParams(search).get(THEME_QUERY_PARAM);
  if (requested === "dark") return true;
  if (requested === "light") return false;
  try {
    return storage?.getItem(THEME_STORAGE_KEY) === "dark";
  } catch {
    return false;
  }
}

export function saveTheme(storage: Pick<Storage, "setItem"> | null, isDark: boolean): void {
  try {
    storage?.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  } catch {
    // 저장소를 쓸 수 없는 환경(사파리 비공개 모드 등)에서는 무시한다.
  }
}
