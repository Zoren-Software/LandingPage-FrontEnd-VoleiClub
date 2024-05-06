<template>
  <ZDatatablesLeads />
</template>

<script>
import ZDatatablesLeads from "~/components/organisms/Datatables/Leads/ZDatatablesLeads.vue";

export default {
  components: {
    ZDatatablesLeads,
  },
};
</script>
<script setup>
useHead({
  titleTemplate: "Leads",
});
definePageMeta({
  layout: "logged",
});
</script>
