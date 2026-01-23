import classNames from 'classnames';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ExternalLinkIcon } from '../layouts/icons/external-link-icon';

type Props = {
	description: string;
	title: string;
	websiteUrl?: string;
	websiteNote?: ReactNode;
	tags?: string[];
	leftExtra?: ReactNode;
	className?: string;
};

export default function WorkLeftContent({
	description,
	title,
	websiteUrl,
	websiteNote,
	tags,
	leftExtra,
	className,
}: Props) {
	const hasWebsite = !!websiteUrl;
	const hasWebsiteNote = !!websiteNote;

	return (
		<div className={classNames('w-full max-w-[32rem]', className)}>
			{/* Description row (fixed height) */}
			<div className='h-10 md:h-12 xl:h-14 flex items-end text-2xl font-medium md:text-3xl xl:text-4xl'>
				{description || <span className='invisible'>placeholder</span>}
			</div>

			{/* Title row (fixed height, truncate to prevent wrapping) */}
			<div className='mt-1 h-14 md:h-16 xl:h-20 flex items-end text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl whitespace-nowrap'>
				{hasWebsite ? (
					<Link
						href={websiteUrl}
						target='_blank'
						rel='noreferrer'
						title={websiteUrl}
						className='inline-flex min-w-0 items-center gap-2 opacity-95 hover:opacity-100'
					>
						<span className='truncate'>{title}</span>
						<ExternalLinkIcon className='h-5 w-5 shrink-0 opacity-80' />
					</Link>
				) : (
					<span className='truncate'>
						{title || <span className='invisible'>placeholder</span>}
					</span>
				)}
			</div>

			{hasWebsiteNote ? (
				<div className='text-xs leading-snug' style={{ marginTop: 14 }}>
					{typeof websiteNote === 'string' ? (
						<span className='opacity-70'>{websiteNote}</span>
					) : (
						websiteNote
					)}
				</div>
			) : null}

			{tags && tags.length > 0 ? (
				<div
					className='flex flex-wrap gap-x-2 gap-y-3'
					style={{ marginTop: hasWebsiteNote ? 18 : 14 }}
				>
					{tags.map((tag) => (
						<span
							key={tag}
							className='inline-flex items-center rounded-full border bg-white/5 px-4 py-1 leading-none font-medium tracking-wide text-white/85'
							style={{
								borderWidth: 2,
								borderColor: 'rgba(255, 255, 255, 0.35)',
								fontSize: 13,
							}}
						>
							{tag}
						</span>
					))}
				</div>
			) : null}

			{leftExtra ? <div className='mt-3'>{leftExtra}</div> : null}
		</div>
	);
}

