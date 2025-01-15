// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "blogger-sworld-mern.firebaseapp.com",
    projectId: "blogger-sworld-mern",
    storageBucket: "blogger-sworld-mern.firebasestorage.app",
    messagingSenderId: "1019341284323",
    appId: "1:1019341284323:web:e429b07f2a7007caf4b6d6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);