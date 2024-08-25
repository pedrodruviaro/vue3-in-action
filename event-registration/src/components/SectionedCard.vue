<script setup lang="ts">
import RoundCard from "@/components/RoundCard.vue"
</script>

<template>
  <RoundCard>
    <h3
      class="p-4 border-b border-gray-200 font-medium text-xl"
      v-if="$slots.header"
    >
      <slot name="header"></slot>
    </h3>
    <div
      class="p-4"
      :class="{ 'border-b border-gray-200': $slots.footer }"
      v-if="$slots.default"
    >
      <slot></slot>
    </div>

    <div class="p-4" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </RoundCard>
</template>
