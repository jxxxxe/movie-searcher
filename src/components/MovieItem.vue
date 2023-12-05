<script setup lang="ts">

    defineProps<{
        poster: string,
        title: string,
        year: number,
        imdbID: string
    }>()

</script>

<template>
    <div class="movieItem">
        <img :src="poster" />
        <h3>{{ title }}</h3>
        <div>{{ year }}</div>
    </div>
</template>

<style scoped lang="scss">
</style>