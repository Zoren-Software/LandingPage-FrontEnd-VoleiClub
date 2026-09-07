<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-2">{{ channelName }}</h1>
    <p class="mb-4">Acompanhe os leads gerados pelo seu link.</p>
    <p v-if="referralUrl" class="mb-4">
      <strong>Seu link:</strong>
      {{ referralUrl }}
    </p>
    <div class="flex gap-4 mb-6">
      <div>
        <div class="text-sm">Leads</div>
        <div class="text-xl font-bold">{{ leadsCount }}</div>
      </div>
      <div>
        <div class="text-sm">Conversões</div>
        <div class="text-xl font-bold">{{ conversionsCount }}</div>
      </div>
    </div>
    <va-data-table :items="leads" :columns="columns" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

definePageMeta({ layout: 'logged' })
useHead({ titleTemplate: 'Portal do parceiro' })

const { $customFetch } = useNuxtApp()
const channelName = ref('Seu canal')
const referralUrl = ref('')
const leadsCount = ref(0)
const conversionsCount = ref(0)
const leads = ref([])
const columns = [
  { key: 'name', label: 'Nome' },
  { key: 'email', label: 'E-mail' },
  { key: 'status', label: 'Status' },
]

onMounted(async () => {
  const dashboard = await $customFetch('/partner/dashboard', 'GET')
  channelName.value = dashboard.channel?.name ?? channelName.value
  referralUrl.value = dashboard.channel?.referral_url ?? ''
  leadsCount.value = dashboard.cards?.leads ?? 0
  conversionsCount.value = dashboard.cards?.conversions ?? 0
  const listed = await $customFetch('/partner/leads', 'GET')
  leads.value = listed.data ?? []
})
</script>
