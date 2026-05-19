// ingles
import en from './locales/en.json'
import enPrivacy from './locales/privacy-policy/en.json'
// portugues
import ptBr from './locales/pt-br.json'
import ptBrPrivacy from './locales/privacy-policy/pt-br.json'
// polones
import pl from './locales/pl.json'
import plPrivacy from './locales/privacy-policy/pl.json'
// russo
import ru from './locales/ru.json'
import ruPrivacy from './locales/privacy-policy/ru.json'
// espanhol
import es from './locales/es.json'
import esPrivacy from './locales/privacy-policy/es.json'
// frances
import fr from './locales/fr.json'
import frPrivacy from './locales/privacy-policy/fr.json'
// italiano
import it from './locales/it.json'
import itPrivacy from './locales/privacy-policy/it.json'

function mergeLocale<T extends Record<string, unknown>>(
  base: T,
  extra: Record<string, unknown>
): T {
  return { ...base, ...extra }
}

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    defaultLocale: 'en',
    messages: {
        en: mergeLocale(en, enPrivacy),
        "pt-br": mergeLocale(ptBr, ptBrPrivacy),
        pl: mergeLocale(pl, plPrivacy),
        ru: mergeLocale(ru, ruPrivacy),
        es: mergeLocale(es, esPrivacy),
        fr: mergeLocale(fr, frPrivacy),
        it: mergeLocale(it, itPrivacy)
    }
}))
