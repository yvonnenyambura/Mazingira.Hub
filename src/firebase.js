
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCbQeQBsjy3VdPzE6Oap0YcAqgxWfgVykU",
  authDomain: "mazingirahu.firebaseapp.com",
  projectId: "mazingirahu",
  storageBucket: "mazingirahu.firebasestorage.app",
  messagingSenderId: "318497735625",
  appId: "1:318497735625:web:53158f18005237cf971e18"
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

