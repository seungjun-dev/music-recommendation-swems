import { THEME_TOGGLE_TEXT } from "@/constants/content";
import "./ThemeToggle.css";

export default function ThemeToggle({ isDark, onToggle }) {
  const { icon, label } = isDark ? THEME_TOGGLE_TEXT.dark : THEME_TOGGLE_TEXT.light;
  return (
    <button className="theme-toggle" type="button" aria-pressed={isDark} onClick={onToggle}>
      <span className="theme-icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
