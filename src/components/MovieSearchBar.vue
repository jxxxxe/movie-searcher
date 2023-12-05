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
        <input v-model="searchWord"/>
        <button>검색</button>
    </form>
</template>