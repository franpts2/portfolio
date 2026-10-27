import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query.
 *
 * Used where layout and behaviour have to change together, not just styling:
 * CSS alone cannot stop the scroll-driven chat from running on a phone.
 */
export function useMediaQuery(query: string): boolean {
	const subscribe = useCallback(
		(onStoreChange: () => void) => {
			const mediaQuery = window.matchMedia(query);
			mediaQuery.addEventListener("change", onStoreChange);
			return () => mediaQuery.removeEventListener("change", onStoreChange);
		},
		[query],
	);

	const getSnapshot = useCallback(
		() => window.matchMedia(query).matches,
		[query],
	);

	// The app is client-rendered, so the server snapshot never runs in practice.
	return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
