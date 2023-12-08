<script setup lang="ts">
import { reactive, ref } from 'vue'
import movieInfoType from '../types/movieInfoType.ts'
import LoadingScene from './LoadingScene.vue'

const props = defineProps<{
  imdbID: string
}>()

let isLoading = ref(false)
let result: movieInfoType = reactive({})
const { VITE_API_KEY } = import.meta.env

;(async () => {
  isLoading.value = true
  const res = await fetch(
    `https://omdbapi.com?apikey=${VITE_API_KEY}&i=${props.imdbID}&plot=full`
  )
  result = await res.json()

  isLoading.value = false
})()
</script>

<template>
  <LoadingScene v-show="isLoading" />
  <div
    class="movie-modal"
    v-if="!isLoading"
    @click.stop>
    <div class="movie-modal-header">
      <button
        class="movie-modal-header-button"
        @click="$emit('close-modal')">
        X
      </button>
    </div>
    <h1>{{ result.Title }}</h1>
    <div class="movie-info">
      <img
        class="movie-info--poster"
        :src="result.Poster" />
      <div class="movie-info-right">
        <div class="movie-info--description">
          <h2 class="movie-info--Item">영화 정보</h2>
          <div class="movie-info--description--released">
            <span class="movie-info--description--item">개봉 </span>
            {{ result.Released }}
          </div>
          <div class="movie-info--description--Runtime">
            <span class="movie-info--description--item">러닝타임 </span>
            {{ result.Runtime }}
          </div>
          <div class="movie-info--description--Genre">
            <span class="movie-info--description--item">장르 </span>
            {{ result.Genre }}
          </div>
          <div class="movie-info--description--Country">
            <span class="movie-info--description--item">국가 </span>
            {{ result.Country }}
          </div>
          <div class="movie-info--description--BoxOffice">
            <span class="movie-info--description--item">박스오피스 </span>
            {{ result.BoxOffice }}
          </div>
          <div class="movie-info--description--Awards">
            <span class="movie-info--description--item">수상 </span>
            {{ result.Awards }}
          </div>
        </div>
        <div class="movie-info--presentation">
          <h2 class="movie-info--Item">출연/제작</h2>
          <div class="movie-info--description--Director">
            <span class="movie-info--description--item">감독 </span>
            {{ result.Director }}
          </div>
          <div class="movie-info--description--Writer">
            <span class="movie-info--description--item">작가 </span>
            {{ result.Writer }}
          </div>
          <div class="movie-info--description--Actors">
            <span class="movie-info--description--item">배우 </span>
            {{ result.Actors }}
          </div>
        </div>
      </div>
    </div>
    <div class="movie-info--Plot">
      <h2 class="movie-info--Item">줄거리</h2>
      {{ result.Plot }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.movie-modal {
  h1 {
    color: white;
  }

  background-color: black;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  height: 700px;
  border-radius: 10px;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: scroll;
  border: gray solid 1px;
}
.movie-modal-header {
  display: flex;
  justify-content: end;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: black;
  height: 50px;

  &-button {
    height: 30px;
    border: none;
    background-color: transparent;
    color: white;
    font-size: 20px;

    &:hover {
      cursor: pointer;
    }
  }
}

.movie-info--Item {
  margin: 5px 0;
  padding: 5px;
  padding-left: 0;
  background-color: rgba(255, 255, 255, 0.1);
}

.movie-info {
  display: flex;
  gap: 20px;
  color: white;

  &--poster {
    width: 250px;
    height: 300px;
    align-self: center;
  }

  &--description {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;

    &--item {
      font-weight: bold;
    }
  }

  &--presentation {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 5px;
  }

  &--Plot {
    margin: 20px 0;
    color: white;
    margin-bottom: 50px;
  }
}
</style>
