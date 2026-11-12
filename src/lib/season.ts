import { useState } from "react";

export type Season = "winter" | "default";

const SEASON_ENABLED = true;

/**
 * The winter window: December 1 through January 6, inclusive.
 */
export function isWinter(now: Date = new Date()): boolean {
  if (!SEASON_ENABLED) return false;
  const month = now.getMonth() + 1; // 1–12
  const day = now.getDate();
  return (month === 12 && day >= 1) || (month === 1 && day <= 6);
}

/**
 * The season for this page load. `?season=winter` or `?season=default` previews
 * either side of the gate.
 */
export function useSeason(): Season {
  const [season] = useState<Season>(() => {
    const forced = new URLSearchParams(location.search).get("season");
    if (forced === "winter" || forced === "default") return forced;
    return isWinter() ? "winter" : "default";
  });

  return season;
}
