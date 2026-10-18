import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { frame, cancelFrame } from "motion/react";

type SmoothScrollProps = {
	children: ReactNode;
};

/**
 * Page-wide smooth scrolling with Lenis.
 *
 * Lenis runs inside Motion's frame loop rather than its own requestAnimationFrame,
 * so the eased position is written in the `setup` step before Motion reads scroll
 * in `read` — that keeps `useScroll`-driven animations in sync with the smoothing.
 *
 * Reduced motion needs no gating here: Lenis honors `prefers-reduced-motion` on its
 * own, tracking the input device 1:1 and jumping instantly on programmatic scrolls.
 * Touch devices keep native scrolling (`syncTouch` stays off), so only wheel input
 * is eased.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
	const lenisRef = useRef<LenisRef>(null);

	useEffect(() => {
		function update({ timestamp }: { timestamp: number }) {
			lenisRef.current?.lenis?.raf(timestamp);
		}

		frame.setup(update, true);

		return () => cancelFrame(update);
	}, []);

	return (
		<ReactLenis root ref={lenisRef} options={{ autoRaf: false, anchors: true }}>
			{children}
		</ReactLenis>
	);
}
