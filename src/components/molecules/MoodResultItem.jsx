import { formatDistance, padNumber } from "@/lib/format";
import "./MoodResultItem.css";

export default function MoodResultItem({ rank, song, onSelect }) {
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
