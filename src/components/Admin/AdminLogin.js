/* eslint-disable no-alert */
import React from 'react';
import firebase from 'firebase/app';

export function AdminLogin() {
    const login = ev => {
        ev.preventDefault();
        firebase.auth()
            .signInWithEmailAndPassword(ev.target.email.value, ev.target.password.value)
            .catch(err => {
                if (err.code === 'auth/wrong-password') {
                    window.alert('PASSWORD ERRATA');
                } else {
                    window.alert('QUESTA EMAIL NON CORRISPONDE A NESSUN UTENTE');
                }
            });
    };

    const reset = () => {
        firebase.auth().sendPasswordResetEmail(document.forms['login-casa-carezza'].email.value)
            .then(() => {
                window.alert('CONTROLLA LA TUA CASELLA MAIL PER CAMBIARE LA PASSWORD');
            })
            .catch(() => {
                window.alert('QUESTA EMAIL NON CORRISPONDE A NESSUN UTENTE');
            });
    };
    return <div className="box">
        <form name="login-casa-carezza" onSubmit={login}>
            <div className="row gtr-50 gtr-uniform">
                <div className="col-6 col-12-mobilep">
                    <label>EMAIL: <a href="#" onClick={reset}>cambia password</a></label>
                    <input type="email" required name="email"/>
                </div>
                <div className="col-6 col-12-mobilep">
                    <label>PASSWORD:</label>
                    <input type="password" required name="password"/>
                </div>
                <div className="col-6 col-12-mobilep">
                    <label>&nbsp;</label>
                    <input type="submit" value="ENTRA"/>
                </div>
                <div id="result" style={{ textAlign: 'center', width: '100%' }}>

                </div>
            </div>
            <ul>
                <li><strong>Se sei in possesso di un utente:</strong>
                    <ol>
                        <li>inserisci email e password ed entra nella tua area.</li>
                    </ol>
                </li>
                <li>
                    <strong>Se non sei sicuro di avere un utente o hai dimenticato la password:</strong>
                    <ol>
                        <li>inserisci solo l'email.</li>
                        <li>clicca sul link "cambia password"</li>
                        <li>
                        Se ti appare un messaggio "CONTROLLA LA TUA MAIL PER CAMBIARE LA PASSWORD" apri la tua casella
                        di posta elettronica e clicca sul link per inserire una nuova password.
                        </li>
                        <li>
                        Se ti appare un messaggio "QUESTA EMAIL NON CORRISPONDE A NESSUN UTENTE" scrivi
                        a <a href="mailto:gestore@casacarezza.it">gestore@casacarezza.it</a> indicando
                        il perdiodo e l'appartamento a cui vuoi associare la tua email ed attendi la risposta.
                        </li>
                    </ol>
                </li>
            </ul>
        </form>
    </div>;
}
