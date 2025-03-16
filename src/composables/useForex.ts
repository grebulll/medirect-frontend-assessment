import { fetchLiveCurrencies, fetchTimeseries } from '@/api/price'
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

export function useForex() {
  const availableCurrencies = ref<AvailableCurrencies>({})
  const timeSeriesResponse = ref<TimeseriesResponse>()
  const firstSelectedSymbol = ref()
  const secondSelectedSymbol = ref()
  const startDate = ref(formatDate(new Date()))

  const timeSpans: { label: string; decreaseTime: () => string }[] = [
    { label: '15M', decreaseTime: decreaseFifteenMinutes },
    { label: '1H', decreaseTime: decreaseHour },
    { label: '1D', decreaseTime: decreaseDay },
    { label: '1W', decreaseTime: decreaseWeek },
    { label: '1M', decreaseTime: decreaseMonth },
  ]
  const selectedTimeSpan = ref(timeSpans[0])

  const updateFirstSelectedCurrency = (currency: string) => {
    firstSelectedSymbol.value = currency
  }

  const updateSecondSelectedCurrency = (currency: string) => {
    secondSelectedSymbol.value = currency
  }

  const closePrices = computed(() => {
    return timeSeriesResponse.value?.quotes?.map((element) => element.close) || []
  })

  const setLabels = computed(() => {
    return timeSeriesResponse.value?.quotes?.map((element) => element.date) || []
  })

  const fetchCurrencies = async () => {
    try {
      const data: CurrencyResponse | undefined = await fetchLiveCurrencies()
      if (data && data.available_currencies) {
        availableCurrencies.value = data.available_currencies
        const currencyKeys = Object.keys(data.available_currencies)
        console.log('currencyKeys:', currencyKeys)

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

  return {
    availableCurrencies,
    timeSeriesResponse,
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
  }
}
