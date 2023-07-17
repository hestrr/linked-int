import {initializeApp} from 'firebase/app';
import {getAuth} from "firebase/auth";
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCuzg6aFDYntCMCN47jfKA4nIzT9LDS2s4',
    authDomain: 'linkedint-78a1a.firebaseapp.com',
    projectId: 'linkedint-78a1a',
    storageBucket: 'linkedint-78a1a.appspot.com',
    messagingSenderId: '329884744564',
    appId: '1:329884744564:web:b9d45c24f416182702ca21',
    measurementId: 'G-0SPR232BW6'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);

export { firebaseApp, firebaseAuth, analytics };
