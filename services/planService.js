/**
 * Service para buscar informações do plano ativo do VoleiClub
 * Integração com a API do VoleiClub para obter informações do trial e produtos
 */

/**
 * Obter URL base da API do VoleiClub
 * @returns {string} URL base da API
 */
const getVoleiClubApiUrl = () => {
  if (process.client) {
    // Tentar obter do runtime config do Nuxt (NUXT_PUBLIC_API_TENANTS)
    if (typeof window !== 'undefined' && window.__NUXT__?.config?.public?.apiTenants) {
      return window.__NUXT__.config.public.apiTenants
    }
    // Tentar obter do process.env como fallback
    if (process.env.NUXT_PUBLIC_API_TENANTS) {
      return process.env.NUXT_PUBLIC_API_TENANTS
    }
  }
  // Valor padrão como fallback (apenas para desenvolvimento local)
  return 'http://api.volleytrack.local/v1'
}

/**
 * Obter token da API do VoleiClub
 * @returns {string|null} Token da API
 */
const getVoleiClubToken = () => {
  if (process.client) {
    // Tentar obter do runtime config
    if (typeof window !== 'undefined' && window.__NUXT__?.config?.public?.voleiClubApiToken) {
      return window.__NUXT__.config.public.voleiClubApiToken
    }
    // Tentar obter do process.env
    if (process.env.VOLEICLUB_API_TOKEN) {
      return process.env.VOLEICLUB_API_TOKEN
    }
  }
  return null
}

/**
 * Formatar preço em reais
 * @param {number} amount - Valor em centavos
 * @returns {string} Preço formatado
 */
const formatPrice = (amount) => {
  if (!amount) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount / 100);
}

/**
 * Buscar informações do plano ativo
 * @param {string} tenantId - ID do tenant (opcional)
 * @returns {Promise<Object>} Dados do plano ativo e trial
 */
export const getActivePlan = async (tenantId = null) => {
  try {
    console.log('🔍 Consultando plano ativo do tenant:', tenantId)

    const apiBaseUrl = getVoleiClubApiUrl()
    const token = getVoleiClubToken()

    if (!token) {
      console.warn('⚠️ Token da API do VoleiClub não encontrado. Retornando dados padrão do trial.')
      // Retornar dados padrão do trial se não houver token
      return {
        success: true,
        data: {
          has_active_plan: false,
          trial_info: {
            in_trial: true,
            trial_ends_at: null,
            days_remaining: 14,
            total_trial_days: 14,
            message: 'Trial gratuito de 14 dias'
          }
        }
      }
    }

    // Construir URL com tenant_id como parâmetro de query
    let url = `${apiBaseUrl}/customers/active-plan`
    if (tenantId) {
      url += `?tenant_id=${encodeURIComponent(tenantId)}`
    }

    console.log('🔍 URL da requisição:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': token
      }
    })

    console.log('🔍 Response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('❌ Erro na consulta do plano ativo:', errorData)
      
      // Se houver erro, retornar dados padrão do trial
      return {
        success: true,
        data: {
          has_active_plan: false,
          trial_info: {
            in_trial: true,
            trial_ends_at: null,
            days_remaining: 14,
            total_trial_days: 14,
            message: 'Trial gratuito de 14 dias'
          }
        }
      }
    }

    const data = await response.json()
    console.log('✅ Plano ativo consultado com sucesso:', data)
    
    return {
      success: true,
      data: data.data || data
    }
  } catch (error) {
    console.error('❌ Erro ao consultar plano ativo:', error)
    // Em caso de erro, retornar dados padrão do trial
    return {
      success: true,
      data: {
        has_active_plan: false,
        trial_info: {
          in_trial: true,
          trial_ends_at: null,
          days_remaining: 14,
          total_trial_days: 14,
          message: 'Trial gratuito de 14 dias'
        }
      }
    }
  }
}

/**
 * Buscar produtos/planos disponíveis
 * @returns {Promise<Object>} Lista de produtos organizados por tipo
 */
export const getProducts = async () => {
  try {
    console.log('🔍 Consultando produtos disponíveis')

    const apiBaseUrl = getVoleiClubApiUrl()
    const token = getVoleiClubToken()

    const url = `${apiBaseUrl}/products`

    console.log('🔍 URL da requisição:', url)

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['token'] = token
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    })

    console.log('🔍 Response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('❌ Erro na consulta de produtos:', errorData)
      throw new Error(`Erro ao buscar produtos: ${response.status}`)
    }

    const data = await response.json()
    console.log('✅ Produtos consultados com sucesso:', data)

    if (!data.success || !data.data) {
      throw new Error('Resposta inválida da API')
    }

    // Processar e organizar produtos
    const products = data.data
    const organizedProducts = {
      pro: {
        monthly: null,
        yearly: null,
      },
      clubes: {
        monthly: null,
        yearly: null,
      },
      lifetime: null,
    }

    products.forEach((product) => {
      const planType = product.metadata?.plan_type
      const type = product.metadata?.type
      const price = product.prices?.data?.[0]

      if (!price) return

      const productData = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: {
          id: price.id,
          amount: price.unit_amount,
          formatted: formatPrice(price.unit_amount),
          type: price.type,
          recurring: price.recurring,
        },
        metadata: product.metadata,
        displayFeatures: product.metadata?.display_features 
          ? JSON.parse(product.metadata.display_features) 
          : [],
      }

      if (planType === 'pro') {
        if (type === 'monthly') {
          organizedProducts.pro.monthly = productData
        } else if (type === 'yearly') {
          organizedProducts.pro.yearly = productData
        }
      } else if (planType === 'clubes') {
        if (type === 'monthly') {
          organizedProducts.clubes.monthly = productData
        } else if (type === 'yearly') {
          organizedProducts.clubes.yearly = productData
        }
      } else if (planType === 'lifetime') {
        organizedProducts.lifetime = productData
      }
    })

    return {
      success: true,
      data: organizedProducts,
    }
  } catch (error) {
    console.error('❌ Erro ao consultar produtos:', error)
    return {
      success: false,
      error: error.message,
      data: {
        pro: { monthly: null, yearly: null },
        clubes: { monthly: null, yearly: null },
        lifetime: null,
      },
    }
  }
}

/**
 * Buscar informações sobre planos vitalícios vendidos
 * @returns {Promise<Object>} Dados sobre planos vitalícios (total vendido, limite, restantes, etc.)
 */
export const getLifetimePlansCount = async () => {
  try {
    console.log('🔍 Consultando contagem de planos vitalícios')

    const apiBaseUrl = getVoleiClubApiUrl()
    const token = getVoleiClubToken()

    const url = `${apiBaseUrl}/customers/lifetime-plans-count`

    console.log('🔍 URL da requisição:', url)

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['token'] = token
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    })

    console.log('🔍 Response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('❌ Erro na consulta de planos vitalícios:', errorData)
      return {
        success: false,
        error: errorData.message || 'Erro ao buscar informações de planos vitalícios',
        data: null
      }
    }

    const data = await response.json()
    console.log('✅ Contagem de planos vitalícios consultada com sucesso:', data)

    return {
      success: true,
      data: data.data || data
    }
  } catch (error) {
    console.error('❌ Erro ao consultar contagem de planos vitalícios:', error)
    return {
      success: false,
      error: error.message,
      data: null
    }
  }
}

