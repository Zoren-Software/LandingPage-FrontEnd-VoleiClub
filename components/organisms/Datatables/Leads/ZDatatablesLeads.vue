<template>
  <ZDatatableGeneric
    includeActionsColumn
    includeActionEditList
    includeActionDeleteList
    textAdvancedFilters
    selectable
    :items="items"
    :columns="columns"
    :loading="loading"
    :paginatorInfo="paginatorInfo"
    :filter="true"
    @search="searchLeads"
    @actionSearch="getLeads"
    @actionClear="clearSearch"
    @update:currentPageActive="updateCurrentPageActive"
  >
    <!-- FILTER -->
    <template #filter>
      <!-- TODO - Pensar nos reais filtros que deveram existir aqui -->
      <div class="row">
        <div class="flex flex-col md6 mb-2">
          <ZSelectStatusLead
            :label="$t('leads_filter_status')"
            class="mt-3 mb-3"
            v-model="statusLeadFilter"
          />
        </div>
      </div>
    </template>

    <!-- ACTIONS -->
    <template
      #cell(actions)="{
        rowKey: { id, name, email, tenant_id, status, message },
      }"
    >
      <ZDataTableActions
        :id="Number(id)"
        :optionObject="{ id, name, email, statusName: status?.name, message }"
        includeActionEditList
        @edit="actionEdit"
      />
      <va-button
        class="ml-3"
        preset="plain"
        icon="forum"
        @click="actionInterationLead(id, name, email, tenant_id, status?.name)"
      />
      <va-button
        class="ml-3"
        preset="plain"
        icon="public"
        @click="actionCreateTenant(id, name, email, tenant_id, status)"
      />
    </template>

    <!-- CELL -->
    <template #cell(name)="{ rowKey: { name } }">
      {{ name }}
    </template>
    <template #cell(tenantId)="{ rowKey: { tenant_id } }">
      {{ tenant_id }}{{ apiTenantDomain }}
    </template>
    <template #cell(created_at)="{ rowKey: { created_at } }">
      {{ formatDate(created_at) }}
    </template>
  </ZDatatableGeneric>
  <VaModal
    v-model="showModalAlterStatus"
    :beforeOk="alterStatusLead"
    :ok-text="$t('button_apply')"
    :cancel-text="$t('button_cancel')"
  >
    <h3 class="va-h3">{{ $t('title_alter_status_lead') }}</h3>
    {{ $t("label_lead_id") }}: <span class="px-2 py-3">{{ leadId }}</span>
    <br />
    {{ $t("label_name") }}: <span class="px-2 py-3">{{ name }}</span> <br />
    {{ $t("label_email") }}: <span class="px-2 py-3">{{ email }}</span> <br />
    {{ $t("label_status") }}: <span class="px-2 py-3">{{ status }}</span> <br />
    {{ $t("label_message") }}: <span class="px-2 py-3">{{ message }}</span>

    <ZSelectStatusLead
      :label="$t('leads_filter_status')"
      class="mt-3 mb-3"
      v-model="statusLead"
    />
    <div class="item">
      <ZInput id="message-alter-status" class="mt-4" :label="$t('label_message')" v-model="messageAlterStatus" />
    </div>
    <div class="item">
      <ZInput id="notes" class="mt-4" :label="$t('label_notes')" v-model="notes" />
    </div>
  </VaModal>
  <VaModal
    v-model="showModalCreateTenant"
    :beforeOk="createTenant"
    :ok-text="$t('button_create')"
    :cancel-text="$t('button_cancel')"
  >
    <h3 class="va-h3">{{ $t('title_create_tenant') }}</h3>
    {{ $t("label_lead_id") }}: <span class="px-2 py-3">{{ leadId }}</span>
    <br />
    {{ $t("label_name") }}: <span class="px-2 py-3">{{ name }}</span> <br />
    {{ $t("label_email") }}: <span class="px-2 py-3">{{ email }}</span> <br />
    {{ $t("label_status") }}: <span class="px-2 py-3">{{ status }}</span> <br />
    <br />
    {{ $t("label_tenant") }}:
    <span class="px-2 py-3">{{ tenantId }}{{ apiTenantDomain }}</span>

    <div class="row mb-2">
      <div class="flex flex-col md7 sm7 xs7">
        <div class="item">
          <ZInput id="tenant-domain" class="mt-4" :label="$t('label_domain')" v-model="tenantIdForm" />
        </div>
      </div>
      <div class="flex flex-col md3 sm3 xs3">
        <div class="item mt-5 ml-2 pt-3">
          <span class="mt-5">{{ apiTenantDomain }} </span>
        </div>
      </div>
    </div>

    <label class="create-tenant-terms mt-4">
      <input v-model="termsAcceptedForTenant" type="checkbox" />
      <span>
        Li e concordo com os
        <a :href="termsOfUseUrl" target="_blank" rel="noopener noreferrer">Termos de Uso</a>
        e
        <a :href="privacyPolicyUrl" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>
      </span>
    </label>
  </VaModal>
  <VaModal
    v-model="showModalInteractionLead"
    :ok-text="$t('button_create')"
    :cancel-text="$t('button_cancel')"
  >
    <h3 class="va-h3">{{ $t('title_interactions_with_lead') }}</h3>
    {{ $t("label_lead_id") }}: <span class="px-2 py-3">{{ leadId }}</span>
    <br />
    {{ $t("label_name") }}: <span class="px-2 py-3">{{ name }}</span> <br />
    {{ $t("label_email") }}: <span class="px-2 py-3">{{ email }}</span> <br />
    {{ $t("label_status") }}: <span class="px-2 py-3">{{ status }}</span> <br />
    <br />
    {{ $t("label_tenant") }}:
    <span class="px-2 py-3">{{ tenantId }}{{ apiTenantDomain }}</span>

    <div class="row mb-2" style="display: block">
      <ZDatatablesInteractionsLead :leadId="leadId" />
    </div>
  </VaModal>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "#imports";
