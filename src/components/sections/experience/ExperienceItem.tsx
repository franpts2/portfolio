import type { Role } from "../../../data/experience.js";
import { DateRange } from "./DateRange.js";

interface ExperienceItemProps {
	readonly role: Role;
}

export function ExperienceItem({ role }: ExperienceItemProps) {
	return (
		<article className="py-5 hairline first:border-t-0">
			<div className="flex flex-wrap items-baseline justify-between gap-2">
				<h4 className="font-display font-semibold text-lg text-(--color-ink)">
					{role.title}
				</h4>
				<span className="t-label text-(--color-ink-faint)">
					<DateRange start={role.start} end={role.end} />
				</span>
			</div>
			<p className="mt-1 text-sm text-(--color-ink-muted)">
				{role.org} · {role.location}
			</p>
			<p className="mt-3 t-body text-sm">{role.description}</p>
		</article>
	);
}
