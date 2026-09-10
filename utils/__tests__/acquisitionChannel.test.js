import { beforeEach, describe, expect, it } from 'vitest'
import {
  ACQ_REF_KEY,
  acquisitionChannelsQuery,
  applyApiValidationErrors,
  attributionPayload,
  captureAcquisition,
  channelTypeLabel,
  formErrorFromApi,
  portalPasswordError,
  publicReferralUrl,
  referralCopyUrl,
  referralDisplayPath,
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

describe('referral helpers', () => {
  it('monta a URL pública e o caminho de exibição do ref', () => {
    expect(publicReferralUrl('claudinei-tiktok', 'http://localhost:3001')).toBe(
      'http://localhost:3001/?ref=claudinei-tiktok',
    )
    expect(referralDisplayPath('claudinei-tiktok')).toBe('?ref=claudinei-tiktok')
    expect(channelTypeLabel('partner')).toBe('Parceiro')
    expect(channelTypeLabel('paid_traffic')).toBe('Tráfego pago')
  })

  it('copia a URL canônica do canal quando a API envia referral_url', () => {
    expect(referralCopyUrl('tiktok', 'http://localhost:3002/?ref=tiktok')).toBe(
      'http://localhost:3002/?ref=tiktok',
    )
    expect(referralCopyUrl('tiktok')).toBe(publicReferralUrl('tiktok'))
  })

  it('filtra canais por busca e dono na querystring', () => {
    expect(
      acquisitionChannelsQuery({
        search: 'claudinei',
        ownerUserId: 9,
        page: 2,
      }),
    ).toBe('?per_page=15&page=2&search=claudinei&owner_user_id=9')
  })
})

describe('validação do canal', () => {
  it('pede senha com pelo menos 8 caracteres em português', () => {
    expect(portalPasswordError('123456')).toBe('A senha deve ter pelo menos 8 caracteres.')
    expect(portalPasswordError('12345678')).toBe('')
  })

  it('traduz o 422 de senha da API e mantém o modal com o erro no campo', () => {
    const fields = {}
    const reason = new Error('The password field must be at least 8 characters.')
    reason.response = {
      errors: {
        password: ['The password field must be at least 8 characters.'],
      },
    }

    applyApiValidationErrors(fields, reason)

    expect(fields.password).toBe('A senha deve ter pelo menos 8 caracteres.')
    expect(formErrorFromApi(reason, 'Falha')).toBe('A senha deve ter pelo menos 8 caracteres.')
  })
})
