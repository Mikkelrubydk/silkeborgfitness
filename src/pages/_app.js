import "../app/globals.css";
import "../app/Julie.css";
import "../app/globals.css";
import "../app/mikkel.css";

import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && !["/login", "/register"].includes(router.pathname)) {
        router.push("/login"); // Omdiriger til login-siden, hvis brugeren ikke er logget ind
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Undgå at vise Navbar på login- og register-sider
  const showNavbar = !["/login", "/register"].includes(router.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
