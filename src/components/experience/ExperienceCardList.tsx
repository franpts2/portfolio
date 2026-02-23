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
			<div className="absolute left-9.5 top-0 bottom-12 w-0.5 bg-primary/30" />

			<div className="flex flex-col gap-4">
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
