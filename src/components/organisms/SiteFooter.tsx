import Brand from "@/components/atoms/Brand";
import { FOOTER, LINKS } from "@/constants/content";
import "./SiteFooter.css";

export default function SiteFooter() {
  return (
    <footer>
      <Brand />
      <span>{FOOTER.caption}</span>
      <a href={LINKS.concepts}>{FOOTER.conceptsLink}</a>
    </footer>
  );
}
