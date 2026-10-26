import { useEffect, useState } from "react";
// data/ 는 읽기 전용: 빌드 시 URL 만 받아 런타임에 fetch 한다.
import songsUrl from "@data/swems.json?url";

// { songs, status: "loading" | "ready" | "error" }
export function useSongs() {
  const [state, setState] = useState({ songs: [], status: "loading" });

  useEffect(() => {
    let active = true;
    fetch(songsUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Song data unavailable");
        return response.json();
      })
      .then((songs) => active && setState({ songs, status: "ready" }))
      .catch(() => active && setState({ songs: [], status: "error" }));
    return () => {
      active = false;
    };
  }, []);

  return state;
}
