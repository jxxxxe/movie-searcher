<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <h1 class="home-icon" @click="router.push('/')">뀨!!!</h1>
  <RouterView />
</template>

<style scoped lang="scss">
.home-icon, body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

</style>