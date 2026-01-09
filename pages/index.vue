<template>
  <section class="hero-banner">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="hero-top-text">{{ $t("hero_top_text") }}</p>
      <h1 class="hero-title">{{ $t("hero_title_main") }}</h1>
      <p class="hero-desc-text">{{ $t("hero_desc_text") }}</p>
    </div>
  </section>

  <section class="benefits-section">
    <div class="benefits-container">
      <h2 class="benefits-title-highlight">
        {{ $t("benefits_title_highlight") }}
      </h2>
      <p class="benefits-subtitle">{{ $t("benefits_subtitle") }}</p>
      <div class="benefits-cards-row">
        <div class="benefit-card border-orange">
          <va-icon
            name="event"
            size="38px"
            color="#ff7300"
            class="benefit-icon"
          />
          <h3 class="benefit-card-title">
            {{ $t("benefit_card_title_smart_scheduling") }}
          </h3>
          <p class="benefit-card-desc">
            {{ $t("benefit_card_desc_smart_scheduling") }}
          </p>
        </div>
        <div class="benefit-card border-blue">
          <va-icon
            name="groups"
            size="38px"
            color="#ff7300"
            class="benefit-icon"
          />
          <h3 class="benefit-card-title">
            {{ $t("benefit_card_title_team_management") }}
          </h3>
          <p class="benefit-card-desc">
            {{ $t("benefit_card_desc_team_management") }}
          </p>
        </div>
        <div class="benefit-card border-dark">
          <va-icon
            name="show_chart"
            size="38px"
            color="#ff7300"
            class="benefit-icon"
          />
          <h3 class="benefit-card-title">
            {{ $t("benefit_card_title_analysis") }}
          </h3>
          <p class="benefit-card-desc">
            {{ $t("benefit_card_desc_analysis") }}
          </p>
        </div>
        <div class="benefit-card border-orange">
          <va-icon
            name="forum"
            size="38px"
            color="#ff7300"
            class="benefit-icon"
          />
          <h3 class="benefit-card-title">
            {{ $t("benefit_card_title_communication") }}
          </h3>
          <p class="benefit-card-desc">
            {{ $t("benefit_card_desc_communication") }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="about-section">
    <div class="about-container">
      <div class="about-icon-col">
        <div class="about-icon-bg">
          <va-icon name="settings" size="48px" color="#ff7300" />
        </div>
      </div>
      <div class="about-content-col">
        <h2 class="about-title">{{ $t("about_title") }}</h2>
        <p class="about-text">
          {{ $t("about_text") }}
        </p>
      </div>
    </div>
  </section>

  <section class="plans-section">
    <div class="plans-container">
      <h2 class="plans-title">{{ $t("plans_title") }}</h2>
      <p class="plans-subtitle">{{ $t("plans_subtitle") }}</p>
      <div class="plans-toggle-row">
        <button
          :class="['plans-toggle', { active: !isYearly }]"
          @click="isYearly = false"
        >
          {{ $t("plan_toggle_monthly") }}
        </button>
        <button
          :class="['plans-toggle', { active: isYearly }]"
          @click="isYearly = true"
        >
          {{ $t("plan_toggle_yearly") }}
        </button>
      </div>
      <div class="plans-cards-row">
        <!-- Card 1: Trial -->
        <div class="plan-card border-orange plan-trial">
          <div class="plan-card-badge plan-card-badge-active">
            {{ $t("plan_card_badge_active") }}
          </div>
          <va-icon
            name="card_giftcard"
            size="38px"
            color="#02254a"
            class="plan-card-icon"
          />
          <h3 class="plan-card-title plan-card-title-bold">
            {{ $t("plan_card_trial_title") }}
          </h3>
          <div class="plan-card-price plan-card-price-bold">
            {{ $t("plan_card_trial_price") }}
          </div>
          <div class="plan-card-desc plan-card-desc-muted">
            {{ $t("plan_card_trial_duration") }}
          </div>
          <ul class="plan-card-benefits plan-card-benefits-check">
            <li>
              <va-icon name="check" size="18px" color="#02254a" />
              {{ $t("plan_card_trial_benefit_1") }}
            </li>
            <li>
              <va-icon name="check" size="18px" color="#02254a" />
              {{ $t("plan_card_trial_benefit_2") }}
            </li>
          </ul>
          <div class="plan-card-warning plan-card-warning-box">
            <va-icon
              name="mail"
              size="16px"
              color="#02254a"
              style="margin-right: 6px"
            />
            {{ $t("plan_card_trial_warning") }}
          </div>
        </div>
        <!-- Card 2: Pro -->
        <div class="plan-card border-orange recommended">
          <div class="plan-card-badge">
            {{ $t("plan_card_badge_recommended") }}
          </div>
          <h3 class="plan-card-title">{{ $t("plan_card_pro_title") }}</h3>
          <div class="plan-card-price">
            {{
              isYearly
                ? $t("plan_card_pro_price_yearly")
                : $t("plan_card_pro_price_monthly")
            }}
          </div>
          <div class="plan-card-alt-price">
            {{
              isYearly
                ? $t("plan_card_pro_alt_yearly")
                : $t("plan_card_pro_alt_monthly")
            }}
          </div>
          <ul class="plan-card-benefits">
            <li>{{ $t("plan_card_pro_benefit_1") }}</li>
            <li>{{ $t("plan_card_pro_benefit_2") }}</li>
          </ul>
          <div class="plan-card-highlight">
            {{ $t("plan_card_pro_highlight") }}
          </div>
        </div>
        <!-- Card 3: Clubers -->
        <div class="plan-card border-blue">
          <div class="plan-card-badge">
            {{ $t("plan_card_badge_large_teams") }}
          </div>
          <h3 class="plan-card-title">{{ $t("plan_card_clubers_title") }}</h3>
          <div class="plan-card-price">
            {{
              isYearly
                ? $t("plan_card_clubers_price_yearly")
                : $t("plan_card_clubers_price_monthly")
            }}
          </div>
          <div class="plan-card-alt-price">
            {{
              isYearly
                ? $t("plan_card_clubers_alt_yearly")
                : $t("plan_card_clubers_alt_monthly")
            }}
          </div>
          <ul class="plan-card-benefits">
            <li>{{ $t("plan_card_clubers_benefit_1") }}</li>
            <li>{{ $t("plan_card_clubers_benefit_2") }}</li>
            <li>{{ $t("plan_card_clubers_benefit_3") }}</li>
          </ul>
        </div>
        <!-- Card 4: Vitalício -->
        <div class="plan-card border-dark">
          <div class="plan-card-badge">{{ $t("plan_card_badge_limited") }}</div>
          <h3 class="plan-card-title">{{ $t("plan_card_lifetime_title") }}</h3>
          <div class="plan-card-price">
            {{ $t("plan_card_lifetime_price") }}
          </div>
          <div class="plan-card-desc">
            {{ $t("plan_card_lifetime_payment") }}
          </div>
          <ul class="plan-card-benefits">
            <li>{{ $t("plan_card_lifetime_benefit_1") }}</li>
            <li>{{ $t("plan_card_lifetime_benefit_2") }}</li>
          </ul>
          <div class="plan-card-warning">
            {{ $t("plan_card_lifetime_warning") }}
          </div>
          <div class="plan-card-progress-bar">
            <div class="plan-card-progress" :style="{ width: '24%' }"></div>
          </div>
          <div class="plan-card-progress-label">
            {{ $t("plan_card_lifetime_remaining") }}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="register-section" id="register">
    <div class="register-container">
      <div class="register-form-column">
        <div class="register-header">
          <h2 class="register-title">{{ $t("register_title_ready") }}</h2>
          <p class="register-subtitle">{{ $t("register_subtitle") }}</p>
        </div>
        <va-form ref="formRef" class="register-form">
          <div class="form-field">
            <va-input
              name="name"
              class="register-input"
              :placeholder="$t('placeholder_name')"
              stateful
              v-model="form.name"
              :error="errors?.errors?.name != ''"
              :error-messages="errors?.errors?.name"
              :label="$t('label_name')"
            />
          </div>
          <div class="form-field">
            <va-input
              name="email"
              class="register-input"
              :placeholder="$t('placeholder_email')"
              v-model="form.email"
              type="email"
              :error="errors?.errors?.email != ''"
              :error-messages="errors?.errors?.email"
              :label="$t('label_email')"
            />
          </div>
          <div class="form-field">
            <div class="subdomain-field-wrapper">
              <va-input
                name="tenant_id"
                class="register-input subdomain-input"
                :placeholder="$t('placeholder_tenant_id')"
                v-model="form.tenant_id"
                :error="errors?.errors?.tenant_id != ''"
                :error-messages="errors?.errors?.tenant_id"
                :label="$t('label_tenant_id')"
              />
              <span class="subdomain-suffix">{{ apiTenantDomain }}</span>
            </div>
          </div>
          <div class="form-field">
            <va-select
              name="option"
              class="register-select"
              v-model="form.experience_level"
              :label="$t('label_experience_level')"
              :placeholder="$t('select_placeholder')"
              :options="[
                {
                  value: null,
                  text: $t('option_experience_level_select'),
                },
                {
                  value: 'beginner',
                  text: $t('option_experience_level_beginner'),
                },
                {
                  value: 'amateur',
                  text: $t('option_experience_level_amateur'),
                },
                {
                  value: 'student',
                  text: $t('option_experience_level_student'),
                },
                {
                  value: 'college',
                  text: $t('option_experience_level_university_student'),
                },
                {
                  value: 'semi-professional',
                  text: $t('option_experience_level_semi_professional'),
                },
                {
                  value: 'professional',
                  text: $t('option_experience_level_professional'),
                },
                {
                  value: 'intermediate',
                  text: $t('option_experience_level_intermediate'),
                },
                {
                  value: 'coach',
                  text: $t('option_experience_level_coach'),
                },
                {
                  value: 'instructor',
                  text: $t('option_experience_level_instructor'),
                },
                {
                  value: 'other',
                  text: $t('option_experience_level_other'),
                },
              ]"
              :rules="[
                (value) =>
                  (value.value && value.value.length > 0) ||
                  $t('message_error_level_experience_required'),
              ]"
              :error="errors?.errors?.experience_level != ''"
              :error-messages="errors?.errors?.experience_level"
              clearable
            />
          </div>
          <div class="form-field">
            <va-textarea
              name="message"
              class="register-textarea"
              v-model="form.message"
              :label="$t('label_message_optional')"
              :placeholder="$t('placeholder_message')"
            />
          </div>
          <div class="form-field">
            <button
              class="register-submit-btn"
              @click="submit"
              :disabled="loading"
            >
              <span class="btn-content" v-if="!loading">
                <va-icon
                  name="check"
                  size="20px"
                  color="#fff"
                  class="btn-icon"
                />
                <span class="btn-text">{{ $t("button_register") }}</span>
              </span>
              <span class="btn-loader" v-if="loading">
                <va-icon
                  name="sync"
                  size="20px"
                  color="#fff"
                  class="rotating"
                />
                <span class="btn-text">{{ $t("button_register") }}</span>
              </span>
            </button>
          </div>
        </va-form>
      </div>
      <div class="register-illustration-column">
        <div class="register-illustration">
          <div class="illustration-glow"></div>
          <img
            src="/images/image_form_volleytrack.png"
            alt="VolleyTrack illustration"
            class="illustration-image"
          />
        </div>
      </div>
    </div>
  </section>

  <section class="faq-section">
    <h2 class="faq-title">{{ $t("faq_title") }}</h2>
    <div class="faq-list">
      <va-collapse
        v-for="i in 10"
        :key="i"
        v-model="faqOpen[i]"
        class="faq-item"
        :header="$t(`question_${i}`)"
      >
        {{ $t(`answer_${i}`) }}
      </va-collapse>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useColors } from "vuestic-ui";
