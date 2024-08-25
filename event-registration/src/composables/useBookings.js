import { ref } from "vue"

export function findBookingById(id) {
  return bookings.value.findIndex((b) => b.id === id)
}

const bookings = ref([])
const loading = ref(false)
const error = ref(null)

export function useBookings() {
  async function fetchBookings() {
    try {
      loading.value = true

      const response = await fetch("http://localhost:3001/bookings")
      const data = await response.json()

      bookings.value = data
    } catch (err) {
      console.error("error", err.message)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function handleRegistration(event) {
    if (
      bookings.value.some(
        (booking) => booking.eventId === event.id && booking.userId === 1
      )
    ) {
      alert("Already registered on this event")
      return
    }

    const newBooking = {
      id: Date.now().toString(),
      userId: 1,
      eventId: event.id,
      eventTitle: event.title,
      status: "pending",
    }

    try {
      bookings.value.push(newBooking)

      const response = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newBooking, status: "confirmed" }),
      })

      if (!response.ok) {
        throw new Error("Failed to confirm booking")
      }

      const bookingIndex = findBookingById(newBooking.id)

      bookings.value[bookingIndex] = await response.json()
      return
    } catch (error) {
      console.error("error", error.message)
      bookings.value = bookings.value.filter((b) => b.id !== newBooking.id)
    }
  }

  async function handleCancelBooking(bookingId) {
    const bookingIndex = findBookingById(bookingId)
    const originalBooking = bookings.value[bookingIndex]

    bookings.value.splice(bookingIndex, 1)

    try {
      const response = await fetch(
        `http://localhost:3001/bookings/${bookingId}`,
        {
          method: "DELETE",
        }
      )

      if (!response.ok) {
        throw new Error("Booking could not be canceled")
      }
    } catch (error) {
      console.error("error", error.message)
      bookings.value.splice(bookingIndex, 0, originalBooking)
    } finally {
    }
  }

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    handleRegistration,
    handleCancelBooking,
  }
}
