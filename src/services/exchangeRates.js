import React from 'react'
import countries from '../data/countries.json'

const appId = 'a41dcde829814495980a34c6cd7154b6'
const getPath = 'https://openexchangerates.org/api/latest.json'

const memo = {}

export const updateLatestExchangeRates = () => {
    if (memo.timestamp) return Promise.resolve(memo)

    return fetch(`${getPath}?app_id=${appId}`)
        .then((res) => res.json())
        .then((result) => {
            const { rates } = result
            const mappedRates = Object.keys(rates).map((key) => {
                const country = countries.find(
                    (item) => item.AlphabeticCode === key
                ) || { Entity: '' }
                return {
                    id: key,
                    countryName: country.Entity,
                    rate: rates[key].toFixed(8),
                }
            })
            let output = {
                rates: mappedRates,
                timestamp: result.timestamp,
            }
            Object.assign(memo, output)
            return output
        })
}
