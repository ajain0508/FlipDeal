import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// get the following snippet from firebase general settings>>config
const firebaseConfig = {
    apiKey: "AIzaSyBsuuTSlZAQZeC8FHKmfy7lNbPyqxXILjY",
    authDomain: "clone-f5ccb.firebaseapp.com",
    projectId: "clone-f5ccb",
    storageBucket: "clone-f5ccb.appspot.com",
    messagingSenderId: "167635179072",
    appId: "1:167635179072:web:21859d28a5c298aa74b1a5",
    measurementId: "G-4521KZPTLT"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  export const db = firebaseApp.firestore();
  export const auth = firebase.auth();