import { ref } from "vue";
import {
  confirmSuccess,
  confirmError,
  loader,
} from "~/utils/sweetAlert2/swalHelper";
import { useReCaptcha } from "vue-recaptcha-v3";

const isYearly = ref(false);
const { $customFetch } = useNuxtApp();
const { executeRecaptcha } = useReCaptcha();

const runtimeConfig = useRuntimeConfig();
const applicationName = runtimeConfig.public.nameApplication;
const apiTenantDomain = ref(
  `.${runtimeConfig.public.apiTenantDomain || "volleytrack.local"}`
);

const formRef = ref(null);
const loading = ref(false);

const form = ref({
  tenant_id: "",
  name: "",
  email: "",
  experience_level: "",
  message: "",
});

let errors = ref({
  errors: {
    tenant_id: "",
    name: "",
    email: "",
    experience_level: "",
    message: "",
  },
  message: "",
});

const submit = async () => {
  try {
    loader();

    if (loading.value) return;

    loading.value = true;

    const token = await executeRecaptcha("create_new_lead");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await $customFetch("/leads", "POST", {
      body: JSON.stringify({
        tenant_id: form.value.tenant_id,
        name: form.value.name,
        email: form.value.email,
        experience_level:
          form.value.experience_level?.value || form.value.experience_level,
        message: form.value.message,
        recaptchaToken: token,
      }),
    })
      .then((response) => {
        confirmSuccess(response.message, () => {});
        form.value = {
          tenant_id: "",
          name: "",
          email: "",
          experience_level: "",
          message: "",
        };
      })
      .catch(({ response }) => {
        if (typeof response.email == "object") {
          errors.value.errors.email = response.email[0];
          confirmError(response.email[0]);
        } else {
          confirmError(response.message);
        }
      })
      .finally(() => {
        loading.value = false;
      });
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);
    loading.value = false;
  }
};

