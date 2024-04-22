<template>
    <div class="row custom-register">
    <div class="flex flex-col md6">
      <h1>Pronto para entrar na jogada?</h1>
      <p class="pt-1 pb-3">
        Estamos aprimorando o futuro do gerenciamento de equipes de vôlei e queremos você conosco. 
        Ao se registrar agora, você se torna parte de um grupo exclusivo que terá acesso antecipado à nossa plataforma ainda em desenvolvimento.
      </p>
      
      <VaForm ref="myForm" class="flex flex-col gap-2">
        <VaProgressBar v-show="isLoading" indeterminate />
        <VaInput class="custom-form-input" stateful label="Nome" :rules="[(v) => !!v || 'Required']" />
        <VaInput class="custom-form-input" stateful label="Email" :rules="[(v) => !!v || 'Required']" />
        <VaSelect 
          class="custom-form-input" 
          stateful
          label="Nível de Experiência"
          :options="[
            {
              value: null,
              text: $t('option_experience_level_select'),
            }]"
        />
        <VaButton class="custom-form-button">
          Registrar
        </VaButton>
      </VaForm>
    </div>
    <div class="flex flex-col md6">
      <va-image src="/images/about.svg" fit="contain" lazy />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LineWithText from "~/components/organisms/Forms/LineWithText.vue";
import TitleAndDescription from "~/components/organisms/Forms/TitleAndDescription.vue";

const titleText = ref('This is a title')

</script>

<style>

.custom-register {
  padding: 7% 15%;
}

/* REGISTRE-SE */
.custom-register h1 {
  font-size: 2.5rem;
}

.custom-register p {
  font-size: 1.1rem;
  color: #696969;
  line-height: 1.2;
}

.custom-form-input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 10px;
}

.custom-form-input:focus {
  border: 1px solid #FF4E1B;
}

.custom-form-textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.custom-form-button {
  background-color: #FF4E1B;
  color: #fff;
  border: none;
  padding: 5px;
  font-size: 1.5rem;
  cursor: pointer;
  width: 100%;
}
</style>
