import { useCallback, useState } from "react";
import { MOOD_KEYS, MOOD_RANGE } from "@/constants/mood";
import type { MoodKey, MoodProfile } from "@/types/song";

const initialProfile = (): MoodProfile =>
  Object.fromEntries(MOOD_KEYS.map((key) => [key, MOOD_RANGE.initial])) as MoodProfile;

export interface MoodProfileState {
  profile: MoodProfile;
  setValue: (key: MoodKey, value: number) => void;
  reset: () => void;
}

// 감정 조절 슬라이더 값 { sweet, warm, enthusiastic, modern, sorrow }
export function useMoodProfile(): MoodProfileState {
  const [profile, setProfile] = useState(initialProfile);
  const setValue = useCallback((key: MoodKey, value: number) => setProfile((current) => ({ ...current, [key]: Number(value) })), []);
  const reset = useCallback(() => setProfile(initialProfile()), []);
  return { profile, setValue, reset };
}
