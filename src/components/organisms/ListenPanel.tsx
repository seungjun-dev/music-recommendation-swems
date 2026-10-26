import RecommendationItem from "@/components/molecules/RecommendationItem";
import TrackInfo from "@/components/molecules/TrackInfo";
import { LISTEN } from "@/constants/content";
import { padNumber } from "@/lib/format";
import RadarChart from "./RadarChart";
import type { RankedSong, Song } from "@/types/song";
import "./ListenPanel.css";

export interface ListenPanelProps {
  song: Song | null;
  recommendations: RankedSong[];
  onSelect: (id: number) => void;
}

export default function ListenPanel({ song, recommendations, onSelect }: ListenPanelProps) {
  return (
    <div className="listen-panel">
      <TrackInfo
        caption={LISTEN.turntable}
        title={song ? song.title : LISTEN.emptyTitle}
        artist={song ? song.artist : "—"}
        number={song ? `NO. ${padNumber(song.id)}` : "—"}
      />
      <div className="record-chart">
        <RadarChart song={song} emptyLabel={LISTEN.chartLabel} />
      </div>
      <div className="close-title">
        {LISTEN.closeTitle} <small>{LISTEN.closeHint}</small>
      </div>
      <div className="recommendations">
        {recommendations.map((item, index) => <RecommendationItem key={item.id} rank={index + 1} song={item} onSelect={onSelect} />)}
      </div>
    </div>
  );
}
