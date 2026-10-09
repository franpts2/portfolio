import { Reveal } from "../Reveal.js";
import { experience } from "../../data/experience.js";

const formatDate = (date: string | null) => {
	if (!date) return "Present";
	const [year, month] = date.split("-");
	const d = new Date(Number(year), Number(month) - 1);
	return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const formatRange = (start: string, end: string | null) => {
	return `${formatDate(start)} — ${formatDate(end)}`;
};

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
					<span className="t-label">Experience</span>
					<h2
						id="experience-heading"
						className="t-headline text-4xl sm:text-5xl mt-3 accent-dot"
					>
						Where I&apos;ve put my energy
					</h2>
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
									<article className="py-5 hairline first:border-t-0">
										<div className="flex flex-wrap items-baseline justify-between gap-2">
											<h4 className="font-display font-semibold text-lg text-(--color-ink)">
												{role.title}
											</h4>
											<span className="t-label text-(--color-ink-faint)">
												{formatRange(role.start, role.end)}
											</span>
										</div>
										<p className="mt-1 text-sm text-(--color-ink-muted)">
											{role.org} · {role.location}
										</p>
										<p className="mt-3 t-body text-sm">
											{role.description}
										</p>
									</article>
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
									<article className="py-5 hairline first:border-t-0">
										<div className="flex flex-wrap items-baseline justify-between gap-2">
											<h4 className="font-display font-semibold text-lg text-(--color-ink)">
												{role.title}
											</h4>
											<span className="t-label text-(--color-ink-faint)">
												{formatRange(role.start, role.end)}
											</span>
										</div>
										<p className="mt-1 text-sm text-(--color-ink-muted)">
											{role.org} · {role.location}
										</p>
										<p className="mt-3 t-body text-sm">
											{role.description}
										</p>
									</article>
								</Reveal>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
