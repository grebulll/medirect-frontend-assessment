<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useCurrencyUtils } from '@/composables/useCurrencyUtils'
import type { TimeseriesResponse } from '@/api/responses/TimeseriesResponse'

const props = defineProps<{
  firstCurrency: string
  secondCurrency: string
  currentPrice?: number
  timeSeriesResponse: TimeseriesResponse
}>()

const timeSeriesRef = ref(props.timeSeriesResponse)

watch(
  () => props.timeSeriesResponse,
  (newValue) => {
    timeSeriesRef.value = newValue
  },
)

const { getPriceDifference, getCurrencySymbol, getPercentageChange } =
  useCurrencyUtils(timeSeriesRef)
const priceSymbol = computed(() => getCurrencySymbol(props.timeSeriesResponse?.quote_currency))
</script>

<template>
  <div class="px-4 md:pt-0 pt-8">
    <div class="flex flex-row gap-3">
      <div :class="`currency-flag currency-flag-${firstCurrency.toLowerCase()}`" />
      <div :class="`currency-flag currency-flag-${secondCurrency.toLowerCase()}`" />
    </div>
    <div class="flex md:flex-row flex-col gap-3 justify-between">
      <h1 class="text-2xl font-bold">{{ firstCurrency }} / {{ secondCurrency }}</h1>
      <h1 class="text-2xl font-bold">{{ priceSymbol }} {{ currentPrice }}</h1>
    </div>
    <div class="flex flex-row justify-end">
      <h1 class="text-lg text-green-500 font-light break-words whitespace-normal">
        {{ getPriceDifference.toFixed(6) }} ({{ getPercentageChange }})
      </h1>
    </div>
  </div>
</template>
