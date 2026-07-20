import { describe, expect, it } from 'vitest'
import {
  DEFAULT_WHATSAPP_PHONE,
  extractPhoneDigits,
  formatWhatsappPhoneMask,
  isValidWhatsappPhoneMask,
  parseInternationalPhone,
} from '../phoneMask.js'

describe('phoneMask', () => {
  it('mantém DDI +55 como padrão e formata celular BR', () => {
    expect(DEFAULT_WHATSAPP_PHONE).toBe('+55 ')
    expect(formatWhatsappPhoneMask('+55 ')).toBe('+55 ')
    expect(formatWhatsappPhoneMask('+5547984294833')).toBe('+55 (47) 98429-4833')
    expect(formatWhatsappPhoneMask('47984294833')).toBe('+55 (47) 98429-4833')
  })

  it('permite trocar o DDI para outro país', () => {
    expect(formatWhatsappPhoneMask('+351912345678')).toBe('+351 912 345 678')
    expect(formatWhatsappPhoneMask('+1 5551234567')).toBe('+1 555 123 4567')
  })

  it('valida números BR e internacionais', () => {
    expect(isValidWhatsappPhoneMask('+55 (47) 98429-4833')).toBe(true)
    expect(isValidWhatsappPhoneMask('+351 912 345 678')).toBe(true)
    expect(isValidWhatsappPhoneMask('+55 ')).toBe(false)
    expect(isValidWhatsappPhoneMask('+55 (47) 984')).toBe(false)
  })

  it('parseia DDI conhecido', () => {
    expect(parseInternationalPhone('+5547984294833')).toEqual({
      ddi: '55',
      national: '47984294833',
    })
    expect(extractPhoneDigits('+55 (47) 98429-4833')).toBe('5547984294833')
  })
})
