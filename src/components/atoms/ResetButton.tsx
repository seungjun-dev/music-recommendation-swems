import type { ReactNode } from "react";
import "./ResetButton.css";

interface ResetButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export default function ResetButton({ onClick, children }: ResetButtonProps) {
  return (
    <button className="reset-button" type="button" onClick={onClick}>
      {children}
    </button>
  );
}
