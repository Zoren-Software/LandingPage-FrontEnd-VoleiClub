<template>
  <VaNavbar color="primary">
    <template #right class="">
      <va-navbar-item>Home</va-navbar-item>
      <va-navbar-item class="hidden sm:block">Contato</va-navbar-item>
      <va-navbar-item>FAQ</va-navbar-item>
    </template>
  </VaNavbar>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useColors } from "vuestic-ui";
import { ref } from "vue";

const showSidebar = ref(false);
const page = ref(1);

const { currentPresetName } = useColors();

const darkNavbarColors = computed(() => {
  if (currentPresetName.value === "light") {
    return {
      color: "#111111",
      textColor: "#BAFFC5",
    };
  } else {
    return {
      color: "#FBCAF6",
      textColor: "#481269",
    };
  }
});
</script>

<style>
.va-screen-xs {
  margin: 0 auto;
}
.va-screen-sm {
  margin: 0 auto;
}
.va-screen-md {
  margin: 0 auto;
}
.va-screen-lg {
  margin: 0 auto;
}
.va-screen-xl {
  margin: 0 auto;
}
.va-navbar__right {
  margin-right: 2 rem;
}
</style>
