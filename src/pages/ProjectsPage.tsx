import React from "react";
import ProjectCardList from "../components/projects/ProjectCardList.tsx";
import IconButton from "../components/ui/IconButton.tsx";
import { icons } from "../assets/icons.js";

const ProjectsPage = () => {
	return (
		<div className="relative min-h-screen flex flex-col items-center gap-10">
			<div className="w-full max-w-[1350px] px-5 mt-10 flex items-center justify-between">
				<h1 className="font-black text-4xl text-primary-accent">Projects</h1>
				<IconButton
					icon={icons.filters.fill}
					onClick={() => {}}
					iconHeight={36}
					variant="transparent"
                    className="text-primary-accent"
				/>
			</div>
			<ProjectCardList />
		</div>
	);
};

export default ProjectsPage;
