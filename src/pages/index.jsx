import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase"; // Husk at importere db og auth
import { doc, getDoc } from "firebase/firestore"; // Importer Firestore funktioner

export default function Home() {
  const [theme, setTheme] = useState("standard");

  useEffect(() => {
    const fetchTheme = async () => {
      // Tjek om der er et tema gemt i localStorage
      const storedTheme = localStorage.getItem("theme");

      if (storedTheme) {
        // Hvis der er et tema i localStorage, brug det
        setTheme(storedTheme);
      } else {
        // Hvis der ikke er et tema i localStorage, hent det fra Firestore
        const userId = auth.currentUser?.uid; // Få brugerens ID
        if (userId) {
          try {
            const userDoc = await getDoc(doc(db, "user_profiles", userId));
            if (userDoc.exists()) {
              const firestoreTheme = userDoc.data().colortheme;
              if (firestoreTheme) {
                setTheme(firestoreTheme); // Sæt temaet hvis det findes
              } else {
                setTheme("standard"); // Hvis ingen tema er gemt, brug standard
              }
            } else {
              setTheme("standard"); // Hvis dokumentet ikke findes, brug standard
            }
          } catch (error) {
            console.error("Fejl ved at hente tema fra Firebase:", error);
          }
        }
      }
    };

    fetchTheme();
  }, []);

  // Funktion til at ændre tema
  useEffect(() => {
    // Fjern alle eksisterende tema-klasser
    document.documentElement.classList.remove(
      "theme-blue",
      "theme-yellow",
      "theme-pink",
      "theme-grey",
      "theme-standard"
    );

    // Tilføj den valgte tema-klasse
    document.documentElement.classList.add(`theme-${theme}`);

    // Gem temaet i localStorage for næste gang
    localStorage.setItem("theme", theme);
  }, [theme]); // Kør denne effect, hver gang temaet ændres

  return <main></main>;
}
