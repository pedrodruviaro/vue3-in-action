<script setup lang="ts">
import EventCard from "@/components/EventCard.vue"
import LoadingEventCard from "@/components/LoadingEventCard.vue"
import SectionedCard from "@/components/SectionedCard.vue"
import RoundButton from "@/components/RoundButton.vue"
import { useBookings } from "@/composables/useBookings"
import { ref, onMounted } from "vue"

const events = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchEvents() {
  try {
    loading.value = true
    error.value = null

    const response = await fetch("http://localhost:3001/events")
    const data = await response.json()
    events.value = data
  } catch (err) {
    console.error(err)
    error.value = err
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchEvents())

const { handleRegistration } = useBookings()
</script>

<template>
  <template v-if="error">
    <SectionedCard>
      <div class="space-y-4 items-center flex flex-col">
        <div class="text-red-500">
          Could not load events at the moment. Please try again
        </div>
        <div>
          <RoundButton @click="fetchEvents">Retry now</RoundButton>
        </div>
      </div>
    </SectionedCard>
  </template>

  <template v-else>
    <section class="grid md:grid-cols-2 gap-6">
      <template v-if="!loading">
        <template v-if="events.length">
          <EventCard
            v-for="event in events"
            :key="event.id"
            :title="event.title"
            :date="event.date"
            :description="event.description"
            @register="handleRegistration(event)"
          />
        </template>

        <template v-else>
          <div class="col-span-2 text-center">
            <p class="text-gray-500 text-lg">No events yet</p>
          </div>
        </template>
      </template>

      <template v-else>
        <LoadingEventCard v-for="i in 4" :key="i" />
      </template>
    </section>
  </template>
</template>
