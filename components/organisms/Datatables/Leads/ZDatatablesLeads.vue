<template>
  <ZDatatableGeneric
    buttonActionAdd
    buttonActionDelete
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
    @add="addTeam"
    @edit="editTeam"
    @update:currentPageActive="updateCurrentPageActive"
  >
    <!-- FILTER -->
    <template #filter>
      <!-- TODO - Pensar nos reais filtros que deveram existir aqui -->
      <div class="row">
        <div class="flex flex-col md6 mb-2"></div>
      </div>
    </template>

    <!-- CELL -->
    <template #cell(name)="{ rowKey: { name } }">
      {{ name }}
    </template>
  </ZDatatableGeneric>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp, useRouter } from "#app";
import ZDatatableGeneric from "~/components/molecules/Datatable/ZDatatableGeneric";
import ZUser from "~/components/molecules/Datatable/Slots/ZUser";

const { $customFetch } = useNuxtApp();
const router = useRouter();

const items = ref([]);
const loading = ref(false);
const columns = ref([
  {
    key: "id",
    name: "id",
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
const selectedItems = ref([]);
const selectedItemsEmitted = ref([]);
const selectMode = ref("multiple");
const selectedColor = ref("primary");
const selectModeOptions = ref(["single", "multiple"]);
const selectColorOptions = ref(["primary", "danger", "warning", "#EF467F"]);

onMounted(async () => {
  await getLeads();
});

function unselectItem(item) {
  selectedItems.value = selectedItems.value.filter(
    (selectedItem) => selectedItem !== item
  );
}

function addTeam() {
  router.push("/teams/create");
}

function editTeam(id) {
  router.push(`/teams/edit/${id}`);
}

function updateCurrentPageActive(page) {
  variablesGetLeads.value.page = page;
  getLeads();
}

function searchTrainings(search) {
  variablesGetLeads.value.filter.search = `%${search}%`;
}

function clearSearch() {
  variablesGetLeads.value.filter = {
    search: "%%",
    teamsIds: [],
  };
}

async function getLeads() {
  loading.value = true;
  items.value = [];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await $customFetch("/leads", "GET")
    .then((response) => {
      items.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
