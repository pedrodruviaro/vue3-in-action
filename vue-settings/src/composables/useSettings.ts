import { ref, watch } from 'vue'

// union type alias
type Visibility = 'public' | 'private' 

// another union type alias -> extract the KEYS of SettingsMap -> same as "general" | "privacy" | "notifications"
type SettingsKey = keyof SettingsMap 

interface GeneralSettings {
  about: string
  country: string
  email: string
  gender: string
  username: string
}

interface NotificationsSettings {
  email: boolean
  sms: boolean
}

interface PrivacySettings {
  visibility: Visibility
  searchEngineIndexing: boolean
}

// maps the keys to their corresponding interfaces (map off settings)
interface SettingsMap {
  general: GeneralSettings
  privacy: PrivacySettings
  notifications: NotificationsSettings
}

/*
T -> generic parameter. Accepts any type T as long as T is a subtype of SettingsKey ('general', 'privacy' or 'notifications')
defaults: SettingsMap[T] -> ensure that 'defaults' must match the structure defined in SettingsMap for the given key 
*/
function init<T extends SettingsKey>(key: T, defaults: SettingsMap[T]) {
  const stored = localStorage.getItem(key)

  return stored !== null ? JSON.parse(stored) : defaults
}

const general = ref<GeneralSettings>(
  init('general', {
    about: '',
    country: '',
    email: '',
    gender: '',
    username: ''
  })
)


const notifications = ref<NotificationsSettings>(
  init('notifications', {
    email: false,
    sms: false
  })
)

const privacy = ref<PrivacySettings>(
  init('privacy', {
    searchEngineIndexing: false,
    visibility: 'public'
  })
)

function watcher<T extends SettingsKey>(key: T) {
  return (value: SettingsMap[T]) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

watch(general, watcher('general'), { deep: true })
watch(notifications, watcher('notifications'), { deep: true })
watch(privacy, watcher('privacy'), { deep: true })

export function useSettings() {
  return {
    general,
    notifications,
    privacy
  }
}
