import React from "react";
import ExperienceCard from "../components/experience/ExperienceCard.tsx";
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
		<div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				{/* Title */}
				<h1 className="font-heading font-black text-4xl sm:text-5xl text-primary-accent mb-12 text-center">
					Experience
				</h1>

				{/* Experience Cards List */}
				<div className="space-y-6">
					{experiences.map((exp) => (
						<ExperienceCard
							key={exp.id}
							position={exp.position}
							company={exp.company}
							{...(exp.location && { location: exp.location })}
							monthYearFrom={exp.monthYearFrom}
							{...(exp.monthYearTo && { monthYearTo: exp.monthYearTo })}
							description={exp.description}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ExperiencePage;
