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
      <va-form ref="formRef" class="flex flex-col md3 sm12 xs12 mb-5 ml-4 mr-4">
        <div class="position-fixed">
          <h2 class="va-h2 va-text-center font-semibold mt-4 mb-5">
            {{ $t("title_ready_to_jump_in") }}
          </h2>
          <va-card class="pa-5">
            <h2 class="va-h2 va-text-center">{{ $t("title_register") }}</h2>
            <div class="row mb-2">
              <div class="flex flex-col md12 sm12 xs12">
                <div class="item">
                  <va-input
                    name="name"
                    class="display-block"
                    :placeholder="$t('placeholder_name')"
                    stateful
                    v-model="form.name"
                    :error="errors?.errors?.name != ''"
                    :error-messages="errors?.errors?.name"
                    :label="$t('label_name')"
                  />
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="flex flex-col md12 sm12 xs12">
                <div class="item">
                  <va-input
                    name="email"
                    class="display-block"
                    :placeholder="$t('placeholder_email')"
                    v-model="form.email"
                    type="email"
                    :error="errors?.errors?.email != ''"
                    :error-messages="errors?.errors?.email"
                    :label="$t('label_email')"
                  />
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="flex flex-col md12 sm12 xs12">
                <div class="item">
                  <va-select
                    name="option"
                    class="display-block"
                    v-model="form.experience_level"
                    :label="$t('label_experience_level')"
                    :placeholder="$t('placeholder_experience_level')"
                    :options="options"
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
              </div>
            </div>
            <div class="row mb-2">
              <div class="flex flex-col md12 sm12 xs12">
                <div class="item">
                  <va-textarea
                    name="message"
                    class="display-block"
                    v-model="form.message"
                    :label="$t('label_message')"
                    :placeholder="$t('placeholder_message')"
                  />
                </div>
              </div>
            </div>
            <div class="row mb-2 mt-2">
              <div class="flex flex-col md12 sm12 xs12">
                <div class="item">
                  <va-button block @click="submit">{{
                    $t("button_register")
                  }}</va-button>
                </div>
              </div>
            </div>
          </va-card>
        </div>
      </va-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { confirmSuccess, confirmError } from "~/utils/sweetAlert2/swalHelper";

const { $customFetch } = useNuxtApp();

const data = ref(null);

const form = ref({
  name: "",
  email: "",
  experience_level: "",
  message: "",
});

let errors = ref({
  errors: {
    name: "",
    email: "",
    experience_level: "",
    message: "",
  },
  message: "",
});

const options = ref([
  { value: null, text: "Selecione" },
  { value: "beginner", text: "Iniciante" },
  { value: "amateur", text: "Amador" },
  { value: "student", text: "Estudante" },
  { value: "college", text: "Universitário" },
  { value: "semi-professional", text: "Semi-profissional" },
  { value: "professional", text: "Profissional" },
  { value: "intermediate", text: "Intermediário" },
  { value: "coach", text: "Treinador" },
  { value: "instructor", text: "Instrutor" },
  { value: "other", text: "Outro" },
]);

const formRef = ref(null);

const errorsDefault = () => {
  return {
    errors: {
      name: "",
      email: "",
      experience_level: "",
      message: "",
    },
    message: "",
  };
};

const submit = async () => {
  try {
    // TODO - Fazer o post na API
    data.value = await $customFetch("/leads", "POST", {
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        experience_level: form.value.experience_level.value,
        message: form.value.message,
      }),
    })
      .then((response) => {
        console.log(response);
        confirmSuccess(response.message, () => {
          //errors.value = this.errorsDefault();
        });
      })
      .catch(({ response }) => {
        errors.value = response;
        confirmError(response.message);
      });
  } catch ({ response }) {
    if (response) {
      const erroData = await error.response.json(); // Converta o corpo da resposta para JSON
      console.log("Detalhes do erro:", erroData);
    }
  }
};

// fazer o emits para o form
const emit = (event, ...args) => {
  formRef.value.$emit(event, ...args);
};
</script>

<style>
.display-block {
  display: block;
}
.list__item + .list__item {
  margin-top: 20px;
}
.va-aspect-ratio.va-image {
  height: 300px;
}

.text-apresentation {
  margin-top: 5rem;
  margin-bottom: 5rem;
  text-align: justify;
  text-justify: inter-word;
  font-size: 1.2rem;
  /** controlar a quebra do texto */
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  padding-left: 4rem;
  padding-right: 4rem;
}
@media (min-width: 996px) {
  .card-content-voz {
    height: 144px;
  }
}
@media (min-width: 1132px) {
  .card-content-voz {
    height: 128px;
  }
}
@media (min-width: 1640px) {
  .card-content-voz {
    height: 113px;
  }
}

@media (min-width: 768px) {
  .position-fixed {
    position: fixed;
  }
}

@media (min-width: 958px) {
  .position-fixed {
    position: fixed;
    margin-right: 3rem;
  }
}
</style>
