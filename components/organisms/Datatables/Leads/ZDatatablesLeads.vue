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
      #cell(actions)="{ rowKey: { id, name, email, tenant_id, status } }"
    >
      <ZDataTableActions
        :id="Number(id)"
        :optionObject="{ id, name, email, status }"
        includeActionEditList
        @edit="actionEdit"
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
    {{ $t("label_status") }}: <span class="px-2 py-3">{{ status }}</span>
    <ZSelectStatusLead
      label="Status Leads"
      class="mt-3 mb-3"
      v-model="statusLead"
    />
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
import ZDatatableGeneric from "~/components/molecules/Datatable/ZDatatableGeneric";
import ZSelectStatusLead from "~/components/molecules/Selects/ZSelectStatusLead";
import { confirmSuccess, confirmError } from "~/utils/sweetAlert2/swalHelper";
import ZDataTableActions from "~/components/molecules/Datatable/ZDataTableActions";
import ZInput from "~/components/atoms/Inputs/ZInput";

const { $customFetch, $customFetchTenant } = useNuxtApp();

let showModalAlterStatus = ref(false);
let showModalCreateTenant = ref(false);
let tenantId = ref("");
let tenantIdForm = ref("");
let name = ref("");
let email = ref("");
let status = ref("");
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
    key: "status",
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

function actionEdit(lead) {
  leadId.value = lead.id;
  showModalAlterStatus.value = true;
  name.value = lead.name;
  email.value = lead.email;
  status.value = lead.status;
}

async function alterStatusLead() {
  showModalAlterStatus.value = false;
  loading.value = true;

  await $customFetch(`/leads/${leadId.value}`, "PUT", {
    body: JSON.stringify({
      status: statusLead.value.value,
      id: leadId.value,
    }),
  })
    .then((response) => {
      confirmSuccess(response.message, () => {});
    })
    .catch((error) => {
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

  console.log({
    token: apiTenantsToken,
    tenantId: tenantIdForm.value,
    email: email.value,
    name: name.value,
  });

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
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
      showModalCreateTenant.value = false;
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

  const perPage = `per_page=${paginatorInfo.value.perPage}`;
  const pageUrl = `&page=${page}`;
  const status = statusLeadFilter.value
    ? `&status=${statusLeadFilter.value.value}`
    : "";
  const search = variablesGetLeads.value.filter.search
    ? `&search=${variablesGetLeads.value.filter.search}`
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
