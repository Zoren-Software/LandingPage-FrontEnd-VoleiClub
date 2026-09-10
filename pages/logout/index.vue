<template>
  <div class="logout-container">
    <va-card class="logout-card">
      <va-card-content class="text-center">
        <va-icon name="logout" size="64px" color="primary" class="mb-4" />
        <h2 class="mb-3">{{ $t("menu_title_logout") }}</h2>
        <p v-if="isLoggingOut">
          {{ $t("logging_out_message") || "Saindo..." }}
        </p>
        <p v-else>
          {{
            $t("logout_success_message") || "Você foi desconectado com sucesso!"
          }}
        </p>
      </va-card-content>
    </va-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { confirmSuccess, confirmError } from "~/utils/sweetAlert2/swalHelper";
import { clearLandingSession } from "~/utils/landingSession.js";

definePageMeta({
  layout: "default",
});

useHead({
  titleTemplate: "Logout",
});

const router = useRouter();
const { $customFetch } = useNuxtApp();
const isLoggingOut = ref(true);

const performLogout = async () => {
  if (typeof localStorage === "undefined") {
    router.push("/");
    return;
  }

  const userToken = localStorage.getItem("userToken");
  const email = localStorage.getItem("email");

  // Se não há token, redireciona para home
  if (!userToken) {
    isLoggingOut.value = false;
    setTimeout(() => {
      router.push("/");
    }, 1500);
    return;
  }

  try {
    const response = await $customFetch("/logout", "POST", {
      body: JSON.stringify({
        email: email,
        token: userToken,
      }),
    });

    // Limpa o localStorage
    clearLandingSession();
    isLoggingOut.value = false;

    // Mostra mensagem e redireciona após fechar
    confirmSuccess(response.message || "Logout efetuado com sucesso!", () => {
      router.push("/");
    });
  } catch (error) {
    // Em caso de erro, ainda limpa localmente
    clearLandingSession();
    isLoggingOut.value = false;

    confirmError(error.message || "Erro ao fazer logout", () => {
      router.push("/");
    });
  }
};

onMounted(() => {
  performLogout();
});
</script>

<style scoped>
.logout-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 20px;
}

.logout-card {
  max-width: 400px;
  width: 100%;
}

.text-center {
  text-align: center;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}
</style>
