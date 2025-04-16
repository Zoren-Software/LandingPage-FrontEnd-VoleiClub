<template>
  <h1 class="customer-section-title">{{ title }}</h1>
  <p class="customer-section-description">
    {{ description }}
  </p>
</template>

<script>
export default {
  name: 'LineWithText',
  props: {
    title: {
      type: String,
      default: 'Título Padrão'
    },
    description: {
      type: String,
      default: 'Descrição Padrão'
    }
  }
}
</script>

<style>
.customer-section-description {
  color: #696969;
  font-size: 20px;
  line-height: 1.5; /* Espaçamento entre linhas */
}

.customer-section-title {
  font-size: 3.5rem;
}
</style>
