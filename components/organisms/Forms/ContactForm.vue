<template>
  <div class="flex justify-end pa-3">
    <div class="row">
      <va-form ref="formRef" class="flex flex-col md3 sm12 xs12 mb-5 ml-4 mr-4">
        <div class="position-fixed">
          <div class="mt-4">
            <h2 class="va-h2 va-text-center mb-3">
              {{ $t("title_join_the_volleyball_vanguard_with") }}
              {{ applicationName }}
            </h2>
            {{ $t("text_join_the_volleyball_vanguard_with") }}
          </div>
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
import { useReCaptcha } from "vue-recaptcha-v3";

const { $customFetch } = useNuxtApp();

const runtimeConfig = useRuntimeConfig();
const applicationName = runtimeConfig.public.nameApplication;

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
const { executeRecaptcha } = useReCaptcha();

const submit = async () => {
  try {
    const token = await executeRecaptcha("create_new_lead");

    data.value = await $customFetch("/leads", "POST", {
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        experience_level: form.value.experience_level.value,
        message: form.value.message,
        recaptchaToken: token,
      }),
    })
      .then((response) => {
        confirmSuccess(response.message, () => {
          //errors.value = this.errorsDefault();
        });
      })
      .catch(({ response }) => {
        // o response volta a mensagem de erro com chave valor, mas o valor é um array, preciso atribuir para o errors.value.errors
        console.error(typeof response.email);
        if (typeof response.email == "object") {
          errors.email = response.email[0];
          confirmError(response.email[0]);
        } else {
          confirmError(response.message);
        }
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
