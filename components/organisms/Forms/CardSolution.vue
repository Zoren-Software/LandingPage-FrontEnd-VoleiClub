<template>
  <div class="custom-card">
    <VaCard>
      <VaCardTitle class="custom-card-title">Agendamento Inteligente</VaCardTitle>
      <VaCardContent class="custom-card-content">
        Com nosso sistema de calendário avançado, planejar jogos e treinos nunca foi tão fácil. Defina os fundamentos específicos para cada sessão, detalhe o foco técnico e faça anotações personalizadas para garantir que cada treino seja produtivo e alinhado com os objetivos da equipe.
      </VaCardContent>
    </VaCard>
  </div>
</template>

<script setup>

</script>

<style>
.custom-card {
  padding: 0 20px 0 0;
}

.custom-card .va-card {
  background-color: var(--va-0-stripe-color-computed);
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
}

.custom-card .va-card-title {
  font-size: 24px;
  text-align: center;
  display: block;
  text-transform: capitalize; 
}

.custom-card-content {
  font-size: 18px;
  color: #696969;
  line-height: 1.2;
}

.custom-circle {
  width: 100px;
  height: 100px;
  background-color: orange;
  border-radius: 50%;
}
</style>
