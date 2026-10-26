import "./SearchField.css";

export default function SearchField({ ref, id, value, placeholder, ariaLabel, onChange }) {
  return (
    <label className="room-search">
      <span>⌕</span>
      <input ref={ref} id={id} value={value} placeholder={placeholder} aria-label={ariaLabel} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
