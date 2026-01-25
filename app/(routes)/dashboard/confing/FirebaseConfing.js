// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "meeting-3f3dc.firebaseapp.com",
  projectId: "meeting-3f3dc",
  storageBucket: "meeting-3f3dc.firebasestorage.app",
  messagingSenderId: "101064136354",
  appId: "1:101064136354:web:134bc7467f04bccdf429fb",
  measurementId: "G-0VEGP5F976"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
