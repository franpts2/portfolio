/**
 * Single source of truth for chat bubble styling. Shared with the animated
 * bubble in ChatMessage so the invisible layout placeholder in ChatBubble can
 * never drift from it.
 */
export function chatBubbleClass(isMe: boolean): string {
  return `max-w-[min(88%,460px)] md:max-w-[min(45%,520px)] px-[1.1rem] py-[0.85rem] rounded-[1.25rem] text-[0.95rem] leading-relaxed whitespace-pre-wrap ${
    isMe
      ? "bg-(--color-bg-soft) text-(--color-ink) border border-(--color-line) rounded-bl-sm"
      : "bg-(--color-accent) text-white rounded-br-sm"
  }`;
}
