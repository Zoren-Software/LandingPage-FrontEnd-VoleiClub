<template>
  <div class="p-4 acq-page">
    <header class="acq-toolbar">
      <div>
        <div class="text-xs uppercase tracking-wide text-gray-500 mb-1">Portal do parceiro</div>
        <h1>{{ channelName }}</h1>
        <p>Acompanhe os leads gerados pelos seus links. Crie um por rede ou campanha.</p>
      </div>
      <div class="acq-toolbar__actions">
        <ZButton preset="secondary" :loading="loading" :disabled="loading" @click="load">Atualizar</ZButton>
        <ZButton color="primary" data-test="create-partner-link" @click="openCreate">Novo link</ZButton>
      </div>
    </header>

    <va-alert v-if="error" color="danger" class="mb-0">
      {{ error }}
      <ZButton class="ml-3" preset="plain" color="danger" @click="load">Tentar novamente</ZButton>
    </va-alert>

    <va-card class="acq-card">
      <va-card-title>
        <div>
          <div>Seus links</div>
          <p class="acq-filters__meta mt-1">Crie um link por rede ou campanha para ver de onde veio cada lead.</p>
        </div>
      </va-card-title>
      <va-card-content>
        <div v-if="!links.length" class="acq-empty">Nenhum link ainda.</div>
        <div v-else class="acq-table-wrap">
          <table class="acq-table">
            <thead>
              <tr>
                <th class="acq-col-name">Nome</th>
                <th class="acq-col-type">Tipo</th>
                <th class="acq-col-link">Link</th>
                <th class="acq-col-leads acq-num">Leads</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="link in links" :key="link.id">
                <td class="acq-col-name">
                  <div class="acq-stack">
                    <span class="acq-stack__primary">{{ link.name }}</span>
                    <span class="acq-stack__secondary">?ref={{ link.slug }}</span>
                  </div>
                </td>
                <td class="acq-col-type">
                  <span class="acq-chip">{{ channelTypeLabel(link.type) }}</span>
                </td>
                <td class="acq-col-link">
                  <ZReferralCopyButton :slug="link.slug" :name="link.name" :url="link.referral_url" />
                </td>
                <td class="acq-col-leads acq-num">{{ link.leads_count ?? 0 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>

    <section class="acq-metrics" aria-label="Resumo de aquisição">
      <article v-for="card in cards" :key="card.label" class="acq-metric">
        <span class="acq-metric__label">{{ card.label }}</span>
        <strong class="acq-metric__value">{{ card.value }}</strong>
        <span class="acq-metric__hint">{{ card.hint }}</span>
        <span v-if="card.progress !== undefined" class="acq-progress" aria-hidden="true">
          <span class="acq-progress__fill" :style="{ width: `${card.progress}%` }" />
        </span>
      </article>
    </section>

    <va-card class="acq-card">
      <va-card-title>
        <div class="flex items-center justify-between gap-3 flex-wrap w-full">
          <div>
            <div>Seus leads</div>
            <p class="acq-filters__meta mt-1">Pessoas que chegaram pela sua indicação.</p>
          </div>
          <span class="acq-filters__meta">{{ total }} no total</span>
        </div>
      </va-card-title>
      <va-card-content>
        <div v-if="loading" class="acq-loading">Carregando leads…</div>
        <div v-else-if="!leads.length" class="acq-empty">Nenhum lead pelo seu link ainda.</div>
        <div v-else class="acq-table-wrap">
          <table class="acq-table">
            <thead>
              <tr>
                <th class="acq-col-name">Nome</th>
                <th class="acq-col-email">E-mail</th>
                <th class="acq-col-origin">Origem</th>
                <th class="acq-col-status">Status</th>
                <th class="acq-col-date">Data</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lead in leads" :key="lead.id">
                <td class="acq-col-name">
                  <span class="acq-stack__primary">{{ lead.name }}</span>
                </td>
                <td class="acq-col-email">
                  <span class="acq-stack__secondary acq-clip" :title="lead.email">{{ lead.email }}</span>
                </td>
                <td class="acq-col-origin">
                  <div v-if="lead.channel" class="acq-stack">
                    <span class="acq-stack__primary">{{ lead.channel.name }}</span>
                    <span class="acq-stack__secondary">?ref={{ lead.channel.slug }}</span>
                  </div>
                  <span v-else class="acq-stack__secondary">Sem canal</span>
                </td>
                <td class="acq-col-status">
                  <span class="acq-chip">{{ lead.status === 'Cliente' ? 'Cliente' : 'Lead' }}</span>
                </td>
                <td class="acq-col-date">{{ formatShortDate(lead.created_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="!loading && !error && leads.length" class="acq-footer">
          <div class="acq-pager">
            <ZButton
              preset="plain"
              icon="chevron_left"
              data-test="partner-prev"
              :disabled="loading || page <= 1"
              @click="goToPage(page - 1)"
            />
            <span class="acq-pager__label">{{ page }} / {{ lastPage }}</span>
            <ZButton
              preset="plain"
              icon="chevron_right"
              data-test="partner-next"
              :disabled="loading || page >= lastPage"
              @click="goToPage(page + 1)"
            />
          </div>
        </div>
      </va-card-content>
    </va-card>

    <va-modal
      v-model="creating"
      title="Novo link"
      size="small"
      ok-text="Salvar"
      :cancel-text="$t('button_cancel')"
      :beforeOk="submitCreate"
      :ok-props="{ loading: saving, disabled: saving, 'data-test': 'save-partner-link' }"
    >
      <div class="acq-modal-fields">
        <va-alert v-if="formError" color="danger" class="mb-3">{{ formError }}</va-alert>
        <va-input
          v-model="form.name"
          label="Nome"
          class="mb-3"
          :error-messages="formFieldErrors.name"
          @update:model-value="clearFormField('name')"
        />
        <va-input
          v-model="form.slug"
          label="Slug"
          class="mb-3"
          :error-messages="formFieldErrors.slug"
          @update:model-value="clearFormField('slug')"
        />
        <va-select
          v-model="form.type"
          :options="types"
          valueBy="value"
          textBy="text"
          label="Tipo / rede"
          class="mb-3"
        />
      </div>
    </va-modal>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import ZButton from '~/components/atoms/Buttons/ZButton.vue'
import ZReferralCopyButton from '~/components/molecules/Acquisition/ZReferralCopyButton.vue'
import { applyApiValidationErrors, channelTypeLabel, formErrorFromApi } from '~/utils/acquisitionChannel'
import { confirmSuccess } from '~/utils/sweetAlert2/swalHelper'
import '~/assets/css/acquisition-admin.css'

definePageMeta({ layout: 'logged' })
useHead({ titleTemplate: 'Portal do parceiro' })

const { $customFetch } = useNuxtApp()
const channelName = ref('Seu canal')
const links = ref([])
const leads = ref([])
const leadsCount = ref(0)
const conversionsCount = ref(0)
const revenueCents = ref(0)
const conversionRate = ref(0)
const goalProgress = ref(null)
const loading = ref(false)
const saving = ref(false)
const creating = ref(false)
const error = ref('')
const formError = ref('')
const formFieldErrors = reactive({})
const page = ref(1)
const lastPage = ref(1)
const total = ref(0)
let requestSequence = 0
const form = reactive({ name: '', slug: '', type: 'social_media' })
const types = [
  { value: 'social_media', text: 'Mídia social' },
  { value: 'paid_traffic', text: 'Tráfego pago' },
  { value: 'organic', text: 'Orgânico' },
  { value: 'event', text: 'Evento' },
  { value: 'email_marketing', text: 'E-mail marketing' },
  { value: 'content', text: 'Conteúdo' },
  { value: 'other', text: 'Outro' },
]

const cards = computed(() => {
  const items = [
    { label: 'Leads', value: String(leadsCount.value), hint: 'Pessoas que chegaram pelos seus links' },
    { label: 'Conversões', value: String(conversionsCount.value), hint: 'Primeiro pagamento' },
    { label: 'Taxa', value: formatPercent(conversionRate.value), hint: 'Conversões / leads' },
    { label: 'Receita', value: formatMoney(revenueCents.value), hint: 'Valor atribuído' },
  ]
  if (goalProgress.value === null) {
    return items
  }
  return [
    ...items,
    {
      label: 'Meta',
      value: formatPercent(goalProgress.value),
      hint: 'Progresso do mês',
      progress: Math.min(100, Math.max(0, goalProgress.value)),
    },
  ]
})

function formatMoney(cents) {
  return ((Number(cents) || 0) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatPercent(value) {
  return `${Number(value || 0).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`
}

function formatShortDate(value) {
  if (!value) {
    return '—'
  }
  return new Date(value).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function clearFormField(field) {
  delete formFieldErrors[field]
}

function openCreate() {
  form.name = ''
  form.slug = ''
  form.type = 'social_media'
  formError.value = ''
  Object.keys(formFieldErrors).forEach((field) => {
    delete formFieldErrors[field]
  })
  creating.value = true
}

async function loadLeads(nextPage = 1, parentSequence = requestSequence) {
  const listed = await $customFetch(`/partner/leads?per_page=15&page=${nextPage}`, 'GET')
  if (parentSequence !== requestSequence) {
    return
  }
  leads.value = listed.data ?? []
  page.value = listed.current_page ?? 1
  lastPage.value = listed.last_page ?? 1
  total.value = listed.total ?? leads.value.length
}

async function load() {
  const sequence = ++requestSequence
  loading.value = true
  error.value = ''
  try {
    const dashboard = await $customFetch('/partner/dashboard', 'GET')
    if (sequence !== requestSequence) {
      return
    }
    channelName.value = dashboard.channel?.name ?? channelName.value
    links.value = dashboard.links ?? []
    leadsCount.value = dashboard.cards?.leads ?? 0
    conversionsCount.value = dashboard.cards?.conversions ?? 0
    revenueCents.value = dashboard.cards?.revenue_cents ?? 0
    conversionRate.value = dashboard.cards?.conversion_rate ?? 0
    goalProgress.value = dashboard.goal_progress_percent ?? null
    await loadLeads(1, sequence)
  } catch (reason) {
    if (sequence !== requestSequence) {
      return
    }
    error.value = reason instanceof Error ? reason.message : 'Não foi possível carregar o portal.'
  } finally {
    if (sequence === requestSequence) {
      loading.value = false
    }
  }
}

async function goToPage(nextPage) {
  const sequence = requestSequence
  loading.value = true
  error.value = ''
  try {
    await loadLeads(nextPage, sequence)
  } catch (reason) {
    if (sequence !== requestSequence) {
      return
    }
    error.value = reason instanceof Error ? reason.message : 'Não foi possível carregar os leads.'
  } finally {
    if (sequence === requestSequence) {
      loading.value = false
    }
  }
}

async function submitCreate(hide) {
  saving.value = true
  formError.value = ''
  Object.keys(formFieldErrors).forEach((field) => {
    delete formFieldErrors[field]
  })
  try {
    await $customFetch('/partner/channels', 'POST', {
      body: JSON.stringify({
        name: form.name,
        slug: form.slug || undefined,
        type: form.type,
      }),
    })
    hide()
    await load()
    confirmSuccess('Link criado com sucesso.')
  } catch (reason) {
    applyApiValidationErrors(formFieldErrors, reason)
    formError.value = formErrorFromApi(reason, 'Não foi possível criar o link.')
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
