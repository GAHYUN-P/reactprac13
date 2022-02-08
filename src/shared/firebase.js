import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// export const apiKey = "AIzaSyAtinkNbaTl6lyPDNaz7olESuAhFZcgiQg";

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

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export {auth, apiKey, firestore, storage};