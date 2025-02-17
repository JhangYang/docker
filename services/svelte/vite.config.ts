import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	logLevel: 'info',

	build: {
		minify: false,
	},

	define: {
		__APP_NAME__: '"frontend"',
		__APP_URL__: '"http://localhost:3000"',
		'process.env.NODE_ENV': process.env.NODE_ENV === 'production' ? '"production"' : '"development"',
	},

	plugins: [
		sveltekit(),
		tailwindcss()
	],

	server: {
		host: true,
		port: 5173,
		strictPort: true,
		watch: {
			usePolling: true
		}
	},

	preview: {
		host: true,
		port: 4173,
		strictPort: true
	},

	test: {
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],

				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',

				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
