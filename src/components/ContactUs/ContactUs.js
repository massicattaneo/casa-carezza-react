/* eslint-disable no-alert */
import React from 'react';

export function ContactUs() {
    function email() {
        const nome = document.modulo.nome.value;
        const indirizzo = document.modulo.email.value;
        const messaggio = document.modulo.message.value;
        const subject = document.modulo.subject.value;

        if ((nome === '') || (nome === 'undefined')) {
            window.alert('Inserire Nome.');
            document.modulo.nome.focus();
        } else if (subject === '') {
            window.alert('Inserire l\'oggetto.');
            document.modulo.subject.focus();
        } else if ((indirizzo.indexOf('@') === (-1)) || (indirizzo === '') || (indirizzo === 'undefined')) {
            window.alert('Inserire un indirizzo email valido.');
            document.modulo.indirizzo.focus();
        } else if ((messaggio === '') || (messaggio === 'undefined')) {
            window.alert('Inserire un messaggio.');
            document.modulo.messaggio.focus();
        } else {
            // eslint-disable-next-line no-restricted-globals
            location.href = `mailto:vacanze@casacarezza.it?Subject=${subject}&Body=MITTENTE:%0A%0A${nome}%0A%0AEMAIL:%0A%0A${indirizzo}%0A%0AMESSAGGIO:%0A%0A${encodeURIComponent(messaggio)}`;
        }
    }
    return <section id="main" className="container medium">
        <header>
            <h2>Contattaci</h2>
            <p>Per informazioni contattateci compilando il seguente modulo.</p>
        </header>
        <div className="box">
            <form method="post" action="#" name="modulo">
                <div className="row gtr-50 gtr-uniform">
                    <div className="col-6 col-12-mobilep">
                        <input type="text" name="nome" id="name" placeholder="Nome" />
                    </div>
                    <div className="col-6 col-12-mobilep">
                        <input type="email" name="email" id="email" placeholder="Email" />
                    </div>
                    <div className="col-12">
                        <input type="text" name="subject" id="subject" placeholder="Oggetto" />
                    </div>
                    <div className="col-12">
                        <textarea name="message" id="message" placeholder="Il tuo messaggio" rows="6"></textarea>
                    </div>
                    <div className="col-12">
                        <ul className="actions special">
                            <li><input type="button" value="Invia messaggio" onClick={email} /></li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    </section>;
}
