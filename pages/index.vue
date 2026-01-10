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
        <div
          v-if="isYearly ? products.pro.yearly : products.pro.monthly"
          class="plan-card border-orange recommended"
        >
          <div class="plan-card-badge">
            {{ $t("plan_card_badge_recommended") }}
          </div>
          <h3 class="plan-card-title">{{ $t("plan_card_pro_title") }}</h3>
          <div class="plan-card-price">
            {{
              isYearly && products.pro.yearly
                ? products.pro.yearly.price.formatted +
                  " / " +
                  $t("plan_period_year")
                : products.pro.monthly
                ? products.pro.monthly.price.formatted +
                  " / " +
                  $t("plan_period_month")
                : $t("plan_card_pro_price_monthly")
            }}
          </div>
          <div
            v-if="
              getAlternativePrice(
                isYearly ? products.pro.yearly : products.pro.monthly,
                isYearly,
                'pro'
              )
            "
            class="plan-card-alt-price"
          >
            {{
              getAlternativePrice(
                isYearly ? products.pro.yearly : products.pro.monthly,
                isYearly,
                "pro"
              )
            }}
          </div>

          <!-- Limitações do plano - Layout simples -->
          <div
            v-if="
              (isYearly ? products.pro.yearly : products.pro.monthly)?.metadata
            "
            class="plan-card-limits-simple"
          >
            <div class="plan-limit-item-simple">
              <va-icon name="groups" size="18px" color="#02254a" />
              <span class="plan-limit-value-simple">
                <span
                  v-if="
                    (isYearly ? products.pro.yearly : products.pro.monthly)
                      .metadata.max_teams === '0' ||
                    (isYearly ? products.pro.yearly : products.pro.monthly)
                      .metadata.max_teams === 0
                  "
                >
                  ∞
                </span>
                <span v-else>
                  {{
                    (isYearly ? products.pro.yearly : products.pro.monthly)
                      .metadata.max_teams
                  }}
                </span>
              </span>
              <span class="plan-limit-label-simple">
                {{
                  (isYearly ? products.pro.yearly : products.pro.monthly)
                    .metadata.max_teams === "0" ||
                  (isYearly ? products.pro.yearly : products.pro.monthly)
                    .metadata.max_teams === 0
                    ? $t("plan_limit_teams")
                    : parseInt(
                        (isYearly ? products.pro.yearly : products.pro.monthly)
                          .metadata.max_teams
                      ) === 1
                    ? $t("plan_limit_team")
                    : $t("plan_limit_teams")
                }}
              </span>
            </div>
            <div class="plan-limit-item-simple">
              <va-icon name="person" size="18px" color="#02254a" />
              <span class="plan-limit-value-simple">
                <span
                  v-if="
                    (isYearly ? products.pro.yearly : products.pro.monthly)
                      .metadata.max_players === '0' ||
                    (isYearly ? products.pro.yearly : products.pro.monthly)
                      .metadata.max_players === 0
                  "
                >
                  ∞
                </span>
                <span v-else>
                  {{
                    (isYearly ? products.pro.yearly : products.pro.monthly)
                      .metadata.max_players
                  }}
                </span>
              </span>
              <span class="plan-limit-label-simple">
                {{
                  (isYearly ? products.pro.yearly : products.pro.monthly)
                    .metadata.max_players === "0" ||
                  (isYearly ? products.pro.yearly : products.pro.monthly)
                    .metadata.max_players === 0
                    ? $t("plan_limit_players")
                    : parseInt(
                        (isYearly ? products.pro.yearly : products.pro.monthly)
                          .metadata.max_players
                      ) === 1
                    ? $t("plan_limit_player")
                    : $t("plan_limit_players")
                }}
              </span>
            </div>
          </div>

          <ul class="plan-card-benefits">
            <li
              v-for="(feature, index) in (isYearly
                ? products.pro.yearly?.displayFeatures
                : products.pro.monthly?.displayFeatures) || []"
              :key="index"
            >
              <va-icon name="check" size="18px" color="#02254a" />
              {{ feature }}
            </li>
          </ul>
        </div>
        <!-- Card 3: Clubes -->
        <div
          v-if="isYearly ? products.clubes.yearly : products.clubes.monthly"
          class="plan-card border-blue"
        >
          <div class="plan-card-badge">
            {{ $t("plan_card_badge_large_teams") }}
          </div>
          <h3 class="plan-card-title">{{ $t("plan_card_clubers_title") }}</h3>
          <div class="plan-card-price">
            {{
              isYearly && products.clubes.yearly
                ? products.clubes.yearly.price.formatted +
                  " / " +
                  $t("plan_period_year")
                : products.clubes.monthly
                ? products.clubes.monthly.price.formatted +
                  " / " +
                  $t("plan_period_month")
                : $t("plan_card_clubers_price_monthly")
            }}
          </div>
          <div
            v-if="
              getAlternativePrice(
                isYearly ? products.clubes.yearly : products.clubes.monthly,
                isYearly,
                'clubes'
              )
            "
            class="plan-card-alt-price"
          >
            {{
              getAlternativePrice(
                isYearly ? products.clubes.yearly : products.clubes.monthly,
                isYearly,
                "clubes"
              )
            }}
          </div>

          <!-- Limitações do plano - Layout simples -->
          <div
            v-if="
              (isYearly ? products.clubes.yearly : products.clubes.monthly)
                ?.metadata
            "
            class="plan-card-limits-simple"
          >
            <div class="plan-limit-item-simple">
              <va-icon name="groups" size="18px" color="#02254a" />
              <span class="plan-limit-value-simple">
                <span
                  v-if="
                    (isYearly
                      ? products.clubes.yearly
                      : products.clubes.monthly
                    ).metadata.max_teams === '0' ||
                    (isYearly
                      ? products.clubes.yearly
                      : products.clubes.monthly
                    ).metadata.max_teams === 0
                  "
                >
                  ∞
                </span>
                <span v-else>
                  {{
                    (isYearly
                      ? products.clubes.yearly
                      : products.clubes.monthly
                    ).metadata.max_teams
                  }}
                </span>
              </span>
              <span class="plan-limit-label-simple">
                {{
                  (isYearly ? products.clubes.yearly : products.clubes.monthly)
                    .metadata.max_teams === "0" ||
                  (isYearly ? products.clubes.yearly : products.clubes.monthly)
                    .metadata.max_teams === 0
                    ? $t("plan_limit_teams")
                    : parseInt(
                        (isYearly
                          ? products.clubes.yearly
                          : products.clubes.monthly
                        ).metadata.max_teams
                      ) === 1
                    ? $t("plan_limit_team")
                    : $t("plan_limit_teams")
                }}
              </span>
            </div>
            <div class="plan-limit-item-simple">
              <va-icon name="person" size="18px" color="#02254a" />
              <span class="plan-limit-value-simple">
                <span
                  v-if="
                    (isYearly
                      ? products.clubes.yearly
                      : products.clubes.monthly
                    ).metadata.max_players === '0' ||
                    (isYearly
                      ? products.clubes.yearly
                      : products.clubes.monthly
                    ).metadata.max_players === 0
                  "
                >
                  ∞
                </span>
                <span v-else>
                  {{
                    (isYearly
                      ? products.clubes.yearly
                      : products.clubes.monthly
                    ).metadata.max_players
                  }}
                </span>
              </span>
              <span class="plan-limit-label-simple">
                {{
                  (isYearly ? products.clubes.yearly : products.clubes.monthly)
                    .metadata.max_players === "0" ||
                  (isYearly ? products.clubes.yearly : products.clubes.monthly)
                    .metadata.max_players === 0
                    ? $t("plan_limit_players")
                    : parseInt(
                        (isYearly
                          ? products.clubes.yearly
                          : products.clubes.monthly
                        ).metadata.max_players
                      ) === 1
                    ? $t("plan_limit_player")
                    : $t("plan_limit_players")
                }}
              </span>
            </div>
          </div>

          <ul class="plan-card-benefits">
            <li
              v-for="(feature, index) in (isYearly
                ? products.clubes.yearly?.displayFeatures
                : products.clubes.monthly?.displayFeatures) || []"
              :key="index"
            >
              <va-icon name="check" size="18px" color="#02254a" />
              {{ feature }}
            </li>
          </ul>
        </div>
        <!-- Card 4: Vitalício -->
        <div v-if="products.lifetime" class="plan-card border-dark">
          <div class="plan-card-badge">{{ $t("plan_card_badge_limited") }}</div>
          <h3 class="plan-card-title">
            {{ products.lifetime.name || $t("plan_card_lifetime_title") }}
          </h3>
          <div class="plan-card-price">
            {{ products.lifetime.price.formatted }}
          </div>
          <div class="plan-card-desc">
            {{ $t("plan_card_lifetime_payment") }}
          </div>

          <!-- Limitações do plano - Layout simples -->
          <div
            v-if="products.lifetime?.metadata"
            class="plan-card-limits-simple"
          >
            <div class="plan-limit-item-simple">
              <va-icon name="groups" size="18px" color="#02254a" />
              <span class="plan-limit-value-simple">
                <span
                  v-if="
                    products.lifetime.metadata.max_teams === '0' ||
                    products.lifetime.metadata.max_teams === 0
                  "
                >
                  ∞
                </span>
                <span v-else>
                  {{ products.lifetime.metadata.max_teams }}
                </span>
              </span>
              <span class="plan-limit-label-simple">
                {{
                  products.lifetime.metadata.max_teams === "0" ||
                  products.lifetime.metadata.max_teams === 0
                    ? $t("plan_limit_teams")
                    : parseInt(products.lifetime.metadata.max_teams) === 1
                    ? $t("plan_limit_team")
                    : $t("plan_limit_teams")
                }}
              </span>
            </div>
            <div class="plan-limit-item-simple">
              <va-icon name="person" size="18px" color="#02254a" />
              <span class="plan-limit-value-simple">
                <span
                  v-if="
                    products.lifetime.metadata.max_players === '0' ||
                    products.lifetime.metadata.max_players === 0
                  "
                >
                  ∞
                </span>
                <span v-else>
                  {{ products.lifetime.metadata.max_players }}
                </span>
              </span>
              <span class="plan-limit-label-simple">
                {{
                  products.lifetime.metadata.max_players === "0" ||
                  products.lifetime.metadata.max_players === 0
                    ? $t("plan_limit_players")
                    : parseInt(products.lifetime.metadata.max_players) === 1
                    ? $t("plan_limit_player")
                    : $t("plan_limit_players")
                }}
              </span>
            </div>
          </div>

          <ul class="plan-card-benefits">
            <li
              v-for="(feature, index) in products.lifetime.displayFeatures ||
              []"
              :key="index"
            >
              <va-icon name="check" size="18px" color="#02254a" />
              {{ feature }}
            </li>
          </ul>
          <div class="plan-card-warning">
            {{ $t("plan_card_lifetime_warning") }}
          </div>
          <div v-if="lifetimePlanInfo" class="plan-card-lifetime-stats">
            <div class="plan-card-lifetime-progress-wrapper">
              <div class="plan-card-progress-bar">
                <div
                  class="plan-card-progress"
                  :style="{ width: `${lifetimePlanInfo.percentage || 0}%` }"
                ></div>
              </div>
              <div class="plan-card-progress-info">
                <span class="plan-card-progress-sold">
                  {{ lifetimePlanInfo.total_sold || 0 }} /
                  {{ lifetimePlanInfo.limit || 500 }}
                </span>
                <span class="plan-card-progress-text">{{
                  $t("plan_sold")
                }}</span>
              </div>
            </div>
            <div
              v-if="!lifetimePlanInfo.is_sold_out"
              class="plan-card-remaining-info"
            >
              <va-icon
                name="local_fire_department"
                size="20px"
                color="#ff7300"
              />
              <span class="plan-card-remaining-value">{{
                lifetimePlanInfo.remaining || 0
              }}</span>
              <span class="plan-card-remaining-label">{{
                $t("plan_card_lifetime_remaining")
              }}</span>
            </div>
            <div v-if="lifetimePlanInfo.is_sold_out" class="plan-card-sold-out">
              <va-icon name="block" size="20px" color="#dc2626" />
              {{ $t("plan_card_lifetime_sold_out") || "Esgotado" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="register-section" id="register">
    <div class="register-section-wrapper">
      <div class="register-section-header">
        <h2 class="register-section-title">
          {{ $t("register_section_title") }}
        </h2>
        <p class="register-section-subtitle">
          {{ $t("register_section_subtitle") }}
        </p>
      </div>
      <div class="register-container">
        <div class="register-form-column">
          <div class="register-header">
            <h2 class="register-title">{{ $t("register_title_ready") }}</h2>
            <p class="register-subtitle">{{ $t("register_subtitle") }}</p>
          </div>
          <va-form ref="formRef" class="register-form" @submit.prevent="submit">
            <div class="form-field">
              <va-input
                name="name"
                class="register-input"
                :placeholder="$t('placeholder_name')"
                stateful
                v-model="form.name"
                required
                @input="clearFieldError('name')"
                @blur="handleFieldBlur('name', form.name)"
                :error="
                  !!(errors?.errors?.name && errors.errors.name.length > 0)
                "
                :error-messages="
                  Array.isArray(errors?.errors?.name)
                    ? errors.errors.name
                    : errors?.errors?.name
                    ? [errors.errors.name]
                    : []
                "
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
                required
                @input="clearFieldError('email')"
                @blur="handleFieldBlur('email', form.email)"
                :error="
                  !!(errors?.errors?.email && errors.errors.email.length > 0)
                "
                :error-messages="
                  Array.isArray(errors?.errors?.email)
                    ? errors.errors.email
                    : errors?.errors?.email
                    ? [errors.errors.email]
                    : []
                "
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
                  required
                  @input="handleTenantIdInput"
                  @blur="handleFieldBlur('tenant_id', form.tenant_id)"
                  :error="
                    !!(
                      errors?.errors?.tenant_id &&
                      errors.errors.tenant_id.length > 0
                    )
                  "
                  :error-messages="
                    Array.isArray(errors?.errors?.tenant_id)
                      ? errors.errors.tenant_id
                      : errors?.errors?.tenant_id
                      ? [errors.errors.tenant_id]
                      : []
                  "
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
                required
                @update:model-value="
                  (value) => {
                    clearFieldError('experience_level');
                    handleFieldBlur('experience_level', value);
                  }
                "
                @blur="
                  handleFieldBlur('experience_level', form.experience_level)
                "
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
                :error="
                  !!(
                    errors?.errors?.experience_level &&
                    errors.errors.experience_level.length > 0
                  )
                "
                :error-messages="
                  Array.isArray(errors?.errors?.experience_level)
                    ? errors.errors.experience_level
                    : errors?.errors?.experience_level
                    ? [errors.errors.experience_level]
                    : []
                "
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
                :error="
                  !!(
                    errors?.errors?.message && errors.errors.message.length > 0
                  )
                "
                :error-messages="
                  Array.isArray(errors?.errors?.message)
                    ? errors.errors.message
                    : errors?.errors?.message
                    ? [errors.errors.message]
                    : []
                "
              />
            </div>
            <div class="form-field">
              <button
                type="submit"
                class="register-submit-btn"
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
import { computed, nextTick, onMounted, onUnmounted, watch } from "vue";
import { useI18n } from "#imports";
import { useColors } from "vuestic-ui";
import { ref } from "vue";

// SEO Meta Tags
useHead({
  title: "VolleyTrack - Plataforma Inteligente para Gestão de Voleibol",
  meta: [
    {
      name: "description",
      content:
        "Plataforma inteligente para gestão de treinos, atletas e desempenho de voleibol. Organize sua equipe, planeje treinamentos e acompanhe o desempenho com dados e tecnologia em um só lugar.",
    },
    {
      property: "og:title",
      content: "VolleyTrack - Plataforma Inteligente para Gestão de Voleibol",
    },
    {
      property: "og:description",
      content:
        "Plataforma inteligente para gestão de treinos, atletas e desempenho de voleibol. Organize sua equipe, planeje treinamentos e acompanhe o desempenho com dados e tecnologia em um só lugar.",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "VolleyTrack - Plataforma Inteligente para Gestão de Voleibol",
    },
    {
      name: "twitter:description",
      content:
        "Plataforma inteligente para gestão de treinos, atletas e desempenho de voleibol. Organize sua equipe, planeje treinamentos e acompanhe o desempenho com dados e tecnologia em um só lugar.",
    },
  ],
});
import {
  confirmSuccess,
  confirmError,
  loader,
} from "~/utils/sweetAlert2/swalHelper";
import { useReCaptcha } from "vue-recaptcha-v3";
import {
  getActivePlan,
  getProducts,
  getLifetimePlansCount,
} from "~/services/planService.js";
import { usePlanTranslations } from "~/composables/usePlanTranslations.js";

const isYearly = ref(false);
const { $customFetch } = useNuxtApp();
const { executeRecaptcha } = useReCaptcha();
const { translateProduct } = usePlanTranslations();
const { locale, t } = useI18n();

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

let errors = ref<{
  errors: {
    tenant_id: string[];
    name: string[];
    email: string[];
    experience_level: string[];
    message: string[];
  };
  message: string;
}>({
  errors: {
    tenant_id: [],
    name: [],
    email: [],
    experience_level: [],
    message: [],
  },
  message: "",
});

const submit = async () => {
  try {
    if (loading.value) return;

    // Validar todos os campos obrigatórios para mostrar erros visuais
    const nameValid = validateField("name", form.value.name);
    const emailValid = validateField("email", form.value.email);
    const tenantIdValid = validateField("tenant_id", form.value.tenant_id);
    const experienceLevelValid = validateField(
      "experience_level",
      form.value.experience_level
    );

    // Validar tenant_id adicionalmente se houver erros de validação
    if (tenantIdValid && form.value.tenant_id?.trim()) {
      const tenantId = form.value.tenant_id.trim();
      // Verificar se há erros de validação do tenant_id
      if (errors.value.errors.tenant_id.length > 0) {
        // Se houver erros, não permitir o envio
        const firstError = Object.values(errors.value.errors).find(
          (err) => Array.isArray(err) && err.length > 0
        );
        if (firstError && firstError.length > 0) {
          confirmError(firstError[0]);
        }
        return;
      }
    }

    const isValid =
      nameValid && emailValid && tenantIdValid && experienceLevelValid;

    // Forçar atualização reativa dos erros para garantir que sejam exibidos
    errors.value = { ...errors.value };

    if (!isValid) {
      // Encontrar o primeiro campo com erro e focar nele
      const firstErrorField = Object.entries(errors.value.errors).find(
        ([_, errors]) => Array.isArray(errors) && errors.length > 0
      );
      if (firstErrorField) {
        const fieldName = firstErrorField[0];
        // Aguardar próximo tick para garantir que o DOM foi atualizado
        await nextTick();
        const fieldElement = document.querySelector(
          `[name="${fieldName}"]`
        ) as HTMLElement;
        if (fieldElement) {
          fieldElement.focus();
          fieldElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      // Mostrar mensagem de erro do primeiro campo
      const firstError = Object.values(errors.value.errors).find(
        (err) => Array.isArray(err) && err.length > 0
      );
      if (firstError && firstError.length > 0) {
        confirmError(firstError[0]);
      }
      // Não retorna aqui - permite que a requisição seja feita mesmo com erros
      // O backend vai validar e retornar os erros corretos
    }

    // Abre o loader e faz a requisição
    loader();
    loading.value = true;

    let token = "";
    try {
      token = await executeRecaptcha("create_new_lead");
    } catch (error) {
      console.error("Erro ao executar reCAPTCHA:", error);
      token = "error";
    }

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
      .catch((error: any) => {
        // Processar erros do response
        // O $customFetch pode retornar o erro de diferentes formas
        const response = error?.response?.data || error?.response || error;

        if (response) {
          // Limpar erros anteriores
          errors.value.errors = {
            tenant_id: [],
            name: [],
            email: [],
            experience_level: [],
            message: [],
          };

          // Processar cada campo de erro do backend
          const errorFields = [
            "tenant_id",
            "name",
            "email",
            "experience_level",
            "message",
          ];

          errorFields.forEach((field) => {
            if (response[field]) {
              if (Array.isArray(response[field])) {
                errors.value.errors[field as keyof typeof errors.value.errors] =
                  response[field];
              } else if (typeof response[field] === "string") {
                errors.value.errors[field as keyof typeof errors.value.errors] =
                  [response[field]];
              }
            }
          });

          // Forçar atualização reativa
          errors.value = { ...errors.value };

          // Mostrar mensagem de erro geral se houver
          if (response.message) {
            confirmError(response.message);
          } else {
            // Mostrar primeiro erro encontrado
            const firstError = Object.values(errors.value.errors).find(
              (err) => Array.isArray(err) && err.length > 0
            );
            if (firstError && firstError.length > 0) {
              confirmError(firstError[0]);
            }
          }
        } else {
          console.error("Erro ao enviar formulário:", error);
        }
      })
      .finally(() => {
        loading.value = false;
      });
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);
    loading.value = false;
    confirmError("Ocorreu um erro ao enviar o formulário. Tente novamente.");
  }
};

const faqOpen = ref(Array(11).fill(false));

const routeRegister = () => {
  const registerSection = document.querySelector(".register-section");
  if (registerSection) {
    registerSection.scrollIntoView({ behavior: "smooth" });
  }
};

const clearFieldError = (field: string) => {
  if (errors.value.errors[field as keyof typeof errors.value.errors]) {
    errors.value.errors[field as keyof typeof errors.value.errors] = [];
  }
};

let tenantIdValidationTimeout: NodeJS.Timeout | null = null;
const validatingTenantId = ref(false);

const handleTenantIdInput = () => {
  // Limpar timeout anterior
  if (tenantIdValidationTimeout) {
    clearTimeout(tenantIdValidationTimeout);
  }

  // Limpar erro anterior
  clearFieldError("tenant_id");

  const tenantId = form.value.tenant_id?.trim();

  // Se estiver vazio, não validar
  if (!tenantId || tenantId === "") {
    return;
  }

  // Validar formato básico antes de fazer a requisição
  if (!/^[a-z0-9-]+$/.test(tenantId)) {
    errors.value.errors.tenant_id = [
      "O nome do subdomínio deve conter apenas letras minúsculas, números e hífens, sem espaços.",
    ];
    errors.value = { ...errors.value };
    return;
  }

  // Validar comprimento mínimo
  if (tenantId.length < 3) {
    errors.value.errors.tenant_id = [
      "O nome do subdomínio deve ter pelo menos 3 caracteres.",
    ];
    errors.value = { ...errors.value };
    return;
  }

  // Validar comprimento máximo
  if (tenantId.length > 63) {
    errors.value.errors.tenant_id = [
      "O nome do subdomínio deve ter no máximo 63 caracteres.",
    ];
    errors.value = { ...errors.value };
    return;
  }

  // Validar se não começa ou termina com hífen
  if (tenantId.startsWith("-") || tenantId.endsWith("-")) {
    errors.value.errors.tenant_id = [
      "O nome do subdomínio não pode começar ou terminar com hífen.",
    ];
    errors.value = { ...errors.value };
    return;
  }

  // Debounce: aguardar 500ms antes de fazer a requisição
  tenantIdValidationTimeout = setTimeout(async () => {
    validatingTenantId.value = true;
    try {
      const response = await $customFetch("/leads/validate-tenant-id", "POST", {
        body: JSON.stringify({
          tenant_id: tenantId,
        }),
      });

      if (response.valid === false) {
        errors.value.errors.tenant_id = [response.message];
        errors.value = { ...errors.value };
      } else {
        // Se for válido, limpar erros
        clearFieldError("tenant_id");
      }
    } catch (error: any) {
      const response = error?.response?.data || error?.response || error;
      if (response?.message) {
        errors.value.errors.tenant_id = [response.message];
        errors.value = { ...errors.value };
      }
    } finally {
      validatingTenantId.value = false;
    }
  }, 500);
};

const validateField = (
  field: string,
  value: any,
  useBackendMessages = false
) => {
  const fieldErrors: string[] = [];

  switch (field) {
    case "name":
      if (!value || (typeof value === "string" && value.trim() === "")) {
        fieldErrors.push("O campo nome é obrigatório.");
      }
      break;
    case "email":
      if (!value || (typeof value === "string" && value.trim() === "")) {
        fieldErrors.push("O campo email é obrigatório.");
      } else if (value && typeof value === "string" && value.trim() !== "") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          fieldErrors.push(
            "O campo email deve ser um endereço de e-mail válido."
          );
        }
      }
      break;
    case "tenant_id":
      if (!value || (typeof value === "string" && value.trim() === "")) {
        fieldErrors.push("O campo nome do subdomínio é obrigatório.");
      }
      break;
    case "experience_level":
      // O va-select pode retornar um objeto { value, text } ou apenas o valor
      let experienceValue = null;
      if (value === null || value === undefined || value === "") {
        experienceValue = null;
      } else if (typeof value === "object" && value !== null) {
        experienceValue = value.value || value;
      } else {
        experienceValue = value;
      }

      if (
        !experienceValue ||
        experienceValue === "" ||
        experienceValue === null ||
        experienceValue === undefined
      ) {
        fieldErrors.push("O campo nível de experiência é obrigatório.");
      }
      break;
  }

  // Só atualiza os erros se não estiver usando mensagens do backend
  // ou se houver erros de validação local
  if (!useBackendMessages || fieldErrors.length > 0) {
    errors.value.errors[field as keyof typeof errors.value.errors] =
      fieldErrors;
  }
  return fieldErrors.length === 0;
};

const handleFieldBlur = (field: string, value: any) => {
  validateField(field, value);
};

const showSidebar = ref(false);
const page = ref(1);

const { currentPresetName } = useColors();

// Estado do trial
const trialInfo = ref(null);
const timeRemaining = ref(null);
const loadingTrial = ref(false);

// Estado dos produtos
const products = ref({
  pro: {
    monthly: null,
    yearly: null,
  },
  clubes: {
    monthly: null,
    yearly: null,
  },
  lifetime: null,
});
const loadingProducts = ref(false);
const lifetimePlanInfo = ref(null);
const loadingLifetimePlanInfo = ref(false);

// Armazenar produtos originais da API (sem tradução)
const rawProducts = ref(null);

// Função para traduzir produtos já carregados
const retranslateProducts = () => {
  if (!rawProducts.value) return;

  const translatedProducts = {
    pro: {
      monthly: rawProducts.value.pro.monthly
        ? translateProduct(rawProducts.value.pro.monthly)
        : null,
      yearly: rawProducts.value.pro.yearly
        ? translateProduct(rawProducts.value.pro.yearly)
        : null,
    },
    clubes: {
      monthly: rawProducts.value.clubes.monthly
        ? translateProduct(rawProducts.value.clubes.monthly)
        : null,
      yearly: rawProducts.value.clubes.yearly
        ? translateProduct(rawProducts.value.clubes.yearly)
        : null,
    },
    lifetime: rawProducts.value.lifetime
      ? translateProduct(rawProducts.value.lifetime)
      : null,
  };
  products.value = translatedProducts;
};

// Função para formatar data
const formatDate = (dateString: string | null) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (e) {
    return "N/A";
  }
};

