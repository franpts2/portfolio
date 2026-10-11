import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, LayoutGroup } from "motion/react";

const messages = [
	{
		id: "prompt",
		from: "them" as const,
		text: "what are you into outside of work?",
	},
	{
		id: "music",
		from: "me" as const,
		text: "music is a big one. i collect vinyl, build playlists for every mood, and will happily dissect a song’s production for way too long. live music is my happy place.",
	},
	{
		id: "books",
		from: "me" as const,
		text: "also books. i chase the ones that change how i see things: classics for context, contemporary masterpieces for discomfort.",
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

const ctaMessage = {
	id: "cta",
	from: "them" as const,
	text: "want to keep talking?",
};

// prompt (1) + 5 replies with typing+visible (10) + cta (1)
const totalSteps = 1 + (messages.length - 1) * 2 + 1;

export function BeyondTheCodeSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const [step, setStep] = useState(0);
	const [direction, setDirection] = useState<"up" | "down">("down");
	const prevProgress = useRef(0);
	const stepRef = useRef(0);
	const dirRef = useRef<"up" | "down">("down");

	// Scroll must travel this far (fraction of section progress) PAST a step
	// boundary before the step commits. Kills boundary flicker; one step is
	// 1/12 ≈ 0.083 of progress, so 0.02 is a quarter of a step.
	const STEP_MARGIN = 0.02;
	// Direction only flips once scroll has moved at least this far.
	const DIR_EPSILON = 0.002;

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		const delta = latest - prevProgress.current;
		prevProgress.current = latest;

		if (Math.abs(delta) > DIR_EPSILON) {
			const dir = delta > 0 ? "down" : "up";
			if (dir !== dirRef.current) {
				dirRef.current = dir;
				setDirection(dir);
			}
		}

		const rawStep = Math.min(
			totalSteps,
			Math.max(1, Math.floor(latest * totalSteps) + 1),
		);
		if (rawStep === stepRef.current) return;

		if (stepRef.current === 0) {
			// First commit after mount: no margin, so the prompt appears as
			// soon as the section pins (preserves pre-plan behavior).
			stepRef.current = rawStep;
			setStep(rawStep);
			return;
		}

		const boundary =
			(rawStep > stepRef.current ? stepRef.current : stepRef.current - 1) /
			totalSteps;
		const committed =
			rawStep > stepRef.current
				? latest >= boundary + STEP_MARGIN
				: latest <= boundary - STEP_MARGIN;
		if (committed) {
			stepRef.current = rawStep;
			setStep(rawStep);
		}
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
						<span className="t-label">Beyond the code</span>
						<h2
							id="beyond-heading"
							className="t-headline text-4xl sm:text-5xl mt-3 accent-dot"
						>
							If we were texting
						</h2>
						<p className="t-body mt-4 max-w-[50ch]">
							Keep scrolling. The conversation unfolds as you go.
						</p>
					</div>

					<div className="flex flex-col gap-3 min-h-[320px]">
						<LayoutGroup>
							{messages.map((msg, idx) => {
								const isPrompt = msg.from === "them";
								const typingStep = isPrompt ? 1 : idx * 2;
								const visibleStep = isPrompt ? 1 : idx * 2 + 1;
								const isTyping = step === typingStep && !isPrompt && direction === "down";
								const isVisible = step >= visibleStep;
								const isMe = msg.from === "me";

								return (
									<motion.div
										key={msg.id}
										className={`flex relative ${isMe ? "justify-end" : "justify-start"}`}
										initial={false}
										animate={
											isVisible || isTyping
												? { opacity: 1, y: 0 }
												: { opacity: 0, y: 14 }
										}
										transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
									>
										<AnimatePresence mode="popLayout" initial={false}>
											{isTyping ? (
												<motion.div
													key="typing"
													className="inline-flex items-center justify-center gap-[0.5rem] min-w-[4.75rem] min-h-[3rem] px-5 py-[0.85rem] rounded-[1.25rem] rounded-br-sm w-fit bg-(--color-accent)"
													aria-label="Typing"
													initial={{ opacity: 0, scale: 0.9 }}
													animate={{ opacity: 1, scale: 1 }}
													exit={{ opacity: 0, scale: 0.9 }}
													transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
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
												) : (
													<motion.div
														className={`max-w-[min(88%,460px)] md:max-w-[min(45%,520px)] px-[1.1rem] py-[0.85rem] rounded-[1.25rem] text-[0.95rem] leading-relaxed whitespace-pre-wrap ${
															isMe
																? "bg-(--color-accent) text-white rounded-br-sm"
																: "bg-(--color-bg-soft) text-(--color-ink) border border-(--color-line) rounded-bl-sm"
															}`}
														initial={{ opacity: 0, scale: 0.96, y: 6 }}
														animate={
															isVisible
																? { opacity: 1, scale: 1, y: 0 }
																: { opacity: 0, scale: 0.96, y: 6 }
															}
														exit={{ opacity: 0, scale: 0.96 }}
														transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
													>
														{msg.text}
													</motion.div>
												)}
										</AnimatePresence>
									</motion.div>
								);
							})}

							<motion.a
								href="#contact"
								layout="position"
								className="flex justify-start group"
								initial={false}
								animate={
									step >= totalSteps
										? { opacity: 1, y: 0 }
										: { opacity: 0, y: 14 }
								}
								transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
							>
								<span className="max-w-[min(88%,460px)] md:max-w-[min(45%,520px)] px-[1.1rem] py-[0.85rem] rounded-[1.25rem] text-[0.95rem] leading-relaxed bg-(--color-bg-soft) text-(--color-ink) border border-(--color-line) rounded-bl-sm hover:border-(--color-accent) hover:text-(--color-accent) transition-colors">
									{ctaMessage.text}
									<span className="inline-block ml-1 group-hover:translate-x-0.5 transition-transform">→</span>
								</span>
							</motion.a>
						</LayoutGroup>
					</div>
				</div>
			</div>

			<style>{`
				@keyframes typingBounce {
					0%, 60%, 100% { transform: translateY(0); }
					30% { transform: translateY(-6px); }
				}
			`}</style>
		</section>
	);
}
