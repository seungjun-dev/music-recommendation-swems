import RichText from "@/components/atoms/RichText";
import MethodVisual from "./MethodVisual";
import type { MethodStepContent } from "@/types/content";
import "./MethodStep.css";

export default function MethodStep({ no, tag, title, body, visual }: MethodStepContent) {
  return (
    <article className="method-step">
      <div className="method-step-meta">
        <span>{no}</span>
        <span>{tag}</span>
      </div>
      <h3><RichText segments={title} /></h3>
      <p>{body}</p>
      <MethodVisual visual={visual} />
    </article>
  );
}
