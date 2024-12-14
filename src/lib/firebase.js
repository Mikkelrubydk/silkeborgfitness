import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Firebase-konfiguration (direkte i koden, uden at bruge miljøvariabler)
const firebaseConfig = {
  apiKey: "AIzaSyAhAfP5QPG4v17eNjiolZWc4JrA48sPW5o",
  authDomain: "silkeborgfitness-2ff81.firebaseapp.com",
  projectId: "silkeborgfitness-2ff81",
  storageBucket: "silkeborgfitness-2ff81.appspot.com",
  messagingSenderId: "din-sender-id",
  appId: "din-app-id",
  databaseURL: "https://silkeborgfitness-2ff81-default-rtdb.firebaseio.com/",
};

// Initialiser Firebase, hvis den ikke er initialiseret endnu
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialiser både Firestore og Realtime Database
const db = getFirestore(app); // Firestore
const database = getDatabase(app); // Realtime Database

// Initialiser Firebase Authentication
const auth = getAuth(app);

// Eksporter Auth og Databaser
export { auth, database, db };
