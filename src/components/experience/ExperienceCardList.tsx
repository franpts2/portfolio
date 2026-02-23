import React from "react";
import { motion, type Variants } from "motion/react";
import ExperienceCard from "./ExperienceCard.tsx";

interface Experience {
	id: string;
	position: string;
	company: string;
	location?: string;
	monthYearFrom: string;
	monthYearTo?: string;
	description: string;
}

interface ExperienceCardListProps {
	experiences: Experience[];
}

const ExperienceCardList: React.FC<ExperienceCardListProps> = ({
	experiences,
}) => {
	const containerVariants: Variants = {
		hidden: { opacity: 1 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
				delayChildren: 0.2,
			},
		},
	};

	const lineVariants: Variants = {
		hidden: { scaleY: 0 },
		visible: {
			scaleY: 1,
			transition: {
				duration: 0.8,
				ease: "easeInOut",
			},
		},
	};

	return (
		<motion.div
			className="relative max-w-4xl mx-auto px-6 py-12"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.div
				variants={lineVariants}
				style={{ originY: 0 }}
				className="absolute left-9.5 -top-8 -bottom-8 w-0.5 bg-primary/20"
			/>

			<div className="flex flex-col gap-8">
				{experiences.map((exp) => (
					<ExperienceCard key={exp.id} {...exp} />
				))}
			</div>
		</motion.div>
	);
};

export default ExperienceCardList;
