import type { ReactNode } from 'react';

export type WorkTile = {
	title: string;
	description: string;
	websiteUrl?: string;
	websiteLabel?: string;
	websiteNote?: ReactNode;
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
		media: {
			kind: 'emoji',
			value: '🛠️',
		},
	},
	{
		description: 'I built',
		title: 'NXTBEAT',
		websiteUrl: 'https://nxtbeatapp.live',
		media: {
			kind: 'video',
			// File has a space; URL-encode it so it resolves correctly.
			src: '/static/nxt%202.mov',
			width: 600,
			height: 554,
		},
	},
	{
		description: 'I built',
		title: 'Solvely',
		websiteUrl: 'https://github.com/9mzodiac/Solvely',
		websiteLabel: 'Github Repo',
		websiteNote: 'Reached #7 app in US ( Education )',
		media: {
			kind: 'video',
			src: '/static/images/project/solvely.mov',
			width: 478,
			height: 960,
		},
	},
	{
		description: 'I built',
		title: 'Flowell',
		websiteUrl:
			'https://uploads-ssl.webflow.com/62c1f253f3ee583d7b8f2427/62d0f3ca6e8bedc1ca108583_Flowell%20Lite%20Paper%20_%20Mobile%20App.pdf',
		websiteLabel: 'Litepaper',
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
	{
		description: `I built`,
		title: 'Junto',
		websiteUrl:
			'https://www.kickstarter.com/projects/junto-app/junto-a-new-breed-of-social-media',
		websiteLabel: 'Now Flux',
		websiteNote: '- first holochain mobile app',
		media: {
			kind: 'video',
			src: '/static/images/project/flux.mp4',
			width: 1952,
			height: 1230,
		},
	},
	/*
	{
		description: 'I built',
		title: '2K13 JS',
		websiteUrl: 'https://github.com/9mzodiac/2K13-JS',
		websiteLabel: 'Github Repo',
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

