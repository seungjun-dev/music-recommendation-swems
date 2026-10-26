import { useMemo } from "react";
import { MOOD_AXES } from "@/constants/mood";
import { RADAR } from "@/constants/radar";
import { formatScore } from "@/lib/format";
import { radarGeometry } from "@/lib/radar";
import type { Song } from "@/types/song";
import "./RadarChart.css";

interface RadarChartProps {
  song: Song | null;
  emptyLabel: string;
}

export default function RadarChart({ song, emptyLabel }: RadarChartProps) {
  const { grid, spokes, labels, values } = useMemo(() => radarGeometry(song), [song]);
  const ariaLabel = song
    ? `${song.title}의 감성 지수: ${MOOD_AXES.map((axis) => `${axis.label} ${formatScore(song[axis.key])}`).join(", ")}`
    : emptyLabel;

  // 원본처럼 곡을 고르기 전에는 빈 차트를 둔다.
  return (
    <svg id="radar-chart" viewBox={`0 0 ${RADAR.width} ${RADAR.height}`} role="img" aria-label={ariaLabel}>
      {values && (
        <>
          {grid.map((points) => <polygon key={points} className="chart-grid" points={points} />)}
          {spokes.map((line, index) => <line key={index} className="chart-axis" {...line} />)}
          <polygon className="chart-area" points={values.area} />
          {values.points.map((point) => (
            <circle key={point.key} className="chart-point" cx={point.cx} cy={point.cy} r={RADAR.pointRadius} style={{ fill: point.color }} />
          ))}
          {labels.map((label) => (
            <text key={label.key} className="chart-text" x={label.x} y={label.y} textAnchor={label.anchor} dominantBaseline="middle">
              {label.text}
            </text>
          ))}
        </>
      )}
    </svg>
  );
}
