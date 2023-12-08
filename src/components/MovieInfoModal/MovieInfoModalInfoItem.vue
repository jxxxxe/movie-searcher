<script setup lang="ts">
defineProps<{
  containerClass: string
  itemClass: string
  itemValue: string
  children?: string
}>()
</script>

<template>
  <div :class="containerClass">
    <span :class="itemClass">{{ itemValue }} </span>
    {{ children }}
  </div>
</template>
