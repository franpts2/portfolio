import { useRef } from "react";
import { motion, useAnimationControls } from "motion/react";
import { EASE_OUT_EXPO } from "../../../lib/motion.js";
import { useTilt } from "../../effects/useTilt.js";
import type { Season } from "../../../lib/season.js";
import { SantaHat } from "./SantaHat.js";

interface SquishyPortraitProps {
  readonly src: string;
  readonly alt: string;
  readonly className?: string;
  readonly season: Season;
}

export function SquishyPortrait({
  src,
  alt,
  className,
  season,
}: SquishyPortraitProps) {
  const controls = useAnimationControls();
  const wrapperRef = useRef<HTMLButtonElement>(null);

  const { rotateX, rotateY, x, y, handlePointerMove, handlePointerLeave } =
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
      className={`relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 cursor-pointer select-none bg-transparent p-0 rounded-full ${className ?? ""}`}
      style={{ perspective: 1000 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      aria-label={`${alt}, press to squish`}
    >
      {/* The crop lives on an inner layer so decoration can sit outside the
          circle while still following its tilt and squish. */}
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          x,
          y,
          transformStyle: "preserve-3d",
        }}
        animate={controls}
      >
        <div className="w-full h-full rounded-full overflow-hidden">
          <motion.img
            src={src}
            alt={alt}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        {season === "winter" && (
          <SantaHat className="pointer-events-none absolute left-[62%] top-[12%] z-10 w-[54%] -translate-x-1/2 -translate-y-1/2 rotate-24 scale-[0.85] drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)]" />
        )}
      </motion.div>
    </button>
  );
}
