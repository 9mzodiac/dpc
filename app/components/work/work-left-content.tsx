import classNames from 'classnames';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ExternalLinkIcon } from '../layouts/icons/external-link-icon';

type Props = {
	description: string;
	title: string;
	websiteUrl?: string;
	websiteLabel?: string;
	websiteNote?: ReactNode;
	className?: string;
};

export default function WorkLeftContent({
	description,
	title,
	websiteUrl,
	websiteLabel,
	websiteNote,
	className,
}: Props) {
	const hasWebsite = !!websiteUrl && !!websiteLabel;

	return (
		<div className={classNames('w-full max-w-[32rem]', className)}>
			{/* Description row (fixed height) */}
			<div className='h-10 md:h-12 xl:h-14 flex items-end text-2xl font-medium md:text-3xl xl:text-4xl'>
				{description || <span className='invisible'>placeholder</span>}
			</div>

			{/* Title row (fixed height, truncate to prevent wrapping) */}
			<div className='mt-1 h-14 md:h-16 xl:h-20 flex items-end text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl whitespace-nowrap truncate'>
				{title || <span className='invisible'>placeholder</span>}
			</div>

			{/* Link row + note row (always reserve space) */}
			<div className='mt-4'>
				<div className='h-7 md:h-8 xl:h-9'>
					{hasWebsite ? (
						<Link
							href={websiteUrl}
							target='_blank'
							rel='noreferrer'
							title={websiteUrl}
							className='block text-base md:text-lg xl:text-xl opacity-90 hover:opacity-100'
						>
							<span className='inline-flex min-w-0 items-center gap-2 underline underline-offset-4'>
								<span className='truncate'>{websiteLabel}</span>
								<ExternalLinkIcon className='h-4 w-4 shrink-0 opacity-80' />
							</span>
						</Link>
					) : (
						<span className='invisible select-none'>placeholder</span>
					)}
				</div>

				<div className='mt-1 h-4 text-xs opacity-70'>
					{websiteNote ? (
						websiteNote
					) : (
						<span className='invisible select-none'>placeholder</span>
					)}
				</div>
			</div>
		</div>
	);
}

