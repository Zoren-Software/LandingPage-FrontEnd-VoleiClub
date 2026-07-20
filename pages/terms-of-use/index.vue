<template>
  <article class="legal-page">
    <header class="legal-page__header">
      <h1 class="legal-page__title custom-titles">
        {{ t("terms_of_use.title") }}
      </h1>
      <p class="legal-page__lead">
        {{ t("terms_of_use.lead") }}
      </p>
      <p class="legal-page__related">
        {{ t("terms_of_use.privacy_link_text") }}
        <NuxtLink to="/privacy-policy" class="legal-page__link">
          {{ t("terms_of_use.privacy_link_label") }}
        </NuxtLink>
      </p>
    </header>

    <section class="legal-section">
      <h2>{{ t("terms_of_use.s1_title") }}</h2>
      <p>{{ t("terms_of_use.s1_p1") }}</p>
    </section>

    <section class="legal-section">
      <h2>{{ t("terms_of_use.s2_title") }}</h2>
      <p>{{ t("terms_of_use.s2_intro") }}</p>
      <ul class="legal-list">
        <li>{{ t("terms_of_use.s2_li1") }}</li>
        <li>{{ t("terms_of_use.s2_li2") }}</li>
        <li>{{ t("terms_of_use.s2_li3") }}</li>
      </ul>
    </section>

    <section class="legal-section">
      <h2>{{ t("terms_of_use.s3_title") }}</h2>
      <p>{{ t("terms_of_use.s3_p1") }}</p>
    </section>

    <section class="legal-section">
      <h2>{{ t("terms_of_use.s4_title") }}</h2>
      <p>{{ t("terms_of_use.s4_intro") }}</p>
      <ul class="legal-list">
        <li>{{ t("terms_of_use.s4_li1") }}</li>
        <li>{{ t("terms_of_use.s4_li2") }}</li>
        <li>{{ t("terms_of_use.s4_li3") }}</li>
      </ul>
    </section>

    <section class="legal-section">
      <h2>{{ t("terms_of_use.s5_title") }}</h2>
      <p>{{ t("terms_of_use.s5_intro") }}</p>
      <ul class="legal-list">
        <li>{{ t("terms_of_use.s5_li1") }}</li>
        <li>{{ t("terms_of_use.s5_li2") }}</li>
        <li>{{ t("terms_of_use.s5_li3") }}</li>
        <li>{{ t("terms_of_use.s5_li4") }}</li>
      </ul>
    </section>

    <section class="legal-section">
      <h2>{{ t("terms_of_use.s6_title") }}</h2>
      <p>{{ t("terms_of_use.s6_p1") }}</p>
    </section>

    <section class="legal-section">
      <h2>{{ t("terms_of_use.s7_title") }}</h2>
      <p>{{ t("terms_of_use.s7_p1") }}</p>
      <p>{{ t("terms_of_use.s7_p2") }}</p>
    </section>

    <section class="legal-section">
      <h2>{{ t("terms_of_use.s8_title") }}</h2>
      <p>{{ t("terms_of_use.s8_p1") }}</p>
    </section>

    <section class="legal-section">
      <h2>{{ t("terms_of_use.s9_title") }}</h2>
      <p>{{ t("terms_of_use.s9_p1") }}</p>
      <p>
        <a href="mailto:support@volleytrack.com" class="legal-page__email">
          support@volleytrack.com
        </a>
      </p>
      <p class="legal-page__updated">{{ t("terms_of_use.s10_updated") }}</p>
    </section>
  </article>
</template>

<script setup>
import { useI18n } from "#imports";

const { t } = useI18n();

useHead({
  title: () => t("terms_of_use.meta_title"),
});
</script>
