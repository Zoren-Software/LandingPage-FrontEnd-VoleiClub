<template>
  <div class="mt-5 pl-5 pr-5">
    <h1 class="va-h1 va-text-center font-bold mt-1 custom-titles">
      {{ $t("menu_title_faq") }}
    </h1>
  </div>
  <div class="mt-5 pl-5 pr-5">
    <div v-for="i in 10" :key="i">
      <va-collapse
        v-model="value[i]"
        class="min-w-96"
        :header="$t(`question_${i}`)"
      >
        {{ $t(`answer_${i}`) }}
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
