<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Desempenho por canal</h1>
    <div class="flex gap-4 mb-6">
      <div v-for="card in cards" :key="card.label">
        <div class="text-sm">{{ card.label }}</div>
        <div class="text-xl font-bold">{{ card.value }}</div>
      </div>
    </div>
    <va-data-table :items="ranking" :columns="columns" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

definePageMeta({ layout: 'logged' })
useHead({ titleTemplate: 'Dashboard de aquisição' })

const { $customFetch } = useNuxtApp()
const leads = ref(0)
const conversions = ref(0)
const revenueCents = ref(0)
const ranking = ref([])
const cards = computed(() => [
  { label: 'Leads', value: leads.value },
  { label: 'Conversões', value: conversions.value },
  { label: 'Receita', value: (revenueCents.value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) },
])
const columns = [
  { key: 'name', label: 'Canal' },
  { key: 'leads', label: 'Leads' },
  { key: 'conversions', label: 'Conversões' },
  { key: 'revenue_cents', label: 'Receita (centavos)' },
]

onMounted(async () => {
  const response = await $customFetch('/acquisition-dashboard', 'GET')
  leads.value = response.cards?.leads ?? 0
  conversions.value = response.cards?.conversions ?? 0
  revenueCents.value = response.cards?.revenue_cents ?? 0
  ranking.value = response.ranking ?? []
})
</script>
