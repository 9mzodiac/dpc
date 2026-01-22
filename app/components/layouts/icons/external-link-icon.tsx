import type { SVGProps } from 'react';

export function ExternalLinkIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			aria-hidden='true'
			{...props}
		>
			<path d='M14 3h7v7' />
			<path d='M10 14L21 3' />
			<path d='M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6' />
		</svg>
	);
}

