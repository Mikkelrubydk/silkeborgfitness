import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { db } from "../lib/firebase"; // Importer Firestore
import { doc, setDoc } from "firebase/firestore"; // Funktioner til at oprette og opdatere dokumenter
import Image from "next/image";
import Link from "next/link"; // Importer Link komponenten fra next/link
import EmailIcon from "../../public/email.webp";
import PasswordIcon from "../../public/padlock.webp";
import UserIcon from "../../public/user.webp";
import Logo from "../../public/logo.svg";

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
              src={UserIcon}
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
          <button type="submit">Opret</button>
        </form>
      </div>
      <div className="login-tekst">
        <Image src={Logo} alt="Logo" width={200} height={200} />
        <h2>SILKEBORG FITNESS CENTER</h2>
        <hr />
        <p>
          Har du allerede en bruger?{" "}
          <Link href="/login">
            <button className="link">Login</button>
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
