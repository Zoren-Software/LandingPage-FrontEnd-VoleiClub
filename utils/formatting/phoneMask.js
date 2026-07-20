/**
 * Máscara internacional de WhatsApp com DDI editável (E.164).
 * Default BR: +55 (47) 98429-4833
 * Outros: +1 555 123 4567 | +351 912 345 678
 */

const BRAZIL_DDI = '55'
const MAX_E164_DIGITS = 15
const MAX_BRAZIL_NATIONAL = 11

/**
 * Códigos de discagem (ITU), do mais longo para o mais curto —
 * necessário para casar corretamente (ex.: 1684 antes de 1).
 */
const CALLING_CODES = [
  '1684', '1264', '1268', '1242', '1246', '1441', '1670', '1671', '1758', '1767', '1784', '1868', '1869', '1876',
  '1340', '1345', '1473', '1649', '1664', '1721', '1787', '1939',
  '212', '213', '216', '218', '220', '221', '222', '223', '224', '225', '226', '227', '228', '229',
  '230', '231', '232', '233', '234', '235', '236', '237', '238', '239', '240', '241', '242', '243',
  '244', '245', '246', '248', '249', '250', '251', '252', '253', '254', '255', '256', '257', '258',
  '260', '261', '262', '263', '264', '265', '266', '267', '268', '269', '290', '291', '297', '298', '299',
  '350', '351', '352', '353', '354', '355', '356', '357', '358', '359',
  '370', '371', '372', '373', '374', '375', '376', '377', '378', '380', '381', '382', '383', '385', '386', '387', '389',
  '420', '421', '423',
  '500', '501', '502', '503', '504', '505', '506', '507', '508', '509',
  '590', '591', '592', '593', '594', '595', '596', '597', '598', '599',
  '670', '672', '673', '674', '675', '676', '677', '678', '679', '680', '681', '682', '683', '685', '686', '687', '688', '689',
  '690', '691', '692',
  '850', '852', '853', '855', '856', '880', '886',
  '960', '961', '962', '963', '964', '965', '966', '967', '968', '970', '971', '972', '973', '974', '975', '976', '977', '992', '993', '994', '995', '996', '998',
  '20', '27', '30', '31', '32', '33', '34', '36', '39', '40', '41', '43', '44', '45', '46', '47', '48', '49',
  '51', '52', '53', '54', '55', '56', '57', '58',
  '60', '61', '62', '63', '64', '65', '66',
  '81', '82', '84', '86', '90', '91', '92', '93', '94', '95', '98',
  '1', '7',
].sort((a, b) => b.length - a.length || a.localeCompare(b))

/** Só dígitos, no máximo 15 (E.164). */
export function extractPhoneDigits(input) {
  return String(input ?? '').replace(/\D/g, '').slice(0, MAX_E164_DIGITS)
}

/**
 * Separa DDI e número nacional pelo código ITU conhecido.
 * @returns {{ ddi: string, national: string } | null}
 */
export function parseInternationalPhone(input) {
  const digits = extractPhoneDigits(input)
  if (digits.length === 0) {
    return null
  }

  for (const code of CALLING_CODES) {
    if (digits.startsWith(code)) {
      return {
        ddi: code,
        national: digits.slice(code.length),
      }
    }
  }

  if (digits.length <= 3) {
    return null
  }

  const ddiLength = digits.length >= 12 ? 3 : digits.length >= 10 ? 2 : 1

  return {
    ddi: digits.slice(0, ddiLength),
    national: digits.slice(ddiLength),
  }
}

function formatBrazilNational(national) {
  const digits = national.slice(0, MAX_BRAZIL_NATIONAL)

  if (digits.length === 0) {
    return ''
  }

  if (digits.length <= 2) {
    return `(${digits}`
  }

  const ddd = digits.slice(0, 2)
  const local = digits.slice(2)

  if (local.length === 0) {
    return `(${ddd}) `
  }

  const isMobile = local.startsWith('9') || local.length > 8

  if (isMobile) {
    if (local.length <= 5) {
      return `(${ddd}) ${local}`
    }

    return `(${ddd}) ${local.slice(0, 5)}-${local.slice(5, 9)}`
  }

  if (local.length <= 4) {
    return `(${ddd}) ${local}`
  }

  return `(${ddd}) ${local.slice(0, 4)}-${local.slice(4, 8)}`
}

function formatGenericNational(national) {
  if (national.length === 0) {
    return ''
  }

  const groups = []
  let rest = national

  while (rest.length > 4) {
    groups.push(rest.slice(0, 3))
    rest = rest.slice(3)
  }

  if (rest.length > 0) {
    groups.push(rest)
  }

  return groups.join(' ')
}

/** Valor inicial do campo (DDI Brasil pré-preenchido, editável). */
export const DEFAULT_WHATSAPP_PHONE = '+55 '

/** Formata o valor digitado com DDI editável. */
export function formatWhatsappPhoneMask(input) {
  const raw = String(input ?? '')
  let digits = extractPhoneDigits(raw)

  // Colou só o número nacional BR (10/11 dígitos) sem DDI → assume +55.
  if (!raw.includes('+') && (digits.length === 10 || digits.length === 11)) {
    digits = `${BRAZIL_DDI}${digits}`.slice(0, MAX_E164_DIGITS)
  }

  if (digits.length === 0) {
    return '+'
  }

  const parsed = parseInternationalPhone(digits)
  if (parsed === null) {
    return `+${digits}`
  }

  const { ddi, national } = parsed
  const limitedNational = ddi === BRAZIL_DDI ? national.slice(0, MAX_BRAZIL_NATIONAL) : national

  if (limitedNational.length === 0) {
    return `+${ddi} `
  }

  if (ddi === BRAZIL_DDI) {
    return `+${ddi} ${formatBrazilNational(limitedNational)}`
  }

  return `+${ddi} ${formatGenericNational(limitedNational)}`
}

/** Aceita E.164 razoável; Brasil exige 10/11 dígitos nacionais. */
export function isValidWhatsappPhoneMask(masked) {
  const digits = extractPhoneDigits(masked)
  if (digits.length < 8 || digits.length > MAX_E164_DIGITS) {
    return false
  }

  const parsed = parseInternationalPhone(digits)
  if (parsed === null || parsed.ddi.length === 0) {
    return false
  }

  if (parsed.ddi === BRAZIL_DDI) {
    return parsed.national.length === 10 || parsed.national.length === 11
  }

  return parsed.national.length >= 4
}
