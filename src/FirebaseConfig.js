// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";


// Add the Firebase products that you want to use
import "firebase/auth";
import 'firebase/database';
import 'firebase/storage';



var firebaseConfig = {
    apiKey: "AIzaSyDkhHFtkJZCGB1SosFhoFM8G0bWcMkiXdM",
    authDomain: "authentication-e3744.firebaseapp.com",
    databaseURL: "https://authentication-e3744.firebaseio.com",
    projectId: "authentication-e3744",
    storageBucket: "authentication-e3744.appspot.com",
    messagingSenderId: "174763164074",
    appId: "1:174763164074:web:e9841566bff4d33b"
  };

export const Firebase = firebase.initializeApp(firebaseConfig);
export const emailProvider = firebase.auth.EmailAuthProvider


