import en from './locales/en.json'
import ptBr from './locales/pt-br.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'pt-br',
    defaultLocale: 'pt-br',
    messages: {
      en,
      "pt-br": ptBr
    }
  }))