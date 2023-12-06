<script setup lang="ts">
import { ref } from 'vue';

const props=defineProps<{
    startPage: number
    totalCount: number;
    currentPage: number;
}>()

let pageStart = ref(props.startPage);
let pageEnd = ref(Math.min(Math.ceil(props.totalCount/10), props.startPage+9))

const emit = defineEmits(['click-page'])

function clickPage(page: number, startPage=page) {
    emit('click-page', page, startPage)
}

function range(start: number, end: number) {
    return Array(end - start + 1).fill(undefined).map((_, i) => start + i)
}

</script>

<template>
    <div class="pages">
        <span v-if="currentPage > 10" :class="`page page_prev`" @click="clickPage(pageStart-10)">
            {{ '<<' }}
        </span>
        <span v-for="i in range(pageStart, pageEnd)" :class="`page ${i === currentPage ? 'page-current' : ''}`" @click="clickPage(i, pageStart)">
            {{ i }}
        </span>
        <span v-if="pageEnd<Math.ceil(totalCount/10)" :class="`page page_next`" @click="clickPage(pageEnd+1)">
            >>
        </span>
    </div>
</template>

<style scoped lang="scss">
.pages {
    display: flex;
    justify-content: center;
    color: white;
    margin-top: 50px;
    margin-bottom: 21px;
    font-weight: 100;

    .page {
        margin: 10px;
        &:hover {
            cursor: pointer;
        }

        &-current {
            font-weight: 900;
        }
    }   
}

</style>