import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import Image from "next/image";

// Mikkel

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isClient, setIsClient] = useState(false); // Til at tjekke, om vi er på klienten
  const router = useRouter();

  // Brug useEffect til at sikre, at koden kun kører på klienten
  useEffect(() => {
    setIsClient(true); // Når komponenten er rendere på klienten, sættes isClient til true
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      localStorage.setItem("isLoggedIn", "true"); // Gem login-status i localStorage

      if (isClient) {
        router.push("/"); // Omdiriger til forsiden efter login (kun på klienten)
      }
    } catch (error) {
      alert(`Fejl: ${error.message}`);
    }
  };

  // Funktion til at navigere til registreringssiden
  const handleRegisterNavigation = () => {
    if (isClient) {
      router.push("/register"); // Omdiriger til registreringssiden (kun på klienten)
    }
  };

  if (!isClient) {
    return null; // Sørg for, at der ikke sker noget rendering på serveren
  }

  return (
    <main className="loginform">
      <div>
        <form onSubmit={handleLogin} className="form">
          <h1 className="login-overskrift">Log ind</h1>
          <div className="input-icon">
            <Image
              className="login-icon"
              src="./email.webp"
              alt="email icon"
              width={20}
              height={20}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="input-icon">
            <Image
              className="login-icon"
              src="./padlock.webp"
              alt="password icon"
              width={20}
              height={20}
            />
            <input
              type="password"
              placeholder="Adgangskode"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button type="submit">Log ind</button>
        </form>
      </div>
      <div className="login-logo">
        <Image
          src="./logo.svg"
          alt="login page image"
          width={200}
          height={200}
        />
      </div>
      <div className="login-tekst">
        <h2>SILKEBORG FITNESS CENTER</h2>
        <hr />
        <p>
          ikke medlem endnu?{" "}
          <button className="link" onClick={handleRegisterNavigation}>
            Tilmeld dig
          </button>
        </p>
      </div>
    </main>
  );
};

export default Login;
