import { motion } from "motion/react";
import { SectionHeader } from "../../ui/SectionHeader.js";
import { EASE_OUT_EXPO } from "../../../lib/motion.js";
import { ChatMessage } from "./ChatMessage.js";
import { useChatAnimation } from "./useChatAnimation.js";

const messages = [
  {
    id: "prompt",
    from: "them" as const,
    text: "what are you into outside of work?",
  },
  {
    id: "music",
    from: "me" as const,
    text: "music!! i collect vynil, have playlists for every mood and absolutely love going to concerts",
  },
  {
    id: "books",
    from: "me" as const,
    text: "also books. i've recently been into classics because i want to know why are these books so important? i also love books that make me uncomfortable or change my viewing of the world.",
  },
  {
    id: "people",
    from: "me" as const,
    text: "people too. a good conversation is my favorite hang out plan. making new friends and cherishing old ones makes me happy :)",
  },
  {
    id: "animals",
    from: "me" as const,
    text: "oh i also love animals! i volunteer with cats and dogs and it's genuinely hard to have a bad day around them.",
  },
  {
    id: "travel",
    from: "me" as const,
    text: "and my long-term goal: see as much of the world as possible.",
  },
] as const;

const ctaMessage = {
  id: "cta",
  from: "them" as const,
  text: "want to keep talking?",
};

// prompt (1) + 5 replies with typing+visible (10) + cta (1)
const totalSteps = 1 + (messages.length - 1) * 2 + 1;

export function BeyondTheCodeSection() {
  const { sectionRef, step, direction, reducedMotion } = useChatAnimation({
    totalSteps,
  });

  return (
    <section
      ref={sectionRef}
      id="beyond-the-code"
      className="relative bg-(--color-bg)"
      style={{ height: "460svh" }}
      // SectionSnap reads this: one page per chat step, so each wheel gesture
      // advances the conversation instead of jumping over several messages.
      data-snap-steps={totalSteps}
      aria-labelledby="beyond-heading"
    >
      {/* Top-aligned rather than centered: the header then stays put while the
          conversation grows, instead of drifting upward with every message.
          Padding clears the fixed site header on each breakpoint. */}
      <div className="beyond-panel sticky top-0 h-svh flex flex-col justify-start pt-[4.5rem] pb-2 sm:pt-24 sm:pb-2">
        <div className="container-main">
          <div className="beyond-heading mb-5 sm:mb-10">
            <SectionHeader
              label="Beyond the code"
              title="If we were texting"
              id="beyond-heading"
            />
            <p className="beyond-instruction t-body mt-2 sm:mt-4 max-w-[50ch]">
              Keep scrolling. The conversation unfolds as you go.
            </p>
          </div>

          <div className="beyond-messages flex flex-col gap-2 sm:gap-3">
            {messages.map((msg, idx) => {
              const isPrompt = msg.from === "them";
              const typingStep = isPrompt ? 1 : idx * 2;
              const visibleStep = isPrompt ? 1 : idx * 2 + 1;
              const isTyping =
                step === typingStep && !isPrompt && direction === "down";

              return (
                <ChatMessage
                  key={msg.id}
                  from={msg.from}
                  text={msg.text}
                  isVisible={step >= visibleStep}
                  isTyping={isTyping}
                />
              );
            })}

            {/* The link is always rendered so its height is reserved and the
                centered block doesn't jump when it appears. */}
            <div className="flex justify-end">
              <motion.a
                href="#contact"
                className={`group max-w-[min(88%,460px)] md:max-w-[min(45%,520px)] ${
                  step >= totalSteps ? "" : "pointer-events-none"
                }`}
                aria-hidden={step < totalSteps}
                tabIndex={step >= totalSteps ? 0 : -1}
                initial={false}
                animate={
                  step >= totalSteps
                    ? reducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0 }
                    : reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 14 }
                }
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { duration: 0.3, ease: EASE_OUT_EXPO }
                }
              >
                <span className="block px-[1.1rem] py-[0.85rem] rounded-[1.25rem] text-[0.95rem] leading-relaxed bg-(--color-accent) text-white rounded-br-sm transition hover:brightness-95">
                  {ctaMessage.text}
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
