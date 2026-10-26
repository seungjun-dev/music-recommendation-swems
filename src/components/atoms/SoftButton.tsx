import "./SoftButton.css";

interface SoftButtonProps {
  href: string;
  label: string;
  icon: string;
}

export default function SoftButton({ href, label, icon }: SoftButtonProps) {
  return (
    <a href={href} className="soft-button">
      {label} <span>{icon}</span>
    </a>
  );
}
