import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@iconify/react";
import { profile } from "../../data/profile.js";
import { SquishyPortrait } from "../SquishyPortrait.js";
import { icons } from "../../assets/icons.js";

export function HeroSection() {
	const reducedMotion = useReducedMotion();

	return (
		<section
			id="hero"
			className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-4"
			aria-label="Introduction"
		>
			<div className="container-main grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
				{/* Text */}
				<div className="order-2 lg:order-1 text-center lg:text-left">
					<motion.span
						className="t-label inline-block mb-4"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						Frontend Engineer
					</motion.span>

					<motion.h1
						className="t-display text-[clamp(2.75rem,10vw,6.5rem)] accent-dot"
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						{profile.name}
					</motion.h1>

					<motion.p
						className="t-body mt-6 max-w-lg mx-auto lg:mx-0 text-balance"
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.35 }}
					>
						{profile.statement}
					</motion.p>

					<motion.div
						className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4"
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
					>
						<a
							href="#work"
							className="inline-flex items-center gap-2 px-5 py-2.5 bg-(--color-ink) text-(--color-bg) rounded-full font-medium text-sm hover:bg-(--color-accent) transition-colors"
						>
							See selected work
						</a>
						<a
							href="#contact"
							className="inline-flex items-center gap-2 px-5 py-2.5 border border-(--color-line) rounded-full font-medium text-sm text-(--color-ink) hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
						>
							Get in touch
						</a>
					</motion.div>
				</div>

				{/* Portrait */}
				<div className="order-1 lg:order-2 flex justify-center">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: reducedMotion ? 0 : 0.8,
							delay: 0.2,
							ease: [0.16, 1, 0.3, 1],
						}}
					>
						<SquishyPortrait
							src={profile.portrait}
							alt={`Portrait of ${profile.name}`}
						/>
					</motion.div>
				</div>
			</div>

			{/* Scroll hint */}
			<motion.a
				href="#about"
				className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-(--color-ink-muted) hover:text-(--color-accent) transition-colors"
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.7 }}
				aria-label="Scroll to About section"
			>
				<span className="t-label text-inherit">Scroll</span>
				<motion.span
					className="text-inherit"
					animate={reducedMotion ? {} : { y: [0, 6, 0] }}
					transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
				>
					<Icon icon={icons.arrowDownward.outline} height={20} />
				</motion.span>
			</motion.a>
		</section>
	);
}
