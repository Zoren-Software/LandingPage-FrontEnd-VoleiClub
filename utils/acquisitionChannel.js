export const ACQ_REF_KEY = 'acq_ref'
export const ACQ_VID_KEY = 'acq_vid'
export const ACQ_UTM_KEY = 'acq_utm'
export const ACQ_COOKIE_DAYS = 90

function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
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
  const incomingRef = typeof ref === 'string' && ref.trim() !== '' ? ref.trim() : null
  const storedRef = readStoredRef()
  const firstTouchRef = storedRef || incomingRef

  if (firstTouchRef && !storedRef) {
    persist(ACQ_REF_KEY, firstTouchRef)
  }

  const storedUtms = readStoredUtms()
  const incomingUtms = utmsFromSearch(search)
  const firstTouchUtms = hasAnyUtm(storedUtms) ? storedUtms : incomingUtms

  if (!hasAnyUtm(storedUtms) && hasAnyUtm(incomingUtms)) {
    persist(ACQ_UTM_KEY, JSON.stringify(firstTouchUtms))
  }

  return {
    ref: firstTouchRef,
    visitor_token: visitorToken,
    ...firstTouchUtms,
  }
}

export function attributionPayload() {
  return {
    ref: readStoredRef(),
    visitor_token: getOrCreateVisitorToken(),
    ...readStoredUtms(),
  }
}

export function visitPayload(incomingRef) {
  const stored = attributionPayload()
  const ref =
    (typeof incomingRef === 'string' && incomingRef.trim() !== '' ? incomingRef.trim() : null) || stored.ref

  return {
    ...stored,
    ref,
  }
}
