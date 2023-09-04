// @ts-ignore
export default defineNuxtConfig({
  ssr: true,
  modules: ['@vueuse/nuxt', '@pinia/nuxt'],
  plugins: [],
  build: {},
  experimental: {
    viewTransition: false,
  },
  devtools: {
    enabled: true,
  },
  app: {
    baseURL: '/',
    cdnURL: '/',
    head: {
      title: 'FS6',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'description', content: 'FS6 lorem ipsum description' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'FS6 lorem ipsum title' },
        { property: 'og:description', content: 'FS6 lorem ipsum title' },
        { property: 'og:image', content: '' },
        { property: 'og:url', content: '' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'FS6 lorem ipsum title' },
        { name: 'twitter:description', content: 'FS6 lorem ipsum description' },
        { name: 'twitter:image', content: '' },
      ],
      link: [
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '57x57', href: '/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '60x60', href: '/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '72x72', href: '/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '76x76', href: '/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '114x114', href: '/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '120x120', href: '/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '144x144', href: '/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '152x152', href: '/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: '/apple-icon-180x180.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      ],
      script: [],
    },
    layoutTransition: false,
    pageTransition: false,
  },
  css: ['@/assets/style/style.scss'],
  nitro: {},
  router: {},
  runtimeConfig: {
    public: {
      trailingSlash: true,
    },
  },
})
