// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
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
        colors: {
          presets: {
            light: {
              primary: '#FF4E1B',
              myCoolColor: '#ff00ff',
              onMyCoolColor: '#ffffff',
              dark: '#131B23'
            }
          }
        },
      },
        css: true
    },

    head: {
        link: [
          //NOTE - List Icons https://fonts.google.com/icons?selected=Material+Icons
          //{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap' },
          { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
          { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap" },
          { rel: 'stylesheet', href: "https://fonts.googleapis.com/icon?family=Material+Icons" }
        ]
      },
      css: [
        '~/node_modules/material-design-icons-iconfont/dist/material-design-icons.css',
      ],
})