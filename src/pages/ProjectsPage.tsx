import React, { useState } from "react";
import ProjectCardList from "../components/projects/ProjectCardList.tsx";
import IconButton from "../components/ui/IconButton.tsx";
import { icons } from "../assets/icons.js";
import projectsData from "../data/projects.json" with { type: "json" };
import Dropdown from "../components/ui/Dropdown.tsx";

const ProjectsPage = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [filters, setFilters] = useState<{
		status: "all" | "done" | "in-progress";
		tags: string[];
	}>({ status: "all", tags: [] });

	// all unique tags from projects
	const availableTags = Array.from(
		new Set(projectsData.flatMap((project) => project.tags)),
	);

	return (
		<div className="relative min-h-screen flex flex-col items-center gap-10">
            <div className="w-full max-w-337.5 px-5 mt-10 flex items-center justify-between">
                <h1 className="font-black text-4xl text-primary-accent">Projects</h1>
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
                    />
                </div>
            </div>
            <ProjectCardList filters={filters} />
        </div>
	);
};

export default ProjectsPage;
