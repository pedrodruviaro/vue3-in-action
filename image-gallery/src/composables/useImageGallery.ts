import { computed, onMounted, ref } from 'vue'
import type { Image } from '@/types'

const LOCAL_STORAGE_KEY = 'FAVORITE_IMAGES'

export function useImageGallery() {
  const photoUrl = ref('')
  const photos = ref<Image[]>([])

  const hasPhotosToDisplay = computed(() => {
    return photos.value.length > 0
  })

  function handleAddNewPhoto() {
    if (!photoUrl.value || photoUrl.value.trim() === '') return

    const newImage: Image = {
      src: photoUrl.value,
      id: new Date().toISOString(),
      isFavorite: false
    }

    photos.value.push(newImage)
  }

  function favoriteImage(id: string) {
    const imageToFavorite = photos.value.find((image) => image.id === id)

    if (!imageToFavorite) return

    imageToFavorite.isFavorite = !imageToFavorite.isFavorite

    saveFavoriteImagesInLocalStorage()
  }

  const favoriteImages = computed(() => {
    return photos.value.filter((image) => image.isFavorite)
  })

  function saveFavoriteImagesInLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favoriteImages.value))
  }

  function getFavoriteImagesInLocalStorage() {
    const imagesSaved = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!imagesSaved) return

    photos.value = JSON.parse(imagesSaved) as Image[]
  }

  onMounted(() => getFavoriteImagesInLocalStorage())

  return {
    photoUrl,
    photos,
    hasPhotosToDisplay,
    handleAddNewPhoto,
    favoriteImage
  }
}
