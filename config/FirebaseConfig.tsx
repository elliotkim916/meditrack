// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBCi0VmDGmwx7NeHh0Ikc150wlVKlmTudI',
  authDomain: 'meditrack-8ca62.firebaseapp.com',
  projectId: 'meditrack-8ca62',
  storageBucket: 'meditrack-8ca62.firebasestorage.app',
  messagingSenderId: '882197411144',
  appId: '1:882197411144:web:fa1b324270392cc3faef7d',
  measurementId: 'G-071SS41BBJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
