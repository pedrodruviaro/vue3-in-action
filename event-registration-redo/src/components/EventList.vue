<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { useData } from '@/composables/useData'
import { onMounted } from 'vue'

const { loading, error, events, bookings, getEvents, registerInEvent } = useData()

onMounted(() => getEvents())
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <template v-if="!loading">
      <template v-if="!error">
        <EventCard
          v-for="event in events"
          :key="event.id"
          :title="event.title"
          :date="event.date"
          :description="event.description"
          @register="registerInEvent(event.id)"
        />
      </template>

      <template v-else>
        <div>
          <button @click="getEvents">REFETCH</button>
        </div>
      </template>
    </template>

    <template v-else>
      <div
        class="animate-pulse bg-stone-200 w-full min-h-40 rounded shadow"
        v-for="i in 4"
        :key="i"
      ></div>
    </template>
  </div>
</template>
