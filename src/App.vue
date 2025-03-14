<script setup lang="ts">
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
</script>

<template>
  <div class="container">
    <h1>Forex Exchange</h1>
    <h3>Check out the current price for a currency pair</h3>
    <CurrencyDropdown :dropdownOptions="options.available_currencies" />
    <CurrencyDropdown :dropdownOptions="options.available_currencies" />
    <CurrencyDropdown :dropdownOptions="options.available_currencies" />
    <ForexChart />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

h1 {
  font-weight: 700;
}
</style>
