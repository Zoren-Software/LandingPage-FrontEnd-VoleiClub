<template>
  <va-card stripe stripe-color="primary" class="mx-5">
    <va-card-title> Login </va-card-title>
    <va-form @keyup.enter="login">
      <div class="row justify-center px-3 pb-4">
        <div class="flex flex-col">
          <div class="item">
            <ZEmailInput
              v-model="email"
              label="E-mail"
              id="email"
              placeholder="E-mail"
            />
          </div>
        </div>
      </div>
      <div class="row justify-center px-3 pb-4">
        <div class="flex flex-col">
          <div class="item">
            <ZPasswordInput
              v-model="password"
              label="Password"
              id="password"
              placeholder="Senha"
              :error="error"
              :error-messages="errorMessage"
              :success="success"
              :messages="successMessage"
            />
          </div>
        </div>
      </div>
      <div class="row justify-center px-3 pb-3">
        <ZButton
          :block="true"
          :loading="loading"
          color="primary"
          @click="login"
        >
          Login
        </ZButton>
      </div>
    </va-form>
  </va-card>
</template>

<script setup>
import ZInput from "~/components/atoms/Inputs/ZInput";
import ZPasswordInput from "~/components/molecules/Inputs/ZPasswordInput";
import ZEmailInput from "~/components/molecules/Inputs/ZEmailInput";
import ZButton from "~/components/atoms/Buttons/ZButton";
const { $customFetch } = useNuxtApp();
import { ref } from "vue";
import { confirmSuccess, confirmError } from "~/utils/sweetAlert2/swalHelper";

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(false);
const errorMessage = ref([]);
const success = ref(false);
const successMessage = ref([]);
const navigator = window.navigator;

const login = async () => {
  loading.value = true;
  error.value = false;
  errorMessage.value = [];
  success.value = false;
  successMessage.value = [""];
  try {
    const response = await $customFetch("/login", "POST", {
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        device_type: "web",
        // device_name deve ser o nome do dispositivo ou navegador
        device_name: navigator.userAgent,
      }),
    }).then((response) => {
      confirmSuccess(response.message, () => {});
      localStorage.setItem("userToken", response.token);
      localStorage.setItem("email", email.value);
      navigateTo("/leads");
    });
    if (response.status === 200) {
      success.value = true;
      successMessage.value = ["Login efetuado com sucesso!"];
    }
    if (response.status === 422) {
      success.value = false;
      successMessage.value = [""];
      error.value = true;
      errorMessage.value = ["E-mail ou senha inválidous!"];
    }
  } catch (errorLog) {
    error.value = true;
    errorMessage.value = ["E-mail ou senha inválidous!"];
  }
  loading.value = false;
};
</script>
