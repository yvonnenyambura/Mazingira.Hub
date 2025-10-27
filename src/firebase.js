<<<<<<< HEAD
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





=======
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAiKC9jQelbLiFQEuxzIXlhkzYjH0LDAFE",
  authDomain: "mazingira-hub.firebaseapp.com",
  projectId: "mazingira-hub",
  storageBucket: "mazingira-hub.firebasestorage.app",
  messagingSenderId: "140473040895",
  appId: "1:140473040895:web:bb5287f6f15877221c31ca",
  measurementId: "G-GNVYK4DSBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Collections
export const usersCollection = collection(db, 'users');
export const complaintsCollection = collection(db, 'complaints');

// Users
export const setUserRole = (userId, role) => setDoc(doc(db, 'users', userId), { role });
export const getUserRole = async (userId) => {
  try {
    const docSnap = await getDoc(doc(db, 'users', userId));
    return docSnap.exists() ? docSnap.data().role : null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};

// Complaints
export const addComplaint = (complaint) => addDoc(complaintsCollection, complaint);
export const getComplaint = async () => {
  const snapshot = await getDocs(complaintsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const updateComplaint = (id, complaint) => updateDoc(doc(db, 'complaints', id), complaint);
export const deleteComplaint = (id) => deleteDoc(doc(db, 'complaints', id));
>>>>>>> 9b11a35a85b735376f2b74ca68ebaed645e7e809
