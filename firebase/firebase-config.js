// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCr0ubkIluppiwRtivpp6p8tkXxzS5EcT4",
  authDomain: "languageapp-1c070.firebaseapp.com",
  projectId: "languageapp-1c070",
  storageBucket: "languageapp-1c070.appspot.com",
  messagingSenderId: "212157690327",
  appId: "1:212157690327:web:e53446fa309e07d86d9b92",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
