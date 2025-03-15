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
    @actionSearch="getInteractionsLead"
    @actionClear="clearSearch"
    @update:currentPageActive="updateCurrentPageActive"
  >
    <!-- FILTER -->
    <template #filter>
      <!-- TODO - Pensar nos reais filtros que deveram existir aqui -->
    </template>

    <!-- ACTIONS -->
    <template
      #cell(actions)="{
        rowKey: { id, name, email, tenant_id, status, message, notes },
      }"
    >
      <div>
        <ZDataTableActions
          :id="Number(id)"
          :optionObject="{ id, name, email, status, message, notes }"
          includeActionEditList
          @edit="actionEdit"
        />
      </div>
    </template>

    <!-- CELL -->

    <template #cell(name)="{ rowKey }">
      {{ rowKey }}
    </template>
  </ZDatatableGeneric>

  <VaModal
    v-model="showModalInteractionLead"
    :beforeOk="alterInteraction"
    ok-text="Create"
  >
    <h3 class="va-h3">Fazer nova interação</h3>
    {{ $t("label_lead_id") }}: <span class="px-2 py-3">{{ leadId }}</span>
    <br />
    {{ $t("label_status") }}: <span class="px-2 py-3">{{ status }}</span> <br />
    <div class="row mb-2">
      <div class="flex flex-col md7 sm7 xs7">
        <div class="item">
          <ZSelectStatusLead
            label="Status Leads"
            class="mt-3 mb-3"
            v-model="status"
          />
        </div>
        <div class="item">
          <ZInput class="mt-4" label="Mensagem" v-model="message" />
        </div>
        <div class="item">
          <ZInput class="mt-4" label="Anotações" v-model="notes" />
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
import { confirmSuccess } from "~/utils/sweetAlert2/swalHelper";
import ZDataTableActions from "~/components/molecules/Datatable/ZDataTableActions";
import { defineProps } from "vue";
import ZInput from "~/components/atoms/Inputs/ZInput";
import ZSelectStatusLead from "~/components/molecules/Selects/ZSelectStatusLead";

const { $customFetch, $customFetchTenant } = useNuxtApp();

let id = ref("");
let name = ref("");
let email = ref("");
let status = ref("");
let message = ref("");
let notes = ref("");
const items = ref([]);
const loading = ref(false);
let showModalInteractionLead = ref(false);

const props = defineProps({
  leadId: {
    type: Number,
    required: false,
    default: null,
  },
});

const columns = ref([
  {
    key: "id",
    name: "id",
    label: "Id",
    sortable: true,
  },
  {
    key: "notes",
    name: "notes",
    label: "Notas",
    sortable: true,
  },
  {
    key: "message",
    name: "message",
    label: "Mensagem",
    sortable: true,
  },
  {
    key: "status",
    name: "status",
    label: "Status",
    sortable: true,
  },
]);
const paginatorInfo = ref({
  currentPage: 1,
  lastPage: 1,
  perPage: 15,
  total: 0,
});
const variablesGetInteractionsLead = ref({
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

let statusLead = ref(null);
let statusLeadFilter = ref(null);

onMounted(async () => {
  await getInteractionsLead();
});

function actionEdit(lead) {
  console.log(lead);
  props.leadId = lead.id;
  id.value = lead.id;
  showModalInteractionLead.value = true;
  name.value = lead.name;
  email.value = lead.email;
  status.value = lead.status;
  message.value = lead.message;
  notes.value = lead.notes;
}

function updateCurrentPageActive(page) {
  variablesGetInteractionsLead.value.page = page;
  getInteractionsLead({ page });
}

function searchLeads(search) {
  variablesGetInteractionsLead.value.filter.search = `%${search}%`;
}

function clearSearch() {
  variablesGetInteractionsLead.value.filter = {
    search: "%%",
  };
}

async function getInteractionsLead({ page = 1 } = {}) {
  loading.value = true;
  items.value = [];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const perPage = `per_page=${encodeURIComponent(paginatorInfo.value.perPage)}`;
  const pageUrl = `&page=${encodeURIComponent(page)}`;
  const status = statusLeadFilter.value
    ? `&status=${encodeURIComponent(statusLeadFilter.value.value)}`
    : "";
  const search = variablesGetInteractionsLead.value.filter.search
    ? `&search=${encodeURIComponent(
        variablesGetInteractionsLead.value.filter.search
      )}`
    : "";

  await $customFetch(
    `/leads/${props.leadId}/interactions?${perPage}${pageUrl}${status}${search}`,
    "GET"
  )
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

function alterInteraction() {
  console.log(status.value);
  $customFetch(`/leads/${props.leadId}/interactions/${id.value}`, "PUT", {
    body: JSON.stringify({
      status: status.value.value ?? status.value,
      message: message.value,
      notes: notes.value,
    }),
  })
    .then((response) => {
      console.log(response);
      confirmSuccess("Alteração realizada com sucesso");
      showModalInteractionLead.value = false;
      getInteractionsLead();
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>
