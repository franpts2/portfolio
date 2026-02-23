import React from "react";
import { motion } from "motion/react";

interface ExperienceCardProps {
	position: string;
	company: string;
	location?: string;
	monthYearFrom: string;
	monthYearTo?: string;
	description: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
	position,
	company,
	location,
	monthYearFrom,
	monthYearTo,
	description,
}) => {
	const isOngoing = !monthYearTo;

	const formatDate = (dateStr: string) => {
		const [year, month] = dateStr.split("/");
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		return `${months[parseInt(month ?? "1") - 1]} ${year}`;
	};

	return (
		<div className="group relative ml-12 pb-16 last:pb-0">
            
			{/* timeline point */}
			<div className="absolute -left-10.25 top-3 z-10 flex items-center justify-center w-4 h-4">
				{/* main static dot */}
				<div className="w-full h-full rounded-full bg-secondary-accent shadow-sm z-10" />

				{/* ambient pulse */}
				{isOngoing && (
					<motion.div
						initial={{ scale: 1, opacity: 0.6 }}
						animate={{
							scale: [1, 2.2, 1],
							opacity: [0.6, 0, 0.6],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="absolute inset-0 rounded-full bg-secondary-accent"
					/>
				)}
			</div>

			{/* card content */}
			<div className="bg-secondary-bg border border-secondary-bg/30 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:border-secondary-accent/50">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
					<h3 className="font-heading font-semibold text-xl md:text-2xl text-primary/90 group-hover:text-secondary-accent transition-colors">
						{position}
					</h3>
					<span className="text-xs md:text-sm text-secondary font-medium whitespace-nowrap bg-tertiary-bg/50 px-3 py-1 rounded-full w-fit">
						{formatDate(monthYearFrom)} -{" "}
						{isOngoing ? (
							<span className="font-bold text-secondary-accent">Current</span>
						) : (
							formatDate(monthYearTo)
						)}
					</span>
				</div>

				<div className="flex items-center gap-2 mb-4">
					<p className="text-sm md:text-base text-secondary-accent/70 font-semibold">
						{company}
					</p>
					{location && (
						<>
							<span className="w-1 h-1 rounded-full bg-secondary" />
							<span className="text-sm md:text-base text-secondary">
								{location}
							</span>
						</>
					)}
				</div>

				<p className="text-sm md:text-base text-secondary leading-relaxed whitespace-pre-line">
					{description}
				</p>
			</div>
		</div>
	);
};

export default ExperienceCard;
