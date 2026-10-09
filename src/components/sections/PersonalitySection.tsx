import { Icon } from "@iconify/react";
import { Reveal } from "../Reveal.js";
import { mediaLoves } from "../../data/profile.js";

const mediumIcons: Record<string, string> = {
	Music: "mdi:music-note",
	Books: "mdi:book-open-page-variant",
	Movies: "mdi:movie-open",
};

export function PersonalitySection() {
	return (
		<section
			id="fun-facts"
			className="section"
			aria-labelledby="fun-facts-heading"
		>
			<div className="container-main">
				<Reveal className="mb-12">
					<span className="t-label">Fun Facts</span>
					<h2
						id="fun-facts-heading"
						className="t-headline text-4xl sm:text-5xl mt-3 accent-dot"
					>
						Outside the editor
					</h2>
				</Reveal>

				<div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
					{/* Media loves */}
					<div className="grid sm:grid-cols-3 gap-6">
						{mediaLoves.map((item, idx) => (
							<Reveal key={item.medium} delay={idx * 0.1}>
								<div className="p-6 bg-(--color-bg-soft) rounded-2xl h-full">
									<Icon
										icon={mediumIcons[item.medium] ?? "mdi:heart"}
										height={28}
										className="text-(--color-accent) mb-4"
									/>
									<h3 className="font-display font-semibold text-xl text-(--color-ink)">
										{item.medium}
									</h3>
									<p className="t-body text-sm mt-2">{item.detail}</p>
								</div>
							</Reveal>
						))}
					</div>

					{/* Orange + personality note */}
					<div>
						<Reveal delay={0.3}>
							<div className="p-8 lg:p-10 border border-(--color-line) rounded-2xl">
								<div className="flex items-center gap-4 mb-6">
									<span
										className="w-10 h-10 rounded-full bg-(--color-accent)"
										aria-hidden="true"
									/>
									<div>
										<span className="t-label">Favourite colour</span>
										<p className="font-display font-semibold text-xl text-(--color-ink)">
											Orange (#f25c2a)
										</p>
									</div>
								</div>
								<p className="t-body text-balance">
									I believe a portfolio should feel like a person, not a
									template. That&apos;s why this site keeps a tight Swiss
									grid but saves room for little bursts of warmth — like this
									orange accent and the squishy portrait up top.
								</p>
							</div>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}
