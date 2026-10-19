/** Bloom colours, warm enough to sit on paper: the site accent leads. */
export const TULIP_COLORS = [
  "#f25c2a",
  "#c8452f",
  "#d98a2b",
  "#dd7292",
  "#7d4f8a",
  "#b8355c",
] as const;

/** One green for every stem, so the blooms carry the colour. */
export const TULIP_STEM = "#5f6b45";

/** Three-petal cup, front view. */
const BLOOM_PATH =
  "M12 12 C9 24 10 36 20 42 C25 45 35 45 40 42 C50 36 51 24 48 12 " +
  "C45 20 42 24 39 23.5 C36 22 33 14 30 4 C27 14 24 22 21 23.5 " +
  "C18 24 15 20 12 12 Z";

/** Stem plus two lanceolate leaves. */
const STEM_PATH =
  "M28.8 128 C27.8 98 27.8 71 28.8 41 L31.2 41 C32.2 71 32.2 98 31.2 128 Z " +
  "M29.5 121 C16.4 110.4 8.9 96.7 7 80 C20.1 90.6 27.6 104.3 29.5 121 Z " +
  "M30.5 115 C43.7 103.6 51.2 89.3 53 72 C39.8 83.4 32.3 97.7 30.5 115 Z";

const VIEWBOX_WIDTH = 60;
const VIEWBOX_HEIGHT = 130;

interface TulipProps {
  readonly height: number;
  readonly color: string;
}

export function Tulip({ height, color }: TulipProps) {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      width={(height * VIEWBOX_WIDTH) / VIEWBOX_HEIGHT}
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      <path d={BLOOM_PATH} fill={color} />
      <path d={STEM_PATH} fill={TULIP_STEM} />
    </svg>
  );
}
