<script setup lang="ts">
defineProps<{
  timeSpan: { label: string }
  isSelected: boolean
}>()

defineEmits(['update'])
</script>

<template>
  <button
    class="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-300"
    :class="{ 'bg-gray-500 text-white': isSelected }"
    @click="$emit('update')"
  >
    <p>{{ timeSpan.label }}</p>
  </button>
</template>
