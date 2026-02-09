import React from "react";
import Badge from "../components/Badge.tsx";
import Card from "../components/Card.tsx";

const ProjectsPage = () => {
	return (
		<div className="relative min-h-screen flex items-center">
			<div className="mx-auto text-center">
                <Card title="Focusly" description="All-in-one study app" isCollab/>
			</div>
		</div>
	);
};

export default ProjectsPage;
