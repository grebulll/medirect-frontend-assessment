import type { TimeseriesResponse } from '@/api/responses/TimeseriesResponse'
import { computed, type Ref } from 'vue'

export function useCurrencyUtils(timeSeriesResponse: Ref<TimeseriesResponse | null | undefined>) {
  const getCurrencySymbol = (currencyCode: string): string => {
    const currencyPart = new Intl.NumberFormat('en', { style: 'currency', currency: currencyCode })
      .formatToParts(1)
      .find((part) => part.type === 'currency')
    return currencyPart?.value || currencyCode
  }

  const getStartingPrice = computed(() => {
    return timeSeriesResponse.value?.quotes?.[0]?.open ?? 0
  })

  const getEndingPrice = computed(() => {
    const quotes = timeSeriesResponse.value?.quotes
    return quotes?.length ? (quotes[quotes.length - 1]?.close ?? 0) : 0
  })

  const getPriceDifference = computed(() => {
    return (getEndingPrice.value ?? 0) - (getStartingPrice.value ?? 0)
  })

  const getPercentageChange = computed(() => {
    if (!getStartingPrice.value) return '0.00%'
    const percentage = ((getPriceDifference.value / getStartingPrice.value) * 100).toFixed(2)
    return `${percentage}%`
  })

  return { getPriceDifference, getCurrencySymbol, getPercentageChange }
}
