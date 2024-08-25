<script setup>
import BaseTitle from '@/components/BaseTitle.vue'
import EventList from '@/components/Event/List.vue'
import EventCard from '@/components/Event/Card.vue'
import EventListSkeleton from '@/components/Event/ListSkeleton.vue'
import BookingList from '@/components/Booking/List.vue'
import BookingItem from '@/components/Booking/Item.vue'
import BookingListSkeleton from '@/components/Booking/ListSkeleton.vue'

import { onMounted } from 'vue'
import { useEvents } from '@/composables/useEvents'
import { useBookings } from '@/composables/useBookings'

import { ref } from 'vue'

const { getEvents, events, loading: loadingEvents } = useEvents()
const { getBookings, bookEvent, cancelBooking, bookings, loading: loadingBookings } = useBookings()

onMounted(async () => {
  getEvents()
  getBookings()
})

const loadingRegister = ref(false)

async function handleBookEvent({ id, title }) {
  try {
    loadingRegister.value = true

    await bookEvent({
      eventId: id,
      eventTitle: title
    })
  } catch (error) {
    console.error(error)
  } finally {
    loadingRegister.value = false
  }
}

async function handleCancelBooking({ id }) {
  await cancelBooking({ bookingId: id })
}
</script>

<template>
  <main class="max-w-[45rem] px-2.5 mx-auto my-10 lg:my-16 grid gap-10">
    <BaseTitle size="lg" title="All Events" />

    <EventListSkeleton :loading="loadingEvents" :amount="6">
      <EventList>
        <EventCard
          v-for="event in events"
          :key="event.id"
          :title="event.title"
          :date="event.date"
          :description="event.description"
          :loading="loadingRegister"
          @register="handleBookEvent({ id: event.id, title: event.title })"
        />
      </EventList>
    </EventListSkeleton>

    <BaseTitle size="lg" title="Your Bookings" />

    <BookingListSkeleton :loading="loadingBookings" :amount="3">
      <BookingList v-if="bookings && bookings.length > 0">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
          :loading="false"
          @cancel="handleCancelBooking({ id: booking.id })"
        />
      </BookingList>

      <p v-else>No bookings yet. Register In one first</p>
    </BookingListSkeleton>
  </main>
</template>

<style>
body,
html {
  background-color: #eee;
}
</style>
