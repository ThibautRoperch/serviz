<template>
  <div>
    <ScaleLoader class="spinner" :size="'100px'" :color="'white'" />
  </div>
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

export default {
  components: {
    ScaleLoader
  }
}
</script>

<style scoped>
.spinner {
  transform: scale(2);
  opacity: 0.4;
}
</style>