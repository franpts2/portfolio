import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "../../../data/profile.js";
import { EASE_OUT_EXPO } from "../../../lib/motion.js";
import { SquishyPortrait } from "./SquishyPortrait.js";
import { PillLink } from "../../ui/PillLink.js";
import { TulipPatch } from "./TulipPatch.js";
import { useTulipEgg } from "./useTulipEgg.js";

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const {
    sectionRef,
    titleRef,
    tulips,
    announcement,
    dotPose,
    handleDotClick,
  } = useTulipEgg(eyebrowRef);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-section relative min-h-svh flex flex-col items-center justify-center px-4"
      aria-label="Introduction"
    >
      {/* Rendered over the text below, so no flower is clipped by a letter. */}
      <TulipPatch tulips={tulips} />

      <div className="container-main grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Text */}
        <div className="relative z-10 order-2 lg:order-1 text-center lg:text-left">
          <motion.span
            ref={eyebrowRef}
            className="t-label inline-block mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
          >
            Frontend Engineer
          </motion.span>

          <motion.h1
            ref={titleRef}
            className="t-display text-[clamp(2.75rem,10vw,6.5rem)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
          >
            {profile.name}
            <button
              type="button"
              className={dotPose ? `title-dot is-${dotPose}` : "title-dot"}
              onClick={handleDotClick}
              aria-label="A little surprise"
            >
              .
            </button>
          </motion.h1>

          <motion.p
            className="t-body mt-6 max-w-lg mx-auto lg:mx-0 text-balance"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT_EXPO }}
          >
            {profile.statement}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT_EXPO }}
          >
            <PillLink href="#work" className="px-5 py-2.5">
              See selected work
            </PillLink>
            <PillLink href="#contact" variant="outline" className="px-5 py-2.5">
              Get in touch
            </PillLink>
          </motion.div>
        </div>

        {/* Portrait */}
        <div className="order-1 lg:order-2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 0.8,
              delay: 0.2,
              ease: EASE_OUT_EXPO,
            }}
          >
            <SquishyPortrait
              src={profile.portrait}
              alt={`Portrait of ${profile.name}`}
            />
          </motion.div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
