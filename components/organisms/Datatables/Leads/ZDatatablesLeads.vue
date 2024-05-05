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
    @search="searchTrainings"
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
      #cell(actions)="{ rowKey: { id, name, email, tenantId, status } }"
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
        @click="actionCreateTenant(id, name, email, tenantId)"
      />
    </template>

    <!-- CELL -->
    <template #cell(name)="{ rowKey: { name } }">
      {{ name }}
    </template>
  </ZDatatableGeneric>
  <VaModal v-model="showModal" :beforeOk="alterStatusLead" ok-text="Apply">
    <h3 class="va-h3">Alterar Status Lead</h3>
    {{ $t("label_lead_id") }}: <span>{{ leadId }}</span> <br />
    {{ $t("label_name") }}: <span>{{ name }}</span> <br />
    {{ $t("label_email") }}: <span>{{ email }}</span> <br />
    {{ $t("label_status") }}: <span>{{ status }}</span>
    <ZSelectStatusLead
      label="Status Leads"
      class="mt-3 mb-3"
      v-model="statusLead"
    />
  </VaModal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
import ZDatatableGeneric from "~/components/molecules/Datatable/ZDatatableGeneric";
import ZSelectStatusLead from "~/components/molecules/Selects/ZSelectStatusLead";
import { confirmSuccess, confirmError } from "~/utils/sweetAlert2/swalHelper";
import ZDataTableActions from "~/components/molecules/Datatable/ZDataTableActions";

const { $customFetch } = useNuxtApp();

let showModal = ref(false);
let name = ref("");
let email = ref("");
let status = ref("");
const items = ref([]);
const loading = ref(false);
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

function actionCreateTenant(id, name, email, tenantId) {
  console.log("Create Tenant", id, name, email, tenantId);
}

function actionEdit(lead) {
  leadId.value = lead.id;
  showModal.value = true;
  name.value = lead.name;
  email.value = lead.email;
  status.value = lead.status;
}

async function alterStatusLead() {
  showModal.value = false;

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
      showModal.value = false;
      statusLead.value = null;
      getLeads();
    });
}

function updateCurrentPageActive(page) {
  variablesGetLeads.value.page = page;
  getLeads({ page });
}

function searchTrainings(search) {
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

  const pageUrl = `&page=${page}`;
  const perPage = `per_page=${paginatorInfo.value.perPage}`;
  const status = statusLeadFilter.value
    ? `status=${statusLeadFilter.value.value}`
    : "";

  await $customFetch(`/leads?${perPage}&${pageUrl}&${status}`, "GET")
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
