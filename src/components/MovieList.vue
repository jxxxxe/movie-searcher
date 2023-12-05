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
import MovieInfoModal from './MovieInfoModal.vue';

const route = useRoute()
let isLoading = ref(false)
let movies = ref([] as Movie[])
const searchWord = ref(route.query.name as string)
let isDetailShwon = ref(false)
let currentMovieId = ref('')

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

const showDetail = (movieID:string) => {
    currentMovieId.value = movieID; 
    isDetailShwon.value=true
}

const closeDetail = () => {
    isDetailShwon.value=false
}
</script>

<template>
<div class="movieDetailInfo" v-if="isDetailShwon" @click="closeDetail">
    <MovieInfoModal class="movieDetailInfo--modal" :imdbID="currentMovieId" @click.stop="" @close-modal="closeDetail"/>
</div>
<MovieSearchBar v-model="searchWord" />
<div class="movieList">
    <MovieItem v-if="!isLoading" v-for="movie in movies" :key="movie.imdbID" 
        :poster="movie.Poster"
        :title="movie.Title"
        :year="movie.Year"
        :imdbID="movie.imdbID" 
        @click="showDetail(movie.imdbID)"
    />
</div>
</template>

<style scoped lang="scss">
.movieList {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}
.movieDetailInfo {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);

    &--modal {
        background-color:  black;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 550px;
        border-radius: 10px;
        padding: 20px;
        box-sizing: border-box;
    }
}
</style>