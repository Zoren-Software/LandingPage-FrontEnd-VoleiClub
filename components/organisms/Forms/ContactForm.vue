<template>
  <div class="flex justify-end pa-3">
    <div class="row">
      <div class="flex flex-col md7 sm12 xs12">
        <div class="pa-3 w-1/2">
          <h1 class="va-h1 va-text-center font-bold mt-5">
            Seja bem-vindo ao VoleiClub!
          </h1>
          <p class="text-apresentation">
            Estamos felizes em ter você aqui! O VoleiClub não quer ser uma
            simples plataforma e sim uma comunidade dedicada a transformar a
            forma como organizamos e gerenciamos treinos e times de voleibol.
          </p>
          <va-image src="/images/image_heart_2.svg" fit="contain" lazy />

          <h2 class="va-h2 va-text-center font-semibold mt-5 mb-5">
            Por que se registrar agora?
          </h2>
          <div class="row">
            <div class="flex flex-col md12 sm12 lg12 xl4">
              <div class="pa-3 w-1/2">
                <va-card :bordered="false">
                  <va-image src="/images/image_access.svg" fit="contain" lazy />
                  <va-card-content class="card-content-antecipado">
                    <h6 class="va-h6">Acesso Antecipado</h6>
                    Esteja entre os primeiros a experimentar as funcionalidades
                    da nossa versão alpha.
                  </va-card-content>
                </va-card>
              </div>
            </div>
            <div class="flex flex-col md12 sm12 lg6 xl4">
              <div class="pa-3 w-1/2">
                <va-card :bordered="false">
                  <va-image src="/images/image_price.svg" fit="contain" lazy />
                  <va-card-content class="card-content-exclusivo">
                    <h6 class="va-h6">Descontos Exclusivos</h6>
                    Os usuários que nos ajudarem na fase inicial serão
                    recompensados com descontos nas mensalidades futuras.
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
                    <h6 class="va-h6">Tenha Sua Voz Ouvida</h6>
                    Utilize o nosso canal de feedback para sugerir melhorias e
                    novas funcionalidades.
                  </va-card-content>
                </va-card>
              </div>
            </div>
          </div>

          <h2 class="va-h2 va-text-center font-semibold mt-5 mb-5">
            Segurança e Desenvolvimento
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
                    <h6 class="va-h6">Segurança</h6>
                    Seus dados estão seguros conosco. Seguimos todas as
                    diretrizes da LGPD e sua privacidade é nossa prioridade
                    máxima.
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
                    <h6 class="va-h6">Desenvolvimento</h6>
                    Nossa equipe de desenvolvedores está constantemente
                    trabalhando para manter o sistema seguro e livre de
                    vulnerabilidades.
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
            Pronto para entrar na jogada?
          </h2>
          <va-card class="pa-5">
            <h2 class="va-h2 va-text-center">Registrar</h2>
            <div class="row mb-2">
              <div class="flex flex-col md12 sm12 xs12">
                <div class="item">
                  <va-input
                    name="name"
                    class="display-block"
                    placeholder="Digite seu nome"
                    stateful
                    v-model="form.name"
                    :rules="[
                      (value) =>
                        (value && value.length > 0) || 'Nome é obrigatório',
                    ]"
                    label="name"
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
                    placeholder="Digite seu e-mail"
                    v-model="form.email"
                    type="email"
                    :rules="[
                      (value) =>
                        (value && value.length > 0) || 'E-mail é obrigatório',
                    ]"
                    label="e-mail"
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
                    v-model="form.option"
                    label="Nível de Experiência"
                    placeholder="Selecione uma opção"
                    :options="options"
                    :rules="[
                      (value) =>
                        (value.value && value.value.length > 0) ||
                        'Nível de Experiência é obrigatório',
                    ]"
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
                    label="Mensagem"
                    placeholder="(opcional) Deixe sua mensagem aqui!"
                  />
                </div>
              </div>
            </div>
            <div class="row mb-2 mt-2">
              <div class="flex flex-col md12 sm12 xs12">
                <div class="item">
                  <va-button block @click="submit">Enviar</va-button>
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

const { $customFetch } = useNuxtApp();
const data = ref(null);

const form = ref({
  name: "",
  email: "",
  option: "",
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

const submit = () => {
  console.log("submit");
  try {
    // TODO - Fazer o post na API
    data.value = $customFetch("/leads", "POST", form.value)
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((erro) => {
        console.error("Erro ao buscar dadosss:", erro);
      });
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
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
