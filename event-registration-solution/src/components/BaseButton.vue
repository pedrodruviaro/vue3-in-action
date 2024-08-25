<script setup lang="ts">
import { computed } from 'vue'

defineProps({
  variant: {
    type: String,
    required: false,
    default: 'regular'
  },
  text: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    required: false,
    default: false
  }
})

const buttonVariantsStyle = computed(() => {
  return {
    regular: '',
    danger: 'bg-red-200 text-red-800 border-red-300'
  }
})
</script>

<template>
  <button
    :class="{ [buttonVariantsStyle[variant]]: true, 'opacity-50 cursor-not-allowed': loading }"
    class="rounded-full border text-sm px-3 py-1 hover:brightness-90 focus:brightness-90 font-semibold transition-all"
  >
    {{ text }}
  </button>
</template>
