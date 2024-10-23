<script setup lang="ts">
import EventList from '@/components/EventList.vue'
import BookingsList from '@/components/BookingsList.vue'
</script>

<template>
  <main class="container mx-auto max-w-2xl px-4 mt-10 lg:mt-16 grid gap-6">
    <h2 class="text-xl font-bold">Bookings</h2>
    <BookingsList />

    <h2 class="text-xl font-bold">Events</h2>
    <EventList />
  </main>
</template>
