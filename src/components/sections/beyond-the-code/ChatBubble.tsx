import type { ReactNode } from "react";
import { chatBubbleClass } from "./chatBubbleClass.js";

interface ChatBubbleProps {
  readonly isMe: boolean;
  readonly children: ReactNode;
}

export function ChatBubble({ isMe, children }: ChatBubbleProps) {
  return (
    <div className={`${chatBubbleClass(isMe)} invisible`} aria-hidden="true">
      {children}
    </div>
  );
}
