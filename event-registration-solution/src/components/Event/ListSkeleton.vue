<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    required: true
  },
  amount: {
    type: Number,
    required: false,
    default: 4
  }
})
</script>

<template>
  <div v-if="loading" class="grid md:grid-cols-2 gap-6">
    <div
      v-for="i in amount"
      :key="i"
      class="animate-pulse bg-white min-h-[200px] rounded shadow-sm"
    ></div>
  </div>

  <template v-else>
    <slot />
  </template>
</template>
