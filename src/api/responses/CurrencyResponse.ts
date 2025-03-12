export interface Currency {
  code: string
  name: string
}

export interface AvailableCurrencies {
  [key: string]: string
}

export interface CurrencyResponse {
  available_currencies: AvailableCurrencies
  endpoint: string
}
