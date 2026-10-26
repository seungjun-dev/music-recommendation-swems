import RichText from "@/components/atoms/RichText";
import SectionLine from "@/components/atoms/SectionLine";
import MethodStep from "@/components/molecules/MethodStep";
import { LINKS, METHOD } from "@/constants/content";
import "./MethodSection.css";

export default function MethodSection() {
  return (
    <section className="method-detail" id="method">
      <SectionLine left={METHOD.line[0]} right={METHOD.line[1]} />
      <div className="method-detail-heading">
        <div>
          <h2><RichText segments={METHOD.title} /></h2>
          <p><RichText segments={METHOD.description} /></p>
        </div>
        <span className="method-index"><RichText segments={METHOD.index} /></span>
      </div>
      <div className="method-steps">
        {METHOD.steps.map((step) => <MethodStep key={step.no} {...step} />)}
      </div>
      <div className="method-takeaway">
        <span>{METHOD.takeaway.tag}</span>
        <p><RichText segments={METHOD.takeaway.text} /></p>
        <a href={LINKS.paper} target="_blank" rel="noreferrer">{METHOD.takeaway.link}</a>
      </div>
    </section>
  );
}
