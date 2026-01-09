<template>
  <VaLayout :left="{ absolute: true }">
    <template #top>
      <nav class="custom-navbar">
        <div class="navbar-logo" @click="goToIndex()">
          <va-icon class="icon" name="sports_volleyball" />
          <span class="ml-2 title-and-icon">VolleyTrack</span>
        </div>
        <div class="navbar-links">
          <a href="/" class="navbar-link">{{ $t("menu_title_about") }}</a>
          <a
            href="#benefits-section"
            class="navbar-link"
            @click.prevent="routeBenefits"
            >{{ $t("menu_title_features") }}</a
          >
          <a
            href="#plans-section"
            class="navbar-link"
            @click.prevent="routePlans"
            >{{ $t("menu_title_plans") }}</a
          >
          <a
            href="#faq-section"
            class="navbar-link"
            @click.prevent="routeFAQ"
            >{{ $t("menu_title_faq") }}</a
          >
          <a href="/register" class="navbar-link">{{
            $t("menu_title_register")
          }}</a>
        </div>
        <div class="navbar-actions">
          <div class="navbar-language-selector">
            <va-select
              name="option"
              v-model="locale"
              class="navbar-language-select"
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
            />
          </div>
          <button class="navbar-register-btn" @click="routeRegister()">
            {{ $t("button_register_free") }}
          </button>
        </div>
      </nav>
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
  <footer class="footer custom-footer" style="background: #02254a; color: #fff">
    <div class="footer-content">
      <div class="footer-col">
        <div class="footer-title">
          <va-icon
            name="mail"
            color="#ff7300"
            size="18px"
            class="footer-icon"
          />
          <span class="footer-title-text">{{
            $t("title_footer_contact")
          }}</span>
        </div>
        <div class="footer-item">
          <va-icon
            name="mail"
            color="#ff7300"
            size="14px"
            class="footer-icon"
          />
          <span style="font-size: 15px">support@volleytrack.com</span>
        </div>
      </div>
      <div class="footer-col">
        <div class="footer-title">
          <va-icon
            name="link"
            color="#ff7300"
            size="18px"
            class="footer-icon"
          />
          <span class="footer-title-text">{{
            $t("title_footer_useful_links")
          }}</span>
        </div>
        <div class="footer-links">
          <a href="/sobre" class="footer-link">{{ $t("menu_title_about") }}</a>
          <a href="/planos" class="footer-link">{{ $t("menu_title_plans") }}</a>
          <a
            href="#faq-section"
            class="footer-link"
            @click.prevent="routeFAQ"
            >{{ $t("menu_title_faq") }}</a
          >
          <a href="#" @click.prevent="routeDiscord" class="footer-link">{{
            $t("menu_title_discord")
          }}</a>
        </div>
      </div>
      <div class="footer-col">
        <div class="footer-title">
          <va-icon
            name="share"
            color="#ff7300"
            size="18px"
            class="footer-icon"
          />
          <span class="footer-title-text">{{
            $t("title_footer_social_networks")
          }}</span>
        </div>
        <div class="footer-social">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            class="footer-social-link"
            aria-label="LinkedIn"
          >
            <va-icon name="linkedin" size="22px" color="#fff" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            class="footer-social-link"
            aria-label="Instagram"
          >
            <va-icon name="instagram" size="22px" color="#fff" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            class="footer-social-link"
            aria-label="Facebook"
          >
            <va-icon name="facebook" size="22px" color="#fff" />
          </a>
        </div>
      </div>
    </div>
    <div class="footer-divider"></div>
    <div class="footer-bottom">
      <span
        >© {{ currentYear() }} VolleyTrack –
        {{ $t("all_rights_reserved") }}.</span
      >
    </div>
  </footer>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "#imports";
import { useKonamiCode } from "~/composables/useKonamiCode";

const router = useRouter();

useKonamiCode(() => {
  router.push("/login");
});
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
  if (window.location.pathname !== "/") {
    router.push("/").then(() => {
      setTimeout(() => {
        const faqSection = document.querySelector(".faq-section");
        if (faqSection) {
          faqSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 400);
    });
  } else {
    const faqSection = document.querySelector(".faq-section");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
    }
  }
};

