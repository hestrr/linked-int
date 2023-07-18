import {initializeApp, getApps} from 'firebase/app';
import type {FirebaseApp} from 'firebase/app'

const firebaseConfig = {
    apiKey: 'AIzaSyCuzg6aFDYntCMCN47jfKA4nIzT9LDS2s4',
    authDomain: 'linkedint-78a1a.firebaseapp.com',
    projectId: 'linkedint-78a1a',
    storageBucket: 'linkedint-78a1a.appspot.com',
    messagingSenderId: '329884744564',
    appId: '1:329884744564:web:b9d45c24f416182702ca21',
    measurementId: 'G-0SPR232BW6'
};

let firebaseApp: FirebaseApp;

if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
}

export {firebaseApp};
