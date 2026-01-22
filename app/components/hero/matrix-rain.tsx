'use client';

import classNames from 'classnames';
import { useEffect, useMemo, useRef } from 'react';

type MatrixRainProps = {
	className?: string;
	fontSize?: number;
	fps?: number;
};

export default function MatrixRain({
	className,
	fontSize = 14,
	fps = 24,
}: MatrixRainProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const chars = useMemo(() => {
		// A readable “matrix” mix: katakana + digits + a few symbols
		return (
			'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ0123456789#$%&*+'
		).split('');
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const reduceMotion =
			typeof window !== 'undefined' &&
			window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
		if (reduceMotion) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let raf = 0;
		let last = 0;
		let frame = 0;

		const dpr = Math.max(1, window.devicePixelRatio || 1);
		let width = 0;
		let height = 0;
		let columns = 0;
		let drops: number[] = [];

		const resize = () => {
			const parent = canvas.parentElement;
			if (!parent) return;
			const rect = parent.getBoundingClientRect();
			width = Math.floor(rect.width);
			height = Math.floor(rect.height);

			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;

			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			columns = Math.max(1, Math.floor(width / fontSize));
			drops = Array.from({ length: columns }, () =>
				Math.floor(Math.random() * (height / fontSize)),
			);
		};

		const onResize = () => resize();
		window.addEventListener('resize', onResize);
		resize();

		// Brighter green palette with a light glow (still tasteful)
		const textColor = 'rgba(52, 211, 153, 0.9)'; // emerald-400-ish
		// If this is too low, the canvas will slowly "fill up" and never fully clears.
		const fadeColor = 'rgba(0, 0, 0, 0.12)'; // trails, but self-cleans
		const deepFadeColor = 'rgba(0, 0, 0, 0.28)'; // occasional stronger decay

		const frameInterval = 1000 / fps;

		const tick = (t: number) => {
			if (t - last >= frameInterval) {
				last = t;
				frame++;

				// Fade the entire canvas slightly to create trails
				ctx.globalCompositeOperation = 'source-over';
				ctx.fillStyle = fadeColor;
				ctx.fillRect(0, 0, width, height);

				// Every ~10s (depending on fps), apply an extra fade to prevent long-term buildup
				if (frame % Math.max(1, fps * 10) === 0) {
					ctx.fillStyle = deepFadeColor;
					ctx.fillRect(0, 0, width, height);
				}

				ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
				ctx.fillStyle = textColor;
				ctx.shadowColor = 'rgba(16, 185, 129, 0.85)';
				ctx.shadowBlur = 8;

				for (let i = 0; i < drops.length; i++) {
					const char = chars[(Math.random() * chars.length) | 0];
					const x = i * fontSize;
					const y = drops[i] * fontSize;
					ctx.fillText(char, x, y);

					// Reset drop back to top occasionally
					if (y > height && Math.random() > 0.985) {
						drops[i] = 0;
					} else {
						// Move down; slight randomization keeps it organic
						drops[i] += Math.random() > 0.92 ? 2 : 1;
					}
				}
			}

			raf = requestAnimationFrame(tick);
		};

		raf = requestAnimationFrame(tick);

		return () => {
			window.removeEventListener('resize', onResize);
			cancelAnimationFrame(raf);
		};
	}, [chars, fontSize, fps]);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden='true'
			className={classNames('pointer-events-none', className)}
		/>
	);
}

