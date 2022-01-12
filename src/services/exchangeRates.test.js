import countries from '../data/countries.json';

const appId = 'a41dcde829814495980a34c6cd7154b6';
const getPath = 'https://openexchangerates.org/api/latest.json';

const memo = {};

/**
 * @method getCountryName
 * from a currency symbol retrieves the countr name
 * @param {string} currency - the symbol of the currency
 * @returns {string} the country name
 */
export const getCountryName = currency => {
    const defaultItem = {
        Entity: '',
    };
    const findItem = countries.find(item => item.AlphabeticCode === currency);
    const country = findItem || defaultItem;
    return country.Entity;
};

/**
 * @method fetchLatestExchangeRates
 * fetch and memoize the latest exchange rates
 * @returns {Promise} a promise that resolves with the list of exchange rates
 */
export const fetchLatestExchangeRates = () => {
    if (memo.timestamp) return Promise.resolve(memo);

    return window.fetch(`${getPath}?app_id=${appId}`)
        .then(res => res.json())
        .then(result => {
            const { rates } = result;
            const mappedRates = Object.keys(rates).map(key => {
                const countryName = getCountryName(key);
                return {
                    id: key,
                    countryName,
                    rate: rates[key].toFixed(8),
                };
            });
            const output = {
                rates: mappedRates,
                timestamp: result.timestamp,
            };
            Object.assign(memo, output);
            return output;
        });
};
