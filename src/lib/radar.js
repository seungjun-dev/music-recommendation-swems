import { MOOD_AXES, MOOD_RANGE } from "../constants/mood.js";
import { RADAR } from "../constants/radar.js";

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const toPoint = ([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`;

// 레이더 차트를 그리는 데 필요한 좌표를 계산한다. song 이 없으면 values 는 null.
export function radarGeometry(song, axes = MOOD_AXES, config = RADAR) {
  const { cx, cy, radius, rings, labelOffset, anchorThreshold } = config;
  const angles = axes.map((_, i) => -Math.PI / 2 + (Math.PI * 2 * i) / axes.length);
  const point = (angle, r) => [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];

  const grid = rings.map((scale) => angles.map((angle) => toPoint(point(angle, radius * scale))).join(" "));
  const spokes = angles.map((angle) => {
    const [x, y] = point(angle, radius);
    return { x1: cx, y1: cy, x2: x, y2: y };
  });
  const labels = angles.map((angle, i) => {
    const [x, y] = point(angle, radius + labelOffset);
    const anchor = x < cx - anchorThreshold ? "end" : x > cx + anchorThreshold ? "start" : "middle";
    return { key: axes[i].key, text: axes[i].label, x: x.toFixed(1), y: y.toFixed(1), anchor };
  });

  if (!song) return { grid, spokes, labels, values: null };

  const valuePoints = axes.map((axis, i) => point(angles[i], radius * clamp01(Number(song[axis.key]) / MOOD_RANGE.max)));
  const values = {
    area: valuePoints.map(toPoint).join(" "),
    points: valuePoints.map(([x, y], i) => ({ key: axes[i].key, color: axes[i].color, cx: x.toFixed(1), cy: y.toFixed(1) })),
  };
  return { grid, spokes, labels, values };
}
