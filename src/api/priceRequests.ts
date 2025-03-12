import type { CurrencyResponse } from './responses/CurrencyResponse'

const API_KEY = '4F4OXn1-Z2Pbct2hf26K'

export async function fetchLiveCurrencies() {
  const url = `https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=${API_KEY}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: CurrencyResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching currencies:', error)
  }
}
