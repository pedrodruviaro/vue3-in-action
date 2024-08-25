<script setup lang="ts">
import BaseTitle from '@/components/BaseTitle.vue'
import BaseButton from '@/components/BaseButton.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['register'])
</script>

<template>
  <article class="bg-white rounded shadow-sm">
    <div class="border-b p-2.5">
      <BaseTitle :title="title" size="base" />
    </div>
    <div class="p-2.5 border-b">
      <p class="text-gray-500 font-semibold text-sm">{{ date }}</p>
    </div>
    <div class="p-2.5">
      <p class="mb-2.5">
        {{ description }}
      </p>

      <BaseButton
        text="Register"
        class="block ml-auto"
        @click="emits('register')"
        :loading="loading"
      />
    </div>
  </article>
</template>
