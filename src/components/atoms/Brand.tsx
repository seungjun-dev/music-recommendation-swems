import { BRAND, LINKS } from "@/constants/content";
import "./Brand.css";

interface BrandProps {
  href?: string;
}

export default function Brand({ href = LINKS.home }: BrandProps) {
  return (
    <a className="brand" href={href}>
      <span>{BRAND.mark}</span> {BRAND.text}
    </a>
  );
}
