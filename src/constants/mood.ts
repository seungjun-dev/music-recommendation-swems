import type { MoodAxis, MoodKey, MoodRange } from "../types/song.ts";

// SWEMS 다섯 감성 지수. 순서는 레이더 차트 축 순서와 같다.
export const MOOD_AXES: readonly MoodAxis[] = [
  { key: "sweet", label: "SWEET", name: "Sweet", korean: "달콤함", color: "#ef9279", dotClass: "sweet-dot" },
  { key: "warm", label: "WARM", name: "Warm", korean: "따뜻함", color: "#c3aa52", dotClass: "warm-dot" },
  { key: "enthusiastic", label: "ENTHUSIASTIC", name: "Enthusiastic", korean: "열정", color: "#7c9b45", dotClass: "enth-dot" },
  { key: "modern", label: "MODERN", name: "Modern", korean: "세련됨", color: "#668da2", dotClass: "modern-dot" },
  { key: "sorrow", label: "SORROW", name: "Sorrow", korean: "슬픔", color: "#8d7aa1", dotClass: "sorrow-dot" },
];

export const MOOD_KEYS: readonly MoodKey[] = MOOD_AXES.map((axis) => axis.key);

// 슬라이더 범위 (논문 평가 척도 1~7점)
export const MOOD_RANGE: MoodRange = { min: 1, max: 7, step: 0.1, initial: 4 };

// 감정 조절 결과 / 곡 추천 개수
export const MOOD_MATCH_LIMIT = 4;
export const RECOMMENDATION_LIMIT = 3;
