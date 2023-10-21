// ingles
import en from './locales/en.json'
// portugues
import ptBr from './locales/pt-br.json'
// polones
import pl from './locales/pl.json'
// russo
import ru from './locales/ru.json'
// espanhol
import es from './locales/es.json'
// frances
import fr from './locales/fr.json'
// italiano
import it from './locales/it.json'


export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    defaultLocale: 'en',
    messages: {
        en,
        "pt-br": ptBr,
        pl,
        ru,
        es,
        fr,
        it
    }
}))