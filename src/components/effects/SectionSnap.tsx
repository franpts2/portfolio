import { useEffect } from "react";
import { useLenis } from "lenis/react";

/**
 * Strict, one-gesture-per-page scrolling.
 *
 * Every section fills at least one screen. A wheel gesture locks the page and
 * glides exactly one page forward or back; further wheel input is swallowed
 * until the animation finishes and the wheel has gone quiet, so momentum can
 * never carry the page two sections ahead.
 *
 * Pages come from three places:
 *  - each section start;
 *  - the end of a section taller than the screen (so its tail is reachable);
 *  - one page per chat step inside `Beyond the code`, so the sticky panel stays
 *    put while the conversation advances a step at a time.
 *
 * Touch input is left alone: Lenis keeps native touch scrolling, and hijacking
 * a phone's momentum is how "strict" scrolling becomes broken scrolling.
 */
const WHEEL_THRESHOLD = 24;
const GESTURE_QUIET_MS = 180;
const PAGE_DURATION = 0.9;
/** Ignore pages closer together than this (rounding, sub-pixel padding). */
const MIN_PAGE_GAP = 4;
/** A cut-off tail smaller than this is not worth a whole extra page. */
const MIN_CONTENT_OVERFLOW = 24;

/** The site's EASE_OUT_EXPO, as the function shape Lenis expects. */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

function buildPages(): number[] {
	const viewport = window.innerHeight;
	const maxScroll = Math.max(
		0,
		document.documentElement.scrollHeight - viewport,
	);
	const sections = document.querySelectorAll<HTMLElement>(
		"#main-content > section",
	);
	let pages: number[] = [];

	for (const section of sections) {
		const start = section.getBoundingClientRect().top + window.scrollY;
		const height = section.offsetHeight;
		const steps = Number(section.dataset.snapSteps) || 0;

		// Scroll-driven chapters: one page per internal step so the animation
		// advances exactly once between stops.
		if (steps > 0) {
			const range = Math.max(0, height - viewport);
			for (let index = 0; index < steps; index++) {
				// Land in the middle of the step's progress band, not just past
				// its edge. useChatAnimation only commits a step once progress
				// clears the boundary by a margin, and a page resting exactly on
				// that edge loses the margin to a single rounded pixel — which
				// silently merges two steps, so the final bubble would only
				// appear while the section was already scrolling away.
				const progress = index === 0 ? 0 : (index + 0.5) / steps;
				pages.push(start + range * progress);
			}
			continue;
		}

		pages.push(start);

		// Only real content earns an extra page. Padding that tips the section
		// just past a viewport should not produce a near-duplicate screen.
		const contentBottom = [...section.children].reduce(
			(bottom, child) =>
				Math.max(
					bottom,
					child.getBoundingClientRect().bottom + window.scrollY,
				),
			start,
		);
		if (contentBottom - start > viewport + MIN_CONTENT_OVERFLOW) {
			pages.push(contentBottom - viewport);
		}
	}

	// The footer sits outside <main>. When it is a short strip that fits below
	// the last section's content, the two share one screen: land on the
	// document end so the footer is visible, and drop the near-duplicate stop
	// at the section top. A tall footer still earns its own page.
	const lastSection = sections[sections.length - 1];
	const footer =
		document.querySelector<HTMLElement>(".site-footer") ?? undefined;
	const footerHeight = footer?.offsetHeight ?? 0;
	const lastStart = lastSection
		? lastSection.getBoundingClientRect().top + window.scrollY
		: 0;

	const footerSharesLastPage =
		lastSection !== undefined &&
		footerHeight > 0 &&
		footerHeight <= viewport * 0.3 &&
		maxScroll > lastStart &&
		maxScroll - lastStart <= footerHeight + MIN_CONTENT_OVERFLOW;

	if (footerSharesLastPage) {
		// Replace the section-top stop with the document end.
		pages = pages.filter((page) => page < lastStart - MIN_PAGE_GAP);
	}
	pages.push(maxScroll);

	const clamped = pages.map((page) =>
		Math.round(Math.max(0, Math.min(page, maxScroll))),
	);
	clamped.sort((a, b) => a - b);

	return clamped.filter(
		(page, index) => index === 0 || page - clamped[index - 1]! > MIN_PAGE_GAP,
	);
}

export function SectionSnap() {
	const lenis = useLenis();

	useEffect(() => {
		if (!lenis) return;
		// Paging is movement for its own sake. Reduced-motion visitors keep the
		// native, continuous scroll instead.
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		let pages = buildPages();
		// Paging is a mouse/trackpad affordance. On phones, and on narrow
		// windows where sections are several screens tall, one wheel gesture
		// would otherwise skip most of the content.
		const canPage = window.matchMedia(
			"(min-width: 72rem) and (min-height: 53.5rem) and (hover: hover) and (pointer: fine)",
		);
		let busy = false;
		// True from the moment a page is triggered until the wheel goes quiet.
		// This is what stops a trackpad flick from turning several pages.
		let settled = true;
		let accumulated = 0;
		let quietTimer = 0;
		let disposed = false;

		const finish = () => {
			if (disposed) return;
			busy = false;
		};

		const arm = () => {
			settled = true;
			accumulated = 0;
		};

		const turn = (direction: 1 | -1) => {
			if (busy || disposed) return;

			// Layout can change between gestures (fonts, form errors, resize),
			// so the page list is rebuilt at the moment it is needed.
			pages = buildPages();

			const current = lenis.scroll;
			let target: number | undefined;

			if (direction > 0) {
				target = pages.find((page) => page > current + MIN_PAGE_GAP);
			} else {
				for (let index = pages.length - 1; index >= 0; index--) {
					const page = pages[index]!;
					if (page < current - MIN_PAGE_GAP) {
						target = page;
						break;
					}
				}
			}

			if (target === undefined) return;

			busy = true;
			settled = false;
			accumulated = 0;
			lenis.scrollTo(target, {
				duration: PAGE_DURATION,
				easing: easeOutExpo,
				// Lenis swallows wheel input while a locked scroll runs, so the
				// rest of the physical gesture cannot add to this page turn.
				lock: true,
				onComplete: finish,
			});
		};

		const onVirtualScroll = ({
			deltaY,
			event,
		}: {
			deltaY: number;
			event: Event;
		}) => {
			if (disposed) return;
			if (event.type.includes("touch")) return;
			// Ctrl+wheel is pinch-zoom, not scrolling.
			if (event instanceof WheelEvent && event.ctrlKey) return;
			if (deltaY === 0) return;
			if (!canPage.matches) return;

			// Every wheel event postpones "settled"; only a real pause in the
			// input re-arms the pager.
			clearTimeout(quietTimer);
			quietTimer = window.setTimeout(arm, GESTURE_QUIET_MS);

			if (busy || !settled) return;

			if (Math.sign(deltaY) !== Math.sign(accumulated)) accumulated = 0;
			accumulated += deltaY;
			if (Math.abs(accumulated) < WHEEL_THRESHOLD) return;

			turn(accumulated > 0 ? 1 : -1);
		};

		lenis.on("virtual-scroll", onVirtualScroll);

		return () => {
			disposed = true;
			clearTimeout(quietTimer);
			lenis.off("virtual-scroll", onVirtualScroll);
		};
	}, [lenis]);

	return null;
}
