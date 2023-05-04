import {
    initializeApp
} from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
// import Firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBkRwPD1BrC8ZBBPb8kP6tMPXgphxKMGpY",
    authDomain: "metatunes.firebaseapp.com",
    projectId: "metatunes",
    storageBucket: "metatunes.appspot.com",
    messagingSenderId: "733012754970",
    appId: "1:733012754970:web:167eaf98e49aa2cae787a3",
    measurementId: "G-GFBWN2J0HT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
// const db2 = Firebase.firestore();
export { app, provider, db };