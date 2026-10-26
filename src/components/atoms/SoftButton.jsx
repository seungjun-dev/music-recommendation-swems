import "./SoftButton.css";

export default function SoftButton({ href, label, icon }) {
  return (
    <a href={href} className="soft-button">
      {label} <span>{icon}</span>
    </a>
  );
}
