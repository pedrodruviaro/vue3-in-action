<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'favorites' }">Favorites</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'add-recipe' }">Add Recipe</RouterLink>
        </li>

        <li>
          <RouterLink :to="{ name: 'recipe', params: { id: 1725382838985 } }">Recipe 1</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'recipe', params: { id: 1725382920499 } }">Recipe 2</RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>
