<script setup lang="ts">
import BookingItem from "@/components/BookingItem.vue"
import LoadingBookingItem from "@/components/loadingBookingItem.vue"
import RoundButton from "@/components/RoundButton.vue"
import { useBookings } from "@/composables/useBookings"
import { onMounted } from "vue"

const { bookings, loading, error, fetchBookings, handleCancelBooking } =
  useBookings()

// no blocking -> no "await" call
onMounted(() => fetchBookings())
</script>

<template>
  <template v-if="error">
    <p>Somethin went wrong...</p>
    <RoundButton @click="fetchBookings">Refetch</RoundButton>
  </template>

  <template v-else>
    <section class="grid gap-6">
      <template v-if="!loading">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
          :status="booking.status"
          @cancel="handleCancelBooking(booking.id)"
        />
      </template>
      <template v-else>
        <LoadingBookingItem v-for="i in 3" :key="i" />
      </template>
    </section>
  </template>
</template>
