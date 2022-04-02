import React, { useState, useEffect } from 'react';
import { getYears, getFormattedWeek } from '../../utils/dateUtils';
import { getDb } from '../../utils/dbUtils';

export function FindPeriod() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [output, setOutput] = useState([]);
    const [period, setPeriod] = useState();
    const [periods, setPeriods] = useState([]);

    useEffect(() => {
        if (!period) return;
        const find = periods.find(item => item.number === period);
        setOutput(find.weeks);
    }, [period, periods]);

    useEffect(() => {
        getDb(year).then(data => {
            setPeriods(data.periods);
        });
    }, [year, period]);

    return <div className="col-12 col-12-mobilep">
        <label>ANNO:</label>
        <select name="year" value={year} onChange={ev => setYear(Number(ev.target.value))}>
                                ${getYears().map(item => <option key={item} value={item}>{item}</option>)}
        </select>
        <label>PERIODO:</label>
        <select name="period" onChange={ev => setPeriod(Number(ev.target.value))}>
            <option value="0">SELEZIONA UN PERIODO</option>
            {periods.map(item => <option value={item.number} key={item.number}>{item.number}</option>)}
        </select>
        <br/>
        {output.length ? <fieldset><legend>SETTIMANE:</legend></fieldset> : ''}
        {output.map(item => <div key={item}>- {getFormattedWeek(year, item)}</div>)}
    </div>;
}
