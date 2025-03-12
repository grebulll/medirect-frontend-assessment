<script setup lang="ts">
import type { Currency } from '@/api/responses/CurrencyResponse'
import { ref } from 'vue'

defineProps<{
  dropdownOptions: Currency[]
}>()

const selectedOption = ref<string | null>(null)

const onSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement
  selectedOption.value = target.value
}
</script>

<template>
  <div class="select-dropdown">
    <select @change="onSelect" v-model="selectedOption">
      <option value="" disabled>Select a Currency</option>
      <option v-for="option in dropdownOptions" :key="option.code" :value="option.code">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select-dropdown {
  display: inline-block;
}

select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
</style>
