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
        <img width="300" height="400" :src="poster" />
        <h3>{{ title }}</h3>
        <div class="movieItem--year">{{ year }}</div>
    </div>
</template>

<style scoped lang="scss">
.movieItem {
    &--year {
        margin: 0;
    }
}
</style>