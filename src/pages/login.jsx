import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    // Check om brugeren allerede er logget ind
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      router.push("/"); // Omdiriger til forsiden, hvis brugeren allerede er logget ind
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      localStorage.setItem("isLoggedIn", "true"); // Gemmer loginstatus
      router.push("/"); // Omdiriger til forsiden
    } catch (error) {
      alert(`Fejl: ${error.message}`);
    }
  };

  return (
    <main className="loginform">
      <div>
        <form onSubmit={handleLogin} className="form">
          <h1 className="login-overskrift">Log ind</h1>
          <div className="input-icon">
            <Image
              className="login-icon"
              src="/email.webp"
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
              src="/padlock.webp"
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
          src="/logo.svg"
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
          <Link className="link" href="/register">
            Tilmeld dig
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
