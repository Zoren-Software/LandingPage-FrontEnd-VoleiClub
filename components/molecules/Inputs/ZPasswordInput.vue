<template>
  <div>
    <ZInput
      v-model="password"
      v-bind="$attrs"
      :id="id + '-password'"
      :type="isPasswordVisible ? 'text' : 'password'"
      :label="passwordLabel"
      :rules="passwordRules"
      @input="validatePassword"
      immediate-validation
      :error-messages="errorMessages"
    >
      <template #appendInner>
        <va-icon
          :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
          size="small"
          color="primary"
          @click="isPasswordVisible = !isPasswordVisible"
        />
      </template>
    </ZInput>
  </div>
</template>

<script>
import ZInput from "~/components/atoms/Inputs/ZInput";

export default {
  components: {
    ZInput,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    passwordLabel: {
      type: String,
      default: "Senha",
    },
    passwordMessages: {
      type: Array,
      default: () => [],
    },
    confirmPasswordLabel: {
      type: String,
      default: "Confirmar Senha",
    },
    confirmPasswordInput: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
    rules: {
      type: Array,
      default: () => [
        (value) => (value && value.length > 0) || "Este campo é obrigatório",
      ],
    },
  },
  data: () => ({
    isPasswordVisible: false,
    password: "",
    confirmPassword: "",
  }),
  computed: {
    passwordRules() {
      return [
        ...this.rules,
        (value) =>
          this.confirmPassword === "" ||
          value === this.confirmPassword ||
          "As senhas não coincidem",
      ];
    },
    confirmPasswordRules() {
      return [
        ...this.rules,
        (value) =>
          this.password === "" ||
          value === this.password ||
          "As senhas não coincidem",
      ];
    },
  },
  methods: {
    validatePassword() {
      if (this.password !== this.confirmPassword) {
        console.error("As senhas não coincidem");
      } else {
        this.$emit("update:modelValue", this.password);
      }
    },
  },
};
</script>
