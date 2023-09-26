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
    modules: ["@vuestic/nuxt"],

    vuestic: {
        config: {
        // Config here
        },
    },

    head: {
        link: [
          //NOTE - List Icons https://fonts.google.com/icons?selected=Material+Icons
          { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
          { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap" },
          { rel: 'stylesheet', href: "https://fonts.googleapis.com/icon?family=Material+Icons" }
        ]
      },
      css: [
        '~/node_modules/material-design-icons-iconfont/dist/material-design-icons.css',
      ],
})