const routeBenefits = () => {
  if (window.location.pathname !== "/") {
    router.push("/").then(() => {
      setTimeout(() => {
        const benefitsSection = document.querySelector(".benefits-section");
        if (benefitsSection) {
          benefitsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 400);
    });
  } else {
    const benefitsSection = document.querySelector(".benefits-section");
    if (benefitsSection) {
      benefitsSection.scrollIntoView({ behavior: "smooth" });
    }
  }
};

const routePlans = () => {
  if (window.location.pathname !== "/") {
    router.push("/").then(() => {
      setTimeout(() => {
        const plansSection = document.querySelector(".plans-section");
        if (plansSection) {
          plansSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 400);
    });
  } else {
    const plansSection = document.querySelector(".plans-section");
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: "smooth" });
    }
  }
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

body,
html {
  font-family: "Poppins", Arial, Helvetica, sans-serif !important;
}
</style>
<style>
.custom-navbar {
  width: 100%;
  background: #02254a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 56px;
  border-bottom: 1px solid #0a2c4d;
  position: relative;
  z-index: 10;
}
.navbar-logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}
.navbar-links {
  display: flex;
  gap: 32px;
  justify-content: center;
  flex: 1;
}
.navbar-link {
  color: #fff;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s;
  padding: 4px 0;
}
.navbar-link:hover {
  color: #ff7300;
}
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.navbar-language-selector {
  display: flex;
  align-items: center;
  position: relative;
}
.navbar-language-select {
  min-width: 160px;
  max-width: 180px;
}
.navbar-language-selector :deep(.va-select) {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  transition: all 0.2s ease;
}
.navbar-language-selector :deep(.va-select:hover) {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
}
.navbar-language-selector :deep(.va-select:focus-within) {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 115, 0, 0.5);
  box-shadow: 0 0 0 2px rgba(255, 115, 0, 0.1);
}
.navbar-language-selector :deep(.va-input-wrapper) {
  background: transparent;
}
.navbar-language-selector :deep(.va-input-wrapper__text) {
  color: #ffffff !important;
  caret-color: #ffffff !important;
  --va-input-wrapper-text-color: #ffffff !important;
}
.navbar-language-selector :deep(.va-input-wrapper__field) {
  color: #ffffff !important;
  font-size: 14px;
  font-weight: 500;
  padding: 7px 32px 7px 12px;
  background: transparent;
  border: none;
  height: auto;
  min-height: auto;
}
.navbar-language-selector :deep(.va-input-wrapper__field::placeholder) {
  color: rgba(255, 255, 255, 0.7) !important;
}
.navbar-language-selector :deep(input) {
  color: #ffffff !important;
}
.navbar-language-selector :deep(.va-select__selected) {
  color: #ffffff !important;
}
.navbar-language-selector :deep(.va-input-wrapper__field input) {
  color: #ffffff !important;
}
.navbar-language-selector :deep(.va-input-wrapper__field span) {
  color: #ffffff !important;
}
.navbar-language-selector :deep(.va-select__text) {
  color: #ffffff !important;
}
.navbar-language-selector :deep(.va-input-wrapper__field *) {
  color: #ffffff !important;
}
.navbar-language-selector :deep(.va-select__content) {
  color: #ffffff !important;
}
.navbar-language-selector :deep(.va-select__content *) {
  color: #ffffff !important;
}
.navbar-language-selector :deep(.va-input-wrapper__field:focus) {
  outline: none;
  border: none;
  box-shadow: none;
}
.navbar-language-selector :deep(.va-select__content) {
  background: transparent;
}
.navbar-language-selector :deep(.va-icon) {
  color: rgba(255, 255, 255, 0.7);
  right: 10px;
}
.navbar-language-selector :deep(.va-select__dropdown) {
  background: #02254a;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  margin-top: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.navbar-language-selector :deep(.va-select-option) {
  color: rgba(255, 255, 255, 0.9);
  padding: 10px 16px;
  font-size: 14px;
  transition: all 0.2s ease;
}
.navbar-language-selector :deep(.va-select-option:hover) {
  background: rgba(255, 115, 0, 0.15);
  color: #ff7300;
}
.navbar-language-selector :deep(.va-select-option--selected) {
  background: rgba(255, 115, 0, 0.25);
  color: #ff7300;
  font-weight: 600;
}

.navbar-register-btn {
  background: #ff7300;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 15px;
  padding: 8px 20px;
  cursor: pointer;
  transition: background 0.2s;
}
.navbar-register-btn:hover {
  background: #ff8c1a;
}
@media (max-width: 900px) {
  .custom-navbar {
    padding: 0 12px;
  }
  .navbar-links {
    gap: 16px;
  }
}
@media (max-width: 600px) {
  .custom-navbar {
    flex-direction: column;
    height: auto;
    padding: 0 4px;
  }
  .navbar-links {
    flex-direction: column;
    gap: 8px;
    width: 100%;
    align-items: center;
    margin: 8px 0;
  }
  .navbar-actions {
    width: 100%;
    justify-content: center;
    margin-bottom: 8px;
    flex-direction: column;
    gap: 8px;
  }
  .navbar-language-selector {
    width: 100%;
  }
  .navbar-language-selector .navbar-language-select {
    width: 100%;
  }
}
</style>
<style>
.custom-footer {
  padding-top: 24px;
  padding-bottom: 0;
  background: #02254a;
  color: #fff;
  border-top: 1px solid #0a2c4d;
}
.footer-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 80px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 0 16px 0;
}
.footer-col {
  display: flex;
  flex-direction: column;
  min-width: 200px;
  gap: 10px;
}
.footer-title {
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 8px;
  color: #fff;
  font-size: 15px;
}
.footer-title-text {
  margin-left: 6px;
}
.footer-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  margin-bottom: 8px;
}
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.footer-link {
  color: #fff;
  text-decoration: none;
  font-size: 15px;
  margin-bottom: 2px;
  transition: color 0.2s;
}
.footer-link:hover {
  color: #ff7300;
}
.footer-social {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 4px;
}
.footer-social-link {
  display: flex;
  align-items: center;
  color: #fff;
  transition: color 0.2s;
}
.footer-social-link:hover {
  color: #ff7300;
}
.footer-divider {
  width: 100%;
  height: 2px;
  background: #0a2c4d;
  margin: 0 0 0 0;
}
.footer-bottom {
  width: 100%;
  text-align: center;
  padding: 12px 0 10px 0;
  font-size: 15px;
  color: #fff;
}
@media (max-width: 900px) {
  .footer-content {
    gap: 24px;
  }
}
@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding-left: 16px;
    padding-right: 16px;
  }
  .footer-col {
    min-width: 0;
    width: 100%;
    gap: 6px;
  }
}
</style>
