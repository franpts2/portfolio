export function SkipLink() {
	return (
		<a
			href="#main-content"
			className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-(--color-ink) text-(--color-bg) rounded font-medium text-sm"
		>
			Skip to main content
		</a>
	);
}
