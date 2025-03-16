<script setup lang="ts">
import { onMounted, watch } from 'vue'
import CurrencyDropdown from './components/molecules/CurrencyDropdown.vue'
import ForexChart from './components/organisms/ForexChart.vue'
import { useForex } from './composables/useForex'

const {
  availableCurrencies,
  firstSelectedSymbol,
  secondSelectedSymbol,
  startDate,
  timeSpans,
  selectedTimeSpan,
  closePrices,
  setLabels,
  updateFirstSelectedCurrency,
  updateSecondSelectedCurrency,
  fetchCurrencies,
  fetchTimeseriesData,
} = useForex()

watch([firstSelectedSymbol, secondSelectedSymbol, selectedTimeSpan], () => {
  fetchTimeseriesData()
})

onMounted(async () => {
  await fetchCurrencies()
  fetchTimeseriesData()
})
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-3xl">Forex Exchange</h1>
    <h3>Check out the current price for a currency pair</h3>
    <div class="flex md:flex-row flex-col pt-4 gap-x-6">
      <div class="flex flex-col self-center gap-4">
        <!-- <CurrencyDropdown :dropdownOptions="options.available_currencies" /> -->
        <CurrencyDropdown
          v-if="firstSelectedSymbol"
          :dropdownOptions="availableCurrencies"
          :selectedCurrency="firstSelectedSymbol"
          @update:selectedCurrency="updateFirstSelectedCurrency"
        />
        <CurrencyDropdown
          v-if="secondSelectedSymbol"
          :dropdownOptions="availableCurrencies"
          :selectedCurrency="secondSelectedSymbol"
          @update:selectedCurrency="updateSecondSelectedCurrency"
        />
      </div>
      <div
        v-if="firstSelectedSymbol && secondSelectedSymbol"
        class="flex flex-col shadow-xl rounded-2xl"
      >
        <div class="pl-4 md:pt-0 pt-8">
          <div class="flex flex-row gap-3">
            <div :class="`currency-flag currency-flag-${firstSelectedSymbol.toLowerCase()}`" />
            <div :class="`currency-flag currency-flag-${secondSelectedSymbol.toLowerCase()}`" />
          </div>
          <h1 class="text-2xl">{{ firstSelectedSymbol }} / {{ secondSelectedSymbol }}</h1>
        </div>
        <ForexChart
          v-if="closePrices && setLabels"
          :closePrices="closePrices"
          :labels="setLabels"
        />
        <div class="flex gap-10 self-center pb-7">
          <button
            class="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-300"
            v-for="(timeSpan, index) in timeSpans"
            :key="index"
            @click="selectedTimeSpan = timeSpan"
          >
            <p>{{ timeSpan.label }}</p>
          </button>
          {{ startDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 700;
}
</style>
