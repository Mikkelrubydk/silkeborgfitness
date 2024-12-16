import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import Image from "next/image";
import Link from "next/link"; // Importer Link fra next/link
import { useRouter } from "next/router"; // Importer useRouter
import EmailIcon from "../../public/email.webp";
import PasswordIcon from "../../public/padlock.webp";
import Logo from "../../public/logo.svg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isClient, setIsClient] = useState(false); // Til at tjekke, om vi er på klienten
  const router = useRouter(); // Brug useRouter

  useEffect(() => {
    setIsClient(true); // Når komponenten er rendere på klienten, sættes isClient til true
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      localStorage.setItem("isLoggedIn", "true"); // Gem login-status i localStorage

      if (isClient) {
        router.push("/"); // Brug router.push i stedet for window.location.href
      }
    } catch (error) {
      alert(`Fejl: ${error.message}`);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <main className="loginform">
      <div>
        <form onSubmit={handleLogin} className="form">
          <h1 className="login-overskrift">Log ind</h1>
          <div className="input-icon">
            <Image
              className="login-icon"
              src={EmailIcon}
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
              src={PasswordIcon}
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
        <Image src={Logo} alt="login page image" width={200} height={200} />
      </div>
      <div className="login-tekst">
        <h2>SILKEBORG FITNESS CENTER</h2>
        <hr />
        <p>
          ikke medlem endnu?{" "}
          <Link href="/register">
            <button className="link">Tilmeld dig</button>
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
