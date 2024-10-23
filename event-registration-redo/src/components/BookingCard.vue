<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue'

defineProps<{
  title: string
  status: 'pending' | 'confirmed'
}>()

const emits = defineEmits<{
  cancel: []
}>()
</script>

<template>
  <BaseCard>
    <template #header>
      <p>{{ title }}</p>
      <p>Status: {{ status }}</p>

      <button @click="emits('cancel')">Cancel</button>
    </template>
  </BaseCard>
</template>
