'use client';

import classNames from 'classnames';
import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

interface InstagramIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface InstagramIconProps extends HTMLAttributes<HTMLButtonElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.35,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.5,
			ease: 'linear',
			opacity: { duration: 0.1 },
		},
	},
};

const InstagramIcon = forwardRef<InstagramIconHandle, InstagramIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start('animate'),
				stopAnimation: () => controls.start('normal'),
			};
		});

		const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
			if (!isControlledRef.current) {
				controls.start('animate');
			} else {
				onMouseEnter?.(e);
			}
		};

		const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
			if (!isControlledRef.current) {
				controls.start('normal');
			} else {
				onMouseLeave?.(e);
			}
		};

		return (
			<button
				type='button'
				className={classNames(
					'cursor-pointer select-none rounded-md p-2 transition-colors duration-200 flex items-center justify-center hover:bg-accent',
					className,
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width={size}
					height={size}
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					aria-label='Instagram icon'
				>
					<title>Instagram icon</title>
					<motion.rect
						variants={pathVariants}
						initial='normal'
						animate={controls}
						x='2'
						y='2'
						width='20'
						height='20'
						rx='5'
						ry='5'
					/>
					<motion.path
						variants={pathVariants}
						initial='normal'
						animate={controls}
						d='M16 11.37a4 4 0 1 1-7.37 2.63 4 4 0 0 1 7.37-2.63'
					/>
					<motion.line
						variants={pathVariants}
						initial='normal'
						animate={controls}
						x1='17.5'
						y1='6.5'
						x2='17.51'
						y2='6.5'
					/>
				</svg>
			</button>
		);
	},
);

InstagramIcon.displayName = 'InstagramIcon';

export { InstagramIcon };

