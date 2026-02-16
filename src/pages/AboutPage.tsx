import React, { useState } from "react";
import MagnifiedDock from "../components/ui/dock/MagnifiedDock.tsx";
import type { DockItemData } from "../components/ui/dock/DockIcon.tsx";
import TapeFrame from "../components/ui/tape/TapeFrame.tsx";
import { motion } from "motion/react";
import Highlight from "../components/ui/Highlight.tsx";
import Button from "../components/ui/buttons/Button.tsx";
import { icons } from "../assets/icons.ts";

const DATA: DockItemData[] = [
	{ id: 1, label: "React", tool: "react", site: "https://react.dev" },
	{
		id: 2,
		label: "TypeScript",
		tool: "ts",
		site: "https://www.typescriptlang.org/",
	},
	{
		id: 3,
		label: "Tailwind CSS",
		tool: "tailwind",
		site: "https://tailwindcss.com/",
	},
];

const AboutPage = () => {
	const [hasHovered, setHasHovered] = useState(false);
	const [tapeCount, setTapeCount] = useState(4);

	return (
		<div className="relative min-h-screen flex items-center text-primary overflow-x-hidden">
			<div className="mx-auto text-center">
				<div className="flex flex-row gap-2 text-start">
					<motion.div
						initial={{ opacity: 0, scale: 0.8, x: -40 }}
						animate={{ opacity: 1, scale: 1, x: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<TapeFrame
							imageSrc="/images/people/francisca-portugal.png"
							onTapesChange={(count) => setTapeCount(count)}
						/>
					</motion.div>

					<div className="ml-20">
						<div className="flex flex-col gap-8 mb-10">
							<div className="flex flex-row justify-between">
								<motion.h1
									className="font-black text-4xl text-primary-accent"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
								>
									About me
								</motion.h1>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.3 }}
								>
									<Button
										text="Download CV"
										icon={icons.download.fill}
										onClick={() => window.open("/CV.pdf", "_blank")}
										variant="primary"
									/>
								</motion.div>
							</div>

							{/* Parent container that triggers all highlights */}
							<div
								className="max-w-lg flex flex-col gap-4 cursor-default"
								onMouseEnter={() => setHasHovered(true)}
							>
								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.4 }}
								>
									I'm a{" "}
									<Highlight isHighlighted={hasHovered}>
										Frontend Developer
									</Highlight>{" "}
									who ventures into Full-stack and Mobile to build products that
									feel effortless. I thrive on creating interfaces that are
									technically rigorous under the hood, yet joyful and intuitive
									for the user.
								</motion.p>
								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.6 }}
								>
									To me, code is a craft where logic meets creativity. I'm
									motivated to build high-caliber tools that are as profoundly
									important as they are a delight to interact with.
								</motion.p>
								<motion.p
									key={tapeCount === 0 ? "fell" : "fixed"}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.8 }}
									className="text-secondary"
								>
									{tapeCount === 0
										? "P.S. Try putting the photo back in its place!"
										: "P.S. Try peeling off the tapes on the photo!"}
								</motion.p>
							</div>
						</div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 1 }}
						>
							<div className="flex flex-row items-center">
								<MagnifiedDock data={DATA} />
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
