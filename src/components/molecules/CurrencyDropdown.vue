<script setup lang="ts">
import type { AvailableCurrencies } from '@/api/responses/CurrencyResponse'
import { ref } from 'vue'

defineProps<{
  dropdownOptions: AvailableCurrencies
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
      <option v-for="option in dropdownOptions" :key="option" :value="option">
        {{ option }}
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
