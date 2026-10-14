import type { ReactNode } from "react";

interface ChatBubbleProps {
	readonly isMe: boolean;
	readonly children: ReactNode;
}

export function ChatBubble({ isMe, children }: ChatBubbleProps) {
	const bubbleClasses = `max-w-[min(88%,460px)] md:max-w-[min(45%,520px)] px-[1.1rem] py-[0.85rem] rounded-[1.25rem] text-[0.95rem] leading-relaxed whitespace-pre-wrap ${
		isMe
			? "bg-(--color-accent) text-white rounded-br-sm"
			: "bg-(--color-bg-soft) text-(--color-ink) border border-(--color-line) rounded-bl-sm"
	}`;

	return (
		<div className={`${bubbleClasses} invisible`} aria-hidden="true">
			{children}
		</div>
	);
}
