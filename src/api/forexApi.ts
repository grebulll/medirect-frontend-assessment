import type { CurrencyResponse } from './responses/CurrencyResponse'
import type { TimeseriesResponse } from './responses/TimeseriesResponse'

export async function fetchLiveCurrencies() {
  const url = `https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=${import.meta.env.VITE_FOREX_API_KEY}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: CurrencyResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching currencies:', error)
    return null
  }
}

export async function fetchTimeseries(
  firstCurrency: string,
  secondCurrency: string,
  start_date: string,
  end_date: string,
) {
  const url = `https://marketdata.tradermade.com/api/v1/timeseries?currency=${firstCurrency}${secondCurrency}&api_key=${import.meta.env.VITE_FOREX_API_KEY}&start_date=${start_date}&end_date=${end_date}&format=records`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: TimeseriesResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching currencies:', error)
    return null
  }
}
