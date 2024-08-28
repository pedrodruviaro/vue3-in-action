<script setup lang="ts">
import type { Tab } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
  currentTab: string
  tab: Tab
}>()

const emit = defineEmits<{
  click: []
}>()

const isActive = computed(() => {
  return props.currentTab === props.tab.key
})
</script>

<template>
  <button
    class="p-4 border-b-2 transition-all"
    :class="{ 'border-transparent': !isActive, 'border-b-blue-600 text-blue-600': isActive }"
    @click="emit('click')"
  >
    {{ props.tab.label }}
  </button>
</template>
