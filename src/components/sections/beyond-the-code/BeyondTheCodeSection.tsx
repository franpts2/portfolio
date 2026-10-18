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
    text: "music is a big one. i collect vinyl, build playlists for every mood, and will happily dissect a song's production for way too long. live music is my happy place.",
  },
  {
    id: "books",
    from: "me" as const,
    text: "also books. i chase the ones that change how i see things: classics for context, contemporary masterpieces for discomfort.",
  },
  {
    id: "people",
    from: "me" as const,
    text: "people too. good conversations, new friends, old friends. that's the good stuff.",
  },
  {
    id: "animals",
    from: "me" as const,
    text: "i volunteer with cats and dogs. it's genuinely hard to have a bad day around them.",
  },
  {
    id: "travel",
    from: "me" as const,
    text: "and the long-term goal: see as much of the world as possible. ideally with good company and a great soundtrack.",
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
      style={{ height: "460vh" }}
      aria-labelledby="beyond-heading"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center py-16">
        <div className="container-main">
          <div className="mb-10">
            <SectionHeader
              label="Beyond the code"
              title="If we were texting"
              id="beyond-heading"
            />
            <p className="t-body mt-4 max-w-[50ch]">
              Keep scrolling. The conversation unfolds as you go.
            </p>
          </div>

          <div className="flex flex-col gap-3">
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

            {/* CTA placeholder reserves final height so the centered block
						    doesn't jump when the link appears. */}
            <div className="relative inline-block">
              <span
                className="invisible inline-block max-w-[min(88%,460px)] md:max-w-[min(45%,520px)] px-[1.1rem] py-[0.85rem] rounded-[1.25rem] text-[0.95rem] leading-relaxed bg-(--color-bg-soft) text-(--color-ink) border border-(--color-line) rounded-bl-sm"
                aria-hidden="true"
              >
                {ctaMessage.text}
                <span className="inline-block ml-1">→</span>
              </span>
              <motion.a
                href="#contact"
                className={`absolute inset-0 group ${
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
                <span className="inline-block max-w-[min(88%,460px)] md:max-w-[min(45%,520px)] px-[1.1rem] py-[0.85rem] rounded-[1.25rem] text-[0.95rem] leading-relaxed bg-(--color-bg-soft) text-(--color-ink) border border-(--color-line) rounded-bl-sm hover:border-(--color-accent) hover:text-(--color-accent) transition-colors">
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
