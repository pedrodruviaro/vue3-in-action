export type Event = {
  id: string
  title: string
  date: string
  description: string
  location: string
}

export type Booking = {
  id: string
  userId: number
  eventId: string
  eventTitle: string
  status: 'pending' | 'confirmed'
}
