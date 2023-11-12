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
          <va-navbar-item
            class="font-bold text-lg logo va-button"
            @click="goToIndex()"
          >
            <va-icon class="icon" name="sports_volleyball" />
            <span class="ml-2 title-and-icon">{{ applicationName }}</span>
          </va-navbar-item>
        </template>
        <template #right style="margin-right: 50px">
          <va-navbar-item @click="routeHome()" class="va-button">{{
            $t("menu_title_home")
          }}</va-navbar-item>
          <va-navbar-item
            @click="routeRegister()"
            class="hidden va-button sm:block"
            >{{ $t("menu_title_register") }}</va-navbar-item
          >
          <va-navbar-item @click="routeFAQ()" class="va-button">{{
            $t("menu_title_faq")
          }}</va-navbar-item>
          <va-navbar-item @click="routeDiscord()" class="va-button">{{
            $t("menu_title_discord")
          }}</va-navbar-item>
        </template>
      </VaNavbar>
    </template>

    <template #left>
      <VaSidebar v-model="showSidebar">
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaSidebarItemTitle>
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
    <!-- Adicionando o Footer -->
  </VaLayout>
  <footer
    class="footer"
    style="
      background: rgb(21, 78, 193);
      color: rgb(255, 255, 255);
      --va-0-stripe-color-computed: #154ec1;
    "
  >
    <div class="row mb-4 pt-3">
      <div class="flex flex-col offset-xs2 offset-sm1 offset-md-1 md3 mb-3">
        <div class="item mb-3 font-bold">
          <h6 class="va-h6">{{ $t("title_footer_about_us") }}</h6>
        </div>
        <div class="item">
          <p>
            {{ $t("text_footer_about_us") }}
          </p>
        </div>
      </div>
      <div class="flex flex-col offset-xs2 offset-sm1 offset-md-1 md3">
        <div class="item mb-3 font-bold">
          <h6 class="va-h6">{{ $t("title_responsible_company") }}:</h6>
        </div>
        <div class="item">{{ nameCompany }}</div>
        <div class="item">{{ cnpj }}</div>
        <div class="item mb-3 font-bold">
          <h6 class="va-h6">{{ $t("title_footer_contact") }}:</h6>
        </div>
        <div class="item">{{ emailSupport }}</div>
      </div>
    </div>
    <p class="va-text-center pb-3">
      <span role="img" aria-label="Bandeira do Brasil">🇧🇷</span> &copy;
      {{ currentYear() }} {{ applicationName }}.
      {{ $t("all_rights_reserved") }}.
    </p>
  </footer>
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

const currentYear = () => {
  return new Date().getFullYear();
};

const runtimeConfig = useRuntimeConfig();

const applicationName = runtimeConfig.public.nameApplication;
const nameCompany = runtimeConfig.public.nameCompany;
const emailSupport = runtimeConfig.public.emailSupport;
const cnpj = runtimeConfig.public.cnpj;

const routeRegister = () => {
  router.push("/register");
};

const routeFAQ = () => {
  router.push("/faq");
};

const routeHome = () => {
  router.push("/");
};

const goToIndex = () => {
  router.push("/");
};

const routeDiscord = () => {
  const runtimeConfig = useRuntimeConfig();

  const discordLink = runtimeConfig.public.discordLink;
  window.open(discordLink, "_blank");
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

@media (max-width: 410px) {
  .title-and-icon {
    display: none;
  }

  .icon {
    margin-right: 2rem;
  }
}

@media (min-width: 410px) {
  .title-and-icon {
    margin-right: 2rem;
  }
  .icon {
    margin-right: 1rem;
  }
}
</style>
