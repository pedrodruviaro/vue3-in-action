<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeId = computed(() => route.params.id);

const recipeStore = useRecipeStore();

const recipe = computed(() => {
  return recipeStore.getRecipeById(routeId.value as string);
});
</script>

<template>
  <div>
    <h1>{{ recipe?.name }}</h1>
    <p>{{ recipe?.description }}</p>
  </div>
</template>
