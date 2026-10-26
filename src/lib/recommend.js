import { euclideanDistance } from "./distance.js";

// target 과 가까운 순으로 곡을 정렬해 { ...song, distance } 목록을 돌려준다.
// 거리가 같으면 원래 목록 순서를 유지한다 (Array.prototype.sort 는 안정 정렬).
export function rankByDistance(songs, target, { limit = Infinity, excludeId } = {}) {
  return songs
    .filter((song) => song.id !== excludeId)
    .map((song) => ({ ...song, distance: euclideanDistance(song, target) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

// 슬라이더로 만든 감정 프로필에 가까운 곡
export function matchProfile(songs, profile, limit) {
  return rankByDistance(songs, profile, { limit });
}

// 선택한 곡과 가까운 곡 (자기 자신 제외)
export function nearestSongs(songs, song, limit) {
  return rankByDistance(songs, song, { limit, excludeId: song.id });
}
