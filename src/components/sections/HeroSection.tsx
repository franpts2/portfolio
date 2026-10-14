import { motion, useReducedMotion } from "motion/react";
import { profile } from "../../data/profile.js";
import { SquishyPortrait } from "../SquishyPortrait.js";
import { PillLink } from "../ui/PillLink.js";

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
						<PillLink href="#work" className="px-5 py-2.5">
							See selected work
						</PillLink>
						<PillLink href="#contact" variant="outline" className="px-5 py-2.5">
							Get in touch
						</PillLink>
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

		</section>
	);
}
