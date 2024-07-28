// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe7N4x7EjmiNQsVaz_t9buECwBAuNVGiA",
  authDomain: "thora-a6035.firebaseapp.com",
  projectId: "thora-a6035",
  storageBucket: "thora-a6035.appspot.com",
  messagingSenderId: "170932136017",
  appId: "1:170932136017:web:636869f34ba423b13a3070",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
