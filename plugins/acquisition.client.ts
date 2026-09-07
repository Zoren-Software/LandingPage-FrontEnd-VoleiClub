import { watch } from 'vue'

export default defineNuxtPlugin(() => {
  const route = useRoute()
  const { $customFetch } = useNuxtApp()

  const track = async () => {
    if (route.path.startsWith('/r/')) {
      return
    }

    const { captureAcquisition, visitPayload } = await import('~/utils/acquisitionChannel.js')
    const queryRef = typeof route.query.ref === 'string' ? route.query.ref : null
    const context = captureAcquisition({
      ref: queryRef,
      search: window.location.search,
    })
    const payload = visitPayload(queryRef)

    if (!payload.ref) {
      return
    }

    try {
      await $customFetch('/channel-visits', 'POST', {
        body: JSON.stringify({
          ref: payload.ref,
          visitor_token: context.visitor_token,
          landing_path: route.path,
          utm_source: payload.utm_source,
          utm_medium: payload.utm_medium,
          utm_campaign: payload.utm_campaign,
        }),
      })
    } catch {
      // Tracking must never block the landing page.
    }
  }

  watch(
    () => [route.fullPath, route.query.ref],
    () => {
      void track()
    },
    { immediate: true },
  )
})
