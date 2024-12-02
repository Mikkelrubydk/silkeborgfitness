// components/LogoutButton.js
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Du er nu logget ud.");
      router.push("/"); // Redirect til forsiden efter logout (kan ændres til en login-side eller anden side)
    } catch (error) {
      console.error("Fejl ved logout:", error);
    }
  };

  return <button onClick={handleLogout}>Log ud</button>;
};

export default LogoutButton;
