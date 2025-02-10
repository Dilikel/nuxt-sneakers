// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: 'Nuxt Sneakers',
			link: [{ rel: 'icon', type: 'svg', href: '/logo.svg' }],
		},
	},
	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL,
		},
	},
	compatibilityDate: '2024-11-01',
	css: ['~/assets/main.css'],
	devtools: { enabled: false },
	srcDir: 'app/',
	ssr: false,
	modules: [
		'@nuxtjs/tailwindcss',
		'@formkit/auto-animate/nuxt',
		'@nuxt/image',
		'@pinia/nuxt',
	],
})
