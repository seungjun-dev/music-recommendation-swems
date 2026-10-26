import { MOOD_KEYS } from "../constants/mood.js";

// 두 감성 좌표 사이의 유클리드 거리: √Σ (a[k] − b[k])²
export function euclideanDistance(a, b, keys = MOOD_KEYS) {
  return Math.sqrt(keys.reduce((sum, key) => sum + (Number(a[key]) - Number(b[key])) ** 2, 0));
}
