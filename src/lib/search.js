// 제목 + 아티스트에 검색어가 포함된 곡만 남긴다 (대소문자 무시, 앞뒤 공백 무시).
export function searchSongs(songs, query = "") {
  const needle = query.trim().toLocaleLowerCase("ko");
  if (!needle) return songs;
  return songs.filter((song) => `${song.title} ${song.artist}`.toLocaleLowerCase("ko").includes(needle));
}
