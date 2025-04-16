<template>
  <div class="custom-card">
    <VaCard>
      <div class="flex flex-col items-center justify-center md6"> <!-- Centralizar conteúdo -->
          <va-image class="custom-img-card custom-img-size" :src="imageCard" fit="contain"/>
      </div>
      <VaCardTitle class="custom-card-title">{{ title }}</VaCardTitle>
      <VaCardContent class="custom-card-content">
        {{ description }}
      </VaCardContent>
    </VaCard>
  </div>
</template>

<script>
import { VaImage } from 'vuestic-ui/web-components';

export default {
  name: 'CardSolution',
  props: {
    imageCard: {
      type: String,
      default: '/images/about.svg'
    },
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
.custom-card {
  padding: 0 20px 0 0;
  text-align: center
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
</style>
