import { useRef } from "react";
import { motion, useAnimationControls } from "motion/react";
import { EASE_OUT_EXPO } from "../../../lib/motion.js";
import { useTilt } from "../../effects/useTilt.js";

interface SquishyPortraitProps {
  readonly src: string;
  readonly alt: string;
}

export function SquishyPortrait({ src, alt }: SquishyPortraitProps) {
  const controls = useAnimationControls();
  const wrapperRef = useRef<HTMLButtonElement>(null);

  const { rotateX, rotateY, x, y, handleMouseMove, handleMouseLeave } =
    useTilt();

  const handleClick = async () => {
    await controls.start({
      scaleX: 1.22,
      scaleY: 0.72,
      rotate: (Math.random() - 0.5) * 6,
      transition: { duration: 0.08, ease: EASE_OUT_EXPO },
    });
    await controls.start({
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 360,
        damping: 12,
      },
    });
  };

  return (
    <button
      type="button"
      ref={wrapperRef}
      className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 cursor-pointer select-none bg-transparent p-0 rounded-full"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-label={`${alt}, press to squish`}
    >
      <motion.div
        className="w-full h-full rounded-full overflow-hidden"
        style={{
          rotateX,
          rotateY,
          x,
          y,
          transformStyle: "preserve-3d",
        }}
        animate={controls}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover pointer-events-none"
        />
      </motion.div>
    </button>
  );
}
