
export type Slice = {
  id: string;
  label: string;
  value: number;
};

/**
 * 格式化 SVG 坐标数字
 * 最多保留 3 位小数，避免浮点数精度过长。
 */
export function formatSvgNumber(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(3));
}

/**
 * 使用最大余数法计算百分比。
 * 最终百分比总和为 100.0%。
 */
export function getPercentages(slices: Slice[]): number[] {
  if (!slices.length) return [];

  const values = slices.map((s) =>
    Number.isFinite(s.value) && s.value > 0 ? s.value : 0
  );

  const sum = values.reduce((a, b) => a + b, 0);

  if (sum <= 0) {
    return slices.map(() => 0);
  }

  const raw = values.map((v) => (v / sum) * 1000);
  const base = raw.map(Math.floor);

  const rest = 1000 - base.reduce((a, b) => a + b, 0);

  const order = raw
    .map((v, i) => ({
      i,
      r: v - base[i],
    }))
    .sort((a, b) => b.r - a.r);

  for (let k = 0; k < rest; k++) {
    base[order[k].i]++;
  }

  return base.map((v) => v / 10);
}

/**
 * 根据圆心、半径和角度计算 SVG 坐标。
 */
export function polar(
  cx: number,
  cy: number,
  r: number,
  angle: number
) {
  const rad = ((angle - 90) * Math.PI) / 180;

  return {
    x: formatSvgNumber(cx + r * Math.cos(rad)),
    y: formatSvgNumber(cy + r * Math.sin(rad)),
  };
}

/**
 * 生成 SVG 饼图扇形路径。
 */
export function arcPath(
  cx: number,
  cy: number,
  r: number,
  start: number,
  end: number
) {
  const a = polar(cx, cy, r, end);
  const b = polar(cx, cy, r, start);

  const large = end - start > 180 ? 1 : 0;

  return `M ${formatSvgNumber(cx)} ${formatSvgNumber(cy)} L ${b.x} ${b.y} A ${formatSvgNumber(r)} ${formatSvgNumber(r)} 0 ${large} 1 ${a.x} ${a.y} Z`;
}
