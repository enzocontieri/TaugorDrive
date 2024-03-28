// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNg5BrhmjGPKuzA3JHp6Q6xOM-kNpteSs",
  authDomain: "teste-taugor-8d480.firebaseapp.com",
  projectId: "teste-taugor-8d480",
  storageBucket: "teste-taugor-8d480.appspot.com",
  messagingSenderId: "651716803471",
  appId: "1:651716803471:web:e1ce1e9a2992ac3e4ae9fa"
};

/// Inicialize o aplicativo Firebase
const app = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


// Exporte os módulos que você precisa usar em seu aplicativo
export const FIREBASE_APP = app;
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const DB = getFirestore(FIREBASE_APP);


