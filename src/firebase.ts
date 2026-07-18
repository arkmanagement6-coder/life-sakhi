import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Enterprise Firebase Configuration
// Uses environment variables with standard fallbacks for local sandbox development
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBeexXG_Tz-3ucYB90nT97TVJTLOaSjFn4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "life-sakhi.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "life-sakhi",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "life-sakhi.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "476613655688",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:476613655688:web:2431b5026a2d17c677733d"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const emailProvider = new EmailAuthProvider();

export { app, auth, db, googleProvider, emailProvider };
