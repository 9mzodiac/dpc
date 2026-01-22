'use client';

import classNames from 'classnames';
import Image from 'next/image';

export type LogoItem = {
	name: string;
	subtitle?: string;
	children?: string[];
	src?: string;
	width?: number;
	height?: number;
};

type Props = {
	items: LogoItem[];
	className?: string;
};

export default function LogoMarquee({ items, className }: Props) {
	const safe = (items ?? []).filter((i) => i?.name);

	return (
		<div
			className={classNames(
				'relative w-full',
				className,
			)}
		>
			{/* Grid layout for cards */}
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{safe.map((item) => (
					<div
						key={item.name}
						className='group relative flex flex-col rounded-xl border-2 border-black/10 bg-white/95 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-xl dark:border-white/20 dark:bg-black/40 dark:backdrop-blur-sm'
						title={item.name}
					>
						{/* Decorative corner accent */}
						<div className='absolute right-0 top-0 h-12 w-12 rounded-bl-full bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
						
						{item.src ? (
							<div className='flex h-20 items-center justify-center'>
								<Image
									src={item.src}
									alt={item.name}
									width={item.width ?? 120}
									height={item.height ?? 48}
									className='h-auto max-h-12 w-auto object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100'
								/>
							</div>
						) : (
							<div className='flex flex-col gap-2'>
								{/* Title */}
								<div className='text-sm font-bold uppercase tracking-wider text-black/90 dark:text-white/90'>
									{item.name}
								</div>
								
								{/* Subtitle */}
								{item.subtitle ? (
									<div className='text-xs font-semibold text-black/60 dark:text-white/60'>
										{item.subtitle}
									</div>
								) : null}
								
								{/* Children items */}
								{item.children?.length ? (
									<div className='mt-3 space-y-1.5 border-t border-black/10 pt-3 dark:border-white/10'>
										{item.children.map((line) => (
											<div
												key={line}
												className='text-xs font-medium leading-relaxed text-black/70 dark:text-white/70'
											>
												{line}
											</div>
										))}
									</div>
								) : null}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

