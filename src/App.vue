<script setup lang="ts">
import type { Currency } from './api/responses/CurrencyResponse'
import CurrencyDropdown from './components/molecules/CurrencyDropdown.vue'

// const { data: liveCurrencies } = fetchLiveCurrencies()

const options: Currency[] = [
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound Sterling' },
]
</script>

<template>
  <CurrencyDropdown :dropdownOptions="options" />
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
