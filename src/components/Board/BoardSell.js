import React from 'react';
import { getFormattedWeek } from '../../utils/dateUtils';
import { BOARD_TYPES } from './Board';

export function BoardSell(props) {
    if (!props.val.weeks) return '';
    return <table className="box">
        <tbody>
            <tr>
                <td>APPARTAMENTO/I N.:</td>
                <td>{props.val.flat}</td>
            </tr>
            <tr>
                <td>OFFERTA:</td>
                <td>{BOARD_TYPES[props.type]}</td>
            </tr>
            <tr style={{ background: '#f3ffef' }}>
                <td>PERIODI:</td>
                <td>
                    <ul style={{ marginBottom: 0 }}>
                        {props.val.weeks.map((week, index) => <li key={index}>{getFormattedWeek(new Date().getFullYear(), week)}</li>)}
                    </ul>
                </td>
            </tr>
            <tr>
                <td>CONTATTACI:</td><td>
                    <a style={{ borderBottom: 'none' }} href={`mailto:${props.val.contact}`}>
                        {props.val.contact}
                    </a>
                </td>
            </tr>
        </tbody>
    </table>;
}
