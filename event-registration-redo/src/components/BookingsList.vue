<script setup lang="ts">
import BookingCard from './BookingCard.vue'
import { useData } from '@/composables/useData'
import { onMounted } from 'vue'

const { loading, error, bookings, getBookings, cancelBooking } = useData()

onMounted(() => getBookings())
</script>

<template>
  <div class="grid gap-4">
    <template v-if="!loading">
      <BookingCard
        v-for="booking in bookings"
        :key="booking.id"
        :title="booking.eventId"
        :status="booking.status"
        @cancel="cancelBooking(booking.id)"
      />
    </template>

    <template v-else>
      <div
        class="w-full h-10 animate-pulse bg-stone-300 rounded shadow-sm"
        v-for="i in 3"
        :key="i"
      ></div>
    </template>
  </div>
</template>
