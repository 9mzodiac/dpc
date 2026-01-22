import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `https://danielchristopher.com/sitemap.xml`,
		host: `https://danielchristopher.com`,
	};
}
