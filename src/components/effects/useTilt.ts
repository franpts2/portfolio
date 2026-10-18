import { useCallback } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

export function useTilt() {
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], reducedMotion ? [0, 0] : [10, -10]),
    { stiffness: 120, damping: 20 },
  );
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], reducedMotion ? [0, 0] : [-8, 8]),
    { stiffness: 120, damping: 20 },
  );
  const x = useSpring(
    useTransform(mouseX, [-0.5, 0.5], reducedMotion ? [0, 0] : [-8, 8]),
    { stiffness: 120, damping: 20 },
  );
  const y = useSpring(
    useTransform(mouseY, [-0.5, 0.5], reducedMotion ? [0, 0] : [-8, 8]),
    { stiffness: 120, damping: 20 },
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (reducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY, reducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return { rotateX, rotateY, x, y, handleMouseMove, handleMouseLeave };
}
