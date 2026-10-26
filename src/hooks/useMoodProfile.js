import { useCallback, useState } from "react";
import { MOOD_KEYS, MOOD_RANGE } from "@/constants/mood";

const initialProfile = () => Object.fromEntries(MOOD_KEYS.map((key) => [key, MOOD_RANGE.initial]));

// 감정 조절 슬라이더 값 { sweet, warm, enthusiastic, modern, sorrow }
export function useMoodProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const setValue = useCallback((key, value) => setProfile((current) => ({ ...current, [key]: Number(value) })), []);
  const reset = useCallback(() => setProfile(initialProfile()), []);
  return { profile, setValue, reset };
}
