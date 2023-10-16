import en from './locales/en.json'
import ptBr from './locales/pt-br.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    defaultLocale: 'en',
    messages: {
      en,
      "pt-br": ptBr
    }
}))