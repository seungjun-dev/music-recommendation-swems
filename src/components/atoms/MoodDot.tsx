import "./MoodDot.css";

interface MoodDotProps {
  // sweet-dot, warm-dot … (MOOD_AXES[].dotClass)
  variant: string;
}

export default function MoodDot({ variant }: MoodDotProps) {
  return <i className={`mood-dot ${variant}`}></i>;
}
