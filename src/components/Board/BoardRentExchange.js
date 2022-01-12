import React from 'react';
import { getFormattedWeek } from '../../utils/dateUtils';
import { BOARD_TYPES } from './Board';

export function BoardRentExchange(props) {
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
                <td>SETTIMANA:</td>
                <td><strong>{getFormattedWeek(props.val.year, props.val.week)}</strong></td>
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
