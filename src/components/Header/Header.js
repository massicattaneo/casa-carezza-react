import React, { useEffect, Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
    const location = useLocation();
    const [hover, setHover] = useState('none');
    const [drawer, setDrawer] = useState('');
    const [sticky, setSticky] = useState('');
    let timeout;
    window.addEventListener('scroll', () => {
        setSticky(window.pageYOffset > 100 ? 'sticky' : '');
    });

    useEffect(() => {
        setDrawer('');
        document.body.classList.remove('drawer');
    }, [location]);

    const onHover = (bool, delay = 500) => {
        clearTimeout(timeout);
        if (bool) {
            setHover('block');
        } else {
            timeout = setTimeout(() => {
                setHover('none');
            }, delay);
        }
    };
    const showDrawer = () => {
        if (!drawer) {
            setDrawer('drawer');
            window.scrollTo(0, 0);
            document.body.classList.add('drawer');
        } else {
            setDrawer('');
            document.body.classList.remove('drawer');
        }
    };
    return <Fragment>
        <ul
            className={'dropotron level-0 right'} style={{
                zIndex: 1002, position: 'fixed', right: 15, top: 35, display: hover
            }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false, 0)}
        >
            <li style={{ whiteSpace: 'nowrap' }}><a target="_blank" href="https://carezza.it" rel="noreferrer">Lago Carezza</a></li>
            <li style={{ whiteSpace: 'nowrap' }}><a target="_blank" href="https://eggental.com/it" rel="noreferrer">I dintorni</a></li>
            <li style={{ whiteSpace: 'nowrap' }}><a target="_blank" href="https://www.trentino.com/" rel="noreferrer">Trentino</a></li>
            <li style={{ whiteSpace: 'nowrap' }}><a target="_blank" href="https://www.dolomitisuperski.com/it" rel="noreferrer">Dolomiti SuperSki</a></li>
        </ul>
        <div id="navButton"><a className="toggle" onClick={showDrawer}></a></div>
        <div id="navPanel">
            <nav>
                <Link className="link depth-0" to={{ pathname: '/index.html' }}><span className="indent-0"></span>Home</Link>
                <Link className="link depth-0" to={{ pathname: '/bacheca.html' }}><span className="indent-0"></span>Bacheca</Link>
                <Link className="link depth-0" to={{ pathname: '/foto.html' }}><span className="indent-0"></span>Foto</Link>
                <Link className="link depth-0" to={{ pathname: '/contattaci.html' }}><span className="indent-0"></span>Contattaci</Link>
                <Link className="link depth-0" to={{ pathname: '/cerca.html' }}><span className="indent-0"></span>Cerca</Link>
                <Link className="link depth-0" to={{ pathname: '/area_proprietari.html' }}><span className="indent-0"></span>Proprietari</Link>
                <a className="link depth-0" href="#"><span className="indent-0"></span>Scopri</a>
                <a className="link depth-1" target="_blank" href="https://carezza.it" rel="noreferrer"><span className="indent-1"></span>Lago Carezza</a>
                <a className="link depth-1" target="_blank" href="https://eggental.com/it" rel="noreferrer"><span className="indent-1"></span>I dintorni</a>
                <a className="link depth-1" target="_blank" href="https://www.trentino.com/" rel="noreferrer"><span className="indent-1"></span>Trentino</a>
                <a className="link depth-1" target="_blank" href="https://www.dolomitisuperski.com/it" rel="noreferrer"><span className="indent-1"></span>Dolomiti SuperSki</a>
            </nav>
        </div>
        <header id="header" className={sticky}>
            <h1><a href="index.html">sito ufficiale</a> @Casa Carezza</h1>
            <nav id="nav">
                <ul>
                    <li><Link to={{ pathname: '/index.html' }}>Home</Link></li>
                    <li><Link to={{ pathname: '/bacheca.html' }}>Bacheca</Link></li>
                    <li><Link to={{ pathname: '/foto.html' }}>Foto</Link></li>
                    <li><Link to={{ pathname: '/contattaci.html' }}>Contattaci</Link></li>
                    <li><Link to={{ pathname: '/cerca.html' }}>Cerca</Link></li>
                    <li><Link to={{ pathname: '/area_proprietari.html' }}>Proprietari</Link></li>
                    <li onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>
                        <a href="#" className="icon fa-angle-down">Scopri</a>
                        <ul>
                            <li><a target="_blank" href="https://carezza.it" rel="noreferrer">Lago Carezza</a></li>
                            <li><a target="_blank" href="https://eggental.com/it" rel="noreferrer">I dintorni</a></li>
                            <li><a target="_blank" href="https://www.trentino.com/" rel="noreferrer">Trentino</a></li>
                            <li><a target="_blank" href="https://www.dolomitisuperski.com/it" rel="noreferrer">Dolomiti SuperSki</a></li>
                        </ul>
                    </li>

                </ul>
            </nav>
        </header>
    </Fragment>;
}
