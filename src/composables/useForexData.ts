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

  // mock data
  // const timeSeriesResponse = ref({
  //   base_currency: 'EUR',
  //   end_date: '2019-10-10',
  //   endpoint: 'timeseries',
  //   quote_currency: 'USD',
  //   quotes: [
  //     {
  //       close: 1.09331,
  //       date: '2019-10-01',
  //       high: 1.09437,
  //       low: 1.0879,
  //       open: 1.08991,
  //     },
  //     {
  //       close: 1.09591,
  //       date: '2019-10-02',
  //       high: 1.09638,
  //       low: 1.09039,
  //       open: 1.09331,
  //     },
  //     {
  //       close: 1.10055,
  //       date: '2019-10-10',
  //       high: 1.10341,
  //       low: 1.09702,
  //       open: 1.09711,
  //     },
  //   ],
  //   request_time: 'Thu, 31 Oct 2019 15:34:09 GMT',
  //   start_date: '2019-10-01',
  // })

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
      // mock data
      // const data: CurrencyResponse | null = {
      //   available_currencies: {
      //     ADA: 'Cardano',
      //     ATOM: 'Atom',
      //     AVAX: 'Avalanche',
      //     AXS: 'Axis infinity',
      //     BCH: 'Bitcoin Cash',
      //     BNB: 'Binance Coin',
      //     BTC: 'Bitcoin',
      //     BTG: 'Bitcoin Gold',
      //     BUSD: 'Binance USD',
      //     DAI: 'DAI',
      //     DASH: 'Dashcoin',
      //     DOGE: 'DogeCoin',
      //     DOT: 'Polkadot',
      //     EGLD: 'Elrond Egold',
      //     ENJ: 'ENJ',
      //     EOS: 'EOS Platform',
      //     ETC: 'Ethereum Classic',
      //     ETH: 'Ethereum',
      //     FIL: 'Filecoin',
      //     FLOW: 'Flow',
      //     FTM: 'Fantom USD',
      //     FTT: 'FTX Token',
      //     GALA: 'Gala',
      //     HBAR: 'Hbar',
      //     HNT: 'Helium',
      //     ICP: 'Internet Computer Price ',
      //     LINK: 'Chainlink',
      //     LRC: 'Loopring',
      //     LTC: 'Litecoin',
      //     LUNA: 'Luna',
      //     MANA: 'Decentraland',
      //     MATIC: 'Matic',
      //     NEAR: 'Near',
      //     NEO: 'NEO',
      //     ROSE: 'Rose',
      //     SAND: 'Sandbox',
      //     SHIB: 'Shiba inu',
      //     SOL: 'Solana',
      //     THETA: 'Theta',
      //     TRX: 'Tron',
      //     UNI: 'Uniswap',
      //     USDT: 'Tether',
      //     UST: 'Terra USD',
      //     VET: 'Vechain',
      //     XLM: 'Stellar',
      //     XMR: 'Monero',
      //     XRP: 'Ripple',
      //     XTZ: 'Tezos',
      //   },
      //   endpoint: 'live_crypto',
      // }

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
