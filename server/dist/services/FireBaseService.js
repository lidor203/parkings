"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
const firebase = require('firebase');
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAb3M-HrYkvJouCC5SXmdstapr-bpT4138",
    authDomain: "blockedparkings.firebaseapp.com",
    databaseURL: "https://blockedparkings-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "blockedparkings",
    storageBucket: "blockedparkings.appspot.com",
    messagingSenderId: "298199368269",
    appId: "1:298199368269:web:8ac736004f6e23e3619204"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const parkDB = firebase.database();
exports.default = parkDB;
