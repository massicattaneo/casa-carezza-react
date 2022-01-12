import React, { useState } from 'react';
import style from './find.module.css';
import { FindPeriod } from './FindPeriod';
import { FindWeek } from './FindWeek';

export function Find() {
    const [searchFor, setSearchFor] = useState('period');
    return <section id="main" className="container medium">
        <header>
            <h2>Cerca</h2>
        </header>

        <div className="box">
            <form method="post" action="#" name="modulo">
                <div className="row gtr-50 gtr-uniform">
                    <div className="col-12 col-12-mobilep">
                        <div className={style.tabButtons}>
                            <em>per:</em>
                            <span onClick={() => setSearchFor('period')} className={searchFor === 'period' ? style.selected : ''}>PERIODO</span>
                            <span onClick={() => setSearchFor('week')} className={searchFor === 'week' ? style.selected : ''}>SETTIMANA</span>
                        </div>
                        <br/>
                        {searchFor === 'period' ? <FindPeriod /> : <FindWeek />}
                    </div>
                </div>
            </form>
        </div>

        <hr/>

    </section>;
}
