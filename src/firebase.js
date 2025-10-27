// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQJv-ip15W3h1NoxoAkjazdU4RlZkAQRY",
  authDomain: "mazingira-hub-e930a.firebaseapp.com",
  projectId: "mazingira-hub-e930a",
  storageBucket: "mazingira-hub-e930a.appspot.com",
  messagingSenderId: "202213806597",
  appId: "1:202213806597:web:9985bbfd52af4a16c1c26c",
  measurementId: "G-5LRDCJZVPB",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;





