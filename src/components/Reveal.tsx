import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
	readonly children: ReactNode;
	readonly delay?: number;
	readonly className?: string;
	readonly once?: boolean;
}

export function Reveal({
	children,
	delay = 0,
	className,
	once = true,
}: RevealProps) {
	const reducedMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once, margin: "0px 0px -10% 0px" }}
			transition={{
				duration: reducedMotion ? 0 : 0.6,
				delay,
				ease: [0.16, 1, 0.3, 1],
			}}
		>
			{children}
		</motion.div>
	);
}
