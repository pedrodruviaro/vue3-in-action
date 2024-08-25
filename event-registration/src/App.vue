<script setup>
import EventList from "@/components/EventList.vue"
import BookingsList from "@/components/BookingsList.vue"
</script>

<template>
  <main class="container mx-auto px-8 my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <EventList />
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <BookingsList />
  </main>
</template>
