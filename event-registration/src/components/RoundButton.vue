<script setup lang="ts">
const variants = {
  default: "border-gray-200 hover:bg-gray-100",
  danger: "bg-red-200 enabled:hover:bg-red-100 text-red-900",
}

defineProps({
  variant: {
    type: String,
    default: "default",
  },
})
</script>

<template>
  <button
    class="text-sm font-medium border rounded-full px-3 py-1 transition-all"
    :class="[variants[variant] ?? variants.default]"
  >
    <slot />
  </button>
</template>
