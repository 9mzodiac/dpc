'use client';

import { useLayoutEffect } from 'react';

/**
 * Prevent initial load "jumping" caused by browser scroll restoration.
 * We default to the top so the Hero renders first.
 *
 * Note: we intentionally DO NOT override deep links (URL hashes).
 */
export function ScrollReset() {
	// Fallback only: do this in a layout effect to minimize visible jumps.
	// The primary fix is the inline script in app/layout.tsx (runs before paint).
	useLayoutEffect(() => {
		try {
			if (typeof window === 'undefined') return;
			if (window.location.hash) return;

			if ('scrollRestoration' in window.history) {
				window.history.scrollRestoration = 'manual';
			}

			// Only force to top if we somehow still aren't at 0.
			if (window.scrollY > 0) {
				window.scrollTo(0, 0);
			}
		} catch {
			// ignore
		}
	}, []);

	return null;
}

