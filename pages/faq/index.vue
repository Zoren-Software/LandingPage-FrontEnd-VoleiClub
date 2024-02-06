<template>

  <div class="header mt-5">
    <span class="faq-text">FAQs</span>
    <hr class="line-behind" />
  </div>

  <div class="mt-3 pl-5 pr-5">
    <h1 class="va-h1 va-text-center font-bold mt-1 custom-titles">
      {{ $t("subtitle_faq_questions") }}
    </h1>
  </div>
  <div class="mt-4 pl-5 pr-5">
    <div v-for="i in 10" :key="i" class="mb-2">
      <va-collapse
        v-model="value[i]"
        class="min-w-96 custom-collapse-faq"
        :header="$t(`question_${i}`)"
        :class="{ 'expanded': value[i] }"
      >
        <div>
          {{ $t(`answer_${i}`) }}
        </div>
      </va-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
      },
    };
  },
};
</script>

<style>
.custom-collapse-faq {
  margin: 0rem 20rem; 
  border-radius: 5px;
  background-color: #e9e6e6;
  font-size: 1rem;
  font-weight: 100 !important;
}

.custom-collapse-faq .va-collapse__body {
  background-color: rgb(255, 255, 255);
  color: #696969;
  font-size: 0.8rem;
  padding: 0.5rem;
}

.custom-collapse-faq .va-collapse__header-wrapper {
  padding: 0.5rem;
}

.custom-collapse-faq.expanded .va-collapse__header-wrapper {
  border-radius: 5px;
  background-color: #FF4E1B;
  color: #fff;
}

.custom-collapse-faq .va-collapse__header__text {
  font-weight: 100 !important;
}

.header {
  text-align: center;
  position: relative;
  margin: 0rem 35rem;
  }

.faq-text {
  color: #FF4E1B;
  font-size: 1.2rem;
  background: #f6f6f6;
  display: inline-block;
  position: relative;
  padding: 0 1rem;
  z-index: 10;
}

.line-behind {
  border-top: 0.125rem solid #c0c0c0;
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  margin: 0;
  z-index: 9;
}
</style>
