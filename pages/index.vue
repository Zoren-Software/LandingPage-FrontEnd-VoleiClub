<template>
  <div class="flex justify-end pa-3 custom-responsive">
    <div class="row">
      <div class="flex flex-col md7 sm12 xs12">
        <div class="pa-3 w-1/2">
          <h1 class="va-h1 va-text-center font-bold mt-1 custom-titles">
            {{ applicationName }} {{ $t("welcome_title_index") }}
          </h1>
          <p class="text-apresentation">
            {{ $t("welcome_message_index") }}
          </p>
          <va-image src="/images/image_numbers.svg" fit="contain" lazy />

          <h2
            class="va-h2 va-text-center font-semibold mt-5 mb-5 custom-titles"
          >
            {{ $t("title_game_changing_features") }}
          </h2>
          <div class="row">
            <div class="flex flex-col md12 sm12 lg6 xl12">
              <div class="pa-3 w-1/2">
                <va-card :bordered="false">
                  <va-image
                    src="/images/image_calendar.svg"
                    fit="contain"
                    lazy
                  />
                  <va-card-content class="card-content-antecipado">
                    <h6 class="va-h6">
                      {{ $t("title_smart_scheduling") }}
                    </h6>
                    {{ $t("text_smart_scheduling") }}
                  </va-card-content>
                </va-card>
              </div>
            </div>
            <div class="flex flex-col md12 sm12 lg6 xl12">
              <div class="pa-3 w-1/2">
                <va-card :bordered="false">
                  <va-image src="/images/image_check.svg" fit="contain" lazy />
                  <va-card-content class="card-content-exclusivo">
                    <h6 class="va-h6">
                      {{ $t("title_complete_team_management") }}
                    </h6>
                    {{ $t("text_complete_team_management") }}
                  </va-card-content>
                </va-card>
              </div>
            </div>
            <div class="flex flex-col md12 sm12 lg6 xl12">
              <div class="pa-3 w-1/2">
                <va-card :bordered="false">
                  <va-image src="/images/image_data.svg" fit="contain" lazy />
                  <va-card-content>
                    <h6 class="va-h6">
                      {{ $t("title_detaile_analysis_and_statistics") }}
                    </h6>
                    {{ $t("text_detaile_analysis_and_statistics") }}
                  </va-card-content>
                </va-card>
              </div>
            </div>
            <div class="flex flex-col md12 sm12 lg6 xl12">
              <div class="pa-3 w-1/2">
                <va-card :bordered="false">
                  <va-image
                    src="/images/image_communication.svg"
                    fit="contain"
                    lazy
                  />
                  <va-card-content>
                    <h6 class="va-h6">
                      {{ $t("title_efficient_and_targeted_communication") }}
                    </h6>
                    {{ $t("text_efficient_and_targeted_communication") }}
                  </va-card-content>
                </va-card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useColors } from "vuestic-ui";
import { ref } from "vue";
import ContactForm from "~/components/organisms/Forms/ContactForm.vue";

const showSidebar = ref(false);
const page = ref(1);

const runtimeConfig = useRuntimeConfig();
const applicationName = runtimeConfig.public.nameApplication;

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
@media (min-width: 1600px) {
  .custom-responsive {
    margin: 0 20%;
  }
}

@media (max-width: 390px) {
  .custom-titles {
    font-size: 2rem;
  }

  .text-apresentation {
    margin: 0, 0, 0, 0;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
