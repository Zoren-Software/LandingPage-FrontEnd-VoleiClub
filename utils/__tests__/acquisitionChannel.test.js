import { beforeEach, describe, expect, it } from 'vitest'
import {
  ACQ_REF_KEY,
  attributionPayload,
  captureAcquisition,
  visitPayload,
} from '../acquisitionChannel.js'
import { clearLandingSession, homePath, saveUserRole } from '../landingSession.js'

function installBrowserStorage() {
  const store = new Map()
  let cookieJar = ''

  globalThis.window = globalThis
  globalThis.localStorage = {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  }
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: {
      get cookie() {
        return cookieJar
      },
      set cookie(value) {
        const [pair] = String(value).split(';')
        const [name, raw] = pair.split('=')
        const next = `${name}=${raw}`
        cookieJar = cookieJar
          .split('; ')
          .filter((part) => part && !part.startsWith(`${name}=`))
          .concat(next)
          .join('; ')
      },
    },
  })
}

describe('acquisitionChannel', () => {
  beforeEach(() => {
    installBrowserStorage()
  })

  it('atualiza o ref quando a URL traz um novo canal', () => {
    const first = captureAcquisition({ ref: 'instagram', search: '?utm_source=bio' })
    const second = captureAcquisition({ ref: 'claudinei-cerutti', search: '?utm_source=affiliate' })

    expect(first.ref).toBe('instagram')
    expect(second.ref).toBe('claudinei-cerutti')
    expect(second.utm_source).toBe('affiliate')
    expect(localStorage.getItem(ACQ_REF_KEY)).toBe('claudinei-cerutti')
    expect(first.visitor_token).toBe(second.visitor_token)
  })

  it('mantém o canal armazenado em acesso direto sem ref', () => {
    captureAcquisition({ ref: 'instagram' })

    expect(captureAcquisition({ ref: null }).ref).toBe('instagram')
    expect(attributionPayload().ref).toBe('instagram')
  })

  it('lê o ref da querystring quando um novo canal chega na URL', () => {
    captureAcquisition({ ref: 'instagram' })

    expect(captureAcquisition({ search: '?ref=claudinei-cerutti' }).ref).toBe('claudinei-cerutti')
    expect(localStorage.getItem(ACQ_REF_KEY)).toBe('claudinei-cerutti')
  })

  it('reusa o visitor_token persistido no payload de lead e visita', () => {
    captureAcquisition({ ref: 'joao-silva' })
    const lead = attributionPayload()
    const visit = visitPayload('tiktok')

    expect(lead.ref).toBe('joao-silva')
    expect(visit.ref).toBe('tiktok')
    expect(visit.visitor_token).toBe(lead.visitor_token)
  })
})

describe('landingSession', () => {
  beforeEach(() => {
    installBrowserStorage()
  })

  it('leva parceiro para o portal e admin para leads', () => {
    saveUserRole('partner')
    expect(homePath()).toBe('/partner')

    saveUserRole('admin')
    expect(homePath()).toBe('/leads')
  })

  it('limpa o papel no logout', () => {
    saveUserRole('partner')
    localStorage.setItem('userToken', 'token')
    clearLandingSession()

    expect(homePath()).toBe('/leads')
    expect(localStorage.getItem('userToken')).toBeNull()
  })
})
