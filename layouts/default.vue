<template>
  <VaLayout :left="{ absolute: true }">
    <template #top>
      <nav class="custom-navbar">
        <div class="navbar-left">
          <button
            class="navbar-hamburger"
            @click="showSidebar = !showSidebar"
            aria-label="Menu"
          >
            <va-icon name="menu" size="24px" />
          </button>
          <div class="navbar-logo" @click="goToIndex()">
            <va-icon class="icon" name="sports_volleyball" />
            <span class="ml-2 title-and-icon">VolleyTrack</span>
          </div>
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
            href="#register-section"
            class="navbar-link"
            @click.prevent="routeRegister"
            >{{ $t("menu_title_register") }}</a
          >
          <a
            href="#faq-section"
            class="navbar-link"
            @click.prevent="routeFAQ"
            >{{ $t("menu_title_faq") }}</a
          >
        </div>
        <div class="navbar-actions">
          <button class="navbar-register-btn" @click="routeRegister()">
            {{ $t("button_register_free") }}
          </button>
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
        </div>
      </nav>
    </template>

    <template #left>
      <VaSidebar v-model="showSidebar" color="#02254a">
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaSidebarItemTitle>
              <a href="/" class="sidebar-link" @click="showSidebar = false">
                {{ $t("menu_title_about") }}
              </a>
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaSidebarItemTitle>
              <a
                href="#benefits-section"
                class="sidebar-link"
                @click.prevent="
                  routeBenefits();
                  showSidebar = false;
                "
              >
                {{ $t("menu_title_features") }}
              </a>
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaSidebarItemTitle>
              <a
                href="#plans-section"
                class="sidebar-link"
                @click.prevent="
                  routePlans();
                  showSidebar = false;
                "
              >
                {{ $t("menu_title_plans") }}
              </a>
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaSidebarItemTitle>
              <a
                href="#register-section"
                class="sidebar-link"
                @click.prevent="
                  routeRegister();
                  showSidebar = false;
                "
              >
                {{ $t("menu_title_register") }}
              </a>
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaSidebarItemTitle>
              <a
                href="#faq-section"
                class="sidebar-link"
                @click.prevent="
                  routeFAQ();
                  showSidebar = false;
                "
              >
                {{ $t("menu_title_faq") }}
              </a>
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaSidebarItem>
          <VaSidebarItemContent>
            <VaSidebarItemTitle>
              <button
                class="sidebar-register-btn"
                @click="
                  routeRegister();
                  showSidebar = false;
                "
              >
                {{ $t("button_register_free") }}
              </button>
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
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
                  style="width: 100%"
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
            href="https://discord.gg/5G6V2QR8Vh"
            target="_blank"
            class="footer-social-link"
            aria-label="Discord"
            rel="noopener noreferrer"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.673-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/volleytrackofficial"
            target="_blank"
            class="footer-social-link"
            aria-label="Instagram"
            rel="noopener noreferrer"
          >
            <va-icon name="instagram" size="22px" color="#fff" />
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
  gap: 16px;
}
.navbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.navbar-hamburger {
  display: none;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.2s;
  align-items: center;
  justify-content: center;
}
.navbar-hamburger:hover {
  background: rgba(255, 255, 255, 0.1);
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
/* Tablet */
@media (max-width: 1024px) {
  .custom-navbar {
    padding: 0 20px;
  }
  .navbar-links {
    gap: 20px;
  }
  .navbar-link {
    font-size: 14px;
  }
}

/* Mobile Large */
@media (max-width: 900px) {
  .custom-navbar {
    padding: 0 16px;
  }
  .navbar-links {
    gap: 16px;
  }
  .navbar-link {
    font-size: 14px;
  }
  .navbar-register-btn {
    font-size: 14px;
    padding: 6px 16px;
  }
  .navbar-language-select {
    min-width: 140px;
    max-width: 160px;
  }
}

/* Mobile Medium */
@media (max-width: 768px) {
  .navbar-hamburger {
    display: flex;
  }
  .navbar-links {
    display: none;
  }
  .navbar-actions {
    gap: 8px;
  }
  .navbar-language-selector {
    display: none;
  }
  .navbar-register-btn {
    font-size: 13px;
    padding: 6px 14px;
    white-space: nowrap;
  }
  .navbar-logo {
    font-size: 18px;
  }
}

/* Mobile Small */
@media (max-width: 480px) {
  .custom-navbar {
    padding: 0 12px;
    height: 56px;
  }
  .navbar-logo .title-and-icon {
    font-size: 16px;
  }
  .navbar-register-btn {
    font-size: 12px;
    padding: 6px 12px;
  }
  .navbar-left {
    gap: 8px;
  }
}

/* Sidebar Styles - Forçar cor azul #02254a */
:deep(.va-sidebar),
:deep(.va-sidebar[style]),
:deep(.va-sidebar[style*="background-color"]),
:deep(.va-sidebar[style*="background"]) {
  background: #02254a !important;
  background-color: #02254a !important;
  border-right: 1px solid #0a2c4d !important;
  color: #ffffff !important;
}
:deep(.va-sidebar__menu),
:deep(.va-sidebar__menu[style]),
:deep(.va-sidebar__menu[style*="background-color"]),
:deep(.va-sidebar__menu[style*="background"]) {
  background: #02254a !important;
  background-color: #02254a !important;
}
:deep(.va-sidebar__content),
:deep(.va-sidebar__content[style]),
:deep(.va-sidebar__content[style*="background-color"]),
:deep(.va-sidebar__content[style*="background"]) {
  background: #02254a !important;
  background-color: #02254a !important;
}
:deep(.va-sidebar-item),
:deep(.va-sidebar-item[style]),
:deep(.va-sidebar-item[style*="background-color"]),
:deep(.va-sidebar-item[style*="background"]),
:deep(.va-sidebar-item[style*="color"]) {
  background: transparent !important;
  background-color: transparent !important;
  color: #ffffff !important;
}
:deep(.va-sidebar-item:hover),
:deep(.va-sidebar-item:hover[style]) {
  background: rgba(255, 255, 255, 0.05) !important;
  background-color: rgba(255, 255, 255, 0.05) !important;
}
:deep(.va-sidebar-item__content),
:deep(.va-sidebar-item__content *) {
  color: #ffffff !important;
}
:deep(.va-sidebar-item-title),
:deep(.va-sidebar-item-title *) {
  color: #ffffff !important;
}
.sidebar-header {
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 16px;
}
.sidebar-logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.2s;
}
.sidebar-logo:hover {
  background: rgba(255, 255, 255, 0.1);
}
.sidebar-link {
  display: block;
  color: #fff;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  padding: 12px 16px;
  border-radius: 4px;
  transition: all 0.2s;
  margin: 4px 0;
}
.sidebar-link:hover {
  background: rgba(255, 115, 0, 0.15);
  color: #ff7300;
}
.sidebar-register-btn {
  width: 100%;
  background: #ff7300;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 15px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
}
.sidebar-register-btn:hover {
  background: #ff8c1a;
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
