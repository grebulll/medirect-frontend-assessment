<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { fetchLiveCurrencies, fetchTimeseries } from './api/price'
import type { AvailableCurrencies, CurrencyResponse } from './api/responses/CurrencyResponse'
import CurrencyDropdown from './components/molecules/CurrencyDropdown.vue'
import ForexChart from './components/organisms/ForexChart.vue'
import {
  decreaseFifteenMinutes,
  decreaseHour,
  decreaseDay,
  decreaseWeek,
  decreaseMonth,
  formatDate,
} from './utils/dateFormat'
import type { TimeseriesResponse } from './api/responses/TimeseriesResponse'

const availableCurrencies = ref<AvailableCurrencies>({})
const timeSeriesResponse = ref<TimeseriesResponse>()
// const {
//   availableCurrencies,
//   timeSeriesResponse,
//   firstSelectedSymbol,
//   secondSelectedSymbol,
//   startDate,
//   fetchTimeseriesData,
// } = useForex()
const firstSelectedSymbol = ref('ARS')
const secondSelectedSymbol = ref('ARS')
const startDate = ref(formatDate(new Date()))

const updateFirstSelectedCurrency = (currency: string) => {
  firstSelectedSymbol.value = currency
}

const updateSecondSelectedCurrency = (currency: string) => {
  secondSelectedSymbol.value = currency
}

const timeSpans: { label: string; decreaseTime: () => string }[] = [
  { label: '15M', decreaseTime: decreaseFifteenMinutes },
  { label: '1H', decreaseTime: decreaseHour },
  { label: '1D', decreaseTime: decreaseDay },
  { label: '1W', decreaseTime: decreaseWeek },
  { label: '1M', decreaseTime: decreaseMonth },
]

const selectedTimeSpan = ref(timeSpans[0])

const fetchCurrencies = async () => {
  try {
    const data: CurrencyResponse | undefined = await fetchLiveCurrencies()
    if (data && data.available_currencies) {
      availableCurrencies.value = data.available_currencies
      const currencyKeys = Object.keys(data.available_currencies)
      firstSelectedSymbol.value = currencyKeys[0] || ''
      secondSelectedSymbol.value = currencyKeys[1] || ''
    }
  } catch (error) {
    console.error('Error fetching currencies:', error)
  }
}

const fetchTimeseriesData = async () => {
  const start = selectedTimeSpan.value.decreaseTime()
  startDate.value = start
  const end = formatDate(new Date())

  timeSeriesResponse.value = await fetchTimeseries(
    firstSelectedSymbol.value,
    secondSelectedSymbol.value,
    startDate.value,
    end,
  )
}

const closePrices = computed(() => {
  return timeSeriesResponse.value?.quotes?.map((element) => element.close) || []
})

const setLabels = computed(() => {
  return timeSeriesResponse.value?.quotes?.map((element) => element.date) || []
})

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
          v-if="availableCurrencies"
          :dropdownOptions="availableCurrencies"
          :selectedCurrency="firstSelectedSymbol"
          @update:selectedCurrency="updateFirstSelectedCurrency"
        />
        <CurrencyDropdown
          v-if="availableCurrencies"
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
