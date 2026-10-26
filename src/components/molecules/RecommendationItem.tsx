import { formatDistance, padNumber } from "@/lib/format";
import type { RankedSong } from "@/types/song";
import "./RecommendationItem.css";

interface RecommendationItemProps {
  rank: number;
  song: RankedSong;
  onSelect: (id: number) => void;
}

export default function RecommendationItem({ rank, song, onSelect }: RecommendationItemProps) {
  const distance = formatDistance(song.distance);
  return (
    <button className="recommendation" type="button" aria-label={`${song.title} 선택, 거리 ${distance}`} onClick={() => onSelect(song.id)}>
      <span className="rec-rank">{padNumber(rank)}</span>
      <span>
        <span className="rec-title">{song.title}</span>
        <span className="rec-artist">{song.artist}</span>
      </span>
      <span className="rec-distance"><b>{distance}</b>거리</span>
    </button>
  );
}
