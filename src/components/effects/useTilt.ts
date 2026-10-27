import { useCallback } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

/**
 * Pointer-following tilt for the portrait.
 *
 * Only real mouse input tilts: browsers synthesise mouse events after a tap,
 * which used to leave the portrait frozen at a random 3D angle. Pointer events
 * carry the device type, so touch and pen simply do not move it.
 */
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

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.pointerType !== "mouse" || reducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY, reducedMotion],
  );

  const handlePointerLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return { rotateX, rotateY, x, y, handlePointerMove, handlePointerLeave };
}
