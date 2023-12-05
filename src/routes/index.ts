import { createRouter, createWebHistory } from "vue-router";
import MainPage from '../components/MainPage.vue'
import MovieList from "../components/MovieList.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MainPage
        },
        {
            path: '/movies',
            component: MovieList,
        },
    ]
})