import { MOOD_AXES, MOOD_RANGE } from "../constants/mood.ts";
import { RADAR, type RadarConfig } from "../constants/radar.ts";
import type { MoodAxis, MoodKey, MoodProfile } from "../types/song.ts";

type Point = [number, number];

export interface RadarLabel {
  key: MoodKey;
  text: string;
  x: string;
  y: string;
  anchor: "start" | "middle" | "end";
}

export interface RadarSpoke {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface RadarValues {
  area: string;
  points: { key: MoodKey; color: string; cx: string; cy: string }[];
}

export interface RadarGeometry {
  grid: string[];
  spokes: RadarSpoke[];
  labels: RadarLabel[];
  values: RadarValues | null;
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const toPoint = ([x, y]: Point) => `${x.toFixed(1)},${y.toFixed(1)}`;

// 레이더 차트를 그리는 데 필요한 좌표를 계산한다. song 이 없으면 values 는 null.
export function radarGeometry(song: MoodProfile | null, axes: readonly MoodAxis[] = MOOD_AXES, config: RadarConfig = RADAR): RadarGeometry {
  const { cx, cy, radius, rings, labelOffset, anchorThreshold } = config;
  const angles = axes.map((_, i) => -Math.PI / 2 + (Math.PI * 2 * i) / axes.length);
  const point = (angle: number, r: number): Point => [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];

  const grid = rings.map((scale) => angles.map((angle) => toPoint(point(angle, radius * scale))).join(" "));
  const spokes = angles.map((angle) => {
    const [x, y] = point(angle, radius);
    return { x1: cx, y1: cy, x2: x, y2: y };
  });
  const labels = axes.map((axis, i): RadarLabel => {
    const [x, y] = point(angles[i], radius + labelOffset);
    const anchor = x < cx - anchorThreshold ? "end" : x > cx + anchorThreshold ? "start" : "middle";
    return { key: axis.key, text: axis.label, x: x.toFixed(1), y: y.toFixed(1), anchor };
  });

  if (!song) return { grid, spokes, labels, values: null };

  const valuePoints = axes.map((axis, i) => point(angles[i], radius * clamp01(Number(song[axis.key]) / MOOD_RANGE.max)));
  const values = {
    area: valuePoints.map(toPoint).join(" "),
    points: valuePoints.map(([x, y], i) => ({ key: axes[i].key, color: axes[i].color, cx: x.toFixed(1), cy: y.toFixed(1) })),
  };
  return { grid, spokes, labels, values };
}
