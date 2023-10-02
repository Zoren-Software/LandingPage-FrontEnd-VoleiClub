<template>
  <VaLayout :left="{ absolute: true }">
    <template #top>
      <VaNavbar color="primary" class="py-2">
        <template #left>
          <VaButton
            @click="showSidebar = !showSidebar"
            :icon="showSidebar ? 'menu_open' : 'menu'"
          />
        </template>
        <template #center>
          <va-navbar-item class="font-bold text-lg logo">
            <va-icon name="sports_volleyball" />
            <span class="ml-2">VoleiClub</span>
          </va-navbar-item>
        </template>
        <template #right style="margin-right: 50px">
          <va-navbar-item @click="routeHome()">Home</va-navbar-item>
          <va-navbar-item @click="routeRegister()" class="hidden sm:block"
            >Registrar</va-navbar-item
          >
          <va-navbar-item @click="routeFAQ()">FAQ</va-navbar-item>
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="showSidebar">
        <VaSidebarItem>
          <VaSidebarItemContent @click="routeHome()">
            <VaSidebarItemTitle> Home </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem>
          <VaSidebarItemContent @click="routeRegister()">
            <VaSidebarItemTitle> Registrar </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem>
          <VaSidebarItemContent @click="routeFAQ()">
            <VaSidebarItemTitle> FAQ </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </template>

    <template #content>
      <main class="p-4">
        <NuxtPage />
      </main>
    </template>
  </VaLayout>
</template>
<script>
export default {
  data() {
    return {
      showSidebar: false,
    };
  },
  methods: {
    routeRegister() {
      console.log("routeRegister");
      this.$router.push("/register");
    },
    routeFAQ() {
      console.log("routeFAQ");
      this.$router.push("/faq");
    },
    routeHome() {
      console.log("routeHome");
      this.$router.push("/");
    },
  },
};
</script>

<style>
.logo {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>
