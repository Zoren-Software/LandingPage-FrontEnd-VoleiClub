import { defineNuxtPlugin } from '#app'
import { VueReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();
      
    const googleRecaptcha = runtimeConfig.public.googleRecaptcha;
    nuxtApp.vueApp.use(VueReCaptcha, {
        siteKey: googleRecaptcha
    })
})