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
        <va-image src="/images/about.svg" fit="contain" lazy />
      </div>
    </div>
    <div class="flex flex-col md6">
      <div class="item">
        <LineWithText/>
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
          <CardSolution/>
        </div>
        <div class="flex flex-col md6">
          <CardSolution/>
        </div>
      </div>
    </div>
  </div>
  <!-- REGISTRE-SE -->
  <div class="row custom-register">
    <div class="flex flex-col md6">
      <h1>Pronto para entrar na jogada?</h1>
      <p class="pt-1 pb-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit nam et assumenda quas animi iusto reiciendis ut rerum alias a inventore dolorem voluptas commodi quasi, itaque ea quisquam, architecto deserunt!</p>
      
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
    <div class="flex flex-col md6">2</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useColors } from "vuestic-ui";
import { ref } from "vue";
import ContactForm from "~/components/organisms/Forms/ContactForm.vue";
import LineWithText from "~/components/organisms/Forms/LineWithText.vue";
import CardSolution from "~/components/organisms/Forms/CardSolution.vue";


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

/* SOBRE*/
.custom-about {
  padding: 7% 15%;
}

.custom-register {
  padding: 7% 15%;
}

.custom-about h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
}

.custom-about p {
  font-size: 1.0rem;
}

/* SOLUÇÃO */
.custom-solutions {
  padding: 3% 15%;
  color: #fff;
}

.custom-solutions h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
}

/* REGISTRE-SE */
.custom-register h1 {
  font-size: 2.5rem;
}

.custom-register p {
  font-size: 1.0rem;
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