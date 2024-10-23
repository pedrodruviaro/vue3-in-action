<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue'

defineProps<{
  title: string
  date: string
  description: string
}>()

const emits = defineEmits<{
  register: []
}>()
</script>

<template>
  <BaseCard>
    <template #header>
      <h2>{{ title }}</h2>
    </template>
    <template #default>
      <p>{{ date }}</p>
    </template>
    <template #footer>
      <p>
        {{ description }}
      </p>
      <button @click="emits('register')">Join!</button>
    </template>
  </BaseCard>
</template>
