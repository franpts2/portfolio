/**
 * Placement for the hero easter egg: a small tulip growing on every letter of
 * the name.
 *
 * Flowers are planted on slots measured from the live text, so each one lands on
 * a glyph rather than somewhere in the title's bounding box. Each grows from the
 * point where the base of its stem meets the top of the letter.
 */

export interface TulipSlot {
  /** Stable across re-measures, so a letter only ever sprouts one flower. */
  readonly key: string;
  /** Where the flower stands on the letter, in layer coordinates. */
  readonly x: number;
  /** The top of the letter's ink, in layer coordinates. */
  readonly top: number;
  /**
   * The tallest flower that fits between `top` and whatever sits above the
   * letter. Use `Infinity` when nothing is in the way.
   */
  readonly headroom: number;
}

export interface Tulip {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly height: number;
  readonly rotate: number;
  readonly color: string;
  readonly opacity: number;
  readonly delay: number;
  readonly duration: number;
}

export interface PatchInput {
  /** Slots in reading order; flowers come up left to right in that order. */
  readonly slots: readonly TulipSlot[];
  readonly colors: readonly string[];
  /** Multipliers of the cap height, so flowers scale with the type. */
  readonly heightRange: readonly [number, number];
  readonly durationRange: readonly [number, number];
  readonly stagger?: number;
}

let nextId = 0;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/** Skewed short: mostly little flowers, the occasional taller one. */
function biasedRandom() {
  return Math.random() ** 1.6;
}

export function createPatch({
  slots,
  colors,
  heightRange,
  durationRange,
  stagger = 0.12,
}: PatchInput): Tulip[] {
  const [minHeight, maxHeight] = heightRange;
  const [minDuration, maxDuration] = durationRange;

  const minX = Math.min(...slots.map((slot) => slot.x));
  const maxX = Math.max(...slots.map((slot) => slot.x));
  const halfSpan = Math.max((maxX - minX) / 2, 1);
  const centerX = minX + halfSpan;

  const palette = colors
    .map((color) => ({ color, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .map((entry) => entry.color);

  return slots.map((slot, index) => {
    const wanted = minHeight + (maxHeight - minHeight) * biasedRandom();
    // Every flower stands on its own letter, so one with something sitting above
    // it shrinks into the space instead of sinking down out of sight.
    const height = Math.max(Math.min(wanted, slot.headroom), minHeight * 0.5);
    const depth = Math.max(
      (height - minHeight) / Math.max(maxHeight - minHeight, 1),
      0,
    );

    return {
      id: (nextId += 1),
      x: slot.x,
      // The base of the stem lands on the top of the letter's ink.
      y: slot.top,
      height,
      // Lean away from the middle of the line, like a bed fanning out.
      rotate: ((slot.x - centerX) / halfSpan) * 5 + randomBetween(-2.5, 2.5),
      color: palette[index % palette.length] ?? "#c8452f",
      opacity: 0.82 + depth * 0.18,
      delay: index * stagger,
      duration: randomBetween(minDuration, maxDuration),
    };
  });
}
