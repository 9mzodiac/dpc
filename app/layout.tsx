import Analytics from 'app/components/analytics/analytics';
// import BootSplash from 'app/components/boot-splash';
import LenisProvider from 'app/components/providers/LenisProvider';
import { ScrollReset } from 'app/components/providers/ScrollReset';
import ThemeProvider from 'app/components/providers/ThemeProvider';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { mukta } from './fonts';
import './tailwind.css';

export const metadata: Metadata = {
	title: {
		template: '%s | Daniel Christopher',
		default: 'Daniel Christopher',
	},
	description: 'I build things for the web.',
	metadataBase: new URL('https://ibuildapps.live'),
};

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={`${mukta.className} dark`}
			style={{ backgroundColor: '#000' }}
		>
			<head>
				<script
					// Prevent initial scroll restoration "jump" before the hero renders.
					// Keep hash navigation intact.
					dangerouslySetInnerHTML={{
						__html:
							"try{if('scrollRestoration'in history)history.scrollRestoration='manual';if(!location.hash)scrollTo(0,0);}catch(e){}",
					}}
				/>
				<link
					rel='apple-touch-icon'
					sizes='76x76'
					href='/static/favicons/favicon.ico'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/static/favicons/favicon.ico'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/static/favicons/favicon.ico'
				/>
				<meta name='msapplication-TileColor' content='#000000' />
				<meta name='theme-color' content='#000000' />
				<link rel='alternate' type='application/rss+xml' href='/feed.xml' />
			</head>
			<body className='bg-white text-black antialiased dark:bg-black dark:text-white selection:bg-primary-500 selection:text-white'>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					themes={['dark', 'light']}
				>
					{/* <BootSplash /> */}
					<ScrollReset />
					<LenisProvider>
						{children}
					</LenisProvider>
					{process.env.NODE_ENV === 'production' && <Analytics />}
				</ThemeProvider>
			</body>
		</html>
	);
}
