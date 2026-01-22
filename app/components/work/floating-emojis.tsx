'use client';

import { useMemo } from 'react';

type FloatingEmojisProps = {
	emojis: string[];
	count?: number;
};

type Particle = {
	id: string;
	emoji: string;
	leftPct: number;
	sizePx: number;
	durationSec: number;
	delaySec: number;
	rotateDeg: number;
};

export default function FloatingEmojis({
	emojis,
	count = 18,
}: FloatingEmojisProps) {
	const particles = useMemo<Particle[]>(() => {
		const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

		return Array.from({ length: count }, (_, i) => ({
			id: `p-${i}-${Math.random().toString(16).slice(2)}`,
			emoji: pick(emojis),
			leftPct: Math.random() * 100,
			sizePx: 14 + Math.random() * 18,
			durationSec: 5 + Math.random() * 6,
			delaySec: Math.random() * 4,
			rotateDeg: (Math.random() * 140 - 70) | 0,
		}));
	}, [count, emojis]);

	return (
		<div className='pointer-events-none absolute inset-0 overflow-hidden'>
			{particles.map((p) => (
				<span
					key={p.id}
					className='fe'
					style={{
						left: `${p.leftPct}%`,
						fontSize: `${p.sizePx}px`,
						animationDuration: `${p.durationSec}s`,
						animationDelay: `${p.delaySec}s`,
						// vary spin direction/amount a bit
						['--fe-rot' as never]: `${p.rotateDeg}deg`,
					}}
				>
					{p.emoji}
				</span>
			))}

			<style jsx>{`
				.fe {
					position: absolute;
					bottom: -24px;
					opacity: 0;
					filter: drop-shadow(0 0 10px rgba(52, 211, 153, 0.25));
					animation-name: floatUp;
					animation-timing-function: linear;
					animation-iteration-count: infinite;
					will-change: transform, opacity;
				}

				@keyframes floatUp {
					0% {
						transform: translate3d(0, 0, 0) rotate(0deg);
						opacity: 0;
					}
					10% {
						opacity: 0.35;
					}
					50% {
						opacity: 0.6;
					}
					90% {
						opacity: 0.25;
					}
					100% {
						transform: translate3d(0, -120vh, 0) rotate(var(--fe-rot));
						opacity: 0;
					}
				}

				@media (prefers-reduced-motion: reduce) {
					.fe {
						animation: none;
						opacity: 0;
					}
				}
			`}</style>
		</div>
	);
}

