import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Hvis du bruger Firebase Realtime Database
import { getFirestore } from "firebase/firestore"; // Hvis du bruger Firebase Firestore

// Firebase konfiguration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialiser Firebase, hvis den ikke er initialiseret endnu
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Eksportér Auth, Database og Firestore
const auth = getAuth(app);
const database = getDatabase(app); // Hvis du bruger Firebase Realtime Database
const firestore = getFirestore(app); // Hvis du bruger Firebase Firestore

export { auth, database, firestore };
