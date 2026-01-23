'use client';

import { useLenis } from 'lenis/dist/lenis-react';
import { useMemo, useRef, useState } from 'react';

function opacityForBlock(sectionProgress: number, blockNumber: number) {
	const progress = sectionProgress - blockNumber;

	if (progress >= 0 && progress < 1) {
		return 1;
	}

	return 0.2;
}

export default function Intro() {
	const [scrollY, setScrollY] = useState(0);
	const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
	const [burstCategoryId, setBurstCategoryId] = useState<string | null>(null);
	const burstTimeoutRef = useRef<number | null>(null);

	useLenis(({ scroll }) => {
		setScrollY(scroll);
	});

	const refContainer = useRef<HTMLDivElement>(null);
	const numOfPages = 4;
	let progress = 0;
	const { current: elContainer } = refContainer;
	type Category = {
		id: string;
		label: string;
		skills: string[];
		databases?: string[];
		accent: 'emerald' | 'cyan' | 'amber' | 'fuchsia';
		burstEmojis: string[];
	};

	const categories = useMemo<Category[]>(
		() => [
			{
				id: 'mobile',
				label: 'Mobile Dev',
				skills: ['React Native', 'Expo', 'Native iOS', 'Native Android'],
				accent: 'emerald',
				burstEmojis: ['📱', '⚡', '✨', '🚀'],
			},
			{
				id: 'web',
				label: 'Web Dev',
				skills: [
					'React',
					'Angular',
					'NextJS',
					'VueJS',
					'HTML',
					'CSS',
					'Tailwind',
					'Styled Components',
				],
				accent: 'cyan',
				burstEmojis: ['🕸️', '🧩', '✨', '⚡'],
			},
			{
				id: 'backend',
				label: 'Backend Dev',
				skills: [
					'Spring Boot',
					'NodeJs',
					'NestJS',
					'Gin ( Go )',
					'Django',
					'Tornado',
					'Flask',
				],
				databases: [
					'Postgres',
					'MySQL',
					'DynamoDB',
					'MongoDB',
					'Cassandra',
					'LMDB',
					'RocksDB',
				],
				accent: 'amber',
				burstEmojis: ['🛠️', '⚙️', '✨', '🔥'],
			},
			{
				id: 'chain',
				label: 'Blockchain & P2P Dev',
				skills: [
					'Rust',
					'CometBFT',
					'Holochain',
					'Libp2p',
					'ZK Proofs',
					'Noir',
					'Ethers.js',
					'Solidity',
				],
				accent: 'fuchsia',
				burstEmojis: ['🕸️', '🔗', '✨', '🌐'],
			},
		],
		[],
	);

	if (elContainer) {
		const { clientHeight, offsetTop } = elContainer;
		const screenH = window.innerHeight;
		const halfH = screenH / 2;

		const percentY =
			Math.min(
				clientHeight + halfH,
				Math.max(-screenH, scrollY - offsetTop) + halfH,
			) / clientHeight;

		progress = Math.min(numOfPages - 0.5, Math.max(0.5, percentY * numOfPages));
	}

	const tagsVisible = progress >= 3;

	return (
		<div
			ref={refContainer}
			className='relative z-10 bg-black text-white dark:bg-white  dark:text-black'
			id='intro'
			style={{ height: `${numOfPages * 100}vh` }}
		>
			<div className='sticky top-0 mx-auto flex h-screen max-w-5xl flex-col items-center justify-center px-10 py-24 text-4xl font-semibold tracking-tight md:py-28 md:text-6xl lg:px-20 lg:py-3 lg:text-7xl'>
				<div className='leading-[1.15]'>
					<div
						className='intro-text'
						style={{ opacity: opacityForBlock(progress, 0) }}
					>
						I'm a builder.
					</div>
					<span
						className="intro-text inline-block after:content-['_']"
						style={{ opacity: opacityForBlock(progress, 1) }}
					>
						I experiment a lot.
					</span>
					<span
						className='intro-text inline-block'
						style={{ opacity: progress >= 2 ? 1 : 0.2 }}
					>
						I&apos;m most passionate about building Web3 apps for a Web2 audience.
					</span>
					<div
						className='overflow-hidden'
						style={{
							maxHeight: tagsVisible ? 900 : 0,
							transition: 'max-height 600ms ease',
						}}
					>
						<div
							className='mt-6 whitespace-nowrap text-[11px] font-mono uppercase tracking-[0.15em] text-white/70 dark:text-black/60'
							style={{
								opacity: tagsVisible ? 1 : 0,
								transform: tagsVisible ? 'translateY(0px)' : 'translateY(10px)',
								transition: 'opacity 350ms ease, transform 350ms ease',
							}}
						>
							Tap a category for skills
						</div>

						<div
							className='mt-4 w-full max-w-3xl'
							style={{
								opacity: tagsVisible ? 1 : 0,
								transform: tagsVisible ? 'translateY(0px)' : 'translateY(14px)',
								transition: 'opacity 450ms ease, transform 450ms ease',
							}}
						>
							<div className='flex w-full flex-col gap-3 text-base md:text-base'>
							{categories.map((c, i) => {
								const isOpen = openCategoryId === c.id;
								const skillClassName =
									c.accent === 'emerald'
										? 'border-emerald-300/35 bg-emerald-300/15 text-emerald-100 dark:border-emerald-700/30 dark:bg-emerald-400/10 dark:text-emerald-900'
										: c.accent === 'cyan'
											? 'border-cyan-300/35 bg-cyan-300/15 text-cyan-100 dark:border-cyan-700/30 dark:bg-cyan-400/10 dark:text-cyan-900'
											: c.accent === 'amber'
												? 'border-amber-300/35 bg-amber-300/15 text-amber-100 dark:border-amber-700/30 dark:bg-amber-400/10 dark:text-amber-900'
												: 'border-fuchsia-300/35 bg-fuchsia-300/15 text-fuchsia-100 dark:border-fuchsia-700/30 dark:bg-fuchsia-400/10 dark:text-fuchsia-900';

								return (
									<button
										type='button'
										key={c.id}
										onClick={() =>
											{
												// Trigger the burst on tap/click (mobile has no hover).
												if (burstTimeoutRef.current) {
													window.clearTimeout(burstTimeoutRef.current);
												}
												setBurstCategoryId(null);
												requestAnimationFrame(() => {
													setBurstCategoryId(c.id);
													burstTimeoutRef.current = window.setTimeout(() => {
														setBurstCategoryId(null);
														burstTimeoutRef.current = null;
													}, 750);
												});

												setOpenCategoryId((prev) => (prev === c.id ? null : c.id));
											}
										}
										className={[
											'group relative w-full rounded-2xl border bg-white/5 px-4 py-3 text-left font-sans tracking-normal dark:bg-black/5 md:px-4 md:py-3',
											burstCategoryId === c.id ? 'bursting' : '',
										].join(' ')}
										style={{
											borderWidth: 2,
											borderColor: 'rgba(255,255,255,0.28)',
											transition: 'opacity 450ms ease, transform 450ms ease',
											transitionDelay: `${i * 90}ms`,
											opacity: tagsVisible ? 1 : 0,
											transform: tagsVisible ? 'translateY(0px)' : 'translateY(10px)',
										}}
									>
										<div className='burst-layer' aria-hidden='true'>
											{[
												{ x: '-42px', y: '-26px', d: '0ms', r: '-18deg' },
												{ x: '36px', y: '-30px', d: '40ms', r: '20deg' },
												{ x: '-32px', y: '12px', d: '80ms', r: '-10deg' },
												{ x: '46px', y: '16px', d: '120ms', r: '14deg' },
											].map((pos, idx) => (
												<span
													// eslint-disable-next-line react/no-array-index-key
													key={`${c.id}-burst-${idx}`}
													className='burst-emoji'
													style={{
														['--x' as never]: pos.x,
														['--y' as never]: pos.y,
														['--d' as never]: pos.d,
														['--r' as never]: pos.r,
													}}
												>
													{c.burstEmojis[idx % c.burstEmojis.length]}
												</span>
											))}
										</div>

										<div className='flex items-baseline justify-between gap-4'>
											<div className='text-sm md:text-base font-bold tracking-wide text-white/90 dark:text-black/85'>
												{c.label}
											</div>
											<span
												aria-hidden='true'
												className='select-none text-white/70 dark:text-black/60'
												style={{
													transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
													transition: 'transform 160ms ease',
												}}
											>
												▾
											</span>
										</div>

										<div
											className='overflow-hidden'
											style={{
												maxHeight: isOpen ? 520 : 0,
												transition: 'max-height 260ms ease',
											}}
										>
											<div
												className='mt-3 flex flex-wrap gap-2 font-sans tracking-normal'
												style={{
													opacity: isOpen ? 1 : 0,
													transform: isOpen ? 'translateY(0px)' : 'translateY(-6px)',
													transition: 'opacity 200ms ease, transform 200ms ease',
												}}
											>
												{c.skills.map((s) => (
													<span
														key={s}
														className={[
															'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-normal',
															skillClassName,
														].join(' ')}
													>
														{s}
													</span>
												))}

												{c.databases?.length ? (
													<>
														<div className='w-full' />
														<div className='mt-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white/60 dark:text-black/60'>
															Databases
														</div>
														<div className='w-full' />
														{c.databases.map((db) => (
															<span
																key={db}
																className={[
																	'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-normal',
																	skillClassName,
																].join(' ')}
															>
																{db}
															</span>
														))}
													</>
												) : null}
											</div>

											<div
												className='mt-4 max-w-[72ch] whitespace-normal font-mono text-[13px] leading-6 tracking-normal font-normal text-white/70 dark:text-black/65'
												style={{
													opacity: isOpen ? 1 : 0,
													transform: isOpen ? 'translateY(0px)' : 'translateY(-6px)',
													transition: 'opacity 200ms ease, transform 200ms ease',
												}}
											>
												<p className='font-semibold tracking-normal'>
													I know recruiters love to see this, but:
												</p>
												<p className='mt-2 leading-6 tracking-normal'>
													I&apos;ve worked with tons of technologies and can&apos;t list them all.
													To me, it&apos;s not as important which you&apos;ve worked with as it is
													understanding common patterns.
												</p>
											</div>
										</div>
									</button>
								);
							})}
							</div>
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				.burst-layer {
					position: absolute;
					inset: 0;
					pointer-events: none;
					overflow: visible;
				}

				.burst-emoji {
					position: absolute;
					left: 50%;
					top: 32%;
					transform: translate(-50%, -50%);
					opacity: 0;
					filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.25));
					will-change: transform, opacity;
				}

				.group:hover .burst-emoji,
				.group.bursting .burst-emoji,
				.group:focus-visible .burst-emoji,
				.group:focus-within .burst-emoji {
					animation: burst 650ms ease-out both;
					animation-delay: var(--d);
				}

				@keyframes burst {
					0% {
						opacity: 0;
						transform: translate(-50%, -50%) scale(0.7) rotate(0deg);
					}
					18% {
						opacity: 1;
					}
					100% {
						opacity: 0;
						transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y)))
							scale(1.1) rotate(var(--r));
					}
				}
			`}</style>
		</div>
	);
}
