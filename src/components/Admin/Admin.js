import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { AdminLogin } from './AdminLogin';
import {
    getDb, getWeeksByPeriod, findSell, updateSell, updateItem
} from '../../utils/dbUtils';
import { getFormattedShortWeek, getYears } from '../../utils/dateUtils';

export function Admin() {
    const [user, setUser] = useState();
    const [properties, setProperties] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const logout = () => {
        firebase.auth().signOut();
    };

    firebase.auth().onAuthStateChanged(currentUser => {
        if (currentUser) {
            setUser(currentUser);
        } else {
            setUser();
        }
    });

    useEffect(() => {
        if (!user) return;
        getDb(year).then(data => {
            const { properties: elems } = data.users.find(el => el.emails.find(inner => inner === user.email));
            const pepe = elems.map(item => ({
                ...item,
                sell: !!findSell(data, item),
                weeks: getWeeksByPeriod(data, item.period, item.flat, year)
            }));
            setProperties(elems.map(item => ({
                ...item,
                sell: undefined,
                weeks: []
            })));
            setProperties(pepe);
        });
    }, [user, year]);

    if (!user) {
        return <section id="main" className="container medium">
            <header><h2>Area proprietari</h2></header>
            <AdminLogin />
        </section>;
    }

    return <section id="main" className="container medium">
        <header>
            <h2>Area proprietari</h2>
        </header>

        <div>
            <div style={{ textAlign: 'center' }}>
                        UTENTE: {user.email}
                <br/>
                <a href="#" onClick={logout}>esci</a>
            </div>
            <hr/>
            <form style={{ padding: '0 10px' }}>
                <label>SELEZIONA UN ANNO:</label>
                <select name="year" value={year} onChange={ev => setYear(Number(ev.target.value))}>
                            ${getYears().map(el => <option key={el} value={el}>{el}</option>)}
                </select>
                <br/>
                {properties.map(({
                    flat, period, weeks, sell
                }) => <div className='box' key={`${flat}_${period}_${sell}`}>
                    <h4>APPARTAMENTO: {flat} - PERIODO {period}</h4>
                    <div>
                        <select id={`${flat}_${period}_${sell}`} defaultValue={sell ? 'sell' : ''} onChange={ev => updateSell(ev.target.value, flat, period)}>
                            <option value=''>NON VOGLIO VENDERLO</option>
                            <option value='sell'>IN VENDITA</option>
                        </select>
                    </div>
                    <hr/>
                    {weeks.map(({ week, rent, exchange }) => <div key={`${flat}_${week}_${year}`}>
                        <strong>SETTIMANA: {getFormattedShortWeek(year, week)}</strong>
                        <br />
                        {rent
                            ? <input id={`rent_${flat}_${week}_${year}`}
                                type="checkbox" defaultChecked
                                onClick={ev => updateItem('rent', ev.target.checked, flat, week, year)} />
                            : <input id={`rent_${flat}_${week}_${year}`}
                                type="checkbox"
                                onClick={ev => updateItem('rent', ev.target.checked, flat, week, year)} />}
                        <label htmlFor={`rent_${flat}_${week}_${year}`}>AFFITTO</label>
                        {exchange
                            ? <input id={`exchange_${flat}_${week}_${year}`}
                                type="checkbox" defaultChecked
                                onClick={ev => updateItem('exchange', ev.target.checked, flat, week, year)}/>
                            : <input id={`exchange_${flat}_${week}_${year}`} type="checkbox"
                                onClick={ev => updateItem('exchange', ev.target.checked, flat, week, year)}/>}

                        <label htmlFor={`exchange_${flat}_${week}_${year}`}>SCAMBIO</label>
                    </div>)}
                </div>)}
            </form>
        </div>;
    </section>;
}
