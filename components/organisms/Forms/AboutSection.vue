<template>
  <div class="row custom-about">
    <div class="flex flex-col md6">
      <div class="about-image-container">
        <va-image src="/images/about.svg" fit="contain" lazy />
      </div>
    </div>
    <div class="flex flex-col md6">
      <div class="item">
        <LineWithText/>
        <TitleAndDescription/> 
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
  padding: 9% 15%;
}
</style>
