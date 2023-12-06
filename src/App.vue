<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <div class="home-title">
    <h1 @click="router.push('/')">🎬 Movie Searcher! 🌮</h1>
  </div>
  <RouterView />
</template>

<style scoped lang="scss">
.home-title {
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      color: white;
      &:hover {
        cursor: pointer;
      }
    }
}

</style>