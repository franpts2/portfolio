import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { Reveal } from "../Reveal.js";

const messages = [
	{
		id: "prompt",
		from: "them" as const,
		text: "what are you into outside of work?",
	},
	{
		id: "music",
		from: "me" as const,
		text: "music is a big one — i collect vinyl, build playlists for every mood, and will happily dissect a song’s production for way too long. live music is my happy place.",
	},
	{
		id: "books",
		from: "me" as const,
		text: "also books. i chase the ones that change how i see things — classics for context, contemporary masterpieces for discomfort.",
	},
	{
		id: "people",
		from: "me" as const,
		text: "people too. good conversations, new friends, old friends. that’s the good stuff.",
	},
	{
		id: "animals",
		from: "me" as const,
		text: "i volunteer with cats and dogs. it’s genuinely hard to have a bad day around them.",
	},
	{
		id: "travel",
		from: "me" as const,
		text: "and the long-term goal: see as much of the world as possible. ideally with good company and a great soundtrack.",
	},
] as const;

interface ChatRowProps {
	readonly from: "me" | "them";
	readonly text: string;
	readonly isTyping: boolean;
	readonly isVisible: boolean;
	readonly delay: number;
}

function ChatRow({ from, text, isTyping, isVisible, delay }: ChatRowProps) {
	const isMe = from === "me";

	return (
		<motion.div
			className={`flex ${isMe ? "justify-end" : "justify-start"}`}
			initial={{ opacity: 0, y: 14 }}
			animate={isVisible || isTyping ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
			transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
		>
			{isTyping ? (
				<div
					className="inline-flex items-center justify-center gap-[0.45rem] min-w-[4.5rem] min-h-[2.85rem] px-5 py-[0.85rem] rounded-[1.25rem] rounded-br-[0.25rem] w-fit bg-(--color-accent)"
					aria-label="Typing"
				>
					<span className="w-2 h-2 rounded-full bg-white/75 animate-[typingBounce_1.3s_infinite_ease-in-out]" />
					<span
						className="w-2 h-2 rounded-full bg-white/75 animate-[typingBounce_1.3s_infinite_ease-in-out]"
						style={{ animationDelay: "0.15s" }}
					/>
					<span
						className="w-2 h-2 rounded-full bg-white/75 animate-[typingBounce_1.3s_infinite_ease-in-out]"
						style={{ animationDelay: "0.3s" }}
					/>
				</div>
			) : (
				<motion.div
					className={`max-w-[min(80%,460px)] px-[1.1rem] py-[0.85rem] rounded-[1.25rem] text-[0.95rem] leading-relaxed whitespace-pre-wrap ${
						isMe
							? "bg-(--color-accent) text-white rounded-br-[0.25rem]"
							: "bg-(--color-bg-soft) text-(--color-ink) border border-(--color-line) rounded-bl-[0.25rem]"
					}`}
					initial={{ opacity: 0, scale: 0.96, y: 6 }}
					animate={
						isVisible
							? { opacity: 1, scale: 1, y: 0 }
							: { opacity: 0, scale: 0.96, y: 6 }
					}
					transition={{ duration: 0.25, delay, ease: [0.16, 1, 0.3, 1] }}
				>
					{text}
				</motion.div>
			)}
		</motion.div>
	);
}

export function BeyondTheCodeSection() {
	const ref = useRef<HTMLElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.35 });
	const [step, setStep] = useState(0);

	useEffect(() => {
		if (!isInView) return;

		const timers: number[] = [];
		// Total steps: prompt visible (1), then typing+visible pairs for each me message
		const totalSteps = 1 + (messages.length - 1) * 2;

		for (let i = 1; i <= totalSteps; i++) {
			timers.push(window.setTimeout(() => setStep(i), i * 800));
		}

		return () => timers.forEach(clearTimeout);
	}, [isInView]);

	return (
		<section
			ref={ref}
			id="beyond-the-code"
			className="section"
			aria-labelledby="beyond-heading"
		>
			<div className="container-main">
				<Reveal>
					<span className="label">Beyond the code</span>
					<h2
						id="beyond-heading"
						className="t-headline text-4xl sm:text-5xl mt-3 accent-dot"
					>
						If we were texting
					</h2>
					<p className="t-body mt-5 max-w-[50ch]">
						Scroll down and watch the messages come in.
					</p>
				</Reveal>

				<div className="mt-16 max-w-[720px] mx-auto flex flex-col gap-3 pb-16">
					{messages.map((msg, idx) => {
						const isPrompt = msg.from === "them";
						// prompt: visible at step >= 1
						// me messages: typing at step === (idx) * 2, visible at step >= (idx) * 2 + 1
						const typingStep = isPrompt ? 1 : idx * 2;
						const visibleStep = isPrompt ? 1 : idx * 2 + 1;
						const isTyping = step === typingStep && !isPrompt;
						const isVisible = step >= visibleStep;

						return (
							<ChatRow
								key={msg.id}
								from={msg.from}
								text={msg.text}
								isTyping={isTyping}
								isVisible={isVisible}
								delay={0}
							/>
						);
									})}
				</div>
			</div>

			<style>{`
				@keyframes typingBounce {
					0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
					30% { transform: translateY(-5px); opacity: 1; }
				}
			`}</style>
		</section>
	);
}
