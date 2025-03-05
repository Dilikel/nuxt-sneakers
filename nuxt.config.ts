// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: 'Nuxt Sneakers',
			link: [
				{
					rel: 'icon',
					type: 'image/png',
					href: '/favicon.png',
				},
			],
		},
	},
	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL,
			YOOKASSA_SHOP_ID: process.env.YOOKASSA_SHOP_ID,
			YOOKASSA_SECRET_KEY: process.env.YOOKASSA_SECRET_KEY,
		},
	},
	compatibilityDate: '2024-11-01',
	css: ['~/assets/main.css'],
	devtools: { enabled: false },
	srcDir: 'app/',
	ssr: true,
	nitro: {
		preset: 'vercel-edge',
		publicAssets: [
			{
				dir: '../public',
				baseURL: '/',
			},
		],
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@formkit/auto-animate/nuxt',
		'@nuxt/image',
		'@pinia/nuxt',
	],
	serverDir: './server',
})
