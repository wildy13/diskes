// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Dinas Kesehatan',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
    '@vueuse/nuxt',
  ],
  ui: {
    icons: ['solar'],
  },
  css: [
    '@/assets/css/tailwind.css',
  ],
  colorMode: {
    preference: 'light',
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
  auth: {
    origin: process.env.ORIGIN_URL,
    baseURL: process.env.API_URL,
    provider: {
      type: 'local',
      sessionDataType: {
        id: 'string',
        name: 'string',
        email: 'string',
        role: 'string',
        avatar: 'string'
      },
      token: {
        maxAgeInSeconds: 8 * 60 * 60,
      },
    },
    globalAppMiddleware: true,
  },
})
