import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

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

// Eksportér Auth og Database
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
