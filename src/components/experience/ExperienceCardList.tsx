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
		<div className="h-[calc(100vh-184px)] overflow-y-scroll snap-y snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
			{experiences.map((exp, index) => (
				<div
					key={exp.id}
					className="h-[calc(100vh-184px)] snap-start flex items-center justify-center px-4 sm:px-6 lg:px-8"
				>
					<motion.div
						initial={{ opacity: 0, y: 50, scale: 0.95 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ once: false, amount: 0.5 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="w-full max-w-4xl"
					>
						<ExperienceCard
							position={exp.position}
							company={exp.company}
							{...(exp.location && { location: exp.location })}
							monthYearFrom={exp.monthYearFrom}
							{...(exp.monthYearTo && { monthYearTo: exp.monthYearTo })}
							description={exp.description}
						/>
					</motion.div>
				</div>
			))}
		</div>
	);
};

export default ExperienceCardList;
