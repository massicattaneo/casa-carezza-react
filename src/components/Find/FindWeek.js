import React, { useState, useEffect } from 'react';
import { getYears, getFormattedWeek } from '../../utils/dateUtils';
import { getDb } from '../../utils/dbUtils';

export function FindWeek() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [output, setOutput] = useState([]);
    const [weeks, setWeeks] = useState([]);

    const updateResults = event => {
        const selected = Number(event.target.value);
        const find = weeks.find(item => item.number === selected);
        setOutput([find.number]);
    };

    useEffect(() => {
        getDb().then(data => {
            setWeeks(data.weeks);
        });
    }, []);

    return <div className="col-12 col-12-mobilep">
        <label>ANNO:</label>
        <select name="year" value={year} onChange={ev => setYear(ev.target.value)}>
                                ${getYears().map(item => <option key={item} value={item}>{item}</option>)}
        </select>
        <label>SETTIMANA:</label>
        <select name="period" onChange={updateResults}>
            <option value="0">SELEZIONA UNA SETTIMANA</option>
            {weeks.map(item => <option value={item.number} key={item.number}>{item.number}</option>)}
        </select>
        <br/>
        {output.length ? <fieldset><legend>SETTIMANA:</legend></fieldset> : ''}
        {output.map(item => <div key={item}>- {getFormattedWeek(year, item)}</div>)}
    </div>;
}
