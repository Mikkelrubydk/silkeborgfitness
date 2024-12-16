import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import "../app/globals.css";
import "../app/julle.css";
import "../app/mikkel.css";
import "../app/anders.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [theme, setTheme] = useState("standard");

  // Læs tema fra localStorage ved opstart og sæt det
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme); // Opdater state med gemt tema
    } else {
      setTheme("standard"); // Brug standardtema, hvis der ikke er noget gemt
    }
  }, []); // Denne effekt kører kun én gang ved opstart

  // Lyt efter ændringer i localStorage (i tilfælde af, at temaet ændres fra et andet sted i appen)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme); // Opdater state, hvis temaet ændres via localStorage
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Overvåg autentificeringstilstand og omdiriger ikke-loggede brugere
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && !["/login", "/register"].includes(router.pathname)) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Undgå at vise Navbar på login- og register-sider
  const showNavbar = !["/login", "/register"].includes(router.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Component
        {...pageProps}
        setTheme={setTheme} // Pass tema-styring ned til siderne
        currentTheme={theme} // Pass det nuværende tema
      />
    </>
  );
}

export default MyApp;
