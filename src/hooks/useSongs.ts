import { useEffect, useState } from "react";
// data/ 는 읽기 전용: 빌드 시 URL 만 받아 런타임에 fetch 한다.
import songsUrl from "@data/swems.json?url";
import type { Song } from "@/types/song";

export type SongsStatus = "loading" | "ready" | "error";

export interface SongsState {
  songs: Song[];
  status: SongsStatus;
}

export function useSongs(): SongsState {
  const [state, setState] = useState<SongsState>({ songs: [], status: "loading" });

  useEffect(() => {
    let active = true;
    fetch(songsUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Song data unavailable");
        return response.json() as Promise<Song[]>;
      })
      .then((songs) => {
        if (active) setState({ songs, status: "ready" });
      })
      .catch(() => {
        if (active) setState({ songs: [], status: "error" });
      });
    return () => {
      active = false;
    };
  }, []);

  return state;
}
