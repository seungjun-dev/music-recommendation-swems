// 범위 슬라이더. 스타일은 사용하는 쪽(MoodSlider)에서 정한다.
export default function RangeInput({ min, max, step, value, onChange, ariaLabel }) {
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
