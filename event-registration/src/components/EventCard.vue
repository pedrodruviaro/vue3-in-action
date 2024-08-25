<script setup lang="ts">
import RoundButton from "@/components/RoundButton.vue"
import SectionedCard from "@/components/SectionedCard.vue"

defineProps({
  title: String,
  date: String,
  description: String,
})

defineEmits(["register"])
</script>

<template>
  <SectionedCard>
    <template #header>
      {{ title }}
    </template>

    <template #default>
      {{ date }}
    </template>

    <template #footer>
      <p>
        {{ description }}
      </p>
      <div class="flex justify-end p-4">
        <RoundButton @click="$emit('register')">
          <pre>Register</pre>
        </RoundButton>
      </div>
    </template>
  </SectionedCard>
</template>
