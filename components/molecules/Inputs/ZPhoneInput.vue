<template>
  <ZInput
    :model-value="displayedValue"
    name="phone"
    :label="label"
    :placeholder="placeholder"
    id="phone"
    class="mb-3"
    type="tel"
    inputmode="tel"
    autocomplete="tel"
    maxlength="22"
    @update:model-value="onInput"
  />
</template>

<script>
import ZInput from "~/components/atoms/Inputs/ZInput";
import {
  DEFAULT_WHATSAPP_PHONE,
  formatWhatsappPhoneMask,
} from "~/utils/formatting/phoneMask";

export default {
  components: {
    ZInput,
  },
  props: {
    modelValue: {
      type: String,
      default: DEFAULT_WHATSAPP_PHONE,
    },
    label: {
      type: String,
      default: "WhatsApp",
    },
    placeholder: {
      type: String,
      default: "+55 (47) 9xxxx-xxxx",
    },
  },
  computed: {
    displayedValue() {
      return formatWhatsappPhoneMask(this.modelValue || DEFAULT_WHATSAPP_PHONE);
    },
  },
  methods: {
    onInput(value) {
      this.$emit("update:modelValue", formatWhatsappPhoneMask(value ?? ""));
    },
  },
};
</script>
