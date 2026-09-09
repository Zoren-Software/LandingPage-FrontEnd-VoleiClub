<template>
  <div class="p-4 acq-page">
    <header class="acq-toolbar">
      <div>
        <h1>Canais de aquisição</h1>
        <p>Cadastre origens, parceiros e copie o link de indicação.</p>
      </div>
      <div class="acq-toolbar__actions">
        <ZButton color="primary" data-test="create-channel" @click="openCreate">Novo canal</ZButton>
      </div>
    </header>

    <va-alert v-if="error" color="danger" class="mb-0">
      {{ error }}
      <ZButton class="ml-3" preset="plain" color="danger" @click="load(page)">Tentar novamente</ZButton>
    </va-alert>

    <va-card class="acq-card">
      <va-card-content>
        <div class="acq-filters">
          <va-input
            v-model="search"
            class="acq-filters__search"
            clearable
            :disabled="loading"
            label="Buscar canal"
            placeholder="Nome ou slug"
            @update:model-value="onSearch"
          />
          <va-select
            v-model="ownerUserId"
            class="acq-filters__owner"
            :options="ownerOptions"
            valueBy="value"
            textBy="text"
            clearable
            :disabled="loading"
            label="Parceiro / afiliado"
            placeholder="Todos"
            data-test="owner-filter"
          />
          <div class="acq-filters__spacer" />
          <span class="acq-filters__meta">{{ total }} canais</span>
        </div>

        <div v-if="loading" class="acq-loading">Carregando canais…</div>
        <div v-else-if="!channels.length" class="acq-empty">Nenhum canal encontrado.</div>
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
              <tr v-for="channel in channels" :key="channel.id">
                <td class="acq-col-name">
                  <div class="acq-stack">
                    <span class="acq-stack__primary">{{ channel.name }}</span>
                    <span class="acq-stack__secondary">{{ channel.slug }}</span>
                  </div>
                </td>
                <td class="acq-col-type">
                  <span class="acq-chip">{{ channelTypeLabel(channel.type) }}</span>
                </td>
                <td class="acq-col-link">
                  <ZReferralCopyButton :slug="channel.slug" :name="channel.name" :url="channel.referral_url" />
                </td>
                <td class="acq-col-leads acq-num">{{ channel.leads_count ?? 0 }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!loading && !error" class="acq-footer">
          <div class="acq-pager">
            <ZButton
              preset="plain"
              icon="chevron_left"
              data-test="channels-prev"
              :disabled="loading || page <= 1"
              @click="load(page - 1)"
            />
            <span class="acq-pager__label">{{ page }} / {{ lastPage }}</span>
            <ZButton
              preset="plain"
              icon="chevron_right"
              data-test="channels-next"
              :disabled="loading || page >= lastPage"
              @click="load(page + 1)"
            />
          </div>
        </div>
      </va-card-content>
    </va-card>

    <va-modal v-model="creating" title="Novo canal" size="small">
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
        label="Tipo"
        class="mb-3"
      />
      <va-input
        v-if="needsPortal"
        v-model="form.email"
        label="E-mail do portal"
        class="mb-3"
        :error-messages="formFieldErrors.email"
        @update:model-value="clearFormField('email')"
      />
      <va-input
        v-if="needsPortal"
        v-model="form.password"
        type="password"
        label="Senha do portal"
        :error-messages="formFieldErrors.password"
        @update:model-value="clearFormField('password')"
      />
      <template #footer>
        <ZButton @click="creating = false">Cancelar</ZButton>
        <ZButton color="primary" data-test="save-channel" :loading="saving" @click="submit">Salvar</ZButton>
      </template>
    </va-modal>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import ZButton from '~/components/atoms/Buttons/ZButton.vue'
import ZReferralCopyButton from '~/components/molecules/Acquisition/ZReferralCopyButton.vue'
import { acquisitionChannelsQuery, channelTypeLabel, CHANNEL_TYPE_LABELS } from '~/utils/acquisitionChannel'
import '~/assets/css/acquisition-admin.css'

definePageMeta({ layout: 'logged' })
useHead({ titleTemplate: 'Canais' })

const { $customFetch } = useNuxtApp()
const channels = ref([])
const partners = ref([])
const ownerUserId = ref(null)
const search = ref('')
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
let searchTimer
const form = reactive({ name: '', slug: '', type: 'social_media', email: '', password: '' })
const types = Object.entries(CHANNEL_TYPE_LABELS).map(([value, text]) => ({ value, text }))
const needsPortal = computed(() => form.type === 'partner' || form.type === 'affiliate')
const ownerOptions = computed(() =>
  partners.value.map((partner) => ({
    value: partner.id,
    text: partner.links_count > 1 ? `${partner.name} (${partner.links_count})` : partner.name,
  })),
)

function clearFormField(field) {
  delete formFieldErrors[field]
}

function resetCreateForm() {
  form.name = ''
  form.slug = ''
  form.type = 'social_media'
  form.email = ''
  form.password = ''
  formError.value = ''
  Object.keys(formFieldErrors).forEach((field) => {
    delete formFieldErrors[field]
  })
}

function openCreate() {
  resetCreateForm()
  creating.value = true
}

function onSearch() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    void load(1)
  }, 350)
}

async function loadPartners() {
  try {
    const response = await $customFetch('/acquisition-partners', 'GET')
    partners.value = response.data ?? []
  } catch {
    partners.value = []
  }
}

async function load(nextPage = 1) {
  const sequence = ++requestSequence
  loading.value = true
  error.value = ''
  try {
    const query = acquisitionChannelsQuery({
      search: search.value || undefined,
      ownerUserId: ownerUserId.value || undefined,
      page: nextPage,
    })
    const response = await $customFetch(`/acquisition-channels${query}`, 'GET')
    if (sequence !== requestSequence) {
      return
    }
    channels.value = response.data ?? []
    page.value = response.current_page ?? 1
    lastPage.value = response.last_page ?? 1
    total.value = response.total ?? channels.value.length
  } catch (reason) {
    if (sequence !== requestSequence) {
      return
    }
    error.value = reason instanceof Error ? reason.message : 'Não foi possível carregar os canais.'
  } finally {
    if (sequence === requestSequence) {
      loading.value = false
    }
  }
}

async function submit() {
  saving.value = true
  formError.value = ''
  Object.keys(formFieldErrors).forEach((field) => {
    delete formFieldErrors[field]
  })
  try {
    await $customFetch('/acquisition-channels', 'POST', {
      body: JSON.stringify({
        name: form.name,
        slug: form.slug || undefined,
        type: form.type,
        email: form.email || undefined,
        password: form.password || undefined,
      }),
    })
    creating.value = false
    resetCreateForm()
    await load(1)
  } catch (reason) {
    formError.value = reason instanceof Error ? reason.message : 'Não foi possível salvar o canal.'
    const errors = reason?.response?.errors
    if (errors && typeof errors === 'object') {
      Object.entries(errors).forEach(([field, messages]) => {
        formFieldErrors[field] = Array.isArray(messages) ? messages[0] : String(messages)
      })
    }
  } finally {
    saving.value = false
  }
}

watch(ownerUserId, () => {
  void load(1)
})

onMounted(() => {
  void loadPartners()
  void load(1)
})
</script>
