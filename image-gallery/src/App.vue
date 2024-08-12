<script setup lang="ts">
import FormNewImage from './components/FormNewImage.vue'
import ImagesList from './components/ImagesList.vue'
import NoItems from './components/NoItems.vue'
import { useImageGallery } from './composables/useImageGallery'

const { handleAddNewPhoto, favoriteImage, hasPhotosToDisplay, photoUrl, photos } = useImageGallery()
</script>

<template>
  <main class="container mx-auto px-6 mt-10 lg:mt-16 grid gap-10">
    <FormNewImage v-model:photo-url="photoUrl" @add-new-photo="handleAddNewPhoto" />
    <ImagesList :image-list="photos" v-if="hasPhotosToDisplay" @item-clicked="favoriteImage" />
    <NoItems v-else />
  </main>
</template>
