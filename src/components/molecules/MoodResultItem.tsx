import { formatDistance, padNumber } from "@/lib/format";
import type { RankedSong } from "@/types/song";
import "./MoodResultItem.css";

interface MoodResultItemProps {
  rank: number;
  song: RankedSong;
  onSelect: (id: number) => void;
}

export default function MoodResultItem({ rank, song, onSelect }: MoodResultItemProps) {
  const distance = formatDistance(song.distance);
  return (
    <button className="mood-result" type="button" aria-label={`${song.title}, 거리 ${distance}`} onClick={() => onSelect(song.id)}>
      <span className="mood-rank">{padNumber(rank)}</span>
      <span className="mood-song">
        <b>{song.title}</b>
        <small>{song.artist}</small>
      </span>
      <span className="mood-distance">
        <b>{distance}</b>
        <small>거리</small>
      </span>
    </button>
  );
}
