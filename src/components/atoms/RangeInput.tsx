// 범위 슬라이더. 스타일은 사용하는 쪽(MoodSlider)에서 정한다.
interface RangeInputProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  ariaLabel?: string;
}

export default function RangeInput({ min, max, step, value, onChange, ariaLabel }: RangeInputProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      aria-label={ariaLabel}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
}
