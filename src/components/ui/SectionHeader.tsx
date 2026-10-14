interface SectionHeaderProps {
	readonly label: string;
	readonly title: string;
	readonly id: string;
}

export function SectionHeader({ label, title, id }: SectionHeaderProps) {
	return (
		<>
			<span className="t-label">{label}</span>
			<h2
				id={id}
				className="t-headline text-4xl sm:text-5xl mt-3 accent-dot"
			>
				{title}
			</h2>
		</>
	);
}
