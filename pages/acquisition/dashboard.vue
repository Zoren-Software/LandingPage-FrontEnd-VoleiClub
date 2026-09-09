<template>
  <div class="p-4 acq-page">
    <header class="acq-toolbar">
      <div>
        <h1>Desempenho por canal</h1>
        <p>Leads, conversões e receita atribuídos no período.</p>
      </div>
      <div class="acq-toolbar__actions">
        <ZButton preset="secondary" :loading="loading" :disabled="loading" @click="load">Atualizar</ZButton>
      </div>
    </header>

    <va-alert v-if="error" color="danger">
      {{ error }}
      <ZButton class="ml-3" preset="plain" color="danger" @click="load">Tentar novamente</ZButton>
    </va-alert>

    <section class="acq-metrics" aria-label="Resumo de aquisição">
      <article v-for="card in cards" :key="card.label" class="acq-metric">
        <span class="acq-metric__label">{{ card.label }}</span>
        <strong class="acq-metric__value">{{ card.value }}</strong>
        <span class="acq-metric__hint">{{ card.hint }}</span>
      </article>
    </section>

    <va-card class="acq-card">
      <va-card-title>Ranking</va-card-title>
      <va-card-content>
        <div v-if="loading" class="acq-loading">Carregando ranking…</div>
        <div v-else-if="!ranking.length" class="acq-empty">Nenhum canal com dados neste período.</div>
        <div v-else class="acq-table-wrap">
          <table class="acq-table">
            <thead>
              <tr>
                <th class="acq-col-name">Canal</th>
                <th class="acq-col-leads acq-num">Leads</th>
                <th class="acq-col-leads acq-num">Conversões</th>
                <th class="acq-col-leads acq-num">Receita</th>
                <th class="acq-col-leads acq-num">Taxa</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="channel in ranking" :key="channel.id || channel.slug">
                <td class="acq-col-name">
                  <div class="acq-stack">
                    <span class="acq-stack__primary">{{ channel.name }}</span>
                    <span v-if="channel.slug" class="acq-stack__secondary">?ref={{ channel.slug }}</span>
                  </div>
                </td>
                <td class="acq-num">{{ channel.leads ?? 0 }}</td>
                <td class="acq-num">{{ channel.conversions ?? 0 }}</td>
                <td class="acq-num">{{ formatMoney(channel.revenue_cents) }}</td>
                <td class="acq-num">{{ formatPercent(channel.conversion_rate) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import ZButton from '~/components/atoms/Buttons/ZButton.vue'
import '~/assets/css/acquisition-admin.css'

definePageMeta({ layout: 'logged' })
useHead({ titleTemplate: 'Dashboard de aquisição' })

const { $customFetch } = useNuxtApp()
const loading = ref(false)
const error = ref('')
const leads = ref(0)
const conversions = ref(0)
const revenueCents = ref(0)
const conversionRate = ref(0)
const ranking = ref([])

const cards = computed(() => [
  { label: 'Leads', value: String(leads.value), hint: 'Atribuição no período' },
  { label: 'Conversões', value: String(conversions.value), hint: 'Primeiro pagamento' },
  {
    label: 'Receita',
    value: formatMoney(revenueCents.value),
    hint: 'Valor atribuído',
  },
  { label: 'Taxa', value: formatPercent(conversionRate.value), hint: 'Conversões / leads' },
])

function formatMoney(cents) {
  return ((Number(cents) || 0) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatPercent(value) {
  return `${Number(value || 0).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const response = await $customFetch('/acquisition-dashboard', 'GET')
    leads.value = response.cards?.leads ?? 0
    conversions.value = response.cards?.conversions ?? 0
    revenueCents.value = response.cards?.revenue_cents ?? 0
    conversionRate.value = response.cards?.conversion_rate ?? 0
    ranking.value = response.ranking ?? []
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : 'Não foi possível carregar o dashboard.'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
