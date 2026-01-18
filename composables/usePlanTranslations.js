/**
 * Composable para traduzir dados de planos vindos da API
 * Mapeia valores da API para chaves de tradução
 */

export const usePlanTranslations = () => {
  const { t } = useI18n()

  /**
   * Mapeamento de features da API para chaves de tradução
   */
  const featureTranslationMap = {
    'Gestão completa de jogadores': 'plan_feature_complete_player_management',
    'Gestão limitada de jogadores': 'plan_feature_limited_player_management',
    'Controle de presença': 'plan_feature_attendance_control',
    'Relatórios e estatísticas': 'plan_feature_reports_statistics',
    'Suporte por email': 'plan_feature_email_support',
    'Suporte premium': 'plan_feature_premium_support',
    'Acesso vitalício': 'plan_feature_lifetime_access',
    'Atualizações gratuitas': 'plan_feature_free_updates',
  }

  /**
   * Mapeamento de nomes de planos da API para chaves de tradução
   */
  const planNameTranslationMap = {
    'Plano Vitalício': 'plan_card_lifetime_title',
    'Plano Pro Mensal': 'plan_card_pro_title',
    'Plano Pro Anual': 'plan_card_pro_title',
    'Plano Clubes Mensal': 'plan_card_clubers_title',
    'Plano Clubes Anual': 'plan_card_clubers_title',
  }

  /**
   * Traduz uma feature baseado no valor da API
   * @param {string} feature - Feature vinda da API
   * @returns {string} Feature traduzida
   */
  const translateFeature = (feature) => {
    if (!feature) return feature
    
    // Verifica se existe tradução mapeada
    const translationKey = featureTranslationMap[feature]
    if (translationKey) {
      const translated = t(translationKey)
      // Se a tradução retornar a própria chave, significa que não existe tradução
      // Nesse caso, retorna o valor original
      return translated !== translationKey ? translated : feature
    }
    
    // Se não houver mapeamento, retorna o valor original
    return feature
  }

  /**
   * Traduz um array de features
   * @param {string[]} features - Array de features da API
   * @returns {string[]} Array de features traduzidas
   */
  const translateFeatures = (features) => {
    if (!Array.isArray(features)) return []
    return features.map(translateFeature)
  }

  /**
   * Traduz o nome de um plano
   * @param {string} planName - Nome do plano da API
   * @param {string} planType - Tipo do plano (pro, clubes, lifetime)
   * @param {string} planPeriod - Período (monthly, yearly, lifetime)
   * @returns {string} Nome do plano traduzido
   */
  const translatePlanName = (planName, planType, planPeriod) => {
    if (!planName) return planName

    // Tenta usar o mapeamento direto
    const translationKey = planNameTranslationMap[planName]
    if (translationKey) {
      const translated = t(translationKey)
      if (translated !== translationKey) {
        return translated
      }
    }

    // Fallback: usa tradução baseada no tipo e período
    if (planType === 'pro') {
      return t('plan_card_pro_title')
    } else if (planType === 'clubes') {
      return t('plan_card_clubers_title')
    } else if (planType === 'lifetime') {
      return t('plan_card_lifetime_title')
    }

    return planName
  }

  /**
   * Traduz um objeto de produto completo da API
   * @param {Object} product - Produto da API
   * @returns {Object} Produto com campos traduzidos
   */
  const translateProduct = (product) => {
    if (!product) return product

    const translated = { ...product }

    // Traduz o nome
    if (product.name) {
      translated.name = translatePlanName(
        product.name,
        product.metadata?.plan_type,
        product.metadata?.type
      )
    }

    // Traduz as features
    if (product.metadata?.display_features) {
      try {
        const features = JSON.parse(product.metadata.display_features)
        translated.metadata = {
          ...product.metadata,
          display_features: JSON.stringify(translateFeatures(features)),
        }
        // Adiciona array traduzido para facilitar o uso
        translated.displayFeatures = translateFeatures(features)
      } catch (e) {
        console.warn('Erro ao parsear display_features:', e)
        translated.displayFeatures = []
      }
    }

    return translated
  }

  return {
    translateFeature,
    translateFeatures,
    translatePlanName,
    translateProduct,
  }
}

