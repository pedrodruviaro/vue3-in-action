<script setup lang="ts">
import SectionedCard from "@/components/SectionedCard.vue"
</script>

<template>
  <SectionedCard class="animate-pulse">
    <div class="flex flex-wrap justify-between gap-4 items-center">
      <div class="flex space-x-4 flex-1">
        <div class="h-4 bg-gray-300 w-1/3 rounded-sm"></div>
        <div class="h-4 bg-gray-300 w-24 rounded-sm"></div>
      </div>
      <div class="h-6 w-16 bg-gray-300 rounded-full"></div>
    </div>
  </SectionedCard>
</template>
