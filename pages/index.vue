<template>
  <div class="row items-center custom-banner">
    <div class="flex flex-col w-full custom-banner-text">
      <div class="item">
        <h1>Revolução na Gestão de Times de Vôlei</h1>
        <hr class="mb-3">
        <p class="mb-3">
          Descubra a liberdade de gerenciar seu time de vôlei com eficiência e facilidade. 
          O VolleyTrack é a solução definitiva para treinadores, jogadores e organizadores que desejam elevar o nível de suas equipes.
        </p>
        <VaButton class="px-4 custom-banner-button">
          Entre na lista de espera
        </VaButton>
      </div>
    </div>
  </div>
  <AboutSection/>
  <SolutionSection/>
  <RegisterSection/>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useColors } from "vuestic-ui";
import { ref } from "vue";
import ContactForm from "~/components/organisms/Forms/ContactForm.vue";
import CardSolution from "~/components/organisms/Forms/CardSolution.vue";
import AboutSection from "~/components/organisms/Forms/AboutSection.vue";
import SolutionSection from "~/components/organisms/Forms/SolutionSection.vue";
import RegisterSection from "~/components/organisms/Forms/RegisterSection.vue";


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

.custom-banner {
  background-image: linear-gradient(#131b23e0, #131b23e0), url('images/background-volei.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  color: #fff;
  padding: 0% 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
}

.custom-banner .item p{
  line-height: 30px;
}

.custom-banner-text {
  text-align: center;
}

.custom-banner hr {
  width: 50%;
  height: 3px;
  background-color: #FF4E1B;
  border: none;
}

.custom-banner h1 {
  font-size: 3.5rem;
  margin-bottom: 20px
}

.custom-banner p {
  font-size: 1.5rem;
}

.custom-banner-button {
  background-color: #FF4E1B;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1.5rem;
  margin-top: 20px;
  cursor: pointer;
}

</style>