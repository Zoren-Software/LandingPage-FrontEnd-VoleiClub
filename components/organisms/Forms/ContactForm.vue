<template>
  <va-form class="flex flex-col gap-6" ref="formRef">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
      <va-input
        v-model="form.name"
        :rules="[
          (value) => (value && value.length > 0) || 'Nome é obrigatório',
        ]"
        label="name"
      />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
      <va-input
        v-model="form.email"
        type="email"
        :rules="[
          (value) => (value && value.length > 0) || 'E-mail é obrigatório',
        ]"
        label="e-mail"
      />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
      <va-select
        v-model="form.option"
        label="Nível de Experiência"
        :options="options"
      />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
      <va-textarea v-model="form.message" label="Mensagem" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
      <va-button block @click="submit">Enviar</va-button>
    </div>
  </va-form>
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
