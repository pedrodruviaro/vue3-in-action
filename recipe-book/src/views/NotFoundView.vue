<script setup lang="ts"></script>

<template>
  <h1>Page not found... :(</h1>
  <div>
    {{ $route.params.pathMatch }}
  </div>
</template>
