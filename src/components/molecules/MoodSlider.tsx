import MoodDot from "@/components/atoms/MoodDot";
import RangeInput from "@/components/atoms/RangeInput";
import { formatScore, rangeProgress } from "@/lib/format";
import type { CSSProperties } from "react";
import type { MoodAxis, MoodKey, MoodRange } from "@/types/song";
import "./MoodSlider.css";

interface MoodSliderProps {
  axis: MoodAxis;
  range: MoodRange;
  value: number;
  onChange: (key: MoodKey, value: number) => void;
}

// CSS 사용자 정의 속성(--range-progress)을 style 로 넘기기 위한 타입
type ProgressStyle = CSSProperties & { "--range-progress": string };

export default function MoodSlider({ axis, range, value, onChange }: MoodSliderProps) {
  const style: ProgressStyle = { "--range-progress": rangeProgress(value, range.min, range.max) };
  return (
    <label className="mood-slider" data-key={axis.key} style={style}>
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
