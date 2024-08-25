<script setup lang="ts">
import SectionedCard from "@/components/SectionedCard.vue"
import RoundButton from "@/components/RoundButton.vue"

import { LoaderCircle, CheckCheck } from "lucide-vue-next"
import { computed } from "vue"

const props = defineProps({
  title: String,
  status: String,
})

const pending = computed(() => {
  return props.status === "pending"
})

const icon = computed(() => {
  return pending.value ? LoaderCircle : CheckCheck
})

defineEmits(["cancel"])
</script>

<template>
  <SectionedCard>
    <div class="flex justify-between">
      <div class="flex items-center space-x-2">
        <div>
          {{ title }}
        </div>
        <div>
          <Component
            :is="icon"
            size="26"
            :color="pending ? 'black' : 'green'"
            :class="{ 'animate-spin': pending }"
          />
        </div>
      </div>
      <RoundButton variant="danger" @click="$emit('cancel')"
        >Cancel</RoundButton
      >
    </div>
  </SectionedCard>
</template>
