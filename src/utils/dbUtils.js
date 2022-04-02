import firebase from 'firebase/app';
import { getFirstSaturday, getStartSaturday } from './dateUtils';
// import localDB from '../../casa-carezza-export.json';

const oneDay = 60 * 60 * 24 * 1000;

const isExceptionalYear = year => {
    const week = 53;
    const from = new Date(getFirstSaturday(year).getTime() + ((week - 1) * (7 * oneDay)));
    return (from.getFullYear() === year && from.getDay() === 6);
};

export const findSell = (data, item) => data.sell.find(el => el === `flat_${item.flat}_period_${item.period}`);
export const findItem = (data, type, item) => data[type].find(el => el === `flat_${item.flat}_week_${item.week}_year_${item.year}`);

export const getWeeksByPeriod = (db, period, flat, year) => {
    const item = db.periods.find(el => el.number === Number(period));
    return item.weeks.map(week => ({
        week,
        rent: !!findItem(db, 'rent', { flat, week, year }),
        exchange: !!findItem(db, 'exchange', { flat, week, year })
    }));
};

const sortByFlatAndWeek = (first, second) => {
    const { flat: flat1, week: week1, year: year1 = new Date().getFullYear() } = first;
    const { flat: flat2, week: week2, year: year2 = new Date().getFullYear() } = second;
    const saturday1 = getFirstSaturday(year1, week1);
    const saturday2 = getFirstSaturday(year2, week2);
    if (saturday1.getTime() === saturday2.getTime()) return flat1 - flat2;
    if (saturday1.getTime() > saturday2.getTime()) return 1;
    if (saturday1.getTime() < saturday2.getTime()) return -1;
    return undefined;
};

const findUserEmail = (data, { flat, week, period }) => {
    const myPeriod = Number(period) || data.periods.find(item => item.weeks.find(inner => inner === Number(week))).number;
    const user = data.users.find(item => item.properties.find(prop => prop.period === Number(myPeriod) && prop.flat === Number(flat)));
    return user.emails[0];
};

export const getAll = (db, type) => {
    if (type === 'sell') {
        const all = db[type].map(item => {
            const [, flat,, period] = item.split('_');
            const p = db.periods.find(el => el.number === Number(period));
            return {
                flat, weeks: p.weeks, period, contact: findUserEmail(db, { flat, period })
            };
        });
        return all.sort((first, second) => first.period - second.period);
    }
    const all = db[type].map(item => {
        const [, flat,, week,, year] = item.split('_');
        return {
            flat, week, year, contact: findUserEmail(db, { flat, week })
        };
    });
    return all
        .filter(({ week, year }) => Date.now() <= getStartSaturday(year, week).getTime())
        .sort(sortByFlatAndWeek);
};

export const getDb = year => {
    const isExceptional = year ? isExceptionalYear(year) : false;
    const database = firebase.database();
    return Promise.all([
        new Promise(resolve => {
            database.ref('users/').on('value', snapshot => {
                // resolve(localDB.users);
                resolve(snapshot.val());
            });
        }),
        new Promise(resolve => {
            database.ref('periods/').on('value', snapshot => {
                // resolve(localDB.periods);
                resolve(snapshot.val());
            });
        }),
        new Promise(resolve => {
            database.ref('flats/').on('value', snapshot => {
                resolve(snapshot.val());
            });
        }),
        new Promise(resolve => {
            database.ref('weeks/').on('value', snapshot => {
                resolve(snapshot.val());
                // resolve(localDB.weeks);
            });
        }),
        new Promise(resolve => {
            database.ref('rent/').on('value', snapshot => {
                resolve(snapshot.val());
            });
        }),
        new Promise(resolve => {
            database.ref('exchange/').on('value', snapshot => {
                resolve(snapshot.val());
            });
        }),
        new Promise(resolve => {
            database.ref('sell/').on('value', snapshot => {
                resolve(snapshot.val());
            });
        })
    ]).then(values => {
        const users = values[0];
        const periods = values[1].map(item => ({ ...item, weeks: item.weeks.slice(0) }));
        const flats = values[2];
        const weeksTemp = values[3];
        const rent = values[4] || [];
        const exchange = values[5] || [];
        const sell = values[6] || [];
        const period24 = periods.find(item => item.number === 24);
        if (!isExceptional) period24.weeks.splice(period24.weeks.length - 1, 1);
        const weeks = isExceptional ? weeksTemp : weeksTemp.slice(0, weeksTemp.length - 1);
        return {
            users, periods, flats, weeks, rent, exchange, sell
        };
    });
};

export const updateSell = (value, flat, period) => {
    const isSelling = value === 'sell';
    getDb().then(data => {
        const sell = findSell(data, { flat, period });
        if (isSelling) {
            if (!sell) {
                data.sell.push(`flat_${flat}_period_${period}`);
            }
        } else if (sell) {
            data.sell.splice(data.sell.indexOf(sell), 1);
        }
        firebase.database().ref().child('sell').set(data.sell);
    });
};

export const updateItem = (type, value, flat, week, year) => {
    getDb().then(data => {
        const find = findItem(data, type, { flat, week, year });
        if (value) {
            if (!find) {
                data[type].push(`flat_${flat}_week_${week}_year_${year}`);
            }
        } else if (find) {
            data[type].splice(data.sell.indexOf(find), 1);
        }
        firebase.database().ref().child(type).set(data[type]);
    });
};
