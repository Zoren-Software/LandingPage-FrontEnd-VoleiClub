<template>
  <div class="flex justify-end pa-3">
    <div class="row">
      <div class="flex flex-col md7 offset-md1 sm12 xs12">
        <div class="pa-3 w-1/2">
          <h1 class="va-h1 va-text-center font-bold">
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
        <h2 class="va-h2 va-text-center font-semibold mt-4">
          Pronto para entrar na jogada?
        </h2>
        <va-card class="pa-5">
          <h2 class="va-h2 va-text-center">Registrar</h2>
          <div class="row mb-2">
            <div class="flex flex-col md12 sm12 xs12">
              <div class="item">
                <va-input
                  class="display-block"
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
                  class="display-block"
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
                  class="display-block"
                  v-model="form.option"
                  label="Nível de Experiência"
                  :options="options"
                />
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="flex flex-col md12 sm12 xs12">
              <div class="item">
                <va-textarea
                  class="display-block"
                  v-model="form.message"
                  label="Mensagem"
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
      </va-form>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
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
      formRef.value.validate().then((success) => {
        if (success) {
          console.log("Form is valid");
        } else {
          console.log("Form is not valid");
        }
      });
    };

    return {
      form,
      formRef,
      submit,
      options,
    };
  },
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
</style>