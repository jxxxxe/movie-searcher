<script setup lang="ts">
import { reactive, ref } from 'vue'
import movieInfoType from '../../types/movieInfoType'
import LoadingScene from '../LoadingScene.vue'
import MovieInfoModalInfoItem from './MovieInfoModalInfoItem.vue'

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
          <MovieInfoModalInfoItem
            container-class="movie-info--description--released"
            item-class="movie-info--description--item"
            itemValue="개봉"
            :children="result.Released" />
          <MovieInfoModalInfoItem
            container-class="movie-info--description--Runtime"
            item-class="movie-info--description--item"
            itemValue="러닝타임"
            :children="result.Runtime" />
          <MovieInfoModalInfoItem
            container-class="movie-info--description--Genre"
            item-class="movie-info--description--item"
            itemValue="장르"
            :children="result.Genre" />
          <MovieInfoModalInfoItem
            container-class="movie-info--description--Country"
            item-class="movie-info--description--item"
            itemValue="국가"
            :children="result.Country" />
          <MovieInfoModalInfoItem
            container-class="movie-info--description--BoxOffice"
            item-class="movie-info--description--item"
            itemValue="박스오피스"
            :children="result.BoxOffice" />
          <MovieInfoModalInfoItem
            container-class="movie-info--description--Awards"
            item-class="movie-info--description--item"
            itemValue="수상"
            :children="result.Awards" />
        </div>
        <div class="movie-info--presentation">
          <h2 class="movie-info--Item">출연/제작</h2>
          <MovieInfoModalInfoItem
            container-class="movie-info--description--Director"
            item-class="movie-info--description--item"
            itemValue="감독"
            :children="result.Director" />
          <MovieInfoModalInfoItem
            container-class="movie-info--description--Writer"
            item-class="movie-info--description--item"
            itemValue="작가"
            :children="result.Writer" />
          <MovieInfoModalInfoItem
            container-class="movie-info--description--Actors"
            item-class="movie-info--description--item"
            itemValue="배우"
            :children="result.Actors" />
        </div>
      </div>
    </div>
    <div class="movie-info--Plot">
      <h2 class="movie-info--Item">줄거리</h2>
      {{ result.Plot }}
    </div>
  </div>
</template>

<style lang="scss">
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

  &-header {
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

  &--Item {
    margin: 5px 0;
    padding: 5px;
    padding-left: 0;
    background-color: rgba(255, 255, 255, 0.1);
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
