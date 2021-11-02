const saturation = '80%';
const normal = '40%';
const dark = '15%';
const light = '75%';

export function appColor(hue: number, alpha?: number) {
  const validHue = hue % 360;
  if (alpha !== undefined && alpha >= 0 && alpha <= 1) {
    return {
      normal: `hsla(${validHue}, ${saturation}, ${normal}, ${alpha})`,
      dark: `hsla(${validHue}, ${saturation}, ${dark}, ${alpha})`,
      light: `hsla(${validHue}, ${saturation}, ${light}, ${alpha})`,
    };
  }

  return {
    normal: `hsl(${validHue}, ${saturation}, ${normal})`,
    dark: `hsl(${validHue}, ${saturation}, ${dark})`,
    light: `hsl(${validHue}, ${saturation}, ${light})`,
  };
}

export function colorForTopic({
  count,
  index,
  range = 360,
  startAngle = 10,
  spacing = 1,
  favourEdges = false,
  lightVal = '75%',
}: {
  count: number;
  index: number;
  range?: number;
  startAngle?: number;
  spacing?: number;
  favourEdges?: boolean;
  lightVal?: string;
}) {
  const realCount = Math.max(count, 16);
  const realIndex = index * spacing;
  const stepValue = range / realCount;
  const midPoint = range / 2;
  let hueVal: number;
  if (range <= 330) {
    hueVal = ((range * realIndex) / (realCount - 1) + startAngle) % 360;
  } else {
    hueVal = ((range * realIndex) / (realCount + 1) + startAngle) % 360;
  }

  if (favourEdges) {
    if (hueVal < midPoint) {
      hueVal = hueVal - realIndex * (stepValue / 2);
    } else if (hueVal > midPoint) {
      hueVal = hueVal + (realCount - 1 - realIndex) * (stepValue / 2);
    }
  }

  return `hsl(${Math.round(hueVal)}, ${saturation}, ${lightVal})`;
}

export function addColorToArrayItems<T>(item: T, index: number, arr: T[]) {
  const color = colorForTopic({ count: arr.length, index });
  return { ...item, color };
}

export function colorForRange(
  count: number,
  index: number,
  hue: number,
  range = 20,
  start = 55,
): string {
  const lightVal = Math.round((range * index) / (count + 1) + start);
  return `hsl(${hue}, ${saturation}, ${lightVal}%)`;
}

export function hueToColor(hue: number) {
  return `hsl(${Math.round(hue % 360)}, ${saturation}, ${light})`;
}
