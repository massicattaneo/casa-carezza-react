/* eslint-disable no-plusplus */
export const getYears = (howMany = 10) => {
    const thisYear = new Date().getFullYear();
    return new Array(howMany).fill(0).map((zero, index) => thisYear + index);
};
const oneDay = 60 * 60 * 24 * 1000;

export const getFirstSaturday = year => {
    const firstSaturday = new Date(`${year}-01-01`);
    while (firstSaturday.getDay() !== 6) {
        firstSaturday.setTime(firstSaturday.getTime() + oneDay);
    }
    return firstSaturday;
};

const months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

const getFromDate = (year, week) => new Date(getFirstSaturday(year).getTime() + ((week - 1) * (7 * oneDay)));

export const getFormattedWeek = (year, week) => {
    const from = getFromDate(year, week);
    const to = new Date(from.getTime() + 7 * oneDay);
    return `Da Sabato ${from.getDate()} ${months[from.getMonth()]} ${year} a Sabato ${to.getDate()} ${months[to.getMonth()]} ${to.getFullYear()}`;
};

export const getFormattedShortWeek = (year, week) => {
    const from = getFromDate(year, week);
    const to = new Date(from.getTime() + 7 * oneDay);
    return `${from.getDate()} ${months[from.getMonth()]} - ${to.getDate()} ${months[to.getMonth()]}`;
};

export const getStartSaturday = (year, week) => getFromDate(year, week);
