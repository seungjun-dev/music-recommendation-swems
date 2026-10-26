import type { Ref } from "react";
import "./SearchField.css";

interface SearchFieldProps {
  ref?: Ref<HTMLInputElement>;
  id?: string;
  value: string;
  placeholder?: string;
  ariaLabel?: string;
  onChange: (value: string) => void;
}

export default function SearchField({ ref, id, value, placeholder, ariaLabel, onChange }: SearchFieldProps) {
  return (
    <label className="room-search">
      <span>⌕</span>
      <input ref={ref} id={id} value={value} placeholder={placeholder} aria-label={ariaLabel} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