const faqOpen = ref(Array(11).fill(false));

const routeRegister = () => {
  window.location.href = "/register";
};

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
.plan-trial {
  background: #fdf7f3;
  border: 3px solid #ff7300;
  box-shadow: 0 2px 16px rgba(255, 115, 0, 0.08);
}
.plan-card-badge-active {
  background: #ff7300;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 4px 18px;
  border-radius: 16px;
  position: absolute;
  top: -18px;
  right: 18px;
  left: auto;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(255, 115, 0, 0.1);
}
.plan-card-icon {
  margin-top: 18px;
  margin-bottom: 8px;
}
.plan-card-title-bold {
  font-size: 1.25rem;
  font-weight: 900;
  color: #1a2940;
  margin-bottom: 8px;
  text-align: center;
}
.plan-card-price-bold {
  font-size: 2rem;
  font-weight: 900;
  color: #ff7300;
  margin-bottom: 4px;
  text-align: center;
}
.plan-card-desc-muted {
  font-size: 1rem;
  color: #1976d2;
  margin-bottom: 10px;
  text-align: center;
}
.plan-card-benefits-check {
  margin-bottom: 10px;
}
.plan-card-benefits-check li {
  display: flex;
  align-items: center;
  font-size: 1.08rem;
  color: #1a2940;
  font-weight: 600;
  margin-bottom: 8px;
  padding-left: 0;
}
.plan-card-warning-box {
  background: #ffe3d1;
  color: #ff7300;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 10px;
  padding: 10px 14px;
  margin-top: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
/* PLANS SECTION */
.plans-section {
  width: 100%;
  background: #fff;
  padding: 64px 0 64px 0;
  display: flex;
  justify-content: center;
  border-bottom: 6px solid #f7f9fc;
}
.plans-container {
  max-width: 1200px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.plans-title {
  font-size: 2rem;
  font-weight: 800;
  color: #02254a;
  margin-bottom: 10px;
  text-align: center;
}
.plans-subtitle {
  font-size: 1.15rem;
  color: #1a2940;
  margin-bottom: 28px;
  text-align: center;
}
.plans-toggle-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 38px;
}
.plans-toggle {
  background: #fff;
  color: #ff7300;
  border: 2px solid #ff7300;
  border-radius: 24px;
  font-size: 1.08rem;
  font-weight: 700;
  padding: 8px 32px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.plans-toggle.active,
.plans-toggle:hover {
  background: #ff7300;
  color: #fff;
}
.plans-cards-row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}
.plan-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(34, 41, 64, 0.08);
  border-top: 5px solid #02254a;
  padding: 32px 24px 28px 24px;
  width: 260px;
  min-height: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: box-shadow 0.2s;
}
.plan-card.border-orange {
  border-top: 5px solid #02254a;
}
.plan-card.border-blue {
  border-top: 5px solid #02254a;
}
.plan-card.border-dark {
  border-top: 5px solid #02254a;
}
.plan-card-badge {
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff7300;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 4px 18px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(255, 115, 0, 0.1);
  z-index: 2;
}
.plan-card.recommended .plan-card-badge {
  background: #ff7300;
  color: #fff;
}
.plan-card-title {
  font-size: 1.35rem;
  font-weight: 900;
  color: #02254a;
  margin-bottom: 8px;
  margin-top: 18px;
  text-align: center;
}
.plan-card-price {
  font-size: 2rem;
  font-weight: 900;
  color: #ff7300;
  margin-bottom: 4px;
  text-align: center;
}
.plan-card-alt-price {
  font-size: 1rem;
  color: #1976d2;
  margin-bottom: 8px;
  text-align: center;
}
.plan-card-desc {
  font-size: 0.98rem;
  color: #1a2940;
  margin-bottom: 10px;
  text-align: center;
}
.plan-card-benefits {
  list-style: none;
  padding: 0;
  margin: 0 0 10px 0;
  width: 100%;
  color: #02254a;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
}
.plan-card-benefits li {
  margin-bottom: 6px;
  padding-left: 18px;
  position: relative;
}
.plan-card-benefits li:before {
  content: "•";
  color: #ff7300;
  position: absolute;
  left: 0;
}
.plan-card-warning {
  background: #fff3ea;
  color: #ff7300;
  font-size: 0.98rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 6px 12px;
  margin-top: 8px;
  text-align: center;
}
.plan-card-highlight {
  background: #e6f7f2;
  color: #1976d2;
  font-size: 0.98rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 6px 12px;
  margin-top: 8px;
  text-align: center;
}
.plan-card-progress-bar {
  width: 100%;
  height: 10px;
  background: #f7f9fc;
  border-radius: 8px;
  margin: 10px 0 2px 0;
  overflow: hidden;
}
.plan-card-progress {
  height: 100%;
  background: #ff7300;
  border-radius: 8px 0 0 8px;
  transition: width 0.4s;
}
.plan-card-progress-label {
  font-size: 0.95rem;
  color: #ff7300;
  font-weight: 700;
  text-align: center;
}
@media (max-width: 900px) {
  .plans-cards-row {
    flex-wrap: wrap;
    gap: 18px;
    justify-content: center;
  }
  .plan-card {
    width: 100%;
    min-width: 220px;
    max-width: 400px;
    margin-bottom: 18px;
  }
}
@media (max-width: 600px) {
  .plans-title {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
  .plans-subtitle {
    font-size: 1rem;
    margin-bottom: 18px;
  }
  .plans-container {
    padding: 0 8px;
  }
  .plan-card {
    padding: 18px 8px;
    min-height: 220px;
  }
}
/* HERO BANNER */
.hero-banner {
  position: relative;
  width: 100%;
  min-height: 90vh;
  background: url("/images/volei-banner.jpg") center center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 32, 60, 0.6);
  z-index: 1;
}
.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 1200px;
  padding: 48px 16px 40px 16px;
}
.hero-title {
  font-size: 3rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 18px;
  line-height: 1.15;
}
.highlight {
  color: #ff7300;
}

