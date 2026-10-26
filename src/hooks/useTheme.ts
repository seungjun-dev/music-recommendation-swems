import { useCallback, useEffect, useState } from "react";
import { DARK_MODE_CLASS, THEME_COLORS } from "@/constants/theme";
import { resolveInitialDark, saveTheme } from "@/lib/theme";

const getStorage = (): Storage | null => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

// body.dark-mode 토글, theme-color 메타 갱신, 선택값 저장
export function useTheme(): { isDark: boolean; toggle: () => void } {
  const [isDark, setIsDark] = useState(() => resolveInitialDark(window.location.search, getStorage()));

  useEffect(() => {
    document.body.classList.toggle(DARK_MODE_CLASS, isDark);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? THEME_COLORS.dark : THEME_COLORS.light);
    saveTheme(getStorage(), isDark);
  }, [isDark]);

  const toggle = useCallback(() => setIsDark((value) => !value), []);
  return { isDark, toggle };
}
