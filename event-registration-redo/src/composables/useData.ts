import { ref } from 'vue'
import type { Event, Booking } from '@/types'

const API_ENDPOINTS = 'http://localhost:3001'

const events = ref<Event[]>([])
const bookings = ref<Booking[]>([])

export function useData() {
  const loading = ref(false)
  const error = ref()

  async function getEvents() {
    try {
      loading.value = true
      error.value = undefined

      const response = await fetch(API_ENDPOINTS + '/events')

      if (!response.ok) {
        throw new Error()
      }

      const data: Event[] = await response.json()

      events.value = data
    } catch (err) {
      error.value = 'Algo deu errado buscando os eventos'
    } finally {
      loading.value = false
    }
  }

  async function registerInEvent(id: string) {
    const isBooked = bookings.value.some((booking) => booking.eventId === id)
    if (isBooked) {
      alert('Já cadastrado no evento')
      return
    }

    const eventIndex = events.value.findIndex((event) => event.id === id)

    if (eventIndex === -1) return

    const newBooking: Booking = {
      eventId: id,
      eventTitle: events.value[eventIndex].title,
      id: new Date().toISOString(),
      status: 'pending',
      userId: 1
    }

    try {
      bookings.value.push(newBooking)

      const response = await fetch(API_ENDPOINTS + '/bookings', {
        method: 'POST',
        body: JSON.stringify(newBooking),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!response.ok) {
        bookings.value.splice(eventIndex, 1)
        throw new Error()
      }

      const x = bookings.value.find((b) => b.eventId === id)
      if (x) {
        x.status = 'confirmed'
      }
    } catch (error) {
      alert('Algo deu errado. Tente novamente mais tarde')
    }
  }

  async function getBookings() {
    try {
      loading.value = true
      error.value = undefined

      const response = await fetch(API_ENDPOINTS + '/bookings')

      if (!response.ok) {
        throw new Error()
      }

      const data: Booking[] = await response.json()

      bookings.value = data
    } catch (err) {
      error.value = 'Algo deu errado buscando as reservas'
    } finally {
      loading.value = false
    }
  }

  async function cancelBooking(id: string) {
    const bookingIndex = bookings.value.findIndex((b) => b.id === id)
    const bookingToRemove = bookings.value[bookingIndex]

    if (bookingIndex === -1) return

    try {
      bookings.value.splice(bookingIndex, 1)

      const response = await fetch(API_ENDPOINTS + '/bookings/' + id, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error()
      }
    } catch (error) {
      console.error(error)
      bookings.value.splice(bookingIndex, 0, bookingToRemove)
    }
  }

  return {
    events,
    bookings,
    loading,
    error,
    getEvents,
    registerInEvent,
    getBookings,
    cancelBooking
  }
}
