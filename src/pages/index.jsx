import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase"; // Husk at importere db og auth
import { doc, getDoc } from "firebase/firestore"; // Importer Firestore funktioner
import SkridtCirkeldiagram from "../components/SkridtCirkeldiagram"; // Import af komponenten
import Link from "next/link";

export default function Home() {
  const [theme, setTheme] = useState("standard");

  useEffect(() => {
    const fetchTheme = async () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        const userId = auth.currentUser?.uid;
        if (userId) {
          try {
            const userDoc = await getDoc(doc(db, "user_profiles", userId));
            if (userDoc.exists()) {
              const firestoreTheme = userDoc.data().colortheme;
              setTheme(firestoreTheme || "standard");
            } else {
              setTheme("standard");
            }
          } catch (error) {
            console.error("Fejl ved at hente tema fra Firebase:", error);
          }
        }
      }
    };

    fetchTheme();
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(
      "theme-blue",
      "theme-yellow",
      "theme-pink",
      "theme-grey",
      "theme-standard"
    );
    document.documentElement.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <main>
    <div className="forside_container">
      <div className="forside_box forside_logbog">
        <div className="top-left">Logbog</div>
        <div className="center">
          <img src="dumbbell.svg" alt="Logbog Billede" />
        </div>
        <div className="bottom-left">Sidst noteret: 29/11</div>
      </div>
  
      <div className="forside_box forside_skridt">
        <SkridtCirkeldiagram />
      </div>
  
      <Link href="/achievement">
        <div className="forside_box forside_praestationer">
          <div className="top-left">Præstationer</div>
          <div className="center">
            <img src="medal.svg" alt="Præstationer Billede" />
          </div>
          <div className="bottom-left">Ny præmie låst op!</div>
        </div>
        <div className="alert-icon"></div>
      </Link>
  
      <div className="forside_box forside_graf">Oversigt over travlhed</div>
  
      <div className="forside_box forside_tutorials">
        <div className="top-left">Tutorials</div>
        <div className="center">
          <img src="video.svg" alt="Tutorials Billede" />
        </div>
      </div>
  
      <div className="forside_box forside_ekstra">
        <div className="top-left">Ekstra</div>
        <div className="center"></div>
        </div>
      </div>
  </main>
  );
}
