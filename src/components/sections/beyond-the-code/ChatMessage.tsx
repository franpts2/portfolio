import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "../../../lib/motion.js";
import { ChatBubble } from "./ChatBubble.js";
import { chatBubbleClass } from "./chatBubbleClass.js";

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

  const bubbleClasses = chatBubbleClass(isMe);

  return (
    <div className={`flex relative ${isMe ? "justify-start" : "justify-end"}`}>
      <ChatBubble isMe={isMe}>{text}</ChatBubble>

      {/* Floating layer for typing/text animations. */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          {isTyping && (
            <motion.div
              key="typing"
              className={`absolute top-0 ${
                isMe ? "left-0" : "right-0"
              } inline-flex items-center justify-center gap-[0.5rem] min-w-[4.75rem] min-h-[3rem] px-5 py-[0.85rem] rounded-[1.25rem] rounded-bl-sm w-fit bg-(--color-bg-soft) border border-(--color-line)`}
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
                  : { duration: 0.14, ease: EASE_OUT_EXPO }
              }
            >
              <span className="w-2.5 h-2.5 rounded-full bg-(--color-ink-muted) animate-[typingBounce_1.2s_infinite_ease-in-out]" />
              <span
                className="w-2.5 h-2.5 rounded-full bg-(--color-ink-muted) animate-[typingBounce_1.2s_infinite_ease-in-out]"
                style={{ animationDelay: "0.12s" }}
              />
              <span
                className="w-2.5 h-2.5 rounded-full bg-(--color-ink-muted) animate-[typingBounce_1.2s_infinite_ease-in-out]"
                style={{ animationDelay: "0.24s" }}
              />
            </motion.div>
          )}
          {isVisible && (
            <motion.div
              key="msg"
              className={`${bubbleClasses} absolute top-0 ${
                isMe ? "left-0" : "right-0"
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
                  : { duration: 0.22, ease: EASE_OUT_EXPO }
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
