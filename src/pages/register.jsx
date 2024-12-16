import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { db } from "../lib/firebase"; // Importer Firestore
import { doc, setDoc } from "firebase/firestore"; // Funktioner til at oprette og opdatere dokumenter
import Link from "next/link";
import Image from "next/image";

// Mikkel

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Opret bruger med email og password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Gem brugerens navn og email i Firestore under UID
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name, // Gem navn
        email: formData.email, // Gem email
      });

      alert("Bruger oprettet!");

      // Navigation sker efter succesfuld oprettelse og gemning i Firestore
      router.push("/"); // Omdiriger til forsiden
    } catch (error) {
      alert(`Fejl: ${error.message}`);
    }
  };

  return (
    <main className="loginform">
      <div>
        <form onSubmit={handleRegister} className="form">
          <h1 className="login-overskrift">Registrer dig</h1>
          <div className="input-icon">
            <Image
              className="login-icon"
              src="/user.webp"
              alt="user icon"
              width={20}
              height={20}
            />
            <input
              type="text"
              placeholder="Navn"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
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
          <button type="submit">Opret</button>
        </form>
      </div>
      <div className="login-tekst">
        <h2>SILKEBORG FITNESS CENTER</h2>
        <hr />
        <p>
          Har du allerede en bruger?{" "}
          <Link className="link" href="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
