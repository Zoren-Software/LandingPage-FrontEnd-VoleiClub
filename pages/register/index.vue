<template>
  <div class="flex justify-end pa-3">
    <div class="row">
      <div class="flex flex-col md7 sm12 xs12">
        <div class="pa-3 w-1/2">
          <h1 class="va-h1 va-text-center font-bold mt-5">
            {{ $t("welcome") }}
          </h1>
          <p class="text-apresentation">
            {{ $t("welcome_message") }}
          </p>
          <va-image src="/images/image_heart_2.svg" fit="contain" lazy />

          <h2 class="va-h2 va-text-center font-semibold mt-5 mb-5">
            {{ $t("title_why_register") }}
          </h2>
          <div class="row">
            <div class="flex flex-col md12 sm12 lg12 xl4">
              <div class="pa-3 w-1/2">
                <va-card :bordered="false">
                  <va-image src="/images/image_access.svg" fit="contain" lazy />
                  <va-card-content class="card-content-antecipado">
                    <h6 class="va-h6">
                      {{ $t("subtitle_early_access") }}
                    </h6>
                    {{ $t("text_early_access") }}
                  </va-card-content>
                </va-card>
              </div>
            </div>
            <div class="flex flex-col md12 sm12 lg6 xl4">
              <div class="pa-3 w-1/2">
                <va-card :bordered="false">
                  <va-image src="/images/image_price.svg" fit="contain" lazy />
                  <va-card-content class="card-content-exclusivo">
                    <h6 class="va-h6">
                      {{ $t("subtitle_exclusive_discounts") }}
                    </h6>
                    {{ $t("text_exclusive_discounts") }}
                  </va-card-content>
                </va-card>
              </div>
            </div>
            <div class="flex flex-col md12 sm12 lg6 xl4">
              <div class="pa-3 w-1/2">
                <va-card :bordered="false">
                  <va-image
                    src="/images/image_community.svg"
                    fit="contain"
                    lazy
                  />
                  <va-card-content class="card-content-voz">
                    <h6 class="va-h6">
                      {{ $t("subtitle_have_your_voice_heard") }}
                    </h6>
                    {{ $t("text_have_your_voice_heard") }}
                  </va-card-content>
                </va-card>
              </div>
            </div>
          </div>

          <h2 class="va-h2 va-text-center font-semibold mt-5 mb-5">
            {{ $t("title_security_and_development") }}
          </h2>
          <div class="row">
            <div class="flex flex-col md12 lg6">
              <div class="pa-3 w-1/2">
                <va-card class="pa-2" :bordered="false">
                  <va-image
                    src="/images/image_security.svg"
                    fit="contain"
                    lazy
                  ></va-image>
                  <va-card-content>
                    <h6 class="va-h6">
                      {{ $t("subtitle_security_and_development") }}
                    </h6>
                    {{ $t("text_security_and_development") }}
                  </va-card-content>
                </va-card>
              </div>
            </div>
            <div class="flex flex-col md12 lg6">
              <div class="pa-3 w-1/2">
                <va-card class="pa-2" :bordered="false">
                  <va-image
                    src="/images/image_dev.svg"
                    fit="contain"
                    lazy
                  ></va-image>
                  <va-card-content>
                    <h6 class="va-h6">{{ $t("subtitle_development") }}</h6>
                    {{ $t("text_development") }}
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

<script>
import ContactForm from "~/components/organisms/Forms/ContactForm.vue";

export default {
  components: {
    ContactForm,
  },
};
</script>
