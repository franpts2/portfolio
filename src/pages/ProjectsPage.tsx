import React, { useState } from "react";
import { motion } from "motion/react";
import ProjectCardList from "../components/projects/ProjectCardList.tsx";
import IconButton from "../components/ui/buttons/IconButton.tsx";
import { icons } from "../assets/icons.js";
import projectsData from "../data/projects.json" with { type: "json" };
import Dropdown from "../components/ui/dropdown/Dropdown.tsx";
import SortDropdown from "../components/ui/dropdown/SortDropdown.tsx";
import Button from "../components/ui/buttons/Button.tsx";
import { capitalize } from "../utils/format.ts";

const ProjectsPage = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
	const [sortBy, setSortBy] = useState<"date" | "name" | "relevance">(
		"relevance",
	);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	const availableTags = Array.from(
		new Set(projectsData.flatMap((project) => project.tags)),
	).sort();
	const availableTech = Array.from(
		new Set(projectsData.flatMap((project) => project.tech)),
	).sort();

	const [filters, setFilters] = useState<{
		status: "all" | "done" | "in-progress";
		tags: string[];
		tech: string[];
	}>({ status: "all", tags: availableTags, tech: availableTech });

	return (
		<div className="relative min-h-screen flex flex-col items-center py-10">
			<div className="w-full max-w-7xl px-6 sm:px-10 flex flex-col gap-10">
				<motion.div
					className="flex flex-col sm:flex-row items-center justify-between gap-6"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<motion.h1
						className="font-black text-4xl sm:text-5xl text-primary-accent text-center sm:text-left"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						Projects
					</motion.h1>

					<motion.div
						className="flex flex-wrap items-center justify-center sm:justify-end gap-4 md:gap-8"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<div className="flex items-center gap-3">
							<span className="hidden xs:block text-xs font-medium text-secondary uppercase tracking-wide">
								Sort By
							</span>
							<div className="flex items-center gap-2">
								<div className="relative">
									<Button
										onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
										text={capitalize(sortBy)}
										icon={icons.dropdown.fill}
										iconHeight={16}
										variant="sorter"
									/>
									<SortDropdown
										isOpen={isSortDropdownOpen}
										onClose={() => setIsSortDropdownOpen(false)}
										sortBy={sortBy}
										onSortChange={(value) => {
											setSortBy(value);
											setIsSortDropdownOpen(false);
										}}
									/>
								</div>
								<IconButton
									icon={
										sortOrder === "asc"
											? icons.arrowUpward.fill
											: icons.arrowDownward.fill
									}
									onClick={() =>
										setSortOrder(sortOrder === "asc" ? "desc" : "asc")
									}
									iconHeight={20}
									variant="secondary"
								/>
							</div>
						</div>

						<div className="relative">
							<IconButton
								icon={icons.filters.fill}
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								iconHeight={32}
								variant="transparent"
								className="text-primary-accent"
							/>
							<Dropdown
								isOpen={isDropdownOpen}
								onClose={() => setIsDropdownOpen(false)}
								filters={filters}
								onFilterChange={setFilters}
								availableTags={availableTags}
								availableTech={availableTech}
							/>
						</div>
					</motion.div>
				</motion.div>

				<ProjectCardList
					filters={filters}
					sortBy={sortBy}
					sortOrder={sortOrder}
				/>
			</div>
		</div>
	);
};

export default ProjectsPage;
