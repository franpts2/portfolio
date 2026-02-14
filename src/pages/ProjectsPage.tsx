import React, { useState } from "react";
import ProjectCardList from "../components/projects/ProjectCardList.tsx";
import IconButton from "../components/ui/IconButton.tsx";
import { icons } from "../assets/icons.js";
import projectsData from "../data/projects.json" with { type: "json" };
import Dropdown from "../components/ui/Dropdown.tsx";
import SortDropdown from "../components/ui/SortDropdown.tsx";
import Button from "../components/ui/Button.tsx";
import { capitalize } from "../utils/formatTech.ts";

const ProjectsPage = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
	const [sortBy, setSortBy] = useState<"date" | "name" | "relevance">("date");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
	const [filters, setFilters] = useState<{
		status: "all" | "done" | "in-progress";
		tags: string[];
		tech: string[];
	}>({ status: "all", tags: [], tech: [] });

	// all unique tags from projects
	const availableTags = Array.from(
		new Set(projectsData.flatMap((project) => project.tags)),
	).sort();

	// all unique tech from projects
	const availableTech = Array.from(
		new Set(projectsData.flatMap((project) => project.tech)),
	).sort();

	return (
		<div className="relative min-h-screen flex flex-col items-center gap-10">
			<div className="w-full max-w-337.5 px-5 mt-10 flex items-center justify-between">
				<h1 className="font-black text-4xl text-primary-accent">Projects</h1>
				<div className="flex items-center gap-8">
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
				</div>
			</div>
			<ProjectCardList filters={filters} />
		</div>
	);
};

export default ProjectsPage;
