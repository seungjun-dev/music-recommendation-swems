import "./SectionLine.css";

export default function SectionLine({ left, right }) {
  return (
    <div className="section-line">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}
