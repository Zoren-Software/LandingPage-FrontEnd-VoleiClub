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
            <span class="ml-2">{{ applicationName }} </span>
          </va-navbar-item>
        </template>
        <template #right style="margin-right: 50px">
          <va-navbar-item>
            <div class="custom-select-language">
              <va-select
                name="option"
                v-model="locale"
                class="display-block"
                :label="$t('label_language')"
                :placeholder="$t('placeholder_language')"
                :options="[
                  { value: 'pt-br', text: $t('option_language_pt_br') },
                  { value: 'en', text: $t('option_language_en') },
                  { value: 'es', text: $t('option_language_es') },
                  { value: 'fr', text: $t('option_language_fr') },
                  { value: 'it', text: $t('option_language_it') },
                  { value: 'pl', text: $t('option_language_pl') },
                  { value: 'ru', text: $t('option_language_ru') },
                ]"
                valueBy="value"
                autoSelectFirstOption
                style="width: max-content"
              />
            </div>
          </va-navbar-item>
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

// Carregar o idioma do localStorage ou usar 'en' como padrão
if (!localStorage.getItem("selectedLanguage")) {
  localStorage.setItem("selectedLanguage", "en");
}
locale.value = localStorage.getItem("selectedLanguage");

// Assistir a mudanças no idioma e atualizar o localStorage
watch(locale, (newLocale) => {
  localStorage.setItem("selectedLanguage", newLocale);
});

const runtimeConfig = useRuntimeConfig();

const applicationName = runtimeConfig.public.nameApplication;

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

.custom-select-language {
  height: 4rem;
  width: 11rem;
}
</style>
