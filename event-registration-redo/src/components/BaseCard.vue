<script setup lang="ts"></script>

<template>
  <div class="bg-stone-100 rounded shadow">
    <div class="border-b border-stone-300 p-4" v-if="$slots.header">
      <slot name="header" />
    </div>

    <div class="border-b border-stone-300 p-4" v-if="$slots.default">
      <slot name="default" />
    </div>

    <div class="p-4" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>
