// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
	devServer: {
		port: 80,
	},
	imports: {
		autoImport: true,
		global: true,
	},
	runtimeConfig: {
		public: {
			backend: process.env.BACKEND,
		},
	},
	app: {
		head: {
			meta: [
				// <meta name="viewport" content="width=device-width, initial-scale=1">
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			],
			script: [
				// <script src="https://myawesome-lib.js"></script>
				// { src: 'https://awesome-lib.js' }
			],
			link: [
				// <link rel="stylesheet" href="https://myawesome-lib.css">
				// { rel: 'stylesheet', href: 'https://awesome-lib.css' }
			],
			// please note that this is an area that is likely to change
			style: [
				// <style type="text/css">:root { color: red }</style>
				// { children: ':root { color: red }', type: 'text/css' }
			],
			noscript: [
				// <noscript>JavaScript is required</noscript>
				{ children: 'JavaScript is required' },
			],
		},
	},
	typescript: {
		strict: true,
	},
	css: [
		'vuetify/lib/styles/main.sass',
		'@mdi/font/css/materialdesignicons.min.css',
		'~/assets/styles/settings.sass',
	],
	build: {
		transpile: ['vuetify'],
	},
	modules: [
		'@pinia/nuxt',
		'@nuxtjs/device',
		'@nuxtjs/eslint-module',
		'@nuxtjs/google-fonts',
		'nuxt-icons',
	],
	pinia: {
		autoImports: [
			// import { defineStore, storeToRefs } from 'pinia'
			'defineStore',
			'storeToRefs',
		],
	},
	googleFonts: {
		families: {
			Oswald: {
				wght: [200, 400, 500, 600],
				ital: [200, 400],
			},
			'Dancing Script': {
				wght: [200, 400, 600],
				ital: [200, 400],
			},
		},
		subsets: ['cyrillic', 'latin'],
		// download: true,
		// base64: true,
		prefetch: true,
	},
});
