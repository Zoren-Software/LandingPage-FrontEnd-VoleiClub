import {
  homePath,
  isAdminPath,
  isPartnerPath,
  isPartnerSession,
  isProtectedPath,
} from '~/utils/landingSession.js'

export default defineNuxtRouteMiddleware((to) => {
  if (!process.client) {
    return
  }

  const token = localStorage.getItem('userToken')
  const destination = to.path

  if (destination === '/login' && token != null) {
    return navigateTo(homePath())
  }

  if (isProtectedPath(destination) && !token) {
    return navigateTo('/login')
  }

  if (token && isPartnerSession() && isAdminPath(destination)) {
    return navigateTo('/partner')
  }

  if (token && !isPartnerSession() && isPartnerPath(destination)) {
    return navigateTo('/leads')
  }
})
