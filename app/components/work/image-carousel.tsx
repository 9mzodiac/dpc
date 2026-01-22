'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';

export type CarouselItem = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

type Props = {
	items: CarouselItem[];
	className?: string;
};

export default function ImageCarousel({
	items,
	className,
}: Props) {
	const safeItems = useMemo(() => items.filter(Boolean), [items]);
	const [activeIdx, setActiveIdx] = useState(0);
	const [prevIdx, setPrevIdx] = useState<number | null>(null);
	const [fadeIn, setFadeIn] = useState(true);
	const fadeTimeoutRef = useRef<number | null>(null);

	if (safeItems.length === 0) return null;

	const transitionMs = 450;

	const goTo = (newIdx: number) => {
		if (newIdx === activeIdx) return;

		if (fadeTimeoutRef.current !== null) {
			window.clearTimeout(fadeTimeoutRef.current);
		}

		setPrevIdx(activeIdx);
		setActiveIdx(newIdx);

		// Start crossfade (prev fades out, active fades in)
		setFadeIn(false);
		window.requestAnimationFrame(() => setFadeIn(true));

		fadeTimeoutRef.current = window.setTimeout(() => {
			setPrevIdx(null);
			fadeTimeoutRef.current = null;
		}, transitionMs);
	};

	const prev = () =>
		goTo((activeIdx - 1 + safeItems.length) % safeItems.length);
	const next = () => goTo((activeIdx + 1) % safeItems.length);

	const base = safeItems[activeIdx];

	return (
		<div className={classNames('relative w-full', className)}>
			<div
				className='relative w-full overflow-hidden rounded-md'
				style={{ aspectRatio: `${base.width} / ${base.height}` }}
			>
				{prevIdx !== null && (
					<Image
						src={safeItems[prevIdx].src}
						alt={safeItems[prevIdx].alt}
						fill
						sizes='(min-width: 1024px) 50vw, 100vw'
						className={classNames(
							'object-contain transition-opacity',
							fadeIn ? 'opacity-0' : 'opacity-100',
						)}
						style={{ transitionDuration: `${transitionMs}ms` }}
					/>
				)}
				<Image
					src={base.src}
					alt={base.alt}
					fill
					sizes='(min-width: 1024px) 50vw, 100vw'
					className={classNames(
						'object-contain transition-opacity',
						prevIdx !== null ? (fadeIn ? 'opacity-100' : 'opacity-0') : 'opacity-100',
					)}
					style={{ transitionDuration: `${transitionMs}ms` }}
				/>
			</div>

			{safeItems.length > 1 && (
				<div className='pointer-events-none absolute inset-0 flex items-center justify-between px-2'>
					<button
						type='button'
						onClick={prev}
						className='pointer-events-auto select-none rounded-md border border-white/20 bg-black/40 px-3 py-2 text-white/90 backdrop-blur hover:bg-black/55'
						aria-label='Previous image'
					>
						←
					</button>
					<button
						type='button'
						onClick={next}
						className='pointer-events-auto select-none rounded-md border border-white/20 bg-black/40 px-3 py-2 text-white/90 backdrop-blur hover:bg-black/55'
						aria-label='Next image'
					>
						→
					</button>
				</div>
			)}
		</div>
	);
}

