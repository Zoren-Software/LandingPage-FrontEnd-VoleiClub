export const USER_ROLE_KEY = 'userRole'

export function normalizeRole(role) {
  return role === 'partner' ? 'partner' : 'admin'
}

export function saveUserRole(role) {
  if (typeof localStorage === 'undefined') {
    return
  }

  localStorage.setItem(USER_ROLE_KEY, normalizeRole(role))
}

export function getUserRole() {
  if (typeof localStorage === 'undefined') {
    return null
  }

  const value = localStorage.getItem(USER_ROLE_KEY)
  return value === 'partner' || value === 'admin' ? value : null
}

export function isPartnerSession() {
  return getUserRole() === 'partner'
}

export function homePath() {
  return isPartnerSession() ? '/partner' : '/leads'
}

export function clearLandingSession() {
  if (typeof localStorage === 'undefined') {
    return
  }

  localStorage.removeItem('userToken')
  localStorage.removeItem('email')
  localStorage.removeItem(USER_ROLE_KEY)
}

export function isAdminPath(path) {
  return path === '/leads' || path.startsWith('/leads/') || path === '/acquisition' || path.startsWith('/acquisition/')
}

export function isPartnerPath(path) {
  return path === '/partner' || path.startsWith('/partner/')
}

export function isProtectedPath(path) {
  return isAdminPath(path) || isPartnerPath(path)
}
