import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "../../lib/motion.js";

interface RevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly className?: string;
  readonly once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  className,
  once = true,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      // Use the full `transform` string, not the `y` shorthand: only the
      // `transform` property is in Motion's accelerated-values set, so this can
      // run on the compositor via WAAPI instead of the main thread.
      initial={
        reducedMotion ? { opacity: 1 } : { opacity: 0, transform: "translateY(24px)" }
      }
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: reducedMotion ? 0 : 0.6,
        delay,
        ease: EASE_OUT_EXPO,
      }}
    >
      {children}
    </motion.div>
  );
}
