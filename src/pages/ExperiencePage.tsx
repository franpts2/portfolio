import React from "react";
import { motion } from "motion/react";
import ExperienceCardList from "../components/experience/ExperienceCardList.tsx";
import experienceData from "../data/experience.json" with { type: "json" };

const ExperiencePage = () => {
	return (
		<div className="min-h-screen py-20">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 flex flex-col gap-4 items-center text-center">
				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="font-heading font-black text-4xl sm:text-5xl text-primary-accent"
				>
					Experience
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-secondary max-w-2xl"
				>
					A timeline of my professional journey, focusing on frontend excellence
					and product-driven development.
				</motion.p>
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.4 }}
			>
				<ExperienceCardList experiences={experienceData} />
			</motion.div>
		</div>
	);
};

export default ExperiencePage;
