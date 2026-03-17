import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJmHTPJycZyToFV8qDVO11ZCkBKhCvwqI",
  authDomain: "ecommerce-0420.firebaseapp.com",
  projectId: "ecommerce-0420",
  storageBucket: "ecommerce-0420.firebasestorage.app",
  messagingSenderId: "286333614577",
  appId: "1:286333614577:web:5306f0bd1fe9514a81ac50",
  measurementId: "G-XY34Y21NSK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);