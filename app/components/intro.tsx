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
					{/* Skills categories are temporarily disabled. */}
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
