import React, { Fragment } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { FirebaseDatabaseProvider } from '@react-firebase/database';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import routes from '../data/routes';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

setChonkyDefaults({ iconComponent: ChonkyIconFA });

const config = {
    apiKey: 'AIzaSyA1j77rKhEvBv8plIJXEOST-zUS5NM6lC0',
    authDomain: 'casa-carezza.firebaseapp.com',
    databaseURL: 'https://casa-carezza.firebaseio.com',
    projectId: 'casa-carezza',
    storageBucket: 'casa-carezza.appspot.com',
    messagingSenderId: '215457741210',
    appId: '1:215457741210:web:6e45a9ff81fa4938'
};
export function App() {
    return <Fragment>
        <FirebaseAuthProvider firebase={firebase} {...config}>
            <FirebaseDatabaseProvider firebase={firebase} {...config}>
                <Router>
                    <Header></Header>
                    <div className="appBody">
                        {routes.map((route, i) => (
                            <Route key={i} {...route} />
                        ))}
                        <Route exact path="/">
                            <Redirect to="/index.html" />
                        </Route>
                    </div>
                    <Footer></Footer>
                </Router>
            </FirebaseDatabaseProvider>
        </FirebaseAuthProvider>
    </Fragment>;
}
