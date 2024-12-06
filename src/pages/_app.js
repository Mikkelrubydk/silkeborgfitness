import "../app/globals.css";
import "../app/julie.css";
import "../app/mikkel.css";
import "../app/anders.css";

import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [theme, setTheme] = useState("standard");

  // Funktion til at ændre tema globalt
  const changeTheme = (theme) => {
    document.documentElement.classList.remove(
      "theme-blue",
      "theme-yellow",
      "theme-pink",
      "theme-grey",
      "theme-standard"
    );
    document.documentElement.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  };

  // Læs tema fra localStorage ved opstart
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("standard");
    }
  }, []);

  // Opdater tema, når `theme` ændres
  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

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
