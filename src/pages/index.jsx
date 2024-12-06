import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase"; // Husk at importere db og auth
import { doc, getDoc } from "firebase/firestore"; // Importer Firestore funktioner
import SkridtCirkeldiagram from "../components/SkridtCirkeldiagram"; // Import af komponenten
import Link from "next/link";

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

  return (
    <main>
      <div className="forside_container">
        <div className="forside_box forside_logbog">
          <div className="top-left">Logbog</div>
          <div className="center">
            <img src="dumbbell.png" alt="Logbog Billede" />
          </div>
          <div className="bottom-left">Sidst noteret: 29/11</div>
        </div>

        {/* Bruger SkridtCirkeldiagram her */}
        <div className="forside_box forside_skridt">
          <SkridtCirkeldiagram />
        </div>

<Link href="/achievement">
        <div className="forside_box forside_praestationer">
          <div className="top-left">Præstationer</div>
          <div className="center">
            <img src="medal.png" alt="Præstationer Billede" />
          </div>
          <div className="bottom-left">Ny præmie låst op!</div>
        </div>
        <div className="alert-icon"></div>
        
        </Link>

        <div className="forside_box forside_graf">Oversigt over travlhed</div>

        <div className="forside_box forside_tutorials">
          <div className="top-left">Tutorials</div>
          <div className="center">
            <img src="video.png" alt="Tutorials Billede" />
          </div>
        </div>


      </div>
    </main>
  );
}
