<script setup lang="ts">
import { ref } from 'vue'
import { fetchLiveCurrencies, fetchTimeseries } from './api/price'
import type { CurrencyResponse } from './api/responses/CurrencyResponse'
import CurrencyDropdown from './components/molecules/CurrencyDropdown.vue'
import ForexChart from './components/organisms/ForexChart.vue'

// const { data: liveCurrencies } = fetchLiveCurrencies()
// const { data: timeSeries } = fetchTimeseries()

const options: CurrencyResponse = {
  available_currencies: {
    ARS: 'Argentine Peso',
    AUD: 'Australian Dollar',
    BHD: 'Bahraini Dinar',
    BRL: 'Brazilian Real',
    CAD: 'Canadian Dollar',
    CHF: 'Swiss Franc',
    CLP: 'Chilean Peso',
    CNY: 'Chinese Yuan',
    COP: 'Colombian Peso',
  },
  endpoint: 'live_currencies',
}

const firstSelectedSymbol = ref('ARS')
const secondSelectedSymbol = ref('ARS')

const updateFirstSelectedCurrency = (currency: string) => {
  firstSelectedSymbol.value = currency
}

const updateSecondSelectedCurrency = (currency: string) => {
  secondSelectedSymbol.value = currency
}

const timeSpans = ['15M', '1H', '1D', '1W', '1M']
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-3xl">Forex Exchange</h1>
    <h3>Check out the current price for a currency pair</h3>
    <div class="flex flex-row pt-4 gap-x-6">
      <div class="flex flex-col self-center gap-4">
        <!-- <CurrencyDropdown :dropdownOptions="options.available_currencies" /> -->
        <CurrencyDropdown
          :dropdownOptions="options.available_currencies"
          :selectedCurrency="firstSelectedSymbol"
          @update:selectedCurrency="updateFirstSelectedCurrency"
        />
        <CurrencyDropdown
          :dropdownOptions="options.available_currencies"
          :selectedCurrency="secondSelectedSymbol"
          @update:selectedCurrency="updateSecondSelectedCurrency"
        />
      </div>
      <div
        v-if="firstSelectedSymbol && secondSelectedSymbol"
        class="flex flex-col shadow-xl rounded-2xl"
      >
        <div class="pl-4">
          <div class="flex flex-row gap-3">
            <div :class="`currency-flag currency-flag-${firstSelectedSymbol.toLowerCase()}`" />
            <div :class="`currency-flag currency-flag-${secondSelectedSymbol.toLowerCase()}`" />
          </div>
          <h1 class="text-2xl">{{ firstSelectedSymbol }} / {{ secondSelectedSymbol }}</h1>
        </div>
        <ForexChart />

        <div class="flex gap-16 self-center pb-7">
          <button
            class="cursor-pointer"
            v-for="(time, index) in timeSpans"
            :key="index"
            @click="console.log('click')"
          >
            <p>{{ time }}</p>
          </button>
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
