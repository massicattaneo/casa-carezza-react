export const calculateExchangeValue = (state, country, amount) => {
    const item = state.exchangeRates.find((item) => item.id === country)
    if (!item) return (0).toFixed(8)
    return (amount / item.rate).toFixed(8)
}
