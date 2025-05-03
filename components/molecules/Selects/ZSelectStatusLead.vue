<template>
  <ZSelect
    v-model="selected"
    v-bind="$attrs"
    :label="label"
    :options="items"
    :loading="loading"
    @click="resetAndFetch"
    @scrollBottom="loadMore"
    :clearable="false"
  />
  {{ items }}
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import ZSelect from "~/components/atoms/Select/ZSelect";
const { $customFetch } = useNuxtApp();

const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  ignoreIds: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const selected = ref(props.modelValue);
const items = ref([]);
const loading = ref(false);
const hasMoreItems = ref(true);
const page = ref(1);
const perPage = 10;

const variables = ref({
  page: page.value,
  perPage,
  filter: {
    search: "%%",
    ignoreIds: props.ignoreIds,
  },
});

watch(
  () => props.modelValue,
  (newVal) => {
    selected.value = newVal;
  }
);

watch(selected, (val) => {
  console.log("selected", val);
  emit("update:modelValue", val);
});

function resetAndFetch() {
  items.value = [];
  page.value = 1;
  hasMoreItems.value = true;
  fetchStatusLeads();
}

function loadMore() {
  if (!hasMoreItems.value) return;
  page.value += 1;
  fetchStatusLeads();
}

async function fetchStatusLeads() {
  loading.value = true;

  const body = {
    ...variables.value,
    page: page.value,
  };

  try {
    const queryParams = new URLSearchParams({
      page: page.value,
      perPage: perPage,
      search: variables.value.filter.search,
      ...(props.ignoreIds.length > 0 && {
        ignoreIds: props.ignoreIds.join(","),
      }),
    }).toString();

    const response = await $customFetch(`/leads-status?${queryParams}`, "GET");

    if (response.data.length < perPage) {
      hasMoreItems.value = false;
    }

    items.value = [
      ...items.value,
      ...response.data.map((item) => ({
        value: item.id,
        text: item.name,
      })),
    ];
  } catch (error) {
    console.error("Erro ao buscar status leads:", error);
  } finally {
    loading.value = false;
  }
}
</script>
