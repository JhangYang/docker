import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),

		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self'],
				'style-src': ['self', 'unsafe-inline']
			},
			// must be specified with either the `report-uri` or `report-to` directives, or both
			reportOnly: {
				'default-src': ['self'],
				'script-src': ['self', 'unsafe-inline'],
				'report-uri': ['/']
			}
		}
	}
};

export default config;
