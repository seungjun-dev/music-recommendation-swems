import type { ReactNode } from "react";
import "./EmptyState.css";

interface EmptyStateProps {
  variant?: "list" | "mood";
  children: ReactNode;
}

// variant: "list" (곡 목록) | "mood" (감정 조절 결과)
export default function EmptyState({ variant = "list", children }: EmptyStateProps) {
  return <p className={variant === "mood" ? "mood-empty" : "empty-state"}>{children}</p>;
}
