import { calculateExchangeValue } from './calculations'

describe('#calculateExchangeValue', () => {
    it('should convert a valid currency', function () {
        const country = 'TEST'
        const item = { id: country, rate: 2 }
        const state = { exchangeRates: [item] }
        expect(calculateExchangeValue(state, country, 1)).toEqual('0.50000000')
    })
    it('should return 0 for invalid currencies', function() {
        const country = 'TEST'
        const item = { id: country, rate: 2 }
        const state = { exchangeRates: [item] }
        expect(calculateExchangeValue(state, 'PEPE', 1)).toEqual('0.00000000')
    })
})
