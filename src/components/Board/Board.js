import React, { useState, useEffect } from 'react';
import { getAll, getDb } from '../../utils/dbUtils';
import { BoardList } from './BoardList';

export const BOARD_TYPES = {
    sell: 'VENDITA',
    rent: 'AFFITTO',
    exchange: 'SCAMBIO'
};

export function Board() {
    const [type, setType] = useState('rent');
    const [list, setList] = useState(null);

    useEffect(() => {
        getDb().then(db => {
            const inner = getAll(db, type);
            setList(inner.sort((first, second) => {
                if (!first.week) return 0;
                return (Number(`${first.year}${first.week.padStart(2, '0')}`)) - Number(`${second.year}${second.week.padStart(2, '0')}`);
            }));
        });
    }, [type]);

    return <section id="main" className="container medium">
        <header>
            <h2>Bacheca</h2>
            <p>Le occasioni in evidenza!</p>
        </header>
        <form name="filter">
            <label htmlFor="filter_type">TIPO OFFERTA:</label>
            <select name="type" id="filter_type" value={type} onChange={ev => setType(ev.target.value)}>
                <option value="rent">{BOARD_TYPES.rent}</option>
                <option value="exchange">{BOARD_TYPES.exchange}</option>
                <option value="sell">{BOARD_TYPES.sell}</option>
            </select>
        </form>
        <BoardList list={list} type={type}/>
    </section>;
}
