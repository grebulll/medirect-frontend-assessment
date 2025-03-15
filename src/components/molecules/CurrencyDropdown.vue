<script setup lang="ts">
import type { AvailableCurrencies } from '@/api/responses/CurrencyResponse'
import { ref } from 'vue'

const props = defineProps<{
  dropdownOptions: AvailableCurrencies
  selectedCurrency: string
}>()

const emit = defineEmits<{
  (e: 'update:selectedCurrency', value: string): void
}>()

const selectedOption = ref<string | null>(props.selectedCurrency)

const onSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement
  selectedOption.value = target.value
  emit('update:selectedCurrency', selectedOption.value)
}
</script>

<template>
  <div class="select-dropdown">
    <select @change="onSelect" v-model="selectedOption">
      <option v-for="(name, code) in dropdownOptions" :key="code" :value="code">
        {{ name }}
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