// Contagem regressiva do trial
const startTrialCountdown = () => {
  if (
    !trialInfo.value ||
    !trialInfo.value.in_trial ||
    !trialInfo.value.trial_ends_at
  ) {
    return;
  }

  const updateCountdown = () => {
    const now = new Date();
    const trialEnd = new Date(trialInfo.value.trial_ends_at);
    const diff = trialEnd.getTime() - now.getTime();

    if (diff <= 0) {
      timeRemaining.value = null;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timeRemaining.value = {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  // Atualizar imediatamente
  updateCountdown();

  // Atualizar a cada segundo
  const countdownInterval = setInterval(() => {
    updateCountdown();
    if (!timeRemaining.value) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  // Limpar intervalo ao desmontar
  onUnmounted(() => {
    clearInterval(countdownInterval);
  });
};

// Buscar informações do trial
const fetchTrialInfo = async () => {
  if (!process.client) return;

  loadingTrial.value = true;
  try {
    // Tentar obter tenant_id do localStorage ou do form
    const tenantId =
      form.value.tenant_id?.trim() || localStorage.getItem("tenant_id") || null;

    const response = await getActivePlan(tenantId);

    if (response.success && response.data) {
      // Extrair informações de trial se disponível
      if (response.data.trial_info) {
        trialInfo.value = response.data.trial_info;

        // Iniciar contagem regressiva se trial está ativo
        if (trialInfo.value.in_trial && trialInfo.value.trial_ends_at) {
          startTrialCountdown();
        }
      } else {
        // Se não houver informações de trial, usar dados padrão
        trialInfo.value = {
          in_trial: true,
          trial_ends_at: null,
          days_remaining: 14,
          total_trial_days: 14,
          message: "Trial gratuito de 14 dias",
        };
      }
    }
  } catch (error) {
    console.error("Erro ao buscar informações do trial:", error);
    // Em caso de erro, usar dados padrão
    trialInfo.value = {
      in_trial: true,
      trial_ends_at: null,
      days_remaining: 14,
      total_trial_days: 14,
      message: "Trial gratuito de 14 dias",
    };
  } finally {
    loadingTrial.value = false;
  }
};

// Buscar produtos disponíveis
const fetchProducts = async () => {
  if (!process.client) return;

  loadingProducts.value = true;
  try {
    const response = await getProducts();

    if (response.success && response.data) {
      // Armazenar produtos originais
      rawProducts.value = response.data;

      // Traduzir os produtos recebidos da API
      retranslateProducts();
    }
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  } finally {
    loadingProducts.value = false;
  }
};

// Função para buscar informações do plano vitalício
const fetchLifetimePlansCount = async () => {
  if (!process.client) return;

  loadingLifetimePlanInfo.value = true;
  try {
    const response = await getLifetimePlansCount();

    if (response.success && response.data) {
      lifetimePlanInfo.value = response.data;
    }
  } catch (error) {
    console.error("Erro ao buscar informações do plano vitalício:", error);
  } finally {
    loadingLifetimePlanInfo.value = false;
  }
};

// Função para calcular preço alternativo (mensal/anual)
const getAlternativePrice = (
  currentPlan: any,
  isYearly: boolean,
  planType: "pro" | "clubes"
) => {
  if (!currentPlan) return "";

  if (isYearly) {
    // Se está mostrando anual, mostrar equivalente mensal
    const monthlyPlan =
      planType === "pro"
        ? products.value.pro.monthly
        : products.value.clubes.monthly;
    if (monthlyPlan) {
      return `ou ${monthlyPlan.price.formatted} / ${t("plan_period_month")}`;
    }
  } else {
    // Se está mostrando mensal, mostrar anual
    const yearlyPlan =
      planType === "pro"
        ? products.value.pro.yearly
        : products.value.clubes.yearly;
    if (yearlyPlan) {
      return `ou ${yearlyPlan.price.formatted} / ${t("plan_period_year")}`;
    }
  }
  return "";
};

// Função auxiliar para formatar preço
const formatPrice = (amount: number) => {
  if (!amount) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount / 100);
};

// Buscar informações do trial e produtos ao montar o componente
// Watcher para retraduzir produtos quando o idioma mudar
watch(locale, () => {
  if (rawProducts.value) {
    retranslateProducts();
  }
});

onMounted(() => {
  fetchTrialInfo();
  fetchProducts();
  fetchLifetimePlansCount();
});

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
  margin-top: 0;
  margin-bottom: 16px;
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
  margin: 16px 0 10px 0;
  width: 100%;
}
.plan-card-benefits-check li {
  display: flex;
  align-items: center;
  font-size: 1.08rem;
  color: #1a2940;
  font-weight: 600;
  margin-bottom: 8px;
  padding-left: 0;
  width: 100%;
  justify-content: flex-start;
}
.plan-card-benefits-check li va-icon {
  margin-right: 8px;
  flex-shrink: 0;
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

.plans-cards-row-single {
  justify-content: center;
}

.plans-cards-row-single .plan-card {
  max-width: 500px;
  width: 100%;
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
  justify-content: space-between;
}

/* Cards maiores em resoluções grandes */
@media (min-width: 1400px) {
  .plan-card {
    width: 260px;
    padding: 40px 32px 36px 32px;
    min-height: 420px;
  }

  .plan-card-benefits {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 16px;
    align-items: center;
  }

  .plan-card-benefits li {
    margin-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    white-space: nowrap;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .plan-card-benefits li:before {
    display: none;
  }

  .plan-card-benefits li va-icon {
    margin-right: 6px;
    flex-shrink: 0;
  }
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
  margin-top: 0;
  text-align: center;
}
.plan-card-title-bold {
  margin-top: 0;
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
  margin: 16px 0 auto 0;
  width: 100%;
  color: #02254a;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.plan-card-benefits li {
  margin-bottom: 8px;
  padding-left: 0;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
}
.plan-card-benefits li:before {
  display: none;
}
.plan-card-benefits li va-icon {
  margin-right: 8px;
  flex-shrink: 0;
}
.plan-card-warning {
  background: #fff3ea;
  color: #ff7300;
  font-size: 0.98rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 6px 12px;
  margin-top: auto;
  text-align: center;
}
.plan-card-highlight {
  background: #e6f7f2;
  color: #1976d2;
  font-size: 0.98rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 6px 12px;
  margin-top: auto;
  text-align: center;
}
.plan-card-lifetime-stats {
  width: 100%;
  margin-top: 12px;
}

.plan-card-lifetime-progress-wrapper {
  width: 100%;
  margin-bottom: 12px;
}

.plan-card-progress-bar {
  width: 100%;
  height: 12px;
  background: #f7f9fc;
  border-radius: 10px;
  margin-bottom: 8px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.plan-card-progress {
  height: 100%;
  background: linear-gradient(90deg, #ff7300 0%, #ff8c1a 100%);
  border-radius: 10px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(255, 115, 0, 0.3);
}

.plan-card-progress-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 4px;
}

.plan-card-progress-sold {
  font-size: 1rem;
  font-weight: 800;
  color: #02254a;
}

.plan-card-progress-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: lowercase;
}

.plan-card-remaining-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #fff5e6 0%, #ffe3d1 100%);
  border-radius: 12px;
  border: 2px solid #ff7300;
  box-shadow: 0 2px 8px rgba(255, 115, 0, 0.15);
}

.plan-card-remaining-value {
  font-size: 1.5rem;
  font-weight: 900;
  color: #ff7300;
  line-height: 1;
}

.plan-card-remaining-label {
  font-size: 0.95rem;
  font-weight: 700;
  color: #02254a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.plan-card-sold-out {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 1.1rem;
  color: #dc2626;
  font-weight: 800;
  text-align: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border-radius: 12px;
  border: 2px solid #dc2626;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.15);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Estilos para limitações dos planos - Layout simples */
.plan-card-limits-simple {
  margin: 20px 0;
  padding: 0;
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;
  align-items: flex-start;
}

.plan-limit-item-simple {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.plan-limit-item-simple va-icon {
  margin-bottom: 0;
  flex-shrink: 0;
}

.plan-limit-value-simple {
  font-size: 1.8rem;
  font-weight: 900;
  color: #02254a;
  line-height: 1;
  font-family: "Poppins", sans-serif;
}

.plan-limit-value-simple span:first-child {
  font-size: 2.2rem;
  font-weight: 900;
}

.plan-limit-label-simple {
  font-size: 0.75rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  text-align: center;
}

/* Estilos para informações dinâmicas do trial */
.plan-card-trial-info {
  margin: 16px 0;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.trial-countdown {
  margin-bottom: 12px;
}

.trial-countdown-label {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 4px;
}

.trial-countdown-value {
  font-size: 1.2rem;
  color: #02254a;
  font-weight: 700;
  font-family: "Courier New", monospace;
  letter-spacing: 1px;
}

.trial-end-date {
  margin-bottom: 12px;
}

.trial-end-label {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 4px;
}

.trial-end-value {
  font-size: 1rem;
  color: #3b82f6;
  font-weight: 600;
}

.trial-progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  margin: 12px 0 8px 0;
}

.trial-progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 10px;
  transition: width 0.3s ease;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.trial-progress-text {
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 600;
  text-align: center;
}

.trial-expired {
  text-align: center;
  padding: 12px;
}

.trial-expired-badge {
  display: inline-block;
  background: #fee2e2;
  color: #dc2626;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 8px;
  border: 2px solid #dc2626;
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
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%);
  padding: 80px 0;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.register-section::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(255, 115, 0, 0.08) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: float 20s ease-in-out infinite;
  z-index: 0;
}
.register-section::after {
  content: "";
  position: absolute;
  bottom: -30%;
  left: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(0, 102, 255, 0.06) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: float 25s ease-in-out infinite reverse;
  z-index: 0;
}
@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}
.register-section-wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.register-section-header {
  width: 100%;
  padding: 0 32px 48px 32px;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.6s ease-out;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.register-section-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: #02254a;
  margin-bottom: 16px;
  line-height: 1.2;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #02254a 0%, #1a2940 50%, #02254a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  display: inline-block;
}
.register-section-title::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #ff7300, #ff8c1a, #ff7300);
  border-radius: 2px;
  animation: expandLine 0.8s ease-out 0.3s both;
}
@keyframes expandLine {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 80px;
    opacity: 1;
  }
}
.register-section-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  font-weight: 400;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 24px;
}
.register-container {
  max-width: 1200px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 80px;
  position: relative;
  z-index: 1;
}
.register-form-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 40px 36px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  animation: slideInLeft 0.6s ease-out;
}
.register-form-column::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 13px;
  background: linear-gradient(90deg, #ff7300, #ff8c1a, #ffa64d);
  border-radius: 20px 20px 0 0;
  opacity: 0.8;
}
.register-form-column:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
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
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 10px;
  margin-bottom: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  pointer-events: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
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
  border-color: rgba(203, 213, 225, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
  transform: translateY(-1px);
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
  box-shadow: 0 0 0 4px rgba(255, 115, 0, 0.12),
    0 4px 12px rgba(255, 115, 0, 0.08);
  outline: none;
  background: rgba(255, 255, 255, 1);
}
/* Estilos para campos com erro */
.register-input :deep(.va-input-wrapper--error .va-input-wrapper__field),
.register-select :deep(.va-input-wrapper--error .va-input-wrapper__field),
.register-textarea :deep(.va-input-wrapper--error .va-input-wrapper__field) {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.12),
    0 4px 12px rgba(239, 68, 68, 0.08) !important;
}
.register-input :deep(.va-input-wrapper--error),
.register-select :deep(.va-input-wrapper--error),
.register-textarea :deep(.va-input-wrapper--error) {
  border-color: #ef4444 !important;
}
.register-input :deep(.va-message-list),
.register-select :deep(.va-message-list),
.register-textarea :deep(.va-message-list) {
  color: #ef4444 !important;
  font-size: 13px;
  font-weight: 500;
  margin-top: 6px;
}
.register-input :deep(.va-message-list__message),
.register-select :deep(.va-message-list__message),
.register-textarea :deep(.va-message-list__message) {
  color: #ef4444 !important;
}
.register-input :deep(label),
.register-select :deep(label),
.register-textarea :deep(label) {
  color: #ff7300;
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 8px;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.register-input :deep(label),
.register-select :deep(label) {
  position: relative;
}
.register-input :deep(label)::after,
.register-select :deep(label)::after {
  content: " *";
  color: #ef4444;
  font-weight: 700;
  margin-left: 2px;
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
  background: linear-gradient(135deg, #ff7300 0%, #ff8c1a 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  padding: 14px 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 4px;
  box-shadow: 0 4px 12px rgba(255, 115, 0, 0.3),
    0 2px 4px rgba(255, 115, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}
.register-submit-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}
.register-submit-btn:hover:not(:disabled)::before {
  left: 100%;
}
.register-submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #ff8c1a 0%, #ffa64d 100%);
  box-shadow: 0 8px 20px rgba(255, 115, 0, 0.4),
    0 4px 8px rgba(255, 115, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
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
  align-self: center;
  z-index: 1;
}
.register-illustration {
  width: 100%;
  max-width: 500px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.8);
  animation: slideInRight 0.6s ease-out;
}
.register-illustration::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 115, 0, 0.1) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: rotate 20s linear infinite;
  z-index: 0;
  pointer-events: none;
}
.register-illustration:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.2), 0 12px 32px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.illustration-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(
    circle,
    rgba(255, 115, 0, 0.15) 0%,
    transparent 70%
  );
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  animation: pulse 3s ease-in-out infinite;
}
.register-illustration:hover .illustration-glow {
  opacity: 1;
}
@keyframes pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.5;
  }
}
.illustration-image {
  width: 100%;
  height: auto;
  display: block;
  position: relative;
  z-index: 2;
  margin: 0 auto;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
  transition: filter 0.3s ease;
}
.register-illustration:hover .illustration-image {
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.15));
}
@media (max-width: 900px) {
  .register-section {
    padding: 64px 0;
  }
  .register-section-header {
    padding: 0 24px 32px 24px;
  }
  .register-section-title {
    font-size: 2rem;
  }
  .register-section-subtitle {
    font-size: 1.1rem;
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

/* Estilo específico para o seletor de idioma na navbar */
.navbar-language-selector {
  color: white !important;
}
</style>
