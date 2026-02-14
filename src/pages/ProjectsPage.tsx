import React, { useState } from "react";
import { motion } from "motion/react";
import ProjectCardList from "../components/projects/ProjectCardList.tsx";
import IconButton from "../components/ui/IconButton.tsx";
import { icons } from "../assets/icons.js";
import projectsData from "../data/projects.json" with { type: "json" };
import Dropdown from "../components/ui/Dropdown.tsx";
import SortDropdown from "../components/ui/SortDropdown.tsx";
import Button from "../components/ui/Button.tsx";
import { capitalize } from "../utils/format.ts";

const ProjectsPage = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
	const [sortBy, setSortBy] = useState<"date" | "name" | "relevance">(
		"relevance",
	);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	// all unique tags from projects
	const availableTags = Array.from(
		new Set(projectsData.flatMap((project) => project.tags)),
	).sort();

	// all unique tech from projects
	const availableTech = Array.from(
		new Set(projectsData.flatMap((project) => project.tech)),
	).sort();

	const [filters, setFilters] = useState<{
		status: "all" | "done" | "in-progress";
		tags: string[];
		tech: string[];
	}>({ status: "all", tags: availableTags, tech: availableTech });

	return (
		<div className="relative min-h-screen flex flex-col items-center gap-10">
			<motion.div
				className="w-full max-w-337.5 px-5 mt-10 flex items-center justify-between"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<motion.h1
					className="font-black text-4xl text-primary-accent"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
				>
					Projects
				</motion.h1>
				<motion.div
					className="flex items-center gap-8"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<div className="flex items-center gap-3">
						<span className="text-xs font-medium text-secondary uppercase tracking-wide">
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
							iconHeight={36}
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
	);
};

export default ProjectsPage;
