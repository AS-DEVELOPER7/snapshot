// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0JoqBRCN6GVIUe_zyzTym47rLf1T3qKE",
  authDomain: "unsplash-ede8f.firebaseapp.com",
  projectId: "unsplash-ede8f",
  storageBucket: "unsplash-ede8f.appspot.com",
  messagingSenderId: "982133860619",
  appId: "1:982133860619:web:89ac58e15cd2e42d979a0e",
  measurementId: "G-CYGC5P8B28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const auth = getAuth(app);
