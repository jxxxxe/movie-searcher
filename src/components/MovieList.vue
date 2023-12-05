<script setup lang="ts">
export interface Movie {
    Poster: string
    Title: string
    Year: number
    imdbID: string
}
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import MovieItem from './MovieItem.vue'
import MovieSearchBar from './MovieSearchBar.vue';


const route = useRoute()
let isLoading = ref(false)
let movies = ref([] as Movie[])
const searchWord = ref(route.query.name as string)


watch(searchWord, () => {
    request()
})

const request =  async () => {
        isLoading.value = true
        const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=${searchWord.value}`)
        const result = await res.json()
        movies.value = result.Search
        isLoading.value = false
    }

request()


</script>

<template>

<MovieSearchBar v-model="searchWord" />
<div class="movieList">
    <MovieItem v-if="!isLoading" v-for="movie in movies" :key="movie.imdbID" 
        :poster="movie.Poster"
        :title="movie.Title"
        :year="movie.Year"
        :imdbID="movie.imdbID" 
        />
</div>
</template>

<style scoped lang="scss">
.movieList {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}

</style>