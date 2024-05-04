<template>
  <ZSelect
    v-model="value"
    v-bind="$attrs"
    :label="label"
    :options="items"
    :loading="loading"
    @click="getRoles(true)"
    @scrollBottom="loadMore"
    :clearable="false"
  >
  </ZSelect>
</template>

<script>
import ZSelect from "~/components/atoms/Select/ZSelect";

export default {
  components: {
    ZSelect,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    ignoreIds: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      hasMoreItems: true,
      value: "",
      loading: false,
      items: [],
      variablesGetRoles: {
        page: 1,
        perPage: 10,
        filter: {
          search: "%%",
          ignoreIds: this.ignoreIds,
        },
      },
    };
  },

  methods: {
    getRoles(click = false) {
      if (click) {
        this.items = [];
        this.variablesGetRoles.page = 1;
      }
      this.loading = true;
      setTimeout(() => {
        this.items = [
          { text: "new", value: "new" },
          { text: "contacted", value: "contacted" },
          { text: "converted", value: "converted" },
          { text: "unqualified", value: "unqualified" },
          { text: "qualified", value: "qualified" },
          { text: "bad_email", value: "bad_email" },
          { text: "spam", value: "spam" },
        ];

        this.loading = false;
      }, 400);
    },

    loadMore() {
      if (!this.hasMoreItems) {
        return;
      }
      this.variablesGetRoles.page += 1;
      this.getRoles();
    },
  },
};
</script>