.hero-top-text {
  color: #bfc7d5;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 18px;
  margin-top: 12px;
}
.hero-title {
  font-size: 4rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 18px;
  line-height: 1.1;
}
.hero-desc-text {
  color: #bfc7d5;
  font-size: 1.25rem;
  font-weight: 400;
  margin-top: 18px;
  margin-bottom: 0;
  line-height: 1.6;
}
.hero-subtitle {
  font-size: 1.25rem;
  color: #fff;
  margin-bottom: 32px;
  font-weight: 400;
  max-width: 700px;
  line-height: 2.1;
}
.hero-btn-row {
  display: flex;
  flex-direction: row;
  gap: 18px;
  justify-content: center;
  margin-top: 18px;
}
.hero-btn {
  background: #fff;
  color: #02254a;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 14px 32px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background 0.2s, color 0.2s;
}
.hero-btn:hover {
  background: #ff7300;
  color: #fff;
}
.hero-btn-orange {
  background: #ff7300;
  color: #fff;
}
.hero-btn-orange:hover {
  background: #fff;
  color: #ff7300;
  border: 2px solid #ff7300;
}
@media (max-width: 900px) {
  .hero-banner {
    min-height: 50vh;
  }
  .hero-title {
    font-size: 2rem;
  }
  .hero-content {
    padding: 32px 8px 24px 8px;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .hero-btn {
    font-size: 1rem;
    padding: 10px 18px;
  }
}
@media (max-width: 600px) {
  .hero-title {
    font-size: 1.2rem;
  }
  .hero-btn-row {
    flex-direction: column;
    gap: 10px;
  }
}
/* BENEFITS SECTION NOVO LAYOUT */
.benefits-section {
  width: 100%;
  background: #f7f9fc;
  padding: 56px 0 48px 0;
  display: flex;
  justify-content: center;
  border-bottom: 6px solid #f7f9fc;
  .benefits-container {
    max-width: 1200px;
    width: 100%;
    padding: 0 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .benefits-title-highlight {
    font-size: 2.3rem;
    font-weight: 900;
    color: #ff7300;
    margin-bottom: 18px;
    text-align: center;
  }
  .benefits-subtitle {
    font-size: 1.15rem;
    color: #02254a;
    margin-bottom: 38px;
    text-align: center;
    line-height: 1.5;
  }
  .benefits-cards-row {
    display: flex;
    flex-direction: row;
    gap: 32px;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
  .benefit-card {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 2px 16px rgba(34, 41, 64, 0.08);
    border-top: 5px solid #02254a;
    padding: 32px 24px 28px 24px;
    width: 260px;
    min-height: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: box-shadow 0.2s;
  }
  .benefit-card.border-orange {
    border-top: 5px solid #02254a;
  }
  .benefit-card.border-blue {
    border-top: 5px solid #02254a;
  }
  .benefit-card.border-dark {
    border-top: 5px solid #02254a;
  }
  .benefit-icon {
    margin-bottom: 18px;
  }
  .benefit-card-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #02254a;
    margin-bottom: 12px;
    text-align: center;
  }
  .benefit-card-desc {
    font-size: 1rem;
    color: #1a2940;
    text-align: center;
    line-height: 1.5;
  }
  @media (max-width: 900px) {
    .benefits-cards-row {
      gap: 18px;
    }
    .benefit-card {
      width: 100%;
      min-width: 220px;
      max-width: 400px;
      margin-bottom: 18px;
    }
  }
  @media (max-width: 600px) {
    .benefits-title-highlight {
      font-size: 1.3rem;
      margin-bottom: 12px;
    }
    .benefits-subtitle {
      font-size: 1rem;
      margin-bottom: 18px;
    }
    .benefits-container {
      padding: 0 8px;
    }
    .benefit-card {
      padding: 18px 8px;
      min-height: 220px;
    }
  }
  /* BENEFITS SECTION */
  .benefits-section {
    width: 100%;
    background: #fff3ea;
    padding: 56px 0 48px 0;
    display: flex;
    justify-content: center;
    border-bottom: 6px solid #f7f9fc;
  }
  .benefits-container {
    max-width: 900px;
    width: 100%;
    padding: 0 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .benefits-title {
    font-size: 2rem;
    font-weight: 800;
    color: #02254a;
    margin-bottom: 32px;
    text-align: left;
  }
  .benefits-list {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .benefit-item {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(255, 115, 0, 0.08);
    border: 1px solid #ffe3d1;
    padding: 24px 32px;
    font-size: 1.15rem;
    color: #1a2940;
  }
  .benefit-item strong {
    color: #ff7300;
    font-size: 1.18rem;
    font-weight: 700;
  }
  @media (max-width: 700px) {
    .benefits-title {
      font-size: 1.3rem;
      margin-bottom: 18px;
      text-align: center;
    }
    .benefits-container {
      padding: 0 8px;
      align-items: center;
    }
    .benefit-item {
      padding: 16px 12px;
      font-size: 1rem;
      text-align: left;
    }
  }
  @media (min-width: 1600px) {
    .custom-responsive {
      margin: 0 20%;
    }
  }

  @media (max-width: 600px) {
    .custom-titles {
      font-size: 2rem;
    }

    .text-apresentation {
      margin: 0, 0, 0, 0;
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  @media (min-width: 767px) {
    .custom-titles {
      font-size: 2rem;
    }
  }
  /* HERO BANNER */
  .hero-banner {
    position: relative;
    width: 100%;
    min-height: 70vh;
    background: url("/images/volei-banner.jpg") center center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
  }
  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(10, 32, 60, 0.6);
    z-index: 1;
  }
  .hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    max-width: 800px;
    padding: 48px 16px 40px 16px;
  }
  .hero-title {
    font-size: 2.6rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 18px;
    line-height: 1.15;
  }
  .highlight {
    color: #ff7300;
  }
  /* BENEFITS SECTION CENTRALIZADA */
  .benefits-section {
    width: 100%;
    background: #f7f9fc;
    padding: 56px 0 48px 0;
    display: flex;
    justify-content: center;
    border-bottom: 6px solid #f7f9fc;
  }
  .benefits-container {
    max-width: 1200px;
    width: 100%;
    padding: 0 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .benefits-cards-row {
    display: flex;
    flex-direction: row;
    gap: 32px;
    width: 100%;
    justify-content: center;
    align-items: stretch;
  }
  .benefit-card {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 2px 16px rgba(34, 41, 64, 0.08);
    border-top: 5px solid #ff7300;
    padding: 32px 24px 28px 24px;
    width: 260px;
    min-height: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    transition: box-shadow 0.2s;
  }
  @media (min-width: 1200px) {
    .benefits-cards-row {
      flex-wrap: nowrap;
      gap: 32px;
    }
    .benefit-card {
      width: 260px;
      min-width: 260px;
      max-width: 260px;
    }
  }
  @media (max-width: 900px) {
    .benefits-cards-row {
      flex-wrap: wrap;
      gap: 18px;
      justify-content: center;
    }
    .benefit-card {
      width: 100%;
      min-width: 220px;
      max-width: 400px;
      margin-bottom: 18px;
    }
  }
  @media (max-width: 600px) {
    .benefits-title-highlight {
      font-size: 1.3rem;
      margin-bottom: 12px;
    }
    .benefits-subtitle {
      font-size: 1rem;
      margin-bottom: 18px;
    }
    .benefits-container {
      padding: 0 8px;
    }
    .benefit-card {
      padding: 18px 8px;
      min-height: 220px;
    }
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .hero-btn {
    font-size: 1rem;
    padding: 10px 18px;
  }
}
/* FAQ SECTION */
.faq-section {
  width: 100%;
  background: #fff;
  padding: 48px 0 48px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.faq-title {
  font-size: 2rem;
  font-weight: 800;
  color: #02254a;
  margin-bottom: 32px;
  text-align: center;
}
.faq-list {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.faq-item {
  background: #f7f9fc;
  border-radius: 12px;
  box-shadow: none;
  border: 1px solid #ffe3d1;
  font-size: 1.08rem;
  font-weight: 600;
  color: #ff7300;
  transition: box-shadow 0.2s;
  width: 100%;
}
.faq-item .va-collapse__header {
  color: #ff7300;
  font-weight: 700;
  font-size: 1.08rem;
  padding: 16px 24px;
}
.faq-item .va-collapse__content {
  color: #02254a;
  font-weight: 500;
  font-size: 1rem;
  padding: 16px 24px;
}
.faq-item .va-collapse__icon {
  color: #ff7300;
}
@media (max-width: 600px) {
  .faq-list {
    max-width: 100%;
    padding: 0 8px;
  }
  .faq-title {
    font-size: 1.3rem;
    margin-bottom: 18px;
  }
}
/* SOBRE O VOLLEYTRACK */

.about-section {
  width: 100%;
  background: #fff;
  padding: 64px 0 48px 0;
  display: flex;
  justify-content: center;
  border-bottom: 6px solid #f7f9fc;
}
.about-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1100px;
  width: 100%;
  gap: 64px;
  padding: 0 48px;
}
.about-icon-col {
  flex: 0 0 220px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.about-icon-bg {
  background: #fff3ea;
  border-radius: 50%;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 16px rgba(255, 115, 0, 0.1);
}
.about-content-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
}
.about-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #02254a;
  margin-bottom: 10px;
  letter-spacing: -1px;
}
.about-text {
  font-size: 1.13rem;
  color: #1a2940;
  margin-bottom: 22px;
  max-width: 600px;
  line-height: 1.6;
}
@media (max-width: 900px) {
  .about-container {
    flex-direction: column;
    gap: 32px;
    padding: 0 16px;
  }
  .about-icon-col {
    margin-bottom: 12px;
  }
  .about-content-col {
    align-items: center;
    text-align: center;
  }
  .about-title,
  .about-text {
    text-align: center;
  }
}
/* FAQ SECTION */
.faq-section {
  width: 100%;
  background: #fff;
  padding: 48px 0 48px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.faq-title {
  font-size: 2rem;
  font-weight: 800;
  color: #02254a;
  margin-bottom: 32px;
  text-align: center;
}
.faq-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.faq-item {
  background: #f7f9fc;
  border-radius: 12px;
  box-shadow: none;
  border: 1px solid #ffe3d1;
  font-size: 1.08rem;
  font-weight: 600;
  color: #ff7300;
  transition: box-shadow 0.2s;
}
.faq-item .va-collapse__header {
  color: #ff7300;
  font-weight: 700;
  font-size: 1.08rem;
  padding: 16px 24px;
}
.faq-item .va-collapse__content {
  color: #02254a;
  font-weight: 500;
  font-size: 1rem;
  padding: 16px 24px;
}
.faq-item .va-collapse__icon {
  color: #ff7300;
}
@media (max-width: 600px) {
  .faq-list {
    max-width: 100%;
    padding: 0 8px;
  }
  .faq-title {
    font-size: 1.3rem;
    margin-bottom: 18px;
  }
}
/* SOBRE O VOLLEYTRACK */

.about-section {
  width: 100%;
  background: #fff;
  padding: 64px 0 48px 0;
  display: flex;
  justify-content: center;
  border-bottom: 6px solid #f7f9fc;
}
.about-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1100px;
  width: 100%;
  gap: 64px;
  padding: 0 48px;
}
.about-icon-col {
  flex: 0 0 220px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.about-icon-bg {
  background: #fff3ea;
  border-radius: 50%;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 16px rgba(255, 115, 0, 0.1);
}
.about-content-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
}
.about-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #02254a;
  margin-bottom: 10px;
  letter-spacing: -1px;
}
.about-text {
  font-size: 1.13rem;
  color: #1a2940;
  margin-bottom: 22px;
  max-width: 600px;
  line-height: 1.6;
}
.about-highlights {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  margin-top: 8px;
}
.about-highlight {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #02254a;
  font-size: 1.08rem;
  gap: 8px;
  background: none;
  padding: 0;
}
.about-highlight va-icon {
  margin-right: 4px;
}
@media (max-width: 900px) {
  .about-container {
    flex-direction: column;
    gap: 32px;
    padding: 0 16px;
  }
  .about-icon-col {
    margin-bottom: 12px;
  }
  .about-content-col {
    align-items: center;
    text-align: center;
  }
  .about-title,
  .about-text {
    text-align: center;
  }
}
/* REGISTER SECTION */
.register-section {
  width: 100%;
  background: #fff;
  padding: 64px 0 64px 0;
  display: flex;
  justify-content: center;
  border-bottom: 6px solid #f7f9fc;
}
.register-container {
  max-width: 1200px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 80px;
}
.register-form-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 40px 36px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}
.register-header {
  margin-bottom: 28px;
  text-align: left;
}
.register-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #1a2940;
  margin-bottom: 8px;
  line-height: 1.3;
}
.register-subtitle {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.5;
  font-weight: 400;
}
.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-field {
  width: 100%;
  position: relative;
}
.subdomain-field-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
}
.subdomain-input {
  flex: 1;
}
.subdomain-suffix {
  margin-top: 17px;
  padding: 12px 0;
  font-size: 15px;
  color: #0f172a;
  font-weight: 400;
  white-space: nowrap;
  line-height: 1.5;
}
.register-input :deep(.va-input-wrapper),
.register-select :deep(.va-input-wrapper),
.register-textarea :deep(.va-input-wrapper) {
  width: 100%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 0;
  transition: all 0.2s ease;
  position: relative;
  pointer-events: auto;
}
.register-section .register-input :deep(.va-input-wrapper__text),
.register-section .register-select :deep(.va-input-wrapper__text),
.register-section .register-textarea :deep(.va-input-wrapper__text) {
  color: #0f172a !important;
  --va-input-wrapper-text-color: #0f172a !important;
}
.register-input :deep(input),
.register-select :deep(input),
.register-textarea :deep(textarea) {
  pointer-events: auto !important;
  cursor: text;
}
.register-input,
.register-select,
.register-textarea {
  width: 100%;
}
.register-input :deep(.va-input-wrapper:hover),
.register-select :deep(.va-input-wrapper:hover),
.register-textarea :deep(.va-input-wrapper:hover) {
  border-color: #cbd5e1;
}
.register-input :deep(.va-input-wrapper__field),
.register-select :deep(.va-input-wrapper__field),
.register-textarea :deep(.va-input-wrapper__field) {
  padding: 12px 16px;
  font-size: 15px;
  color: #0f172a !important;
  background: #ffffff;
  font-weight: 400;
  transition: all 0.2s ease;
  border-radius: 8px;
  pointer-events: auto;
  z-index: 1;
  position: relative;
}
.register-input :deep(input),
.register-select :deep(input),
.register-textarea :deep(textarea) {
  color: #0f172a !important;
  pointer-events: auto !important;
  cursor: text;
}
.register-input :deep(.va-input-wrapper__field input),
.register-select :deep(.va-input-wrapper__field input),
.register-textarea :deep(.va-input-wrapper__field textarea) {
  color: #0f172a !important;
}
.register-section .register-form-column .register-input :deep(input),
.register-section .register-form-column .register-select :deep(input),
.register-section .register-form-column .register-textarea :deep(textarea),
.register-section
  .register-form-column
  .register-input
  :deep(.va-input-wrapper__field),
.register-section
  .register-form-column
  .register-select
  :deep(.va-input-wrapper__field),
.register-section
  .register-form-column
  .register-textarea
  :deep(.va-input-wrapper__field),
.register-section
  .register-form-column
  .register-input
  :deep(.va-input-wrapper__text),
.register-section
  .register-form-column
  .register-select
  :deep(.va-input-wrapper__text),
.register-section
  .register-form-column
  .register-select
  :deep(.va-select__selected),
.register-section
  .register-form-column
  .register-select
  :deep(.va-select__text),
.register-section
  .register-form-column
  .register-input
  :deep(.va-input-wrapper__field input),
.register-section
  .register-form-column
  .register-select
  :deep(.va-input-wrapper__field input),
.register-section
  .register-form-column
  .register-textarea
  :deep(.va-input-wrapper__field textarea),
.register-section
  .register-form-column
  .register-input
  :deep(.va-input-wrapper__field span),
.register-section
  .register-form-column
  .register-select
  :deep(.va-input-wrapper__field span),
.register-section
  .register-form-column
  .register-textarea
  :deep(.va-input-wrapper__field span) {
  color: #0f172a !important;
  --va-input-wrapper-text-color: #0f172a !important;
  caret-color: #0f172a !important;
}
.register-section
  .register-form-column
  .register-input
  :deep(.va-input-wrapper__field *),
.register-section
  .register-form-column
  .register-select
  :deep(.va-input-wrapper__field *),
.register-section
  .register-form-column
  .register-textarea
  :deep(.va-input-wrapper__field *) {
  color: #0f172a !important;
}
.register-section
  .register-form-column
  .register-input
  :deep(.va-input-wrapper),
.register-section
  .register-form-column
  .register-select
  :deep(.va-input-wrapper),
.register-section
  .register-form-column
  .register-textarea
  :deep(.va-input-wrapper) {
  --va-input-wrapper-text-color: #0f172a !important;
}
.register-section .register-form-column :deep(.va-input-wrapper__text) {
  color: #0f172a !important;
  --va-input-wrapper-text-color: #0f172a !important;
}
.register-section .register-form-column :deep(input),
.register-section .register-form-column :deep(textarea),
.register-section .register-form-column :deep(.va-input-wrapper__field),
.register-section .register-form-column :deep(.va-input-wrapper__field input),
.register-section
  .register-form-column
  :deep(.va-input-wrapper__field textarea),
.register-section .register-form-column :deep(.va-input-wrapper__field span) {
  color: #0f172a !important;
}
.register-textarea :deep(.va-input-wrapper__field) {
  padding-top: 12px;
}
.register-input :deep(.va-input-wrapper__field::placeholder),
.register-select :deep(.va-input-wrapper__field::placeholder),
.register-textarea :deep(.va-input-wrapper__field::placeholder) {
  color: #94a3b8;
  font-weight: 400;
}
.register-input :deep(.va-input-wrapper__field:focus),
.register-select :deep(.va-input-wrapper__field:focus),
.register-textarea :deep(.va-input-wrapper__field:focus) {
  border-color: #ff7300;
  box-shadow: 0 0 0 3px rgba(255, 115, 0, 0.1);
  outline: none;
}
.register-input :deep(label),
.register-select :deep(label),
.register-textarea :deep(label) {
  color: #02254a;
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 8px;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.register-select :deep(.va-select__content) {
  background: #fff;
}
.register-select :deep(.va-select__dropdown) {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  margin-top: 4px;
  overflow: hidden;
}
.register-select :deep(.va-select__dropdown .va-select-option) {
  padding: 12px 16px;
  transition: all 0.2s ease;
  font-weight: 400;
}
.register-select :deep(.va-select__dropdown .va-select-option:hover) {
  background: #f8fafc;
  color: #ff7300;
}
.register-select :deep(.va-input-wrapper__text) {
  color: #94a3b8;
}
.register-select :deep(.va-select__selected) {
  color: #0f172a;
  font-weight: 400;
}
.register-textarea :deep(textarea) {
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  line-height: 1.6;
  border-radius: 8px;
}
.register-submit-btn {
  width: 100%;
  background: #ff7300;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  margin-top: 4px;
  box-shadow: 0 2px 6px rgba(255, 115, 0, 0.2);
}
.register-submit-btn:hover:not(:disabled) {
  background: #ff8c1a;
  box-shadow: 0 4px 12px rgba(255, 115, 0, 0.35);
  transform: translateY(-1px);
}
.register-submit-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(255, 115, 0, 0.3);
}
.register-submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  background: #cbd5e1;
  box-shadow: none;
}
.btn-content {
  display: flex;
  align-items: center;
  gap: 10px;
}
.btn-icon {
  transition: transform 0.2s ease;
}
.register-submit-btn:hover:not(:disabled) .btn-icon {
  transform: scale(1.1);
}
.btn-text {
  font-weight: 700;
}
.btn-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.rotating {
  animation: rotate 1s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.register-illustration-column {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.register-illustration {
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background: #fff;
  position: relative;
  transition: transform 0.3s ease;
}
.register-illustration:hover {
  transform: scale(1.02);
}
.illustration-image {
  width: 100%;
  height: auto;
  display: block;
  position: relative;
  z-index: 1;
}
@media (max-width: 900px) {
  .register-section {
    padding: 64px 0;
  }
  .register-container {
    flex-direction: column;
    gap: 48px;
    padding: 0 24px;
  }
  .register-form-column {
    width: 100%;
    padding: 40px 32px;
  }
  .register-illustration-column {
    width: 100%;
  }
  .register-title {
    font-size: 1.75rem;
  }
  .register-subtitle {
    font-size: 0.95rem;
  }
}
@media (max-width: 600px) {
  .register-section {
    padding: 48px 0;
  }
  .register-container {
    padding: 0 16px;
    gap: 40px;
  }
  .register-form-column {
    padding: 32px 24px;
    border-radius: 12px;
  }
  .register-title {
    font-size: 1.5rem;
  }
  .register-subtitle {
    font-size: 0.9rem;
    margin-bottom: 24px;
  }
  .register-form {
    gap: 20px;
  }
  .register-input :deep(.va-input-wrapper__field),
  .register-select :deep(.va-input-wrapper__field),
  .register-textarea :deep(.va-input-wrapper__field) {
    padding: 12px 14px;
    font-size: 14px;
  }
  .register-submit-btn {
    padding: 12px 20px;
    font-size: 15px;
  }
}

.va-select-content__option {
  color: white !important;
}
</style>
