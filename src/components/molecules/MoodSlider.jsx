import MoodDot from "@/components/atoms/MoodDot";
import RangeInput from "@/components/atoms/RangeInput";
import { formatScore, rangeProgress } from "@/lib/format";
import "./MoodSlider.css";

export default function MoodSlider({ axis, range, value, onChange }) {
  return (
    <label className="mood-slider" data-key={axis.key} style={{ "--range-progress": rangeProgress(value, range.min, range.max) }}>
      <span className="mood-name">
        <MoodDot variant={axis.dotClass} />
        <b>{axis.name}</b>
        <small>{axis.korean}</small>
      </span>
      <RangeInput
        min={range.min}
        max={range.max}
        step={range.step}
        value={value}
        ariaLabel={`${axis.name} ${axis.korean}`}
        onChange={(next) => onChange(axis.key, next)}
      />
      <output>{formatScore(value)}</output>
    </label>
  );
}
