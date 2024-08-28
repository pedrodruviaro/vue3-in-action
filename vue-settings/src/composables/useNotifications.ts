import { ref } from 'vue'

interface Notification {
  id: number
  message: string
}

const notifications = ref<Notification[]>([])

export function useNotifications() {
  function addNotification(message: string) {
    const id = Date.now()

    notifications.value.push({
      id,
      message
    })

    setTimeout(() => removeNotification(id), 5000)
  }

  function removeNotification(id: number) {
    notifications.value = notifications.value.filter((notification) => notification.id !== id)
  }

  return {
    notifications,
    addNotification,
    removeNotification
  }
}
