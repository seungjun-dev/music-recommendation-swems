import { padNumber } from "@/lib/format";
import type { Song } from "@/types/song";
import "./SongRow.css";

interface SongRowProps {
  song: Song;
  active: boolean;
  onSelect: (id: number) => void;
}

export default function SongRow({ song, active, onSelect }: SongRowProps) {
  return (
    <button className={`song-row${active ? " active" : ""}`} type="button" aria-pressed={active} onClick={() => onSelect(song.id)}>
      <span className="row-num">{padNumber(song.id)}</span>
      <span className="row-art" aria-hidden="true">{String(song.title).slice(0, 1)}</span>
      <span className="row-copy">
        <strong>{song.title}</strong>
        <small>{song.artist}</small>
      </span>
      <span className="row-arrow" aria-hidden="true">{active ? "●" : "↗"}</span>
    </button>
  );
}
