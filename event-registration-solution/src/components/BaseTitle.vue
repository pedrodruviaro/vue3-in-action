<script setup lang="ts">
import { computed } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  as: {
    type: String,
    required: false,
    default: 'h1'
  },
  size: {
    type: String,
    required: false,
    default: 'base'
  }
})

const textSizes = computed(() => {
  return {
    sm: 'text-base lg:text-lg',
    base: 'text-lg lg:text-xl',
    lg: 'text-xl lg:text-2xl'
  }
})
</script>

<template>
  <Component :is="as" class="font-bold" :class="[textSizes[size]]">
    {{ title }}
  </Component>
</template>
