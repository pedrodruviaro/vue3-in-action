import { ref } from 'vue'

export function useEvents() {
  const loading = ref(false)
  const events = ref([])

  async function getEvents() {
    try {
      loading.value = true

      const res = await fetch('http://localhost:3000/events')
      const data = await res.json()

      if (!res.ok || res.status !== 200) return

      events.value = data
      return
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    events,
    getEvents
  }
}
