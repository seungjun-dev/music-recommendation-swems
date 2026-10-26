import type { Song } from "../types/song.ts";

// 제목 + 아티스트에 검색어가 포함된 곡만 남긴다 (대소문자 무시, 앞뒤 공백 무시).
export function searchSongs<T extends Pick<Song, "title" | "artist">>(songs: readonly T[], query = ""): readonly T[] {
  const needle = query.trim().toLocaleLowerCase("ko");
  if (!needle) return songs;
  return songs.filter((song) => `${song.title} ${song.artist}`.toLocaleLowerCase("ko").includes(needle));
}
