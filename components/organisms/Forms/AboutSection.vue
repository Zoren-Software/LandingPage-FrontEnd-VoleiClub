<template>
  <div class="row custom-about">
    <div class="flex flex-col md6">
      <div class="about-image-container">
        <va-image src="/images/about.svg" fit="contain" lazy />
      </div>
    </div>
    <div class="flex flex-col md6">
      <div class="item">
        <LineWithText titleText="Sobre"/>
        <TitleAndDescription
          title="Quem Somos"
          description="O VolleyTrack é um projeto desenvolvido com paixão e inovação no Brasil. Somos comprometidos com a excelência em software e acreditamos no poder do open source para criar soluções robustas e confiáveis. Nosso sistema é uma plataforma aberta que convida desenvolvedores a colaborar e inovar no mundo do voleibol."
        /> 
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LineWithText from "~/components/organisms/Forms/LineWithText.vue";
import TitleAndDescription from "~/components/organisms/Forms/TitleAndDescription.vue";

const titleText = ref('This is a title')

</script>

<style>
.custom-about {
  padding: 8% 15%;
}
</style>
