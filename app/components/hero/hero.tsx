'use client';

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { merryWeather } from '../../fonts';
import { AtSignIcon } from '../layouts/icons/at-sign-icon';
import { GithubIcon } from '../layouts/icons/github-icon';
import { InstagramIcon } from '../layouts/icons/instagram-icon';
import { LinkedinIcon } from '../layouts/icons/linkedin-icon';
import SplashCursor from '../splash-cursor';
import ArrowDown from './arrow-down';
import MatrixRain from './matrix-rain';

export default function Hero() {
	const [showContent, setShowContent] = useState(false);
	const [isFaceDialogOpen, setIsFaceDialogOpen] = useState(false);

	useEffect(() => {
		// Only gate the hero content on the first visit (per tab session)
		try {
			const key = 'dpc.heroIntroSeen';
			const seen = window.sessionStorage.getItem(key) === '1';
			if (seen) {
				setShowContent(true);
				return;
			}

			const t = window.setTimeout(() => {
				setShowContent(true);
				window.sessionStorage.setItem(key, '1');
			}, 1100);

			return () => window.clearTimeout(t);
		} catch {
			// If storage is unavailable, fall back to immediate render.
			setShowContent(true);
		}
	}, []);

	return (
		<main className='relative min-h-svh w-screen overflow-hidden bg-black'>
			<SplashCursor
				containerClassName='min-h-svh w-screen'
				usePrimaryColors={true}
			>
				<div
					className={classNames('relative min-h-svh', merryWeather.className)}
				>
					<MatrixRain
						className="absolute inset-y-0 right-0 w-[45%] opacity-80 mix-blend-screen [mask-image:linear-gradient(to_left,black_0%,transparent_72%)]"
					/>
					<div
						className={classNames(
							'absolute inset-0 transition-[opacity,transform] duration-700',
							showContent
								? 'opacity-100 translate-y-0 pointer-events-auto'
								: 'opacity-0 translate-y-2 pointer-events-none',
						)}
					>
						<ArrowDown />
						<div className='absolute top-[18%] md:top-[36%] w-full px-6 md:px-24 lg:px-28'>
							<div className='relative max-w-4xl'>
								{/* "Desktop" files */}
								<div className='mb-4 flex flex-wrap items-start gap-3'>
									<button
										type='button'
										onClick={() => setIsFaceDialogOpen(true)}
										className='group relative flex w-[118px] flex-col items-center gap-2 rounded-xl border border-emerald-500/20 bg-black/40 px-3 py-2 text-left shadow-[0_0_0_1px_rgba(16,185,129,0.06)] transition-all duration-200 hover:bg-black/55 hover:scale-[1.06] hover:z-10'
									>
										<div className='relative h-14 w-14 overflow-hidden rounded-lg border border-emerald-500/20 bg-black/50'>
											<Image
												src='/static/images/project/me.jpg'
												alt='me.jpg'
												width={112}
												height={112}
												priority
												className='h-full w-full object-cover object-top'
											/>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-1_700ms_ease-out_forwards] group-hover:opacity-100'>
												💥
											</span>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-2_700ms_ease-out_forwards] group-hover:opacity-100'>
												✨
											</span>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-3_700ms_ease-out_forwards] group-hover:opacity-100'>
												🪄
											</span>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-4_700ms_ease-out_forwards] group-hover:opacity-100'>
												😅
											</span>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-5_700ms_ease-out_forwards] group-hover:opacity-100'>
												🚀
											</span>
										</div>
										<div className='w-full truncate text-center text-[11px] font-mono text-emerald-100/80'>
											me.jpg
										</div>
									</button>

									<Link
										href='/#work'
										className='group relative flex w-[118px] flex-col items-center gap-2 rounded-xl border border-emerald-500/20 bg-black/40 px-3 py-2 text-left shadow-[0_0_0_1px_rgba(16,185,129,0.06)] transition-all duration-200 hover:bg-black/55 hover:scale-[1.06] hover:z-10'
									>
										<div className='relative flex h-14 w-14 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10'>
											<span className='text-lg text-emerald-200/90'>📁</span>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-1_700ms_ease-out_forwards] group-hover:opacity-100'>
												⚡️
											</span>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-2_700ms_ease-out_forwards] group-hover:opacity-100'>
												✨
											</span>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-3_700ms_ease-out_forwards] group-hover:opacity-100'>
												📌
											</span>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-4_700ms_ease-out_forwards] group-hover:opacity-100'>
												🔥
											</span>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-5_700ms_ease-out_forwards] group-hover:opacity-100'>
												🚀
											</span>
										</div>
										<div className='w-full truncate text-center text-[11px] font-mono text-emerald-100/80'>
											projects
										</div>
									</Link>

									<Link
										href='/static/DanielChristopherResume.pdf'
										target='_blank'
										rel='noreferrer'
										className='group relative flex w-[118px] flex-col items-center gap-2 rounded-xl border border-emerald-500/20 bg-black/40 px-3 py-2 text-left shadow-[0_0_0_1px_rgba(16,185,129,0.06)] transition-all duration-200 hover:bg-black/55 hover:scale-[1.06] hover:z-10'
									>
										<div className='relative flex h-14 w-14 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10'>
											<span className='text-lg text-emerald-200/90'>📄</span>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-1_700ms_ease-out_forwards] group-hover:opacity-100'>
												📝
											</span>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-2_700ms_ease-out_forwards] group-hover:opacity-100'>
												✨
											</span>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-3_700ms_ease-out_forwards] group-hover:opacity-100'>
												✅
											</span>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-4_700ms_ease-out_forwards] group-hover:opacity-100'>
												📎
											</span>
											<span className='pointer-events-none absolute left-1/2 top-1/2 opacity-0 group-hover:animate-[file-emoji-5_700ms_ease-out_forwards] group-hover:opacity-100'>
												🚀
											</span>
										</div>
										<div className='w-full truncate text-center text-[11px] font-mono text-emerald-100/80'>
											resume.pdf
										</div>
									</Link>
								</div>
								{/* scanlines */}
								<div
									aria-hidden='true'
									className="pointer-events-none absolute inset-0 rounded-xl opacity-25 [background:repeating-linear-gradient(to_bottom,rgba(16,185,129,0.12)_0px,rgba(16,185,129,0.12)_1px,transparent_2px,transparent_6px)]"
								/>

								<div className='relative rounded-xl border border-emerald-500/20 bg-black/65 p-6 shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_0_60px_rgba(16,185,129,0.10)] backdrop-blur-md'>
									<div className='mb-4 flex items-center gap-2'>
										<span className='h-3 w-3 rounded-full bg-red-500/70' />
										<span className='h-3 w-3 rounded-full bg-yellow-500/70' />
										<span className='h-3 w-3 rounded-full bg-green-500/70' />
										<span className='ml-3 text-xs font-mono text-emerald-200/70'>
											dc@portfolio:~$
										</span>
									</div>

									<h1 className='font-mono text-xl md:text-2xl text-emerald-200'>
										<span className='text-emerald-400'>$</span> whoami?
									</h1>
									<p className='mt-2 font-mono text-base md:text-lg text-emerald-100/90'>
										Daniel Christopher
									</p>

									<section className='mt-4 font-mono text-emerald-100/85'>
										<p className='text-sm md:text-base leading-6'>
											— Fullstack Software Engineer and systems thinker with 10+ years
											building frontend, backend, and Web3 apps.
										</p>
									</section>

									<section className='mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-mono'>
										<div className='flex items-center gap-2'>
											<Link
												href='https://linkedin.com/in/daniel-c-a178bb3a7'
												target='_blank'
												rel='noreferrer'
												aria-label='linkedin'
												data-skip-splash-cursor
												className='text-emerald-200/80 hover:text-emerald-200'
											>
												<LinkedinIcon className='h-8 w-8' />
											</Link>
											<Link
												href='https://github.com/9mzodiac'
												target='_blank'
												rel='noreferrer'
												aria-label='github'
												data-skip-splash-cursor
												className='text-emerald-200/80 hover:text-emerald-200'
											>
												<GithubIcon className='h-8 w-8' />
											</Link>
											<Link
												href='https://instagram.com/9mzodiac'
												target='_blank'
												rel='noreferrer'
												aria-label='instagram'
												data-skip-splash-cursor
												className='text-emerald-200/80 hover:text-emerald-200'
											>
												<InstagramIcon className='h-8 w-8' />
											</Link>
											<Link
												href='mailto:dpc99@pm.me'
												aria-label='email'
												rel='noreferrer'
												data-skip-splash-cursor
												className='text-emerald-200/80 hover:text-emerald-200'
											>
												<AtSignIcon className='h-8 w-8' />
											</Link>
										</div>
									</section>
								</div>
							</div>
						</div>
					</div>
				</div>
			</SplashCursor>

			{isFaceDialogOpen ? (
				<div
					className='fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6'
					role='dialog'
					aria-modal='true'
					aria-label='Cannot view picture'
					onClick={() => setIsFaceDialogOpen(false)}
				>
					<div
						className='w-full max-w-md rounded-xl border border-emerald-500/25 bg-black/90 p-5 text-emerald-50 shadow-[0_0_0_1px_rgba(16,185,129,0.10),0_0_60px_rgba(16,185,129,0.10)]'
						onClick={(e) => e.stopPropagation()}
					>
						<div className='flex items-start justify-between gap-4'>
							<div>
								<div className='text-sm font-mono text-emerald-200/70'>Error</div>
								<div className='mt-2 text-base font-medium'>
									Cannot view this picture, the developer of this site doesn&apos;t like
									their face enlarged
								</div>
							</div>
							<button
								type='button'
								onClick={() => setIsFaceDialogOpen(false)}
								className='shrink-0 rounded-md border border-emerald-500/20 bg-black/40 px-2 py-1 text-xs font-mono text-emerald-100/80 hover:bg-black/60'
							>
								Close
							</button>
						</div>
					</div>
				</div>
			) : null}
		</main>
	);
}
