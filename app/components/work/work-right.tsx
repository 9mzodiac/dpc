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
				'flex h-screen flex-1 justify-center lg:items-center',
				outerClassName,
			)}
			style={{ transform: `translateY(${translateY}px)` }}
		>
			<div
				className={classNames(
					'w-full max-w-md px-10 pt-10 md:px-0 lg:pt-0',
					contentClassName,
				)}
			>
				{children}
			</div>
		</div>
	);
}
