import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOMServer from 'react-dom/server';
import { App } from './components/App';
import './main.css';

// console.log(ReactDOMServer.renderToString(<App />));
ReactDOM.render(<App />, document.getElementById('page-wrapper'));
