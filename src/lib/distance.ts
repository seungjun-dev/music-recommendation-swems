import { MOOD_KEYS } from "../constants/mood.ts";
import type { MoodKey, MoodProfile } from "../types/song.ts";

// 두 감성 좌표 사이의 유클리드 거리: √Σ (a[k] − b[k])²
export function euclideanDistance(a: MoodProfile, b: MoodProfile, keys: readonly MoodKey[] = MOOD_KEYS): number {
  return Math.sqrt(keys.reduce((sum, key) => sum + (Number(a[key]) - Number(b[key])) ** 2, 0));
}
