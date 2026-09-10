<template>
  <VaLayout :left="{ absolute: true }">
    <template #top>
      <VaNavbar color="primary" class="py-2">
        <template #left>
          <VaButton
            @click="showSidebar = !showSidebar"
            :icon="showSidebar ? 'menu' : 'language'"
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
          <div class="custom-select-language custom-select-language-none mr-5">
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
          <va-navbar-item @click="routeHome()" class="va-button">{{
            $t("menu_title_home")
          }}</va-navbar-item>
          <va-navbar-item
            v-if="!isPartner"
            @click="routeLeads()"
            class="va-button"
            >{{ $t("menu_title_leads") }}</va-navbar-item
          >
          <va-navbar-item
            v-if="!isPartner"
            @click="routeAcquisition()"
            class="hidden va-button sm:block"
            >{{ $t("menu_title_acquisition") }}</va-navbar-item
          >
          <va-navbar-item
            v-if="!isPartner"
            @click="routeAcquisitionDashboard()"
            class="hidden va-button sm:block"
            >{{ $t("menu_title_acquisition_dashboard") }}</va-navbar-item
          >
          <va-navbar-item
            v-if="isPartner"
            @click="routePartner()"
            class="va-button"
            >{{ $t("menu_title_partner") }}</va-navbar-item
          >
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
          <va-navbar-item @click="routeLogout()" class="va-button">{{
            $t("menu_title_logout")
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
      <main class="p-4 pt-4 px-4">
        <NuxtPage />
      </main>
    </template>
    <!-- Adicionando o Footer -->
  </VaLayout>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "#imports";
import { clearLandingSession, isPartnerSession } from "~/utils/landingSession.js";

const router = useRouter();
const showSidebar = ref(false);
const isPartner = ref(false);
const { $customFetch } = useNuxtApp();
import { confirmSuccess, confirmError } from "~/utils/sweetAlert2/swalHelper";

const { locale } = useI18n();

if (typeof localStorage !== "undefined") {
  isPartner.value = isPartnerSession();
}

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
  if (window.location.pathname !== "/") {
    router.push("/").then(() => {
      setTimeout(() => {
        const registerSection = document.querySelector(".register-section");
        if (registerSection) {
          registerSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 400);
    });
  } else {
    const registerSection = document.querySelector(".register-section");
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: "smooth" });
    }
  }
};

const routeFAQ = () => {
  router.push("/faq");
};

const routeHome = () => {
  router.push("/");
};

const routeLeads = () => {
  router.push("/leads");
};

const routeAcquisition = () => {
  router.push("/acquisition");
};

const routeAcquisitionDashboard = () => {
  router.push("/acquisition/dashboard");
};

const routePartner = () => {
  router.push("/partner");
};

const goToIndex = () => {
  router.push("/");
};

const routeDiscord = () => {
  const runtimeConfig = useRuntimeConfig();

  const discordLink = runtimeConfig.public.discordLink;
  window.open(discordLink, "_blank");
};

const routeLogout = () => {
  if (typeof localStorage === "undefined") return;

  $customFetch("/logout", "POST", {
    body: JSON.stringify({
      email: localStorage.getItem("email"),
      token: localStorage.getItem("userToken"),
    }),
  })
    .then((response) => {
      // Limpa dados primeiro
      clearLandingSession();

      // Mostra mensagem e redireciona após fechar
      confirmSuccess(response.message || "Logout efetuado com sucesso!", () => {
        router.push("/");
      });
    })
    .catch((error) => {
      // Em caso de erro na API, ainda limpa localmente
      clearLandingSession();

      confirmError(error.message || "Erro ao fazer logout", () => {
        router.push("/");
      });
    });
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
@media (max-width: 768px) {
  .custom-select-language-none {
    display: none;
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
