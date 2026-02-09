import React from "react";
import Badge from "../components/Badge.tsx";
import Card from "../components/Card.tsx";

const ProjectsPage = () => {
	return (
		<div className="relative min-h-screen flex items-center text-primary">
			<div className="mx-auto text-center">
				<p className="font-black text-2xl text-primary-accent">
					Work In Progress
				</p>
				<p className="mt-2">
					This area is under construction. Please come back later!
				</p>
				<div className="flex justify-center gap-4 mt-5">
					<Badge variant="done" />
					<Badge variant="in progress" />
				</div>
                <Card/>
			</div>
		</div>
	);
};

export default ProjectsPage;
