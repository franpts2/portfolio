import React from "react";
import { motion } from "motion/react";

interface HighlightProps {
	children: React.ReactNode;
	isHighlighted: boolean;
}

const Highlight: React.FC<HighlightProps> = ({ children, isHighlighted }) => {
	return (
		<motion.strong className="relative inline-block px-1 whitespace-nowrap">
			<motion.span
				className="absolute bottom-0 left-0 z-[-1] bg-primary-accent/30 rounded-sm h-[90%]"
				initial={{ width: 0 }}
				animate={{ width: isHighlighted ? "100%" : 0 }}
				transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
			/>
			{children}
		</motion.strong>
	);
};

export default Highlight;
