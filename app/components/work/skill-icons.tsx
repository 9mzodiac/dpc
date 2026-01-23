'use client';

import { useState } from 'react';

type Props = {
	src: string;
	alt: string;
	className?: string;
};

export default function SkillIcons({ src, alt, className }: Props) {
	const [hidden, setHidden] = useState(false);

	if (hidden) return null;

	return (
		<img
			src={src}
			alt={alt}
			loading='lazy'
			decoding='async'
			className={className}
			onError={() => setHidden(true)}
		/>
	);
}

