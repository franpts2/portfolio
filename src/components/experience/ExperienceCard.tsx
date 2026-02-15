import React from "react";

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

	const isOngoing = !monthYearTo;

	return (
		<div className="group relative bg-secondary-bg border border-tertiary-bg/30 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary-accent/30">
			{/* Subtle gradient overlay on hover */}
			<div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary-accent/0 to-primary-accent/0 group-hover:from-primary-accent/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />

			<div className="relative">
				{/* Header with title and date */}
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
					<h3 className="font-heading font-semibold text-xl md:text-2xl text-primary group-hover:text-primary-accent transition-colors duration-200">
						{position}
					</h3>
					<span className="text-xs md:text-sm text-secondary font-medium whitespace-nowrap bg-tertiary-bg/50 px-3 py-1 rounded-full w-fit">
						{formatDate(monthYearFrom)} -{" "}
						{isOngoing ? (
							<span className="font-bold text-primary-accent">Current</span>
						) : (
							formatDate(monthYearTo)
						)}
					</span>
				</div>

				{/* Company and location */}
				<div className="flex items-center gap-2 mb-4">
					<p className="text-sm md:text-base text-primary/70 font-semibold">
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

				{/* Description */}
				<p className="text-sm md:text-base text-secondary leading-relaxed whitespace-pre-line">
					{description}
				</p>
			</div>
		</div>
	);
};

export default ExperienceCard;
