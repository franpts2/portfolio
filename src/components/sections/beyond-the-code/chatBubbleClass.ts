/**
 * Single source of truth for chat bubble styling. Shared with the animated
 * bubble in ChatMessage so the invisible layout placeholder in ChatBubble can
 * never drift from it.
 */
export function chatBubbleClass(isMe: boolean): string {
  return `beyond-bubble max-w-[min(88%,460px)] md:max-w-[min(45%,520px)] px-4 py-2.5 sm:px-[1.1rem] sm:py-[0.85rem] rounded-[1.25rem] text-[0.875rem] leading-snug sm:text-[0.95rem] sm:leading-relaxed whitespace-pre-wrap ${
    isMe
      ? "bg-(--color-bg-soft) text-(--color-ink) border border-(--color-line) rounded-bl-sm"
      : "bg-(--color-accent) text-white rounded-br-sm"
  }`;
}
