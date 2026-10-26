import "./SectionLine.css";

interface SectionLineProps {
  left: string;
  right: string;
}

export default function SectionLine({ left, right }: SectionLineProps) {
  return (
    <div className="section-line">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}