import { useNuxtApp } from "#app";
import ZDatatableGeneric from "~/components/molecules/Datatable/ZDatatableGeneric";
import ZSelectStatusLead from "~/components/molecules/Selects/ZSelectStatusLead";
import { confirmSuccess, confirmError } from "~/utils/sweetAlert2/swalHelper";
import ZDataTableActions from "~/components/molecules/Datatable/ZDataTableActions";
import ZInput from "~/components/atoms/Inputs/ZInput";
import ZDatatablesInteractionsLead from "~/components/organisms/Datatables/Leads/ZDatatablesInteractionsLead.vue";

const { t } = useI18n();
const { $customFetch, $customFetchTenant } = useNuxtApp();

let showModalAlterStatus = ref(false);
let showModalCreateTenant = ref(false);
let showModalInteractionLead = ref(false);
let tenantId = ref("");
let tenantIdForm = ref("");
let name = ref("");
let email = ref("");
let status = ref("");
let statusId = ref(null);
let message = ref("");
let messageAlterStatus = ref("");
let notes = ref("");
const items = ref([]);
const loading = ref(false);

const runtimeConfig = useRuntimeConfig();
const apiTenantDomain = `.${runtimeConfig.public.apiTenantDomain}`;
const apiTenantsToken = runtimeConfig.public.apiTenantsToken;
const termsAcceptedForTenant = ref(false);

const privacyPolicyUrl = computed(() => {
  const url = String(runtimeConfig.public.privacyPolicyUrl ?? "").trim();
  return url || "https://volleytrack.com/privacy-policy";
});

const termsOfUseUrl = computed(() => {
  const url = String(runtimeConfig.public.termsOfUseUrl ?? "").trim();
  return url || "https://volleytrack.com/terms-of-use";
});

const columns = computed(() => [
  {
    key: "id",
    name: "id",
    label: t("table_header_id"),
    sortable: true,
  },
  {
    key: "name",
    name: "name",
    label: t("table_header_client"),
    sortable: true,
  },
  {
    key: "tenant_id",
    name: "tenantId",
    label: t("table_header_tenant_id"),
    sortable: true,
  },
  {
    key: "email",
    name: "email",
    label: t("label_email"),
    sortable: true,
  },
  {
    key: "status.name",
    name: "status",
    label: t("label_status"),
    sortable: true,
  },
  {
    key: "experience_level",
    name: "experience_level",
    label: t("table_header_experience_level"),
    sortable: true,
  },
  {
    key: "created_at",
    name: "created_at",
    label: t("table_header_registration_date"),
    sortable: true,
  },
]);
const paginatorInfo = ref({
  currentPage: 1,
  lastPage: 1,
  perPage: 15,
  total: 0,
});
const variablesGetLeads = ref({
  page: 1,
  filter: {
    usersIds: [],
    playersIds: [],
    positionsIds: [],
    search: "%%",
  },
  orderBy: "id",
  sortedBy: "desc",
});
const data = ref({
  value: [],
});

let leadId = ref(null);
let statusLead = ref(null);
let statusLeadFilter = ref(null);

function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

onMounted(async () => {
  await getLeads();
});

function actionCreateTenant(id, nameLead, emailLead, tenantIdLead, statusObj) {
  leadId.value = id;
  termsAcceptedForTenant.value = false;
  showModalCreateTenant.value = true;
  name.value = nameLead;
  email.value = emailLead;
  status.value = statusObj?.name || "";
  statusId.value = statusObj?.id || null;
  tenantId.value = tenantIdLead;

  if (tenantIdLead === null) {
    tenantIdLead = "";
  }

  tenantIdForm.value = tenantIdLead;
}

