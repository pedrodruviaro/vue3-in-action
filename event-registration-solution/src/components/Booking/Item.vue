<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['cancel'])
</script>

<template>
  <li class="rounded shadow-sm p-2.5 bg-white flex items-center flex-wrap justify-between">
    <div class="flex items-center gap-2 flex-1 flex-wrap">
      <p>{{ title }}</p>
      {{ '-' }}
      <span>Status: </span>

      <i class="pi pi-spin pi-spinner" v-if="loading"></i>
      <i class="pi pi-check" style="color: #00ff00" v-else></i>
    </div>

    <BaseButton variant="danger" text="Cancel" @click="emits('cancel')" :loading="loading" />
  </li>
</template>
