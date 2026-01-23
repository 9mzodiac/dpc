'use client';

import { useEffect, useRef, useState } from 'react';

type Phase = 'boot' | 'done';

export default function BootSplash() {
	const [visible, setVisible] = useState(true);
	const [phase, setPhase] = useState<Phase>('boot');
	const [statusLine, setStatusLine] = useState<string | null>(null);
	const [fade, setFade] = useState(false);
	const timersRef = useRef<number[]>([]);

	const clearTimers = () => {
		for (const t of timersRef.current) window.clearTimeout(t);
		timersRef.current = [];
	};

	const finish = () => {
		clearTimers();
		setFade(true);
		const t = window.setTimeout(() => {
			setVisible(false);
			setFade(false);
			setPhase('boot');
			setStatusLine(null);
		}, 450);
		timersRef.current.push(t);
	};

	useEffect(() => {
		const prefersReducedMotion =
			window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;

		setPhase('boot');

		// If the user prefers reduced motion, show a very short splash.
		if (prefersReducedMotion) {
			setStatusLine('Cracked Dev loaded.');
			const t = window.setTimeout(() => finish(), 1800);
			timersRef.current.push(t);
			return () => clearTimers();
		}

		const t0 = window.setTimeout(() => setStatusLine('Loading Cracked Dev...'), 220);
		const t1 = window.setTimeout(() => setStatusLine('Almost there...'), 980);
		const t2 = window.setTimeout(() => setStatusLine('Cracked Dev loaded.'), 1650);
		const t3 = window.setTimeout(() => {
			setPhase('done');
			finish();
		}, 2250);
		timersRef.current.push(t0, t1, t2, t3);

		return () => clearTimers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Lock scroll while visible
	useEffect(() => {
		if (!visible) return;
		const prevHtml = document.documentElement.style.overflow;
		const prevBody = document.body.style.overflow;
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';
		return () => {
			document.documentElement.style.overflow = prevHtml;
			document.body.style.overflow = prevBody;
		};
	}, [visible]);

	// Allow skip (click/tap/enter/esc)
	useEffect(() => {
		if (!visible) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter' || e.key === 'Escape') finish();
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible]);

	if (!visible) return null;

	return (
		<div
			className='fixed inset-0 z-[100] flex items-center justify-center bg-black'
			role='dialog'
			aria-modal='true'
			style={{
				opacity: fade ? 0 : 1,
				transition: 'opacity 450ms ease',
			}}
		>
			<div className='w-[min(860px,92vw)] rounded-2xl border border-emerald-500/25 bg-black/80 p-6 shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_0_90px_rgba(16,185,129,0.12)] backdrop-blur-md'>
				<div className='mb-4 flex items-center gap-2'>
					<span className='h-3 w-3 rounded-full bg-red-500/70' />
					<span className='h-3 w-3 rounded-full bg-yellow-500/70' />
					<span className='h-3 w-3 rounded-full bg-green-500/70' />
					<span className='ml-3 text-xs font-mono text-emerald-200/70'>
						cracked@dev:~$
					</span>
				</div>

				<div className='font-mono text-emerald-100/90'>
					<div className='text-sm leading-6 md:text-base'>Loading Cracked Dev</div>
					<div className='mt-1 text-sm leading-6 text-emerald-200/80 md:text-base'>
						Cracked Dev = a talented builder.
					</div>
					{statusLine ? (
						<div className='mt-4 text-sm leading-6 text-emerald-200/80 md:text-base'>
							{statusLine}
						</div>
					) : null}

					<div className='mt-6 text-[11px] text-emerald-200/60'>
						<button
							type='button'
							onClick={finish}
							className='underline underline-offset-4 hover:text-emerald-200'
						>
							skip
						</button>
						<span className='opacity-70'> (or press Enter/Esc)</span>
					</div>
				</div>
			</div>
		</div>
	);
}

