import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { useHead } from '#imports'

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig()
    const tawkto = runtimeConfig.public.tawkto

    if (!tawkto) return

    // Carregar Tawk.to de forma assíncrona após o carregamento da página
    if (process.client) {
        // Preconnect removido para reduzir número de preconnects (máximo 4 recomendado)

        // Carregar script após interação do usuário ou após 3 segundos
        const loadTawkTo = () => {
            const script = document.createElement('script')
            script.src = `https://embed.tawk.to/${tawkto}`
            script.async = true
            script.defer = true
            document.body.appendChild(script)
        }

        // Carregar após interação do usuário ou timeout
        const events = ['mousedown', 'touchstart', 'scroll', 'keydown']
        let loaded = false
        
        const loadOnInteraction = () => {
            if (!loaded) {
                loaded = true
                loadTawkTo()
                events.forEach(event => {
                    document.removeEventListener(event, loadOnInteraction)
                })
            }
        }

        events.forEach(event => {
            document.addEventListener(event, loadOnInteraction, { once: true, passive: true })
        })

        // Fallback: carregar após 3 segundos se não houver interação
        setTimeout(() => {
            if (!loaded) {
                loadTawkTo()
                loaded = true
            }
        }, 3000)
    }
})