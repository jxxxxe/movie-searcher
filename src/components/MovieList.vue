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
import MoviePagination from './MoviePagination.vue';

const route = useRoute()
let isLoading = ref(false)
let movies = ref([] as Movie[])
const searchWord = ref(route.query.name as string)
let isDetailShwon = ref(false)
let currentMovieId = ref('')

let totalCount = ref(0)
let currentPage = ref(1)
let startPage = ref(1)

watch(searchWord, () => {
    request()
})

async function request(page=1, start=1){
    isLoading.value = true

    const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=${searchWord.value}&page=${page}`)
    const result = await res.json()

    movies.value = result.Search

    totalCount.value = result.totalResults
    currentPage.value = page
    startPage.value = start

    isLoading.value = false
}

request()

function showDetail(movieID:string) {
    currentMovieId.value = movieID; 
    isDetailShwon.value=true
}

function closeDetail() {
    isDetailShwon.value=false
}

</script>

<template>
<div class="modal-background" v-if="isDetailShwon" @click="closeDetail">
    <MovieInfoModal :imdbID="currentMovieId" @click.stop="" @close-modal="closeDetail"/>
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
<MoviePagination v-if="!isLoading" 
    :startPage="startPage" 
    :totalCount="totalCount" 
    :currentPage="currentPage" 
    @click-page="request"/>
</template>

<style scoped lang="scss">
.movieList {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
}
.modal-background {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
}
</style>