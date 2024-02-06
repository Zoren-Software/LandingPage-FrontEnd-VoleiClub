<template>
  <div class="row items-center custom-banner">
    <div class="flex flex-col w-full custom-banner-text">
      <div class="item">
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
        <hr class="mb-3">
        <p class="mb-3">Lorem ipsum dolor sit amet consectetur. Aliquam quisque cursus proin adipiscing quis diam. Eu fringilla elit commodo nec aliquet. Augue pharetra nibh co</p>
        <VaButton class="px-4 custom-banner-button">
          Entre na lista de espera
        </VaButton>
      </div>
    </div>
  </div>
  <!-- SOBRE -->
  <div class="row custom-about">
    <div class="flex flex-col md6">
      <div class="">
        <va-image src="/images/image_heart_2.svg" fit="contain" lazy />
      </div>
    </div>
    <div class="flex flex-col md6">
      <div class="item">
        <span>Sobre</span>
        <h1>TITULO</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Adipiscing nisl id at arcu enim id gravida pulvinar. Tristique consectetur mi curabitur congue enim dignissim amet justo. Porta morbi nulla aliquet adipiscing. Sed diam mauris erat faucibus eu posuere ultricies quisque amet. Quam pellentesque in tristique 
          sed neque scelerisque quam pulvinar. Risus dictum elementum lacus urna. Neque eget sagittis vulputate nam id morbi id. Aliquam molestie posuere pulvinar arcu
        </p>
      </div>
    </div>
  </div>
  <!-- SOLUÇÕES -->
  <div class="row custom-solutions" style="background-color: #131B23;">
    <div class="flex flex-col w-full">
      <span>Soluções</span>
      <h1>Gestão de Times de Vôlei</h1>
      <span>Descubra a liberdade de gerenciar seu time de vôlei com eficiência e facilidade. O VolleyTrack é a solução definitiva para treinadores, jogadores e organizadores que desejam elevar o nível de suas equipes. Com nossa plataforma intuitiva, você pode organizar jogos, treinos e gerenciar seu elenco com apenas alguns cliques.
      </span>
      <div class="row py-4">
        <div class="flex flex-col md6">
          <div class="custom-card">
            <VaCard>
              <VaCardTitle>Agendamento Inteligente</VaCardTitle>
              <VaCardContent>
                Com nosso sistema de calendário avançado, planejar jogos e treinos nunca foi tão fácil. Defina os fundamentos específicos para cada sessão, detalhe o foco técnico e faça anotações personalizadas para garantir que cada treino seja produtivo e alinhado com os objetivos da equipe.
              </VaCardContent>
            </VaCard>
          </div>
        </div>
        <div class="flex flex-col md6">
          <div class="custom-card">
            <VaCard>
              <VaCardTitle>Gerenciamento Completo de Equipes</VaCardTitle>
              <VaCardContent>
                Centralize as informações dos jogadores, incluindo estatísticas, frequência e progresso individual. Nosso sistema permite um controle detalhado da presença e do desempenho, além de oferecer um espaço para anotações e observações críticas que auxiliam no desenvolvimento contínuo dos atletas.
              </VaCardContent>
            </VaCard>
          </div>
        </div>
      </div>
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

/* REGISTRE-SE */
.custom-about {
  padding: 7% 15%;
}

.custom-about h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
}

.custom-about p {
  font-size: 1.0rem;
}

/* SOLUÇÕES */
.custom-solutions {
  padding: 3% 15%;
  color: #fff;
}

.custom-solutions h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
}

.custom-card {
  padding: 0 20px 0 0;
}

</style>
