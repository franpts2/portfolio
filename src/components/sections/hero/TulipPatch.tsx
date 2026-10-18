import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "../../../lib/motion.js";
import type { Tulip as TulipShape } from "../../../lib/tulipPatch.js";
import { Tulip } from "./Tulip.js";

interface TulipPatchProps {
  readonly tulips: readonly TulipShape[];
}

/**
 * Sits behind the hero text, so each stem is cut off by the letters in front of
 * it. Growth is a scale from the base rather than a move, which is what makes
 * the flowers read as sprouting out from behind the name.
 */
export function TulipPatch({ tulips }: TulipPatchProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {tulips.map((tulip) => (
        <div
          key={tulip.id}
          className="absolute"
          style={{
            left: tulip.x,
            top: tulip.y,
            // bottom-centre of the stem lands exactly on the plant point
            transform: "translate(-50%, -100%)",
          }}
        >
          <motion.div
            style={
              reducedMotion
                ? { transformOrigin: "bottom center", rotate: tulip.rotate }
                : { transformOrigin: "bottom center" }
            }
            initial={
              reducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scaleY: 0.12,
                    y: 8,
                    rotate: tulip.rotate - 4,
                  }
            }
            animate={
              reducedMotion
                ? { opacity: [0, tulip.opacity, tulip.opacity, 0] }
                : {
                    opacity: [0, tulip.opacity, tulip.opacity, 0],
                    scaleY: [0.12, 1.06, 1, 1],
                    y: [8, -2, 0, 0],
                    rotate: [
                      tulip.rotate - 4,
                      tulip.rotate + 2,
                      tulip.rotate,
                      tulip.rotate,
                    ],
                  }
            }
            transition={
              reducedMotion
                ? {
                    duration: tulip.duration,
                    delay: tulip.delay,
                    times: [0, 0.06, 0.84, 1],
                    ease: "linear",
                  }
                : {
                    opacity: {
                      duration: tulip.duration,
                      delay: tulip.delay,
                      times: [0, 0.05, 0.84, 1],
                      ease: "linear",
                    },
                    scaleY: {
                      duration: tulip.duration,
                      delay: tulip.delay,
                      times: [0, 0.16, 0.24, 1],
                      ease: EASE_OUT_EXPO,
                    },
                    y: {
                      duration: tulip.duration,
                      delay: tulip.delay,
                      times: [0, 0.16, 0.28, 1],
                      ease: EASE_OUT_EXPO,
                    },
                    rotate: {
                      duration: tulip.duration,
                      delay: tulip.delay,
                      times: [0, 0.15, 0.3, 1],
                      ease: "easeOut",
                    },
                  }
            }
          >
            <Tulip height={tulip.height} color={tulip.color} />
          </motion.div>
        </div>
      ))}
    </div>
  );
}
