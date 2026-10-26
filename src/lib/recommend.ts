import { euclideanDistance } from "./distance.ts";
import type { MoodProfile, Ranked, Song } from "../types/song.ts";

interface RankOptions {
  limit?: number;
  excludeId?: number;
}

// target 과 가까운 순으로 곡을 정렬해 { ...song, distance } 목록을 돌려준다.
// 거리가 같으면 원래 목록 순서를 유지한다 (Array.prototype.sort 는 안정 정렬).
export function rankByDistance<T extends Song>(songs: readonly T[], target: MoodProfile, { limit = Infinity, excludeId }: RankOptions = {}): Ranked<T>[] {
  return songs
    .filter((song) => song.id !== excludeId)
    .map((song) => ({ ...song, distance: euclideanDistance(song, target) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

// 슬라이더로 만든 감정 프로필에 가까운 곡
export function matchProfile<T extends Song>(songs: readonly T[], profile: MoodProfile, limit?: number): Ranked<T>[] {
  return rankByDistance(songs, profile, { limit });
}

// 선택한 곡과 가까운 곡 (자기 자신 제외)
export function nearestSongs<T extends Song>(songs: readonly T[], song: T, limit?: number): Ranked<T>[] {
  return rankByDistance(songs, song, { limit, excludeId: song.id });
}
