import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  createPatch,
  type Tulip,
  type TulipSlot,
} from "../../../lib/tulipPatch.js";
import { TULIP_COLORS } from "./Tulip.js";

const SEEN_KEY = "hero-egg-seen";
/** Third click is the payoff, so it plants whatever is left. */
const CLICKS_TO_REVEAL = 3;
const LETTERS_PER_CLICK = [3, 6];
const MAX_TULIPS = 40;

/**
 * Clearance left between a flower and whatever sits above it. A flower that
 * cannot fit the space shrinks into it rather than ducking behind its letter,
 * so every letter still carries a flower standing on top of it.
 */
const HEADROOM_GAP = 0.06;

/** Multiples of the cap height: small enough to sit on a single letter. */
const TEASE: Timing = {
  heightRange: [0.4, 0.58],
  durationRange: [2.4, 3.1],
  stagger: 0.18,
};
const REVEAL: Timing = {
  heightRange: [0.4, 0.62],
  durationRange: [3.2, 4.4],
  stagger: 0.11,
};

interface Timing {
  readonly heightRange: readonly [number, number];
  readonly durationRange: readonly [number, number];
  readonly stagger: number;
}

function fontOf(element: HTMLElement) {
  const style = getComputedStyle(element);
  return `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
}

/** Ink darker than this counts as part of a glyph. */
const INK_ALPHA = 48;

/**
 * Where a glyph carries ink for a flower to stand on, as an offset from the pen
 * position.
 *
 * A letter's box is not where its ink is: "u" is drawn as two arms with a gap
 * between them, so a flower planted on the middle of the box would hang in the
 * air. Most letters are solid under their middle and are left alone; when the
 * middle is open the flower moves to a stroke, preferring the rightmost one.
 */
function inkTopCentre(font: string, char: string, advance: number): number {
  const measure = document.createElement("canvas").getContext("2d");
  if (!measure) return advance / 2;
  measure.font = font;

  const metrics = measure.measureText(char);
  const left = Math.max(Math.ceil(metrics.actualBoundingBoxLeft), 0);
  const right = Math.max(Math.ceil(metrics.actualBoundingBoxRight), 0);
  const ascent = Math.max(Math.ceil(metrics.actualBoundingBoxAscent), 0);
  const descent = Math.max(Math.ceil(metrics.actualBoundingBoxDescent), 0);
  const pad = 2;
  const width = left + right + pad * 2;
  const height = ascent + descent + pad * 2;
  if (width <= 0 || height <= 0) return advance / 2;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return advance / 2;
  context.font = font;
  context.fillStyle = "#000";
  context.fillText(char, pad + left, pad + ascent);

  const { data } = context.getImageData(0, 0, width, height);
  const ink = (x: number, y: number) =>
    (data[(y * width + x) * 4 + 3] ?? 0) > INK_ALPHA;
  const columns = Array.from({ length: width }, (_, x) => x);
  const clamp = (x: number) => Math.min(Math.max(x, 0), width - 1);

  let top = 0;
  while (top < height && !columns.some((x) => ink(x, top))) {
    top += 1;
  }
  if (top >= height) return advance / 2;

  // Rows just below the glyph's highest point; a stroke has to carry ink here
  // to count as part of the glyph's top.
  const band = Math.min(
    top + Math.max(Math.round(ascent * 0.05), 2),
    height - 1,
  );
  const inkedInBand = (x: number) => {
    for (let y = top; y <= band; y += 1) {
      if (ink(x, y)) return true;
    }
    return false;
  };

  // Solid under the middle (the usual case)? Leave the flower where it is.
  const middle = clamp(Math.round(pad + left + advance / 2));
  const bodyOfLetter = Math.min(
    top + Math.max(Math.round(ascent * 0.4), 3),
    height - 1,
  );
  const solidUnderMiddle = [
    middle - 2,
    middle - 1,
    middle,
    middle + 1,
    middle + 2,
  ].some((x) => {
    for (let y = top; y <= bodyOfLetter; y += 1) {
      if (ink(clamp(x), y)) return true;
    }
    return false;
  });
  if (solidUnderMiddle) return advance / 2;

  // Open in the middle, as in "u": runs of columns carrying top ink. The last
  // one wins, which is the arm on the right.
  let found: { first: number; last: number } | null = null;
  let start = -1;
  for (let x = 0; x <= width; x += 1) {
    if (x < width && inkedInBand(x)) {
      if (start < 0) start = x;
    } else if (start >= 0) {
      found = { first: start, last: x - 1 };
      start = -1;
    }
  }
  if (found) return (found.first + found.last) / 2 - (pad + left);

  // Nothing unbroken at the very top: fall back to the whole ink's centre.
  return (right - left) / 2;
}

/**
 * Type metrics for the title's own font, read from the canvas so the flowers
 * land on the real glyphs instead of on an assumed baseline. `ascentOf` gives
 * how far a character's ink rises above the baseline, which is what each flower
 * is planted against.
 */
function typeMetrics(element: HTMLElement) {
  const style = getComputedStyle(element);
  const fontSize = Number.parseFloat(style.fontSize) || 16;

  const context = document.createElement("canvas").getContext("2d");
  if (!context) {
    const capHeight = fontSize * 0.72;
    return {
      baselineOffset: fontSize * 0.9,
      capHeight,
      ascentOf: () => capHeight,
    };
  }

  context.font = fontOf(element);
  const ascent = context.measureText("Hxpg").fontBoundingBoxAscent ?? 0;
  const measuredCap = context.measureText("H").actualBoundingBoxAscent;
  const capHeight =
    Number.isFinite(measuredCap) && measuredCap > 0
      ? measuredCap
      : fontSize * 0.72;

  return {
    // A range's rect is the font's own content box, so the baseline sits one
    // ascent below its top. Factoring the line height in as well would count
    // the leading twice and float every flower off its line.
    baselineOffset:
      Number.isFinite(ascent) && ascent > 0 ? ascent : fontSize * 0.9,
    capHeight,
    ascentOf: (char: string) => {
      const ink = context.measureText(char).actualBoundingBoxAscent;
      return Number.isFinite(ink) && ink > 0 ? ink : capHeight;
    },
  };
}

/** One slot per rendered character, in layer coordinates. */
function measureLetterSlots(
  title: HTMLElement,
  section: HTMLElement,
  ceiling: HTMLElement | null,
): TulipSlot[] {
  const textNode = Array.from(title.childNodes).find(
    (node) =>
      node.nodeType === Node.TEXT_NODE &&
      (node.textContent ?? "").trim() !== "",
  );
  if (!textNode) return [];

  const text = textNode.textContent ?? "";
  const sectionBox = section.getBoundingClientRect();
  const { baselineOffset, capHeight, ascentOf } = typeMetrics(title);
  const font = fontOf(title);
  const gap = capHeight * HEADROOM_GAP;
  const ceilingBox = ceiling?.getBoundingClientRect() ?? null;
  // In layer coordinates, like the slots.
  const above = ceilingBox
    ? {
        left: ceilingBox.left - sectionBox.left,
        right: ceilingBox.right - sectionBox.left,
        bottom: ceilingBox.bottom - sectionBox.top,
      }
    : null;
  const range = document.createRange();
  const slots: TulipSlot[] = [];

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (!char || char === " ") continue;
    range.setStart(textNode, index);
    range.setEnd(textNode, index + 1);
    const box = range.getBoundingClientRect();
    if (box.width <= 0 || box.height <= 0) continue;

    const x = box.left + inkTopCentre(font, char, box.width) - sectionBox.left;
    // Sit the flower on the letter's own ink line, and let it rise unless
    // something is sitting directly above that letter.
    const top = box.top + baselineOffset - ascentOf(char) - sectionBox.top;
    const blocked =
      above !== null &&
      x >= above.left &&
      x <= above.right &&
      above.bottom < top;
    slots.push({
      key: String(index),
      x,
      top,
      headroom:
        blocked && above !== null
          ? top - above.bottom - gap
          : Number.POSITIVE_INFINITY,
    });
  }

  return slots;
}

function pickRandom<T>(items: readonly T[], count: number): T[] {
  const pool = [...items];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = pool[i];
    const other = pool[j];
    if (swap === undefined || other === undefined) continue;
    pool[i] = other;
    pool[j] = swap;
  }
  return pool.slice(0, count);
}

export function useTulipEgg(ceilingRef?: RefObject<HTMLElement | null>) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const [tulips, setTulips] = useState<readonly Tulip[]>([]);
  const [announcement, setAnnouncement] = useState("");

  const clicksRef = useRef(0);
  const seenRef = useRef(false);
  const plantedRef = useRef(new Set<string>());
  const clearTimerRef = useRef<number | null>(null);

  // Once someone has found it, a single click fills the name.
  useEffect(() => {
    try {
      seenRef.current = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      seenRef.current = false;
    }
  }, []);

  useEffect(
    () => () => {
      if (clearTimerRef.current !== null) {
        window.clearTimeout(clearTimerRef.current);
      }
    },
    [],
  );

  const launch = useCallback((slots: readonly TulipSlot[], timing: Timing) => {
    const title = titleRef.current;
    if (!title || slots.length === 0) return;

    const { capHeight } = typeMetrics(title);
    const batch = createPatch({
      slots,
      colors: TULIP_COLORS,
      heightRange: [
        capHeight * timing.heightRange[0],
        capHeight * timing.heightRange[1],
      ] as const,
      durationRange: timing.durationRange,
      stagger: timing.stagger,
    });

    // Clicks stack: each one adds to the bed rather than replacing it.
    setTulips((prev) => [...prev, ...batch].slice(-MAX_TULIPS));

    const lifetime =
      Math.max(...batch.map((tulip) => tulip.delay + tulip.duration)) * 1000 +
      500;
    if (clearTimerRef.current !== null) {
      window.clearTimeout(clearTimerRef.current);
    }
    clearTimerRef.current = window.setTimeout(() => {
      setTulips([]);
      plantedRef.current.clear();
      clearTimerRef.current = null;
    }, lifetime);
  }, []);

  const handleDotClick = useCallback(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const slots = measureLetterSlots(
      title,
      section,
      ceilingRef?.current ?? null,
    );
    if (slots.length === 0) return;

    let fresh = slots.filter((slot) => !plantedRef.current.has(slot.key));
    if (fresh.length === 0) {
      // Every letter already has one: start the bed again from scratch, rather
      // than stacking a second flower on the same spot.
      setTulips([]);
      plantedRef.current.clear();
      fresh = slots;
    }

    const revealing =
      seenRef.current || clicksRef.current + 1 >= CLICKS_TO_REVEAL;
    const chosen = revealing
      ? fresh
      : pickRandom(fresh, LETTERS_PER_CLICK[clicksRef.current] ?? 3);

    for (const slot of chosen) plantedRef.current.add(slot.key);

    if (revealing) {
      clicksRef.current = 0;
      seenRef.current = true;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Private mode: the egg just won't be remembered.
      }
      setAnnouncement("A tulip comes up behind every letter of the title.");
      launch(chosen, REVEAL);
      return;
    }

    clicksRef.current += 1;
    launch(chosen, TEASE);
  }, [ceilingRef, launch]);

  return {
    sectionRef,
    titleRef,
    tulips,
    announcement,
    handleDotClick,
  } as const;
}
