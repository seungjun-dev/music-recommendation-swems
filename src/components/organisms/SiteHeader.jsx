import Brand from "@/components/atoms/Brand";
import ThemeToggle from "@/components/atoms/ThemeToggle";
import { NAV_ITEMS } from "@/constants/content";
import "./SiteHeader.css";

export default function SiteHeader({ isDark, onToggleTheme }) {
  return (
    <header>
      <Brand />
      <nav>
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined}>
            {item.label}
          </a>
        ))}
      </nav>
      <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
    </header>
  );
}
