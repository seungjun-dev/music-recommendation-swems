import RichText from "@/components/atoms/RichText";
import SectionLine from "@/components/atoms/SectionLine";
import FeelingLine from "@/components/molecules/FeelingLine";
import { WHY } from "@/constants/content";
import "./WhySection.css";

export default function WhySection() {
  return (
    <section className="why" id="why">
      <SectionLine left={WHY.line[0]} right={WHY.line[1]} />
      <div className="why-grid">
        <h2><RichText segments={WHY.title} /></h2>
        <div>
          {WHY.paragraphs.map((text) => <p key={text}>{text}</p>)}
        </div>
      </div>
      <FeelingLine {...WHY.feeling} />
    </section>
  );
}
