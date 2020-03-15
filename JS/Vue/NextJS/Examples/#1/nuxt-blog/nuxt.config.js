const pkg = require('./package')

module.exports = {
  mode: 'universal',

  head: {
    title: 'SSR BLOG',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Блог, написанный с использованием SSR' },
      { hid: 'keywords', name: 'keywords', content: 'js, javascript, ssr, blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#409EFF' },

  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/theme/index.scss'
  ],

  plugins: [
    '@/plugins/globals',
    '@/plugins/axios'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa', // PWA
    'nuxt-seo-module' // для robots.txt и sitemap.xml
    ['@nuxtjs/redirect-module', { // официальный модуль для редиректов

    }]
  ],

  axios: {
    baseURL: proccess.env.BASE_URL || 'http://localhost:3000' // # BASE_URL в package.json
  },

  env: { // environment переменные
    appName: 'SSR Blog'
  },

  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {

    }
  }
}
