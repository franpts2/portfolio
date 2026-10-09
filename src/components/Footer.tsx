export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="py-8 hairline">
			<div className="container-main flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-(--color-ink-muted)">
				<p>© {year} Francisca Portugal</p>
				<p className="t-label">Have a great day! :D</p>
			</div>
		</footer>
	);
}
