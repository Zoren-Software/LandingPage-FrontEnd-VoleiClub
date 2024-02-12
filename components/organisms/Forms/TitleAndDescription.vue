<template>
  <h1 class="customer-section-title">TITULO</h1>
  <p class="customer-section-description">
    Lorem ipsum dolor sit amet consectetur. Adipiscing nisl id at arcu enim id gravida pulvinar. Tristique consectetur mi curabitur congue enim dignissim amet justo. Porta morbi nulla aliquet adipiscing. Sed diam mauris erat faucibus eu posuere ultricies quisque amet. Quam pellentesque in tristique 
    sed neque scelerisque quam pulvinar. Risus dictum elementum lacus urna. Neque eget sagittis vulputate nam id morbi id. Aliquam molestie posuere pulvinar arcu
  </p>
</template>

<script setup>
import { ref } from 'vue'

const titleText = ref('This is a title')

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
