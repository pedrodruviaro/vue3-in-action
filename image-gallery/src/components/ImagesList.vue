<script setup lang="ts">
import type { Image } from '@/types'

const props = defineProps<{
  imageList: Image[]
}>()

const emits = defineEmits<{
  (e: 'item-clicked', id: string): void
}>()
</script>

<template>
  <TransitionGroup name="list" tag="ul" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <li
      class="border border-slate-300 bg-slate-200 rounded-lg overflow-hidden shadow-sm"
      v-for="image in props.imageList"
      :key="image.id"
    >
      <div class="max-h-60 h-full overflow-hidden">
        <img :src="image.src" alt="" class="w-full h-full object-cover object-center" />
      </div>
      <div class="p-4 flex items-center gap-2">
        <p>Favorite:</p>
        <input
          type="checkbox"
          class="accent-slate-700"
          :checked="image.isFavorite"
          @change="emits('item-clicked', image.id)"
        />
      </div>
    </li>
  </TransitionGroup>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
