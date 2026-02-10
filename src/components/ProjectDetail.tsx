import { useParams } from "react-router-dom";
import projectsData from "../data/projects.json" with { type: "json" };

function ProjectDetail() {
	const { projectId } = useParams();
	const project = projectsData.find((p: { id: string }) => p.id === projectId);

	if (!project) return <div>Project not found</div>;

	return (
		<div className="project-detail">
			<h1>{project.title} page!</h1>
		</div>
	);
}

export default ProjectDetail;
