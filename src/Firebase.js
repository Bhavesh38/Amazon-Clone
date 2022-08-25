// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCPvAmlAfK6Bfv-MizLqMps2nWdfwEcI6g",
  authDomain: "clone-1199c.firebaseapp.com",
  projectId: "clone-1199c",
  storageBucket: "clone-1199c.appspot.com",
  messagingSenderId: "60930442072",
  appId: "1:60930442072:web:d9e99939018315d71a5b2d",
  measurementId: "G-P50X7N4JE2",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
