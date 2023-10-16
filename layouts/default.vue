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
          <va-navbar-item>
            <va-select
              name="option"
              v-model="locale"
              class="display-block"
              :label="$t('label_language')"
              :placeholder="$t('placeholder_language')"
              :options="[
                { value: 'pt-br', text: $t('option_language_pt_br') },
                { value: 'en', text: $t('option_language_en') },
              ]"
              valueBy="value"
              autoSelectFirstOption
              clearable
          /></va-navbar-item>
          <va-navbar-item @click="routeHome()">{{
            $t("menu_title_home")
          }}</va-navbar-item>
          <va-navbar-item @click="routeRegister()" class="hidden sm:block">{{
            $t("menu_title_register")
          }}</va-navbar-item>
          <va-navbar-item @click="routeFAQ()">{{
            $t("menu_title_faq")
          }}</va-navbar-item>
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="showSidebar">
        <VaSidebarItem>
          <VaSidebarItemContent @click="routeHome()">
            <VaSidebarItemTitle>
              {{ $t("menu_title_home") }}
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem>
          <VaSidebarItemContent @click="routeRegister()">
            <VaSidebarItemTitle>
              {{ $t("menu_title_register") }}
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem>
          <VaSidebarItemContent @click="routeFAQ()">
            <VaSidebarItemTitle>
              {{ $t("menu_title_faq") }}
            </VaSidebarItemTitle>
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
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "#imports";

const router = useRouter();
const showSidebar = ref(false);

const { locale } = useI18n();

const routeRegister = () => {
  console.log("routeRegister");
  router.push("/register");
};

const routeFAQ = () => {
  console.log("routeFAQ");
  router.push("/faq");
};

const routeHome = () => {
  console.log("routeHome");
  router.push("/");
};
</script>

<style>
.logo {
  font-weight: 600;
  font-size: 1.5rem;
}
</style>
