import classNames from 'classnames';
import type { ReactNode } from 'react';

export interface WorkProps {
	children: ReactNode;
	progress: number;
	contentClassName?: string;
	outerClassName?: string;
}

export function WorkRight({
	children,
	progress,
	contentClassName,
	outerClassName,
}: WorkProps) {
	const translateY = Math.max(-50, -(progress - 0.5) * 50);

	return (
		<div
			className={classNames(
				// On mobile the WorkRight column visually maps to the white 70vh section of the split
				// background, so size and center within that. On desktop keep the full-screen behavior.
				'flex h-[66vh] flex-1 items-center justify-center lg:h-screen [--work-right-translate-multiplier:0] lg:[--work-right-translate-multiplier:1] [transform:translateY(calc(var(--work-right-translate-y)*var(--work-right-translate-multiplier)))]',
				outerClassName,
			)}
			// Disable the translateY motion on mobile to keep media vertically consistent.
			style={{ ['--work-right-translate-y' as never]: `${translateY}px` }}
		>
			<div
				className={classNames(
					'w-full max-w-md px-10 md:px-0',
					contentClassName,
				)}
			>
				{children}
			</div>
		</div>
	);
}
