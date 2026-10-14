import { Reveal } from "../ui/Reveal.js";
import { experience } from "../../data/experience.js";
import { SectionHeader } from "../ui/SectionHeader.js";
import { ExperienceItem } from "./experience/ExperienceItem.js";

export function ExperienceSection() {
	const work = experience.filter((r) => r.kind === "work");
	const community = experience.filter((r) => r.kind === "community");

	return (
		<section
			id="experience"
			className="section"
			aria-labelledby="experience-heading"
		>
			<div className="container-main">
				<Reveal className="mb-12">
					<SectionHeader
						label="Experience"
						title="Where I&apos;ve put my energy"
						id="experience-heading"
					/>
				</Reveal>

				<div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
					{/* Work */}
					<div className="lg:col-span-8">
						<Reveal delay={0.1}>
							<h3 className="t-label mb-6">Work</h3>
						</Reveal>
						<div className="flex flex-col">
							{work.map((role, idx) => (
								<Reveal key={role.id} delay={0.1 + idx * 0.08}>
									<ExperienceItem role={role} />
								</Reveal>
							))}
						</div>
					</div>

					{/* Community */}
					<div className="lg:col-span-4">
						<Reveal delay={0.2}>
							<h3 className="t-label mb-6">Community</h3>
						</Reveal>
						<div className="flex flex-col">
							{community.map((role, idx) => (
								<Reveal key={role.id} delay={0.2 + idx * 0.08}>
									<ExperienceItem role={role} />
								</Reveal>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
