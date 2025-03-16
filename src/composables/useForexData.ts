import type { TimeSpan } from '@/api/models/TimeSpan'
import { fetchLiveCurrencies, fetchTimeseries } from '@/api/forexApi'
import type { AvailableCurrencies, CurrencyResponse } from '@/api/responses/CurrencyResponse'
import type { TimeseriesResponse } from '@/api/responses/TimeseriesResponse'
import {
  decreaseDay,
  decreaseFifteenMinutes,
  decreaseHour,
  decreaseMonth,
  decreaseWeek,
  formatDate,
} from '@/utils/dateFormat'
import { computed, ref } from 'vue'

export function useForexDate() {
  const loading = ref(false)
  const availableCurrencies = ref<AvailableCurrencies>({})
  const timeSeriesResponse = ref<TimeseriesResponse | null>()
  const firstSelectedSymbol = ref()
  const secondSelectedSymbol = ref()
  const startDate = ref(formatDate(new Date()))

  const timeSpans: TimeSpan[] = [
    { label: '15M', decreaseTime: decreaseFifteenMinutes },
    { label: '1H', decreaseTime: decreaseHour },
    { label: '1D', decreaseTime: decreaseDay },
    { label: '1W', decreaseTime: decreaseWeek },
    { label: '1M', decreaseTime: decreaseMonth },
  ]
  const selectedTimeSpan = ref(timeSpans[0])

  const currentPrice = computed(() => {
    return (
      timeSeriesResponse.value?.quotes.length ??
      timeSeriesResponse.value?.quotes[timeSeriesResponse.value?.quotes.length - 1].close
    )
  })

  const closePrices = computed(() => {
    return timeSeriesResponse.value?.quotes?.map((quote) => quote.close) || []
  })

  const setLabels = computed(() => {
    return timeSeriesResponse.value?.quotes?.map((quote) => quote.date) || []
  })

  const updateSelectedCurrency = (currency: string, type: 'first' | 'second') => {
    if (type === 'first') firstSelectedSymbol.value = currency
    else secondSelectedSymbol.value = currency
  }

  const fetchCurrencies = async () => {
    loading.value = true
    try {
      const data: CurrencyResponse | null = await fetchLiveCurrencies()
      if (data?.available_currencies) {
        availableCurrencies.value = data.available_currencies
        const currencyKeys = Object.keys(data.available_currencies)
        firstSelectedSymbol.value = currencyKeys[0] || null
        secondSelectedSymbol.value = currencyKeys[1] || null
      }
    } catch (error) {
      console.error('Error fetching currencies:', error)
    } finally {
      loading.value = false
    }
  }

  const fetchTimeseriesData = async () => {
    if (!firstSelectedSymbol.value || !secondSelectedSymbol.value) return

    loading.value = true
    try {
      const start = selectedTimeSpan.value.decreaseTime()
      startDate.value = start
      const end = formatDate(new Date())

      timeSeriesResponse.value = await fetchTimeseries(
        firstSelectedSymbol.value,
        secondSelectedSymbol.value,
        start,
        end,
      )
    } catch (error) {
      console.error('Error fetching timeseries data:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    availableCurrencies,
    timeSeriesResponse,
    firstSelectedSymbol,
    secondSelectedSymbol,
    startDate,
    timeSpans,
    selectedTimeSpan,
    currentPrice,
    closePrices,
    setLabels,
    updateSelectedCurrency,
    fetchCurrencies,
    fetchTimeseriesData,
    loading,
  }
}
