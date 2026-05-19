<template>
  <article class="privacy-page">
    <header class="privacy-page__header">
      <h1 class="privacy-page__title custom-titles">
        {{ t("privacy_policy.title") }}
      </h1>
      <p class="privacy-page__lead">
        {{ t("privacy_policy.lead") }}
      </p>
    </header>

    <section class="privacy-section">
      <h2>{{ t("privacy_policy.s1_title") }}</h2>
      <p>{{ t("privacy_policy.s1_p1") }}</p>
    </section>

    <section class="privacy-section">
      <h2>{{ t("privacy_policy.s2_title") }}</h2>
      <p>{{ t("privacy_policy.s2_intro") }}</p>
      <ul class="privacy-list">
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

    <section class="privacy-section">
      <h2>{{ t("privacy_policy.s3_title") }}</h2>
      <p>{{ t("privacy_policy.s3_intro") }}</p>
      <ul class="privacy-list">
        <li>{{ t("privacy_policy.s3_li1") }}</li>
        <li>{{ t("privacy_policy.s3_li2") }}</li>
        <li>{{ t("privacy_policy.s3_li3") }}</li>
        <li>{{ t("privacy_policy.s3_li4") }}</li>
        <li>{{ t("privacy_policy.s3_li5") }}</li>
      </ul>
    </section>

    <section class="privacy-section">
      <h2>{{ t("privacy_policy.s4_title") }}</h2>
      <p>{{ t("privacy_policy.s4_intro") }}</p>
      <ul class="privacy-list">
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

    <section class="privacy-section">
      <h2>{{ t("privacy_policy.s5_title") }}</h2>
      <p>{{ t("privacy_policy.s5_p1") }}</p>
      <p>{{ t("privacy_policy.s5_p2") }}</p>
    </section>

    <section class="privacy-section">
      <h2>{{ t("privacy_policy.s6_title") }}</h2>
      <p>
        <strong>{{ t("privacy_policy.s6_intro_strong") }}</strong>
        {{ t("privacy_policy.s6_intro_after") }}
      </p>
      <ul class="privacy-list">
        <li>{{ t("privacy_policy.s6_li1") }}</li>
        <li>{{ t("privacy_policy.s6_li2") }}</li>
      </ul>
    </section>

    <section class="privacy-section">
      <h2>{{ t("privacy_policy.s7_title") }}</h2>
      <p>{{ t("privacy_policy.s7_p1") }}</p>
      <p>{{ t("privacy_policy.s7_p2") }}</p>
    </section>

    <section class="privacy-section">
      <h2>{{ t("privacy_policy.s8_title") }}</h2>
      <p>{{ t("privacy_policy.s8_intro") }}</p>
      <ul class="privacy-list">
        <li>{{ t("privacy_policy.s8_li1") }}</li>
        <li>{{ t("privacy_policy.s8_li2") }}</li>
        <li>{{ t("privacy_policy.s8_li3") }}</li>
        <li>{{ t("privacy_policy.s8_li4") }}</li>
      </ul>
      <p>{{ t("privacy_policy.s8_p2") }}</p>
    </section>

    <section class="privacy-section">
      <h2>{{ t("privacy_policy.s9_title") }}</h2>
      <p>{{ t("privacy_policy.s9_p1") }}</p>
      <p>
        <a href="mailto:support@volleytrack.com" class="privacy-page__email">
          support@volleytrack.com
        </a>
      </p>
    </section>

    <section class="privacy-section">
      <h2>{{ t("privacy_policy.s10_title") }}</h2>
      <p>{{ t("privacy_policy.s10_p1") }}</p>
      <p class="privacy-page__updated">{{ t("privacy_policy.s10_updated") }}</p>
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

<style scoped>
.privacy-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}

.privacy-page__header {
  margin-bottom: 2rem;
  text-align: center;
}

.privacy-page__title {
  font-size: 2rem;
  font-weight: 700;
  color: #0b1e3a;
  margin: 0 0 1rem;
}

.privacy-page__lead {
  font-size: 1.05rem;
  line-height: 1.65;
  color: #6c757d;
  margin: 0;
}

.privacy-section {
  margin-bottom: 1.75rem;
}

.privacy-section h2 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #0b1e3a;
  margin: 0 0 0.75rem;
}

.privacy-section p {
  font-size: 1rem;
  line-height: 1.65;
  color: #374151;
  margin: 0 0 0.75rem;
}

.privacy-page .privacy-list {
  margin: 0.25rem 0 0.75rem;
  padding: 0;
  list-style: none;
  color: #374151;
}

.privacy-page .privacy-list > li {
  position: relative;
  font-size: 1rem;
  line-height: 1.65;
  margin-bottom: 0.5rem;
  padding-left: 1.35rem;
}

.privacy-page .privacy-list > li::before {
  content: "•";
  position: absolute;
  left: 0;
  top: 0;
  color: #ff7300;
  font-weight: 700;
  line-height: 1.65;
}

.privacy-page .privacy-list > li strong {
  color: #1f2937;
}

.privacy-page__email {
  color: #ff7300;
  font-weight: 600;
  text-decoration: none;
}

.privacy-page__email:hover {
  text-decoration: underline;
}

.privacy-page__updated {
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: 1rem;
}

@media (max-width: 600px) {
  .privacy-page {
    padding: 1.5rem 1rem 3rem;
  }

  .privacy-page__title {
    font-size: 1.75rem;
  }
}
</style>
