import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDiM0XXp1RnTBYFhfV8HBAyRsgfQBkaoiY",
    authDomain: "cert-block.firebaseapp.com",
    projectId: "cert-block",
    storageBucket: "cert-block.firebasestorage.app",
    messagingSenderId: "1076411796167",
    appId: "1:1076411796167:web:19bb28a9da77b36a89cce2"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
