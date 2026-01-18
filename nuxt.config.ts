// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devServer: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3001,
  },

  devtools: {
    enabled: false
  },

  components: [
    {
      pathPrefix: true,
      extensions: ['.vue'],
    },
  ],

  modules: [
    '@nuxtjs/i18n',
    "@vuestic/nuxt"
  ],

  runtimeConfig: {
      public: {
        tawkto: '', // can be overridden by NUXT_PUBLIC_TAWKTO environment variable
        apiTenantDomain: '', // can be overridden by NUXT_PUBLIC_API_TENANT_DOMAIN environment variable
        apiTenantsToken: '', // can be overridden by NUXT_PUBLIC_API_TENANTS_TOKEN environment variable
        apiTenants: '', // can be overridden by NUXT_PUBLIC_API_TENANTS environment variable
        apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
        nameApplication: '', // can be overridden by NUXT_PUBLIC_NAME_APPLICATION environment variable
        googleRecaptcha: '', // can be overridden by NUXT_PUBLIC_GOOGLE_RECAPTCHA environment variable
        discordLink: '', // can be overridden by NUXT_PUBLIC_DISCORD_LINK environment variable
        emailSupport: '', // can be overridden by NUXT_PUBLIC_EMAIL_SUPPORT environment variable
        nameCompany: '', // can be overridden by NUXT_PUBLIC_NAME_COMPANY environment variable
      }
    },

  i18n: {
      vueI18n: './i18n.config.ts' // if you are using custom path, default 
  },

  vuestic: {
      config: {
      // Config here
      },
      css: true
  },

  app: {
    head: {
      title: 'VolleyTrack - Plataforma Inteligente para Gestão de Voleibol',
      titleTemplate: '%s - VolleyTrack',
      htmlAttrs: {
        lang: 'pt-BR'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Plataforma inteligente para gestão de treinos, atletas e desempenho de voleibol. Organize sua equipe, planeje treinamentos e acompanhe o desempenho com dados e tecnologia em um só lugar.' 
        },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'VolleyTrack - Plataforma Inteligente para Gestão de Voleibol' },
        { 
          property: 'og:description', 
          content: 'Plataforma inteligente para gestão de treinos, atletas e desempenho de voleibol. Organize sua equipe, planeje treinamentos e acompanhe o desempenho com dados e tecnologia em um só lugar.' 
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'VolleyTrack - Plataforma Inteligente para Gestão de Voleibol' },
        { 
          name: 'twitter:description', 
          content: 'Plataforma inteligente para gestão de treinos, atletas e desempenho de voleibol. Organize sua equipe, planeje treinamentos e acompanhe o desempenho com dados e tecnologia em um só lugar.' 
        }
      ],
      link: [
        // Preconnect apenas para as origens mais críticas (máximo 4)
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // Preload da imagem LCP (WebP com fallback)
        { rel: 'preload', as: 'image', href: '/images/volei-banner.webp', fetchpriority: 'high' },
        // Fontes com display=swap para melhor performance
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap' },
        { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap" },
        { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;900&display=swap" }
      ]
    }
  },

  css: [
    '~/node_modules/material-design-icons-iconfont/dist/material-design-icons.css',
  ],

  // Configurações de build para otimização
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vuestic-ui': ['vuestic-ui'],
            'vue-i18n': ['vue-i18n'],
            'vue-router': ['vue-router'],
          },
        },
      },
    },
  },
})