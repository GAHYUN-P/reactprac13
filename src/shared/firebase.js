import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAtinkNbaTl6lyPDNaz7olESuAhFZcgiQg",
    authDomain: "magazine-prac-59b2d.firebaseapp.com",
    projectId: "magazine-prac-59b2d",
    storageBucket: "magazine-prac-59b2d.appspot.com",
    messagingSenderId: "65836063785",
    appId: "1:65836063785:web:bde23598d5a80797e49038",
    measurementId: "G-G3NZEGQ476"
}

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export {auth};