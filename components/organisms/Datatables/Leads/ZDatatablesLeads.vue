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
            label="Status Leads"
            class="mt-3 mb-3"
            v-model="statusLeadFilter"
          />
        </div>
      </div>
    </template>

    <!-- ACTIONS -->
    <template
      #cell(actions)="{
        rowKey: {
          id,
          name,
          email,
          tenant_id,
          status: { name: statusName },
          message,
        },
      }"
    >
      <ZDataTableActions
        :id="Number(id)"
        :optionObject="{ id, name, email, statusName, message }"
        includeActionEditList
        @edit="actionEdit"
      />
      <va-button
        class="ml-3"
        preset="plain"
        icon="forum"
        @click="actionInterationLead(id, name, email, tenant_id, statusName)"
      />
      <va-button
        class="ml-3"
        preset="plain"
        icon="public"
        @click="actionCreateTenant(id, name, email, tenant_id, statusName)"
      />
    </template>

    <!-- CELL -->
    <template #cell(name)="{ rowKey: { name } }">
      {{ name }}
    </template>
    <template #cell(tenantId)="{ rowKey: { tenant_id } }">
      {{ tenant_id }}{{ apiTenantDomain }}
    </template>
  </ZDatatableGeneric>
  <VaModal
    v-model="showModalAlterStatus"
    :beforeOk="alterStatusLead"
    ok-text="Apply"
  >
    <h3 class="va-h3">Alterar Status Lead</h3>
    {{ $t("label_lead_id") }}: <span class="px-2 py-3">{{ leadId }}</span>
    <br />
    {{ $t("label_name") }}: <span class="px-2 py-3">{{ name }}</span> <br />
    {{ $t("label_email") }}: <span class="px-2 py-3">{{ email }}</span> <br />
    {{ $t("label_status") }}: <span class="px-2 py-3">{{ status }}</span> <br />
    {{ $t("label_message") }}: <span class="px-2 py-3">{{ message }}</span>

    <ZSelectStatusLead
      label="Status Leads"
      class="mt-3 mb-3"
      v-model="statusLead"
    />
    <div class="item">
      <ZInput class="mt-4" label="Mensagem" v-model="messageAlterStatus" />
    </div>
    <div class="item">
      <ZInput class="mt-4" label="Anotações" v-model="notes" />
    </div>
  </VaModal>
  <VaModal
    v-model="showModalCreateTenant"
    :beforeOk="createTenant"
    ok-text="Create"
  >
    <h3 class="va-h3">Criar Tenant para Cliente</h3>
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
          <ZInput class="mt-4" label="Domínio" v-model="tenantIdForm" />
        </div>
      </div>
      <div class="flex flex-col md3 sm3 xs3">
        <div class="item mt-5 ml-2 pt-3">
          <span class="mt-5">{{ apiTenantDomain }} </span>
        </div>
      </div>
    </div>
  </VaModal>
  <VaModal v-model="showModalInteractionLead" ok-text="Create">
    <h3 class="va-h3">Interações com Lead</h3>
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
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
import ZDatatableGeneric from "~/components/molecules/Datatable/ZDatatableGeneric";
import ZSelectStatusLead from "~/components/molecules/Selects/ZSelectStatusLead";
import { confirmSuccess, confirmError } from "~/utils/sweetAlert2/swalHelper";
import ZDataTableActions from "~/components/molecules/Datatable/ZDataTableActions";
import ZInput from "~/components/atoms/Inputs/ZInput";
import ZDatatablesInteractionsLead from "~/components/organisms/Datatables/Leads/ZDatatablesInteractionsLead.vue";

const { $customFetch, $customFetchTenant } = useNuxtApp();

let showModalAlterStatus = ref(false);
let showModalCreateTenant = ref(false);
let showModalInteractionLead = ref(false);
let tenantId = ref("");
let tenantIdForm = ref("");
let name = ref("");
let email = ref("");
let status = ref("");
let message = ref("");
let messageAlterStatus = ref("");
let notes = ref("");
const items = ref([]);
const loading = ref(false);

const runtimeConfig = useRuntimeConfig();
const apiTenantDomain = `.${runtimeConfig.public.apiTenantDomain}`;
const apiTenantsToken = runtimeConfig.public.apiTenantsToken;

const columns = ref([
  {
    key: "id",
    name: "id",
    label: "Id",
    sortable: true,
  },
  {
    key: "name",
    name: "name",
    label: "Cliente",
    sortable: true,
  },
  {
    key: "tenant_id",
    name: "tenantId",
    label: "Tenant ID",
    sortable: true,
  },
  {
    key: "email",
    name: "email",
    label: "E-mail",
    sortable: true,
  },
  {
    key: "status.name",
    name: "status",
    label: "Status",
    sortable: true,
  },
  {
    key: "experience_level",
    name: "experience_level",
    label: "Experience level",
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

onMounted(async () => {
  await getLeads();
});

function actionCreateTenant(id, nameLead, emailLead, tenantIdLead, statusLead) {
  leadId.value = id;
  showModalCreateTenant.value = true;
  name.value = nameLead;
  email.value = emailLead;
  status.value = statusLead;
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
      getLeads();
    });
}

async function createTenant() {
  showModalCreateTenant.value = false;
  loading.value = true;

  await $customFetchTenant(`/tenant`, "POST", {
    body: JSON.stringify({
      token: apiTenantsToken,
      tenantId: tenantIdForm.value,
      email: email.value,
      name: name.value,
    }),
  })
    .then((response) => {
      confirmSuccess(response.message, () => {});
    })
    .catch((error) => {
      confirmError(error.message, "Erro ao executar a ação");
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
      showModalCreateTenant.value = false;
    });

  await $customFetch(`/leads/${leadId.value}`, "PUT", {
    body: JSON.stringify({
      status: status.value,
      tenantId: tenantIdForm.value,
      id: leadId.value,
    }),
  })
    .then((response) => {
      confirmSuccess(response.message, () => {});
    })
    .catch((error) => {
      confirmError(error.message, "Erro ao executar a ação");
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
      showModalAlterStatus.value = false;
      statusLead.value = null;
      getLeads();
    });
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
        currentPage: 1,
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
