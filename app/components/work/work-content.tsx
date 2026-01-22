import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import ImageCarousel from './image-carousel';
import FloatingEmojis from './floating-emojis';
import LogoMarquee from './logo-marquee';
import { ExternalLinkIcon } from '../layouts/icons/external-link-icon';
import { WorkContainer } from './work-container';
import WorkLeftContent from './work-left-content';
import { WorkLeft } from './work-left';
import { WorkRight } from './work-right';
import type { WorkTile } from './workTiles';

interface WorkContentProps {
	work: WorkTile;
	progress?: number;
}

export default function WorkContent({ work, progress = 0 }: WorkContentProps) {
	const { title, description, websiteUrl, websiteLabel: websiteLabelOverride, websiteNote, media } = work;
	const isIntroEmoji = media.kind === 'emoji';
	const is2k13Video = media.kind === 'video' && media.src.includes('2k13js');
	const isSolvelyVideo = media.kind === 'video' && media.src.includes('solvely.mov');
	const websiteLabel =
		websiteLabelOverride ??
		(websiteUrl?.includes('kickstarter.com') === true
			? 'Kickstarter'
			: websiteUrl?.replace(/^https?:\/\//, '') ?? '');

	// Special-case: make the logos slide full-width (no split black/white background showing)
	if (media.kind === 'logos') {
		return (
			<div className='flex min-h-screen w-full flex-col items-center justify-center bg-white px-8 py-16 text-black dark:bg-black dark:text-white md:px-14'>
				<div className='w-full max-w-6xl'>
					<div className='text-2xl font-medium md:text-3xl xl:text-4xl'>{description}</div>
					<div className='mt-2 text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl'>{title}</div>
					<div className='mt-12'>
						<LogoMarquee items={media.items} />
					</div>
				</div>
			</div>
		);
	}

	// Call-to-action slide
	if (media.kind === 'cta') {
		return (
			<div className='flex min-h-screen w-full flex-col items-center justify-center bg-white px-8 py-16 text-black md:px-14'>
				<div className='w-full max-w-2xl text-center'>
					<div className='text-lg font-medium md:text-xl lg:text-2xl'>{description}</div>
					<div className='mt-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
						{title}
					</div>
					<div className='mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center'>
						<Link
							href='/static/DanielChristopherResume.pdf'
							target='_blank'
							rel='noreferrer'
							className='group flex items-center gap-1.5 rounded-lg border-2 border-black bg-black px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-white hover:text-black md:px-5 md:py-2.5 md:text-sm'
						>
							<span>View Resume</span>
							<ExternalLinkIcon className='h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
						</Link>
						<a
							href='mailto:dpc99@pm.me'
							className='group flex items-center gap-1.5 rounded-lg border-2 border-black bg-white px-4 py-2 text-xs font-semibold text-black transition-all duration-200 hover:bg-black hover:text-white md:px-5 md:py-2.5 md:text-sm'
						>
							<span>Get in Touch</span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='14'
								height='14'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
							>
								<path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
								<polyline points='22,6 12,13 2,6' />
							</svg>
						</a>
					</div>
				</div>
			</div>
		);
	}

	return (
		<WorkContainer>
			<WorkLeft progress={progress}>
				<WorkLeftContent
					description={description}
					title={title}
					websiteUrl={websiteUrl}
					websiteLabel={websiteLabel}
					websiteNote={websiteNote}
				/>
			</WorkLeft>
			<WorkRight
				progress={progress}
				contentClassName={
					isIntroEmoji ? 'max-w-none h-full w-full px-0 pt-0 md:px-0 lg:pt-0' : undefined
				}
			>
				<div
					className={
						isIntroEmoji
							? 'h-full w-full'
							: classNames(
									'drop-shadow-2xl',
								)
					}
				>
					{media.kind === 'emoji' ? (
						<div className='relative flex h-full w-full items-center justify-center'>
							<FloatingEmojis
								emojis={['🚧', '⚠️', '🖥️', '🦺']}
								count={14}
							/>
							<span className='relative z-10 select-none text-8xl md:text-9xl'>
								{media.value}
							</span>
						</div>
					) : media.kind === 'image' ? (
						<Image
							src={media.src}
							alt={title}
							width={media.width}
							height={media.height}
							className='origin-center scale-[1.08] md:scale-[1.12]'
						/>
					) : media.kind === 'carousel' ? (
						<ImageCarousel
							items={media.items.map((item) => ({
								src: item.src,
								width: item.width,
								height: item.height,
								alt: item.alt ?? title,
							}))}
							className='origin-center scale-[1.08] md:scale-[1.12]'
						/>
					) : (
						<div
							className={classNames(
								isSolvelyVideo ? 'flex w-full justify-center' : undefined,
							)}
						>
							<div
								className={classNames(
									isSolvelyVideo
										? 'rounded-xl bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.18)]'
										: undefined,
								)}
							>
								<video
									src={media.src}
									poster={media.poster}
									width={media.width}
									height={media.height}
									autoPlay
									muted
									loop
									playsInline
									preload='metadata'
									className={classNames(
										'h-auto w-full rounded-md',
										is2k13Video
											? 'origin-center max-h-[44vh] md:max-h-[54vh] object-contain'
											: isSolvelyVideo
												? 'mx-auto block w-auto max-h-[56vh] md:max-h-[64vh] object-contain'
												: 'origin-center scale-[1.08] md:scale-[1.12]',
									)}
								/>
							</div>
						</div>
					)}
				</div>
			</WorkRight>
		</WorkContainer>
	);
}
