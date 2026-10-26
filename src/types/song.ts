// SWEMS 다섯 감성 지수 키
export type MoodKey = "sweet" | "warm" | "enthusiastic" | "modern" | "sorrow";

// 다섯 지수 좌표 (슬라이더 프로필, 곡 점수 공통)
export type MoodProfile = Record<MoodKey, number>;

// data/swems.json 레코드
export interface Song extends MoodProfile {
  id: number;
  title: string;
  artist: string;
  score: number;
}

// 거리 계산 결과가 붙은 곡
export type Ranked<T> = T & { distance: number };
export type RankedSong = Ranked<Song>;

export interface MoodAxis {
  key: MoodKey;
  label: string;
  name: string;
  korean: string;
  color: string;
  dotClass: string;
}

export interface MoodRange {
  min: number;
  max: number;
  step: number;
  initial: number;
}
