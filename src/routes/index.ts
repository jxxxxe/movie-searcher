import { createRouter, createWebHistory } from 'vue-router'
import MovieListPage from './MovieListPage.vue'
import MainPage from './MainPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainPage
    },
    {
      path: '/movies',
      component: MovieListPage
    }
  ]
})
