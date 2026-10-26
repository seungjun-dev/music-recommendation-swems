import { BRAND, LINKS } from "@/constants/content";
import "./Brand.css";

export default function Brand({ href = LINKS.home }) {
  return (
    <a className="brand" href={href}>
      <span>{BRAND.mark}</span> {BRAND.text}
    </a>
  );
}
