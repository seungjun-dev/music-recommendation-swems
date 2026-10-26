// 1 → "01"
export const padNumber = (value, length = 2) => String(value).padStart(length, "0");

// 감성 점수 표시 (소수 1자리)
export const formatScore = (value) => Number(value).toFixed(1);

// 거리 표시 (소수 2자리)
export const formatDistance = (value) => Number(value).toFixed(2);

// 범위 슬라이더 진행률 (0~100%)
export const rangeProgress = (value, min, max) => `${((Number(value) - min) / (max - min)) * 100}%`;
