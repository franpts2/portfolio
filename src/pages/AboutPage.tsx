import React from "react";
import MagnifiedDock from "../components/ui/dock/MagnifiedDock.tsx";
import type { DockItemData } from "../components/ui/dock/DockIcon.tsx";
import TapeFrame from "../components/ui/tape/TapeFrame.tsx";

const DATA: DockItemData[] = [
	{ id: 1, label: "React", tool: "react" },
	{ id: 2, label: "TypeScript", tool: "ts" },
	{ id: 3, label: "Tailwind CSS", tool: "tailwind" },
];

const AboutPage = () => {
	return (
		<div className="relative min-h-screen flex items-center text-primary">
			<div className="mx-auto text-center">
                <TapeFrame imageSrc="/public/images/people/francisca-portugal.png" />
				<MagnifiedDock data={DATA} />
			</div>
		</div>
	);
};

export default AboutPage;
