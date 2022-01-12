import React from 'react';
import { BoardRentExchange } from './BoardRentExchange';
import { BoardSell } from './BoardSell';

export function BoardList(props) {
    if (!props.list) return <div>CERCANDO OCCASIONI ...</div>;
    if (props.list && props.list.length === 0) return <div>NESSUNA OCCASIONE</div>;
    return <div id="list">
        <div>
            {props.list.map((val, index) => (props.type === 'sell'
                ? <BoardSell key={index} val={val} type={props.type} />
                : <BoardRentExchange key={index} val={val} type={props.type} />))}
        </div>
    </div>;
}
