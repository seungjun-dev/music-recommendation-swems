// 곡 감성 레이더 차트의 SVG 좌표계
export const RADAR = {
  width: 360,
  height: 300,
  cx: 180,
  cy: 137,
  radius: 91,
  rings: [0.25, 0.5, 0.75, 1],
  labelOffset: 26,
  // 라벨이 중심선에서 이 값(px) 이상 벗어나면 좌/우 정렬한다.
  anchorThreshold: 6,
  pointRadius: 4,
};
