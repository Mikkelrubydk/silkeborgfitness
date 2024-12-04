import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Du er nu logget ud.");

      // Opdater Context eller global state for at rydde brugerdata
      setUser(null); // Hvis du bruger Context eller useState til at holde brugerinfo

      // Redirect til forsiden eller login-side
      router.push("/");
    } catch (error) {
      console.error("Fejl ved logout:", error);
    }
  };

  return <button onClick={handleLogout}>Log ud</button>;
};

export default LogoutButton;