function actionInterationLead(
  id,
  nameLead,
  emailLead,
  tenantIdLead,
  statusLead
) {
  leadId.value = id;
  showModalInteractionLead.value = true;
  name.value = nameLead;
  email.value = emailLead;
  status.value = statusLead;
  tenantId.value = tenantIdLead;

  if (tenantIdLead === null) {
    tenantIdLead = "";
  }

  tenantIdForm.value = tenantIdLead;
}

function actionEdit(lead) {
  leadId.value = lead.id;
  showModalAlterStatus.value = true;
  name.value = lead.name;
  email.value = lead.email;
  status.value = lead.status;
  message.value = lead.message;
}

async function alterStatusLead() {
  showModalAlterStatus.value = false;
  loading.value = true;

  await $customFetch(`/leads/${leadId.value}`, "PUT", {
    body: JSON.stringify({
      status_id: parseInt(statusLead.value.value, 10),
      tenantId: tenantIdForm.value,
      message: messageAlterStatus.value,
      notes: notes.value,
      id: leadId.value,
    }),
  })
    .then((response) => {
      confirmSuccess(response.message, () => {});
    })
    .catch((error) => {
      confirmError(error.message, () => {});
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
      showModalAlterStatus.value = false;
      statusLead.value = null;
      getLeads({ page: paginatorInfo.value.currentPage });
    });
}

async function createTenant() {
  if (!termsAcceptedForTenant.value) {
    confirmError(
      "É necessário aceitar os Termos de Uso e a Política de Privacidade.",
      () => {}
    );
    return false;
  }

  showModalCreateTenant.value = false;
  loading.value = true;

  try {
    const tenantResponse = await $customFetchTenant(`/tenant`, "POST", {
      body: JSON.stringify({
        token: apiTenantsToken,
        tenantId: tenantIdForm.value,
        email: email.value,
        name: name.value,
        termsAccepted: true,
      }),
    });
    const successMessage =
      tenantResponse?.message ||
      tenantResponse?.data?.createTenant?.message ||
      tenantResponse?.data?.message ||
      t("message_tenant_api_success");
    loading.value = false;
    confirmSuccess(successMessage, async () => {
      try {
        loading.value = true;
        await $customFetch(`/leads/${leadId.value}`, "PUT", {
          body: JSON.stringify({
            status_id: statusId.value,
            tenantId: tenantIdForm.value,
            id: leadId.value,
          }),
        });
        confirmSuccess(t("message_lead_updated"), () => {
          showModalAlterStatus.value = false;
          statusLead.value = null;
          getLeads({ page: paginatorInfo.value.currentPage });
        });
      } catch (error) {
        const errorMessage =
          error?.message || error?.response?.message || "Erro ao atualizar o lead.";
        confirmError(errorMessage, () => {});
        console.error(error);
      } finally {
        loading.value = false;
        showModalAlterStatus.value = false;
        statusLead.value = null;
        getLeads({ page: paginatorInfo.value.currentPage });
      }
    });
  } catch (error) {
    const errorMessage =
      error?.message ||
      error?.response?.message ||
      (Array.isArray(error?.response?.errors) && error?.response?.errors[0]?.message) ||
      t("message_tenant_api_error");
    confirmError(errorMessage, () => {});
    console.error(error);
    loading.value = false;
    showModalCreateTenant.value = false;
  }
}

function updateCurrentPageActive(page) {
  variablesGetLeads.value.page = page;
  getLeads({ page });
}

function searchLeads(search) {
  variablesGetLeads.value.filter.search = `%${search}%`;
}

function clearSearch() {
  variablesGetLeads.value.filter = {
    search: "%%",
  };
  statusLeadFilter.value = null;
  getLeads();
}

async function getLeads({ page = 1 } = {}) {
  loading.value = true;
  items.value = [];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const perPage = `per_page=${encodeURIComponent(paginatorInfo.value.perPage)}`;
  const pageUrl = `&page=${encodeURIComponent(page)}`;
  const status = statusLeadFilter.value
    ? `&status=${encodeURIComponent(statusLeadFilter.value.value)}`
    : "";
  const search = variablesGetLeads.value.filter.search
    ? `&search=${encodeURIComponent(variablesGetLeads.value.filter.search)}`
    : "";

  await $customFetch(`/leads?${perPage}${pageUrl}${status}${search}`, "GET")
    .then((response) => {
      items.value = response.data;
      paginatorInfo.value = {
        currentPage: page,
        lastPage: response.last_page,
        perPage: 15,
        total: response.total,
        firstItem: response.from,
        lastItem: response.to,
      };
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>

<style scoped>
.create-tenant-terms {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  line-height: 1.45;
  color: #374151;
}

.create-tenant-terms a {
  color: #ff4e1b;
  text-decoration: underline;
}
</style>
