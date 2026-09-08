<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4 gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-bold mb-1">{{ channelName }}</h1>
        <p>Acompanhe os leads gerados pelos seus links.</p>
      </div>
      <ZButton color="primary" @click="openCreate">Novo link</ZButton>
    </div>
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
    <h2 class="text-lg font-semibold mb-2">Seus links</h2>
    <va-data-table :items="links" :columns="linkColumns" class="mb-6">
      <template #cell(referral_url)="{ rowData }">
        {{ rowData.referral_url }}
      </template>
    </va-data-table>
    <h2 class="text-lg font-semibold mb-2">Seus leads</h2>
    <va-data-table :items="leads" :columns="columns" />
    <va-modal v-model="creating" title="Novo link">
      <va-alert v-if="formError" color="danger" class="mb-3">{{ formError }}</va-alert>
      <va-input v-model="form.name" label="Nome" class="mb-3" />
      <va-input v-model="form.slug" label="Slug" class="mb-3" />
      <va-select
        v-model="form.type"
        :options="types"
        valueBy="value"
        textBy="text"
        label="Tipo / rede"
        class="mb-3"
      />
      <template #footer>
        <ZButton @click="creating = false">Cancelar</ZButton>
        <ZButton color="primary" :loading="saving" @click="submit">Salvar</ZButton>
      </template>
    </va-modal>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import ZButton from '~/components/atoms/Buttons/ZButton.vue'

definePageMeta({ layout: 'logged' })
useHead({ titleTemplate: 'Portal do parceiro' })

const { $customFetch } = useNuxtApp()
const channelName = ref('Seu canal')
const leadsCount = ref(0)
const conversionsCount = ref(0)
const links = ref([])
const leads = ref([])
const creating = ref(false)
const saving = ref(false)
const formError = ref('')
const form = reactive({ name: '', slug: '', type: 'social_media' })
const types = [
  { value: 'social_media', text: 'Rede social' },
  { value: 'paid_traffic', text: 'Tráfego pago' },
  { value: 'organic', text: 'Orgânico' },
  { value: 'event', text: 'Evento' },
  { value: 'email_marketing', text: 'E-mail marketing' },
  { value: 'content', text: 'Conteúdo' },
  { value: 'other', text: 'Outro' },
]
const linkColumns = [
  { key: 'name', label: 'Nome' },
  { key: 'type', label: 'Tipo' },
  { key: 'referral_url', label: 'Link' },
  { key: 'leads_count', label: 'Leads' },
]
const columns = [
  { key: 'name', label: 'Nome' },
  { key: 'email', label: 'E-mail' },
  { key: 'status', label: 'Status' },
  { key: 'origin', label: 'Origem' },
]

function openCreate() {
  form.name = ''
  form.slug = ''
  form.type = 'social_media'
  formError.value = ''
  creating.value = true
}

async function load() {
  const dashboard = await $customFetch('/partner/dashboard', 'GET')
  channelName.value = dashboard.channel?.name ?? channelName.value
  leadsCount.value = dashboard.cards?.leads ?? 0
  conversionsCount.value = dashboard.cards?.conversions ?? 0
  links.value = dashboard.links ?? []
  const listed = await $customFetch('/partner/leads', 'GET')
  leads.value = (listed.data ?? []).map((lead) => ({
    ...lead,
    origin: lead.channel?.name ?? '—',
  }))
}

async function submit() {
  saving.value = true
  formError.value = ''
  try {
    await $customFetch('/partner/channels', 'POST', {
      body: JSON.stringify({
        name: form.name,
        slug: form.slug || undefined,
        type: form.type,
      }),
    })
    creating.value = false
    await load()
  } catch (reason) {
    formError.value = reason instanceof Error ? reason.message : 'Não foi possível criar o link.'
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
