<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Canais de aquisição</h1>
    <p class="mb-4">Cadastre origens, parceiros e copie o link de indicação.</p>
    <ZButton color="primary" class="mb-4" @click="creating = true">Novo canal</ZButton>
    <div class="flex gap-3 mb-4 flex-wrap">
      <va-select
        v-model="ownerUserId"
        :options="ownerOptions"
        valueBy="value"
        textBy="text"
        clearable
        label="Parceiro / afiliado"
        class="w-full max-w-xs"
      />
    </div>
    <va-data-table :items="channels" :columns="columns" />
    <va-modal v-model="creating" title="Novo canal">
      <va-alert v-if="formError" color="danger" class="mb-3">{{ formError }}</va-alert>
      <va-input v-model="form.name" label="Nome" class="mb-3" :error-messages="formFieldErrors.name" />
      <va-input v-model="form.slug" label="Slug" class="mb-3" :error-messages="formFieldErrors.slug" />
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
      />
      <va-input
        v-if="needsPortal"
        v-model="form.password"
        type="password"
        label="Senha do portal"
        :error-messages="formFieldErrors.password"
      />
      <template #footer>
        <ZButton @click="creating = false">Cancelar</ZButton>
        <ZButton color="primary" :loading="saving" @click="submit">Salvar</ZButton>
      </template>
    </va-modal>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import ZButton from '~/components/atoms/Buttons/ZButton.vue'

definePageMeta({ layout: 'logged' })
useHead({ titleTemplate: 'Canais' })

const { $customFetch } = useNuxtApp()
const channels = ref([])
const partners = ref([])
const ownerUserId = ref(null)
const creating = ref(false)
const saving = ref(false)
const formError = ref('')
const formFieldErrors = reactive({})
const form = reactive({ name: '', slug: '', type: 'social_media', email: '', password: '' })
const types = [
  { value: 'social_media', text: 'Rede social' },
  { value: 'partner', text: 'Parceiro' },
  { value: 'affiliate', text: 'Afiliado' },
  { value: 'paid_traffic', text: 'Tráfego pago' },
  { value: 'organic', text: 'Orgânico' },
  { value: 'event', text: 'Evento' },
  { value: 'email_marketing', text: 'E-mail marketing' },
  { value: 'content', text: 'Conteúdo' },
  { value: 'other', text: 'Outro' },
]
const needsPortal = computed(() => form.type === 'partner' || form.type === 'affiliate')
const ownerOptions = computed(() =>
  partners.value.map((partner) => ({
    value: partner.id,
    text: partner.links_count > 1 ? `${partner.name} (${partner.links_count})` : partner.name,
  })),
)
const columns = [
  { key: 'name', label: 'Nome' },
  { key: 'slug', label: 'Slug' },
  { key: 'type', label: 'Tipo' },
  { key: 'referral_url', label: 'Link' },
]

async function loadPartners() {
  const response = await $customFetch('/acquisition-partners', 'GET')
  partners.value = response.data ?? []
}

async function load() {
  const query = ownerUserId.value ? `?owner_user_id=${ownerUserId.value}` : ''
  const response = await $customFetch(`/acquisition-channels${query}`, 'GET')
  channels.value = response.data ?? []
}

watch(ownerUserId, () => {
  void load()
})

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
    form.name = ''
    form.slug = ''
    form.email = ''
    form.password = ''
    await load()
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

onMounted(() => {
  void loadPartners()
  void load()
})
</script>
