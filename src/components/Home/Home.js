import React, { Fragment, useEffect } from 'react';
import foto1 from '../../images/foto_1.jpg';
import foto7 from '../../images/foto_7.jpg';
import foto10 from '../../images/foto_10.jpg';
import saunaTavernaHome from '../../gallery-home/sauna-taverna/images/home.jpeg';
import dintorniHome from '../../gallery-home/dintorni/images/home.jpeg';

function Node(markup) {
    const div = document.createElement('div');
    div.innerHTML = markup;
    return div.children[0];
}

function createLightGallery(name, folder, length) {
    const elementById = document.getElementById(name);
    (new Array(length).fill(0).forEach((zero, index) => {
        const markup = `<a href="gallery-home/${folder}/images/${index + 1}.jpeg?v=1"><img src="gallery-home/${folder}/images/${index + 1}.jpeg?v=1" width="100px"></a>`;
        elementById.appendChild(Node(markup));
    }));
    window.lightGallery(elementById, {
        thumbnail: true
    });
}

export const Home = () => {
    useEffect(() => {
        createLightGallery('lightgallery1', 'appartamenti', 5);
        createLightGallery('lightgallery2', 'servizi-spazi-comuni', 6);
        createLightGallery('lightgallery3', 'sauna-taverna', 5);
        createLightGallery('lightgallery4', 'dintorni', 5);
    }, []);
    return <Fragment>
        <section id="banner">
            <h2>Residence Casa Carezza</h2>
            <p>Resort Condominium - Affiliato R.C.I.</p>
        </section>
        <section id="main" className="container homePage">
            <section className="box special">
                <header className="major">
                    <h2>Un residence con 17 appartamenti
                        <br/>
                    nel cuore delle dolomiti
                    </h2>
                    <p>
                        <em>Rigenerarsi e rilassarsi, prendersi cura di se...
                        recuperare quel meraviglioso e salutare stato di armonia...
                        l'equilibrio si identifica con la piacevole sensazione di apertura che avviene ad ogni
                        respiro</em>
                    </p>
                    <p>
                    vicolo Piaz 5/21 Nova Levante - 39059 - Bolzano (BZ)
                    </p>
                </header>
                <span className="image featured"><img src={foto1} alt="" /></span>
            </section>

            <section className="box special features">
                <div className="features-row">
                    <section>
                        <a href="tel:+39 0471-61.20.95">
                            <span className="icon major fa-phone accent4"></span>
                        </a>

                        <h3>Chiamaci</h3>
                        <p>
                        Reception Tel. <a href="tel:+39 0471612095">+39 0471 61 20 95</a><br/>
                        Cellulare <a href="tel:+39 3408049280">+39 340 804 92 80</a><br/>
                        Email: <a href="mailto:gestore@casacarezza.it">gestore@casacarezza.it</a><br/>
                        Orari apertura <strong>8.30 - 10.30 | 16.00 - 19.00</strong><br/>
                        Sabato <strong>8.30 - 10.00 | 16.00 - 20.00</strong><br/>
                            <em className="evidence">
                            Sabato dalle ore 10 alle ore 16 si svolgono i servizi di pulizia e riordino appartamenti, si
                            prega rispettare gli orari
                            </em><br/>
                            <strong>Il Residence è chiuso nei mesi di Maggio e Novembre.</strong>
                        </p>
                    </section>
                    <section>
                        <span className="icon major fa-map accent3"></span>
                        <h3>Mappa</h3>
                        <p>
                            <iframe width="100%"
                                height="240"
                                src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=it&amp;q=Vicolo%20Piaz%2C%205%2C%20Carezza%2C%20Bolzano%2C%20Italia+(Casa%20Carezza)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
                                <a href="https://www.mapsdirections.info/calcular-ruta.html">Casa Carezza</a>
                            </iframe>
                        </p>
                    </section>
                </div>
                <div className="features-row">
                    <section>
                        <span className="icon major fa-map-signs accent2"></span>
                        <h3>Come raggiungerci</h3>
                        <p><strong>In auto:</strong> da qualsiasi parte d'Italia arriviate, Autostrada A22 del Brennero con
                        uscita al casello Bolzano Nord. Seguire per Val D'Ega - Nova Levante.<br/>
                        <strong>In treno:</strong> stazione di Bolzano e poi servizio di autobus.<br/>
                        <strong>In aereo:</strong> l'aeroporto più vicino è Verona.<br/>
                        <a target="_blank" href="https://traffico.provincia.bz.it" rel="noreferrer">Bollettino traffico BZ</a><br/>
                        <a target="_blank" href="https://www.autobrennero.it" rel="noreferrer">Autostrada del Brennero</a><br/>
                        <a target="_blank" href="https://www.trenitalia.it/" rel="noreferrer">TreniItalia</a><br/>
                        <a target="_blank" href="https://www.sad.it/it/siitimetablesquery" rel="noreferrer">Orari Autobus Bolzano/Carezza</a>
                        </p>
                    </section>

                    <section>
                        <span className="icon major fa-info accent5"></span>
                        <h3>Informazioni principali</h3>
                        <p>
                        Periodi: <strong>da Sabato a Sabato</strong><br/>
                        check-in <strong>sabato pomeriggio dalle ore 16 alle ore 20</strong><br/>
                        check-out <strong>sabato mattina dalle ore 8,30 alle ore 10</strong><br/>
                        Altitudine: <strong>1670 mt</strong><br/>
                        Animali: <strong>non ammessi</strong><br/>
                            <strong>Vietato fumare</strong> negli appartamenti<br/>
                            <br/>
                        </p>
                    </section>
                </div>
            </section>

            <div className="row">
                <div className="col-6 col-12-narrower">

                    <section className="box special">
                        <span className="image featured"><img src={foto7} alt="" /></span>
                        <h3>Gli appartamenti</h3>
                        <p>
                        16 Bilocali 4 posti letto 35 mq:<br/>
                        1 monolocale 2 posti divano/letto<br/> ( senza camera matrimoniale ).<br/>
                        I 17 appartamenti sono tutti arredati e corredati di stoviglie e servizi cucina
                        Soggiorno-cucina con divano/letto matrimoniale+singolo
                        Angolo cottura con piastre elettriche, forno microonde, frigo
                        Stanza matrimoniale letto con piumoni/copri piumoni
                        Bagno con phon
                        TV analogica digitale,Wifi gratis in tutta la struttura
                        cassaforte di sicurezza.<br/>
                            <em>Calore, intimità a stretto contatto con la natura senza rinunciare alla comodità</em>
                        </p>
                        <div id="lightgallery1" style={{ textAlign: 'center' }}></div>
                    </section>
                </div>
                <div className="col-6 col-12-narrower">

                    <section className="box special">
                        <span className="image featured"><img src={foto10} alt="" /></span>
                        <h3>Servizi e spazi comuni</h3>
                        <p>Nei periodi estivi, accoglienti aree comuni esterne attrezzate con tavoli e panche
                        per godersi i fantastici panorami,prendere il sole o semplicemente leggere un libro.<br/>
                        Parcheggio auto esterno gratis ( 1 auto x appartamento ).<br/>
                        Il residence è dotato anche di garage interno, su prenotazione a pagamento e salvo
                        disponibilità.<br/>
                        Ogni appartamento ha l'accesso privato con serratura del proprio armadietto al deposito
                        sci/scarponi accessibile tramite garage.<br/>
                        Su prenotazione da effettuare la sera, possibilità di colazioni con croissant caldi/krapfen o
                        pane baguette /rosette.<br/>
                        Si effettua anche servizio biancheria letto, servizio lavanderia/asciugatura e kit toilette
                        a pagamento.
                        </p>
                        <div id="lightgallery2" style={{ textAlign: 'center' }}></div>
                    </section>

                </div>

                <div className="col-6 col-12-narrower">

                    <section className="box special">
                        <span className="image featured"><img src={saunaTavernaHome} alt=""/></span>
                        <h3>Taverna e sauna</h3>
                        <p>
                        Cosa c'è di meglio di una sauna poi una grigliata ?<br/>
                        Nei periodi invernali sono considerate l'accoppiata vincente,
                        in accordo col gestore e rispettando gli orari da regolamento.<br/>
                        in taverna il camino centrale aspetta solo i vostri barbecue e la cucina attrezzata per le
                        vostre cene di gruppo.<br></br>
                        Nel locale sauna oltre alle doccie e pediluvio, comodissimi lettini nella zona relax.<br/>
                            <em>Il tuo privè per ricordi memorabili</em>
                        </p>

                        <div id="lightgallery3" style={{ textAlign: 'center' }}></div>
                    </section>
                </div>

                <div className="col-6 col-12-narrower">

                    <section className="box special">
                        <span className="image featured"><img src={dintorniHome} alt="" /></span>
                        <h3>I dintorni</h3>
                        <p>
                        Paradiso escursionistico e patrimonio mondiale UNESCO,
                        Carezza in estate offre il meglio,
                        mountain bike, corsi roccia, equitazione, golf, tennis, trekking e indimenticabili pranzi nei
                        rifugi
                        in quota o nei masi in mezzo al bosco,
                        considerata da sempre il cuore dell'alto Adige, al centro di questa zona il Lago di Carezza
                        stupisce per la moltitudine di colori e riflessi dovuti al forte contrasto
                        fra il verde,il grigio-rosa e l'azzurro del cielo.<br/>
                        D'inverno tutto si copre di bianco ed è il momento migliore per la tua vacanza sulla neve
                        con le migliori scuole sci/snowboard adatte per famiglie e bambini, piste sci di tutti i
                        livelli, piste da fondo,da slitta, ciaspolate.<br/>
                        Per la sua vicinanza alle piste Casa Carezza offre comodità senza compromessi e base di partenza
                        per tutte le tue avventure.
                        </p>
                        <div id="lightgallery4" style={{ textAlign: 'center' }}></div>z
                    </section>
                </div>
            </div>

        </section>
    </Fragment>;
};
