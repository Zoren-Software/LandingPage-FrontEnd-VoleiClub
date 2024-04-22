<template>
  <div class="line-with-text pb-4">
    <hr>
    <span class="text">{{ titleText }}</span>
  </div>
</template>

<script>
export default {
  name: 'LineWithText',
  props: {
    titleText: {
      type: String,
      default: 'Título Padrão'
    }
  }
}
</script>

<style>
.text {
  color: #ff6347;
  font-size: 18px;
  white-space: nowrap;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.line-with-text {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 40%;
}

.line-with-text hr {
  flex-grow: 1;
  border: none;
  height: 2px;
  background-color: #D8D8D8;
  margin: 0;
}
</style>
