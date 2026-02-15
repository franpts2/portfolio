import React from "react";
import { motion } from "motion/react";
import ExperienceCardList from "../components/experience/ExperienceCardList.tsx";
import experienceData from "../data/experience.json" with { type: "json" };

interface Experience {
	id: string;
	position: string;
	company: string;
	location?: string;
	monthYearFrom: string;
	monthYearTo?: string;
	description: string;
}

const ExperiencePage = () => {
	const experiences: Experience[] = experienceData;

	return (
		<div className="relative h-screen overflow-hidden">
			<div className="sticky top-0 z-10 bg-primary-bg/95 backdrop-blur-sm mt-10 py-8 px-4 sm:px-6 lg:px-8">
				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="font-heading font-black text-4xl sm:text-5xl text-primary-accent text-center"
				>
					Experience
				</motion.h1>
			</div>

			<ExperienceCardList experiences={experiences} />
		</div>
	);
};

export default ExperiencePage;
