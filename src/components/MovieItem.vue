<script setup lang="ts">
defineProps<{
  poster: string
  title: string
  year: number
  imdbID: string
}>()
</script>

<template>
  <div class="movie-item">
    <img
      width="250"
      height="300"
      :src="poster" />
    <h3>{{ title }}</h3>
    <div class="movieItem--year">{{ year }}</div>
  </div>
</template>

<style scoped lang="scss">
.movie-item {
  h3 {
    margin: 5px 0;
  }
  color: white;
  &:hover {
    cursor: pointer;
  }
}
</style>
