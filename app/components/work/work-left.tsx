import type { WorkProps } from './work-right';

export function WorkLeft({ children, progress }: WorkProps) {
	let translateY = Math.max(0, 50 - progress * 3 * 50);

	if (progress > 0.85) {
		translateY = Math.max(-50, -(progress - 0.85) * 2 * 50);
	}

	return (
		<div
			// Important: don't horizontally center based on content width (causes left-edge shifting
			// between tiles when labels/links change). Instead, always reserve a consistent width
			// and center that fixed-width column.
			className='flex h-[30vh] flex-col justify-center text-3xl lg:h-auto lg:text-3xl [--work-translate-multiplier:0] lg:[--work-translate-multiplier:1] [transform:translateY(calc(var(--work-translate-y)*var(--work-translate-multiplier)))]'
			// Disable the translateY animation on mobile (30vh header makes it look misaligned),
			// but keep it on desktop for the intended motion feel.
			style={{ ['--work-translate-y' as never]: `${translateY}px` }}
		>
			<div className='w-full px-10 md:px-14 lg:px-0'>
				<div className='mx-auto w-full max-w-[32rem] leading-10 text-white'>{children}</div>
			</div>
		</div>
	);
}
