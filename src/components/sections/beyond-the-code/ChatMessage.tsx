import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChatBubble } from "./ChatBubble.js";

interface ChatMessageProps {
  readonly from: "me" | "them";
  readonly text: string;
  readonly isVisible: boolean;
  readonly isTyping: boolean;
}

export function ChatMessage({
  from,
  text,
  isVisible,
  isTyping,
}: ChatMessageProps) {
  const reducedMotion = useReducedMotion();
  const isMe = from === "me";

  const bubbleClasses = `max-w-[min(88%,460px)] md:max-w-[min(45%,520px)] px-[1.1rem] py-[0.85rem] rounded-[1.25rem] text-[0.95rem] leading-relaxed whitespace-pre-wrap ${
    isMe
      ? "bg-(--color-accent) text-white rounded-br-sm"
      : "bg-(--color-bg-soft) text-(--color-ink) border border-(--color-line) rounded-bl-sm"
  }`;

  return (
    <div className={`flex relative ${isMe ? "justify-end" : "justify-start"}`}>
      <ChatBubble isMe={isMe}>{text}</ChatBubble>

      {/* Floating layer for typing/text animations. */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          {isTyping && (
            <motion.div
              key="typing"
              className={`absolute top-0 ${
                isMe ? "right-0" : "left-0"
              } inline-flex items-center justify-center gap-[0.5rem] min-w-[4.75rem] min-h-[3rem] px-5 py-[0.85rem] rounded-[1.25rem] rounded-br-sm w-fit bg-(--color-accent)`}
              aria-label="Typing"
              initial={
                reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }
              }
              animate={
                reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
              }
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.14, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-[typingBounce_1.2s_infinite_ease-in-out]" />
              <span
                className="w-2.5 h-2.5 rounded-full bg-white animate-[typingBounce_1.2s_infinite_ease-in-out]"
                style={{ animationDelay: "0.12s" }}
              />
              <span
                className="w-2.5 h-2.5 rounded-full bg-white animate-[typingBounce_1.2s_infinite_ease-in-out]"
                style={{ animationDelay: "0.24s" }}
              />
            </motion.div>
          )}
          {isVisible && (
            <motion.div
              key="msg"
              className={`${bubbleClasses} absolute top-0 ${
                isMe ? "right-0" : "left-0"
              }`}
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, y: 6 }
              }
              animate={
                reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
              }
              exit={
                reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
              }
            >
              {text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
