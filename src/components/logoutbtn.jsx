import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

// Mikkel

const LogoutButton = () => {
  const router = useRouter();

  // Logout funktion som kaldes når knappen klikkes
  const handleLogout = async () => {
    try {
      // Log ud af Firebase
      await signOut(auth);

      // Fjern login-status fra localStorage
      localStorage.removeItem("isLoggedIn");

      // Omdiriger brugeren til login-siden
      router.push("/login");
    } catch (error) {
      alert(`Fejl ved udlogning: ${error.message}`);
    }
  };

  return <button onClick={handleLogout}>Log ud</button>;
};

export default LogoutButton;
