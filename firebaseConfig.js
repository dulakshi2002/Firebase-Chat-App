// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX0vcGfJDUSyHPiT_fAcRj2ZgYe7B0Ad4",
  authDomain: "fir-chat-5ca4b.firebaseapp.com",
  projectId: "fir-chat-5ca4b",
  storageBucket: "fir-chat-5ca4b.appspot.com",
  messagingSenderId: "425550223101",
  appId: "1:425550223101:web:35e9f1aeecd2243cd7d094"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');
