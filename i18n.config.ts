// ingles
import en from './locales/en.json'
import enPrivacy from './locales/privacy-policy/en.json'
import enTerms from './locales/terms-of-use/en.json'
// portugues
import ptBr from './locales/pt-br.json'
import ptBrPrivacy from './locales/privacy-policy/pt-br.json'
import ptBrTerms from './locales/terms-of-use/pt-br.json'
// polones
import pl from './locales/pl.json'
import plPrivacy from './locales/privacy-policy/pl.json'
import plTerms from './locales/terms-of-use/pl.json'
// russo
import ru from './locales/ru.json'
import ruPrivacy from './locales/privacy-policy/ru.json'
import ruTerms from './locales/terms-of-use/ru.json'
// espanhol
import es from './locales/es.json'
import esPrivacy from './locales/privacy-policy/es.json'
import esTerms from './locales/terms-of-use/es.json'
// frances
import fr from './locales/fr.json'
import frPrivacy from './locales/privacy-policy/fr.json'
import frTerms from './locales/terms-of-use/fr.json'
// italiano
import it from './locales/it.json'
import itPrivacy from './locales/privacy-policy/it.json'
import itTerms from './locales/terms-of-use/it.json'

function mergeLocale<T extends Record<string, unknown>>(
  base: T,
  ...extras: Record<string, unknown>[]
): T {
  return extras.reduce(
    (acc, extra) => ({ ...acc, ...extra }),
    { ...base } as Record<string, unknown>
  ) as T
}

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    defaultLocale: 'en',
    messages: {
        en: mergeLocale(en, enPrivacy, enTerms),
        "pt-br": mergeLocale(ptBr, ptBrPrivacy, ptBrTerms),
        pl: mergeLocale(pl, plPrivacy, plTerms),
        ru: mergeLocale(ru, ruPrivacy, ruTerms),
        es: mergeLocale(es, esPrivacy, esTerms),
        fr: mergeLocale(fr, frPrivacy, frTerms),
        it: mergeLocale(it, itPrivacy, itTerms)
    }
}))
