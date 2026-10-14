const formatDate = (date: string | null) => {
	if (!date) return "Present";
	const [year, month] = date.split("-");
	const d = new Date(Number(year), Number(month) - 1);
	return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

interface DateRangeProps {
	readonly start: string;
	readonly end: string | null;
}

export function DateRange({ start, end }: DateRangeProps) {
	return (
		<span className="t-label text-(--color-ink-faint)">
			{formatDate(start)} ·{" "}
			{end ? formatDate(end) : (
				<span className="text-(--color-accent)">Present</span>
			)}
		</span>
	);
}
