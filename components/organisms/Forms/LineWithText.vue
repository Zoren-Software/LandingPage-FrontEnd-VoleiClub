<template>
  <div class="line-with-text">
    <hr class="line" />
    <span class="text">{{ titleText }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const titleText = ref('This is a title')

</script>

<style>
.line-with-text {
  display: flex; /* Usa flexbox para alinhar linha e texto */
  align-items: center; /* Centraliza verticalmente os filhos */
  justify-content: flex-end; /* Alinha os filhos à direita */
}

.line {
  border: 0;
  height: 2px;
  background: #c0c0c0;
  width: 20%; /* Ajuste conforme necessário */
  margin-right: 10px; /* Espaçamento entre a linha e o texto */
}

.text {
  color: #ff6347; /* Cor do texto */
  font-size: 18px; /* Tamanho do texto */
  white-space: nowrap; /* Evita que o texto quebre em várias linhas */
  font-weight: bold; /* Deixa o texto em negrito */
}
</style>
