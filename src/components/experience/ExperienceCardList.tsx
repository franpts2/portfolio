import React from "react";
import { motion } from "motion/react";
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
	return (
		<div className="relative max-w-4xl mx-auto px-6 py-12">
			{/* timeline line */}
			<div className="absolute left-9.5 -top-3 -bottom-3 w-0.5 bg-primary/20" />

			<div className="flex flex-col gap-6">
				{experiences.map((exp, index) => (
					<motion.div
						key={exp.id}
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<ExperienceCard {...exp} />
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default ExperienceCardList;
