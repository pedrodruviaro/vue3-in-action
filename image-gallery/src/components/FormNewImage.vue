<script setup lang="ts">
const photoUrl = defineModel<string>('photoUrl')

const emits = defineEmits<{
  (e: 'add-new-photo'): void
}>()
</script>

<template>
  <div>
    <form class="flex items-center gap-2" @submit.prevent="emits('add-new-photo')">
      <input
        type="text"
        placeholder="Enter URL here"
        class="border rounded-lg px-4 py-2"
        v-model="photoUrl"
      />
      <button type="submit" class="border rounded-lg py-2 px-6 bg-slate-200">Add</button>
    </form>
  </div>
</template>
