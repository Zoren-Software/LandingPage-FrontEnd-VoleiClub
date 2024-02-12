<template>
    <div class="row custom-solutions" style="background-color: #131B23;">
    <div class="flex flex-col w-full">
      <LineWithText/>
      <TitleAndDescription/> 
      <div class="row py-5">
        <div class="flex flex-col md6">
          <CardSolution/>
        </div>
        <div class="flex flex-col md6">
          <CardSolution/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LineWithText from "~/components/organisms/Forms/LineWithText.vue";
import TitleAndDescription from "~/components/organisms/Forms/TitleAndDescription.vue";
import CardSolution from "~/components/organisms/Forms/CardSolution.vue";

const titleText = ref('This is a title')

</script>

<style>
.custom-solutions {
  padding: 3% 15%;
  color: #fff;
}

</style>
