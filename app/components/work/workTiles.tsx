import type { ReactNode } from 'react';
import SkillIcons from './skill-icons';

export type WorkTile = {
	title: string;
	description: string;
	websiteUrl?: string;
	titleSubtext?: ReactNode;
	websiteNote?: ReactNode;
	tags?: string[];
	leftExtra?: ReactNode;
	media:
		| {
				kind: 'emoji';
				value: string;
		  }
		| {
				kind: 'logos';
				items: Array<{
					name: string;
					subtitle?: string;
					children?: string[];
					// Optional image path under /public (e.g. /static/images/logos/foo.svg)
					src?: string;
					width?: number;
					height?: number;
				}>;
		  }
		| {
				kind: 'image';
				src: string;
				width: number;
				height: number;
		  }
		| {
				kind: 'carousel';
				items: Array<{
					src: string;
					width: number;
					height: number;
					alt?: string;
				}>;
		  }
		| {
				kind: 'video';
				src: string;
				width: number;
				height: number;
				poster?: string;
		  }
		| {
				kind: 'cta';
		  };
};

export const workTiles: WorkTile[] = [
	{
		description: `Here are things`,
		title: `I've worked on`,
		leftExtra: (
			<div className='mt-6'>
				<div className='text-xs font-mono uppercase tracking-wider text-white/70'>
					I build with these technologies:
				</div>
				<div className='mt-2 relative left-1/2 w-screen -translate-x-1/2 overflow-x-auto [-webkit-overflow-scrolling:touch] px-10 md:px-14 lg:left-0 lg:w-full lg:translate-x-0 lg:px-0'>
					<SkillIcons
						src='https://skillicons.dev/icons?i=html,css,tailwind,js,nodejs,npm,vue,react,express,postgres,docker,aws,nginx,git,go,rust,activitypub,ableton,azure,cassandra,django,fediverse,figma,gradle,ipfs,java,kotlin,nestjs,raspberrypi,reactivex,redis,spring'
						alt='Skills: HTML, CSS, Tailwind, JavaScript, Node.js, npm, Vue, React, Express, Postgres, Docker, AWS, Nginx, Git, Go, Rust, ActivityPub, Ableton, Azure, Cassandra, Django, Fediverse, Figma, Gradle, IPFS, Java, Kotlin, NestJS, Raspberry Pi, ReactiveX, Redis, Spring'
						className='h-16 sm:h-18 md:h-20 w-max max-w-none opacity-95'
					/>
				</div>
			</div>
		),
		media: {
			kind: 'emoji',
			value: '🛠️',
		},
	},
	{
		description: "I'm building",
		title: 'NXTBEAT',
		websiteUrl: 'https://nxtbeatapp.live',
		websiteNote: (
			<div className='flex flex-wrap items-center gap-x-2 gap-y-3'>
				<span className='inline-flex items-center gap-1 rounded-full border border-emerald-300/35 bg-emerald-300/15 px-3 py-1 text-[11px] leading-none font-semibold text-emerald-100 shadow-[0_0_0_1px_rgba(110,231,183,0.08)]'>
					🕸️ Web3 Project
				</span>
				<span className='inline-flex items-center gap-1 rounded-full border border-cyan-300/35 bg-cyan-300/15 px-3 py-1 text-[11px] leading-none font-semibold text-cyan-100 shadow-[0_0_0_1px_rgba(103,232,249,0.08)]'>
					⚡ Powered by Hypercore
				</span>
			</div>
		),
		tags: ['React Native', 'Expo', 'Hyperswarm', 'Hypercore'],
		media: {
			kind: 'video',
			// File has a space; URL-encode it so it resolves correctly.
			src: '/static/nxt%202.mp4',
			width: 600,
			height: 554,
		},
	},
	{
		description: 'I built',
		title: 'Solvely',
		websiteUrl: 'https://www.producthunt.com/products/solvely/launches/solvely',
		websiteNote: (
			<div className='flex flex-wrap items-center gap-x-2 gap-y-3'>
				<span className='inline-flex items-center gap-1 rounded-full border border-amber-400/35 bg-amber-400/15 px-3 py-1 text-[11px] leading-none font-semibold text-amber-200 shadow-[0_0_0_1px_rgba(251,191,36,0.08)]'>
					🏅 Reached #8 app in US (Education)
				</span>
				<span className='inline-flex items-center gap-1 rounded-full border border-orange-400/35 bg-orange-400/15 px-3 py-1 text-[11px] leading-none font-semibold text-orange-200 shadow-[0_0_0_1px_rgba(251,146,60,0.08)]'>
					🔥 Featured on Product Hunt
				</span>
			</div>
		),
		tags: ['Native iOS', 'UIKit', 'Python-based AI'],
		media: {
			kind: 'video',
			src: '/static/images/project/solvely.mov',
			width: 478,
			height: 960,
		},
	},
	{
		description: 'I built',
		title: 'Junto',
		websiteUrl:
			'https://www.kickstarter.com/projects/junto-app/junto-a-new-breed-of-social-media',
		titleSubtext: (
			<a
				href='https://fluxsocial.io'
				target='_blank'
				rel='noreferrer'
				className='underline underline-offset-4 opacity-80 hover:opacity-100'
			>
				Now Flux
			</a>
		),
		websiteNote: (
			<div className='flex flex-wrap items-center gap-x-2 gap-y-3'>
				<span className='inline-flex items-center gap-1 rounded-full border border-fuchsia-400/35 bg-fuchsia-400/15 px-3 py-1 text-[11px] leading-none font-semibold text-fuchsia-200 shadow-[0_0_0_1px_rgba(232,121,249,0.08)]'>
					🚀 Funded on Kickstarter
				</span>
				<span className='inline-flex items-center gap-1 rounded-full border border-cyan-300/35 bg-cyan-300/15 px-3 py-1 text-[11px] leading-none font-semibold text-cyan-100 shadow-[0_0_0_1px_rgba(103,232,249,0.08)]'>
					🧬 First Holochain mobile app
				</span>
			</div>
		),
		tags: ['iOS SDK', 'Holochain', 'P2P'],
		media: {
			kind: 'video',
			src: '/static/images/project/flux.mp4',
			width: 1952,
			height: 1230,
		},
	},
	{
		description: 'I built',
		title: 'Flowell',
		websiteUrl:
			'https://uploads-ssl.webflow.com/62c1f253f3ee583d7b8f2427/62d0f3ca6e8bedc1ca108583_Flowell%20Lite%20Paper%20_%20Mobile%20App.pdf',
		websiteNote: (
			<span className='inline-flex items-center gap-1 rounded-full border border-emerald-300/35 bg-emerald-300/15 px-3 py-1 text-[11px] leading-none font-semibold text-emerald-100 shadow-[0_0_0_1px_rgba(110,231,183,0.08)]'>
				🕸️ Web3 Project
			</span>
		),
		tags: ['React Native', 'NestJS', 'Ethereum'],
		media: {
			kind: 'carousel',
			items: [
				{
					src: '/static/images/project/flowell1.png',
					width: 600,
					height: 554,
				},
				{
					src: '/static/images/project/flowell2.png',
					width: 600,
					height: 554,
				},
			],
		},
	},
	/*
	{
		description: 'I built',
		title: '2K13 JS',
		websiteUrl: 'https://github.com/9mzodiac/2K13-JS',
		websiteNote: (
			<span>
				iPhone 5 emulator in ReactJS and Tailwind. Custom commission for popular music
				collective{' '}
				<a
					href='https://soundcloud.com/2k13boyz'
					target='_blank'
					rel='noreferrer'
					className='underline underline-offset-4'
				>
					2K13Boyz
				</a>
			</span>
		),
		media: {
			kind: 'video',
			src: '/static/images/project/2k13js1.mov',
			width: 600,
			height: 554,
		},
	},
	*/
	{
		description: `Who I've worked with`,
		title: 'Teams & Companies',
		media: {
			kind: 'logos',
			// Text-only list (rendered as compact pills).
			items: [
				{
					name: 'US Government',
					children: [
						'US Department of Veterans Affairs',
						'US Department of Homeland Security',
					],
				},
				{ name: 'Holo.Host', subtitle: 'Creators of Holochain' },
				{ name: 'Caterpillar, Inc.', subtitle: 'Fortune 100' },
				{ name: 'GloGreen', subtitle: 'Industry disrupter' },
				{ name: 'Plank Labs', subtitle: 'Global innovation platform' },
			],
		},
	},
	{
		description: `Let's make something`,
		title: 'great together',
		media: {
			kind: 'cta',
		},
	},
];

