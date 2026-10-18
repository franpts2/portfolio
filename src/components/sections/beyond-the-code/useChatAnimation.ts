import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";

const STEP_MARGIN = 0.02;
const DIR_EPSILON = 0.002;

interface UseChatAnimationProps {
  readonly totalSteps: number;
}

interface UseChatAnimationReturn {
  readonly sectionRef: React.RefObject<HTMLElement | null>;
  readonly step: number;
  readonly direction: "up" | "down";
  readonly reducedMotion: boolean;
}

export function useChatAnimation({
  totalSteps,
}: UseChatAnimationProps): UseChatAnimationReturn {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  // useReducedMotion returns null when the preference can't be determined;
  // treat that as "no preference" so animations play as normal.
  const reducedMotion = useReducedMotion() ?? false;
  const prevProgress = useRef(0);
  const stepRef = useRef(0);
  const dirRef = useRef<"up" | "down">("down");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const delta = latest - prevProgress.current;
    prevProgress.current = latest;

    if (Math.abs(delta) > DIR_EPSILON) {
      const dir = delta > 0 ? "down" : "up";
      if (dir !== dirRef.current) {
        dirRef.current = dir;
        setDirection(dir);
      }
    }

    const rawStep = Math.min(
      totalSteps,
      Math.max(1, Math.floor(latest * totalSteps) + 1),
    );
    if (rawStep === stepRef.current) return;

    if (stepRef.current === 0) {
      stepRef.current = rawStep;
      setStep(rawStep);
      return;
    }

    const boundary =
      (rawStep > stepRef.current ? stepRef.current : stepRef.current - 1) /
      totalSteps;
    const committed =
      rawStep > stepRef.current
        ? latest >= boundary + STEP_MARGIN
        : latest <= boundary - STEP_MARGIN;
    if (committed) {
      stepRef.current = rawStep;
      setStep(rawStep);
    }
  });

  return { sectionRef, step, direction, reducedMotion };
}
