<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

    const props = defineProps<{
        modelValue: string
    }>()

    const emit = defineEmits(['update:modelValue'])
    const searchWord = ref(props.modelValue)
    const router = useRouter()

    function inputHandler() {
        emit('update:modelValue', searchWord.value)
        router.push({path: '/movies', query: {name: searchWord.value}})
    } 
</script>

<template>
    <form class="searchBar" @submit.prevent="inputHandler">
        <input class="searchBar--input" v-model="searchWord" autofocus/>
        <svg class="searchBarr--button" @click="inputHandler" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M21,3c-9.37891,0 -17,7.62109 -17,17c0,9.37891 7.62109,17 17,17c3.71094,0 7.14063,-1.19531 9.9375,-3.21875l13.15625,13.125l2.8125,-2.8125l-13,-13.03125c2.55469,-2.97656 4.09375,-6.83984 4.09375,-11.0625c0,-9.37891 -7.62109,-17 -17,-17zM21,5c8.29688,0 15,6.70313 15,15c0,8.29688 -6.70312,15 -15,15c-8.29687,0 -15,-6.70312 -15,-15c0,-8.29687 6.70313,-15 15,-15z"></path></g></g>
        </svg>
    </form>
</template>

<style scoped>

    .searchBar--input {
        width: 400px;
        height: 40px;
        font-size: 16px;
        padding: 0px 20px 0px 40px;
        border-radius: 40px;
        outline: none;
        border: solid gray 2px;
                        
        &:focus {
            outline: none;
        }
    }

    .searchBarr--button {
        width: 30px;
        height: 30px;
        align-self: center;
        margin-left: 10px;

        &:hover {
            cursor: pointer;
        }
    }

</style>