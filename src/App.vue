<script setup lang="ts">
import { onMounted, watch } from 'vue'
import CurrencyDropdown from './components/molecules/CurrencyDropdown.vue'
import ForexChart from './components/organisms/ForexChart.vue'
import TimeSpanButton from './components/molecules/TimeSpanButton.vue'
import { useForexDate } from './composables/useForexData'
import ForexInfoHeader from './components/organisms/ForexInfoHeader.vue'

const {
  availableCurrencies,
  firstSelectedSymbol,
  secondSelectedSymbol,
  timeSpans,
  selectedTimeSpan,
  closePrices,
  setLabels,
  currentPrice,
  updateSelectedCurrency,
  fetchCurrencies,
  fetchTimeseriesData,
  timeSeriesResponse,
  loading,
} = useForexDate()

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
        <CurrencyDropdown
          v-if="firstSelectedSymbol"
          :dropdownOptions="availableCurrencies"
          :selectedCurrency="firstSelectedSymbol"
          @update:selectedCurrency="(currency) => updateSelectedCurrency(currency, 'first')"
        />
        <CurrencyDropdown
          v-if="secondSelectedSymbol"
          :dropdownOptions="availableCurrencies"
          :selectedCurrency="secondSelectedSymbol"
          @update:selectedCurrency="(currency) => updateSelectedCurrency(currency, 'second')"
        />
      </div>

      <div class="flex flex-col shadow-xl rounded-2xl">
        <ForexInfoHeader
          v-if="firstSelectedSymbol && secondSelectedSymbol && timeSeriesResponse"
          :firstCurrency="firstSelectedSymbol"
          :secondCurrency="secondSelectedSymbol"
          :currentPrice="currentPrice"
          :timeSeriesResponse="timeSeriesResponse"
        />

        <ForexChart
          v-if="closePrices && setLabels"
          :closePrices="closePrices"
          :labels="setLabels"
          :loading="loading"
        />

        <div class="flex flex-wrap md:gap-10 gap-3 justify-center py-7 px-2">
          <TimeSpanButton
            v-for="(timeSpan, index) in timeSpans"
            :key="index"
            :timeSpan="timeSpan"
            :isSelected="timeSpan.label === selectedTimeSpan.label"
            @update="selectedTimeSpan = timeSpan"
            class="px-4 py-2 rounded-lg shadow-md text-sm md:text-base"
          />
        </div>
      </div>
    </div>
  </div>
</template>
