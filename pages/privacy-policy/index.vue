<template>
  <article class="legal-page">
    <header class="legal-page__header">
      <h1 class="legal-page__title custom-titles">
        {{ t("privacy_policy.title") }}
      </h1>
      <p class="legal-page__lead">
        {{ t("privacy_policy.lead") }}
      </p>
    </header>

    <section class="legal-section">
      <h2>{{ t("privacy_policy.s1_title") }}</h2>
      <p>{{ t("privacy_policy.s1_p1") }}</p>
    </section>

    <section class="legal-section">
      <h2>{{ t("privacy_policy.s2_title") }}</h2>
      <p>{{ t("privacy_policy.s2_intro") }}</p>
      <ul class="legal-list">
        <li>
          <strong>{{ t("privacy_policy.s2_li1_label") }}</strong>
          — {{ t("privacy_policy.s2_li1_text") }}
        </li>
        <li>
          <strong>{{ t("privacy_policy.s2_li2_label") }}</strong>
          — {{ t("privacy_policy.s2_li2_text") }}
        </li>
        <li>
          <strong>{{ t("privacy_policy.s2_li3_label") }}</strong>
          — {{ t("privacy_policy.s2_li3_text") }}
        </li>
        <li>
          <strong>{{ t("privacy_policy.s2_li4_label") }}</strong>
          — {{ t("privacy_policy.s2_li4_text") }}
        </li>
      </ul>
    </section>

    <section class="legal-section">
      <h2>{{ t("privacy_policy.s3_title") }}</h2>
      <p>{{ t("privacy_policy.s3_intro") }}</p>
      <ul class="legal-list">
        <li>{{ t("privacy_policy.s3_li1") }}</li>
        <li>{{ t("privacy_policy.s3_li2") }}</li>
        <li>{{ t("privacy_policy.s3_li3") }}</li>
        <li>{{ t("privacy_policy.s3_li4") }}</li>
        <li>{{ t("privacy_policy.s3_li5") }}</li>
      </ul>
    </section>

    <section class="legal-section">
      <h2>{{ t("privacy_policy.s4_title") }}</h2>
      <p>{{ t("privacy_policy.s4_intro") }}</p>
      <ul class="legal-list">
        <li>
          <strong>{{ t("privacy_policy.s4_li1_label") }}</strong>
          — {{ t("privacy_policy.s4_li1_text") }}
        </li>
        <li>
          <strong>{{ t("privacy_policy.s4_li2_label") }}</strong>
          — {{ t("privacy_policy.s4_li2_text") }}
        </li>
      </ul>
      <p>{{ t("privacy_policy.s4_p2") }}</p>
    </section>

    <section class="legal-section">
      <h2>{{ t("privacy_policy.s5_title") }}</h2>
      <p>{{ t("privacy_policy.s5_p1") }}</p>
      <p>{{ t("privacy_policy.s5_p2") }}</p>
    </section>

    <section class="legal-section">
      <h2>{{ t("privacy_policy.s6_title") }}</h2>
      <p>
        <strong>{{ t("privacy_policy.s6_intro_strong") }}</strong>
        {{ t("privacy_policy.s6_intro_after") }}
      </p>
      <ul class="legal-list">
        <li>{{ t("privacy_policy.s6_li1") }}</li>
        <li>{{ t("privacy_policy.s6_li2") }}</li>
      </ul>
    </section>

    <section class="legal-section">
      <h2>{{ t("privacy_policy.s7_title") }}</h2>
      <p>{{ t("privacy_policy.s7_p1") }}</p>
      <p>{{ t("privacy_policy.s7_p2") }}</p>
    </section>

    <section class="legal-section">
      <h2>{{ t("privacy_policy.s8_title") }}</h2>
      <p>{{ t("privacy_policy.s8_intro") }}</p>
      <ul class="legal-list">
        <li>{{ t("privacy_policy.s8_li1") }}</li>
        <li>{{ t("privacy_policy.s8_li2") }}</li>
        <li>{{ t("privacy_policy.s8_li3") }}</li>
        <li>{{ t("privacy_policy.s8_li4") }}</li>
      </ul>
      <p>{{ t("privacy_policy.s8_p2") }}</p>
    </section>

    <section class="legal-section">
      <h2>{{ t("privacy_policy.s9_title") }}</h2>
      <p>{{ t("privacy_policy.s9_p1") }}</p>
      <p>
        <a href="mailto:support@volleytrack.com" class="legal-page__email">
          support@volleytrack.com
        </a>
      </p>
    </section>

    <section class="legal-section">
      <h2>{{ t("privacy_policy.s10_title") }}</h2>
      <p>{{ t("privacy_policy.s10_p1") }}</p>
      <p class="legal-page__updated">{{ t("privacy_policy.s10_updated") }}</p>
    </section>
  </article>
</template>

<script setup>
import { useI18n } from "#imports";

const { t } = useI18n();

useHead({
  title: () => t("privacy_policy.meta_title"),
});
</script>
