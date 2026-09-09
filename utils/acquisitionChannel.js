export const ACQ_REF_KEY = 'acq_ref'
export const ACQ_VID_KEY = 'acq_vid'
export const ACQ_UTM_KEY = 'acq_utm'
export const ACQ_COOKIE_DAYS = 90

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

function currentSearch() {
  if (!isBrowser()) {
    return ''
  }

  return window.location?.search ?? ''
}

function storage() {
  return isBrowser() ? window.localStorage : null
}

export function readCookie(name) {
  if (!isBrowser()) {
    return null
  }

  const prefix = `${name}=`
  const match = document.cookie.split('; ').find((part) => part.startsWith(prefix))
  if (!match) {
    return null
  }

  return decodeURIComponent(match.slice(prefix.length)) || null
}

export function writeCookie(name, value, days = ACQ_COOKIE_DAYS) {
  if (!isBrowser()) {
    return
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${days * 86400}; path=/; SameSite=Lax`
}

function persist(key, value) {
  storage()?.setItem(key, value)
  writeCookie(key, value)
}

function readStored(key) {
  return storage()?.getItem(key) || readCookie(key)
}

export function createVisitorToken() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = Math.floor(Math.random() * 16)
    const value = char === 'x' ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
}

export function getOrCreateVisitorToken() {
  const existing = readStored(ACQ_VID_KEY)
  if (existing) {
    persist(ACQ_VID_KEY, existing)
    return existing
  }

  const token = createVisitorToken()
  persist(ACQ_VID_KEY, token)
  return token
}

export function readStoredRef() {
  return readStored(ACQ_REF_KEY)
}

function readStoredUtms() {
  const raw = readStored(ACQ_UTM_KEY)
  if (!raw) {
    return { utm_source: null, utm_medium: null, utm_campaign: null }
  }

  try {
    const parsed = JSON.parse(raw)
    return {
      utm_source: parsed.utm_source ?? null,
      utm_medium: parsed.utm_medium ?? null,
      utm_campaign: parsed.utm_campaign ?? null,
    }
  } catch {
    return { utm_source: null, utm_medium: null, utm_campaign: null }
  }
}

function utmsFromSearch(search) {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
  }
}

function hasAnyUtm(utms) {
  return Boolean(utms.utm_source || utms.utm_medium || utms.utm_campaign)
}

export function captureAcquisition({ ref, search = '' } = {}) {
  const visitorToken = getOrCreateVisitorToken()
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  const fromArg = typeof ref === 'string' && ref.trim() !== '' ? ref.trim() : null
  const fromSearch = params.get('ref')
  const incomingRef = fromArg ?? (fromSearch && fromSearch.trim() !== '' ? fromSearch.trim() : null)
  const storedRef = readStoredRef()
  const resolvedRef = incomingRef ?? storedRef

  if (incomingRef) {
    persist(ACQ_REF_KEY, incomingRef)
  }

  const storedUtms = readStoredUtms()
  const incomingUtms = utmsFromSearch(search)
  const resolvedUtms = hasAnyUtm(incomingUtms) ? incomingUtms : storedUtms

  if (hasAnyUtm(incomingUtms)) {
    persist(ACQ_UTM_KEY, JSON.stringify(incomingUtms))
  }

  return {
    ref: resolvedRef,
    visitor_token: visitorToken,
    ...resolvedUtms,
  }
}

export function attributionPayload() {
  return captureAcquisition({
    search: currentSearch(),
  })
}

export function visitPayload(incomingRef) {
  return captureAcquisition({
    ref: incomingRef,
    search: currentSearch(),
  })
}

export const CHANNEL_TYPE_LABELS = {
  social_media: 'Mídia social',
  partner: 'Parceiro',
  affiliate: 'Afiliado',
  paid_traffic: 'Tráfego pago',
  organic: 'Orgânico',
  event: 'Evento',
  email_marketing: 'E-mail marketing',
  content: 'Conteúdo',
  other: 'Outro',
}

export function channelTypeLabel(type) {
  return CHANNEL_TYPE_LABELS[type] ?? type ?? '—'
}

export function publicReferralUrl(slug, origin) {
  const resolvedOrigin = origin ?? (typeof window !== 'undefined' ? window.location?.origin ?? '' : '')
  const ref = encodeURIComponent(String(slug ?? '').trim())
  const base = String(resolvedOrigin).replace(/\/$/, '')

  return `${base}/?ref=${ref}`
}

export function referralCopyUrl(slug, referralUrl) {
  if (typeof referralUrl === 'string' && referralUrl.trim() !== '') {
    return referralUrl.trim()
  }

  return publicReferralUrl(slug)
}

export function referralDisplayPath(slug) {
  return `?ref=${String(slug ?? '').trim()}`
}

export function acquisitionChannelsQuery({ search, ownerUserId, page = 1, perPage = 15 } = {}) {
  const params = new URLSearchParams()
  params.set('per_page', String(perPage))
  params.set('page', String(page))
  if (search) {
    params.set('search', search)
  }
  if (ownerUserId) {
    params.set('owner_user_id', String(ownerUserId))
  }

  return `?${params.toString()}`
}
