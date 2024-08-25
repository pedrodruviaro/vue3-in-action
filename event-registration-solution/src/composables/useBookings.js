import { ref } from 'vue'

export function useBookings() {
  const loading = ref(false)
  const bookings = ref([])

  async function getBookings() {
    try {
      loading.value = true

      const res = await fetch('http://localhost:3000/bookings/')

      if (!res.ok || res.status !== 200) return

      const data = await res.json()

      bookings.value = data

      return
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function bookEvent({ eventTitle, eventId }) {
    const newBooking = {
      id: new Date().toISOString(),
      userId: 1,
      eventId: eventId,
      eventTitle: eventTitle,
      status: 'confirmed'
    }

    const hasRegisterInThisEvent = bookings.value.find(
      (booking) => String(booking.eventId) === String(eventId)
    )

    if (hasRegisterInThisEvent) {
      alert('Already registered on this event')
      return
    }

    bookings.value.push(newBooking)

    try {
      await fetch('http://localhost:3000/bookings/', {
        method: 'POST',
        body: JSON.stringify(newBooking)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function cancelBooking({ bookingId }) {
    try {
      const res = await fetch(`http://localhost:3000/bookings/${bookingId}`, {
        method: 'DELETE'
      })

      if (!res.ok && !res.status !== 200) return

      await getBookings()
    } catch (error) {
      console.error(error)
    }
  }

  return {
    loading,
    bookings,
    getBookings,
    bookEvent,
    cancelBooking
  }
}
