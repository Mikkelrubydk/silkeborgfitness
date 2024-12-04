import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import Image from "next/image";
import { auth, database } from "@/lib/firebase";

const Navbar = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("/profileimage.webp");
  const [isClient, setIsClient] = useState(false);
  const [theme, setTheme] = useState("standard");

  // Sørg for, at vi kun kører kode på klienten
  useEffect(() => {
    setIsClient(true);

    // Hent temaet fra localStorage, hvis tilgængeligt
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const profileImageRef = ref(
          database,
          `user_profiles/${userId}/profileImage`
        );

        // Hent Base64-kodet billede fra Firebase Realtime Database
        get(profileImageRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setProfileImage(snapshot.val()); // Sæt Base64-strengen som profilbillede
            } else {
              console.log("Ingen profilbillede fundet.");
            }
          })
          .catch((error) => {
            console.log("Fejl ved hentning af billede:", error);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024; // 2 MB i bytes
    if (file.size > maxSize) {
      alert("Billedet er for stort. Maksimal størrelse er 2 MB.");
      return;
    }

    // Opret Base64 URL for billedet
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result; // Base64-kodet billede

      if (base64Image && auth.currentUser) {
        const userId = auth.currentUser.uid;
        const profileImageRef = ref(
          database,
          `user_profiles/${userId}/profileImage`
        );

        // Gem Base64-strengen af billedet i Firebase Realtime Database
        try {
          await set(profileImageRef, base64Image);
          setProfileImage(base64Image); // Opdater profilbilledet med Base64-strengen
        } catch (error) {
          console.error("Fejl ved gemning af billede:", error);
          alert("Kunne ikke uploade profilbillede. Prøv igen.");
        }
      } else {
        alert("Ingen bruger logget ind.");
      }
    };

    reader.readAsDataURL(file); // Læs filen som Base64-streng
  };

  const imageSrc = router.pathname === "/" ? "/logo.svg" : "/arrow.svg";

  if (!isClient) {
    return null; // Returner null under server-side rendering
  }

  return (
    <div className="navbar flex justify-between px-5 py-10 items-center">
      <div>
        {router.pathname === "/" ? (
          <Image
            src="/logo.svg" // Vis logoet på forsiden
            alt="Silkeborg Fitness Logo"
            width={100}
            height={100}
          />
        ) : (
          <svg
            className={`navbar-pil-tilbage theme-${theme}`} // Dynamisk klasse til temaet
            onClick={() => router.back()}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 58.78 110.01"
            fill="none"
            stroke="currentColor" // Farven styres af CSS
            strokeWidth="10"
            width="40"
            height="40"
          >
            <path
              d="M56.65,107.9S8.68,59.51,4.22,55.01C8.64,50.55,56.65,2.11,56.65,2.11"
              className="cls-1"
            />
          </svg>
        )}
      </div>
      <div>
        <h2 className="navbar-overskrift">Træningsoversigt</h2>
      </div>
      <div>
        <label className="navbar-profil-label">
          <Image
            className="navbar-profilbillede rounded-full"
            src={profileImage}
            alt="Profilbillede"
            width={50}
            height={50}
            style={{
              cursor: "pointer",
              height: "50px",
              objectFit: "cover", // Sørger for korrekt beskæring af billedet
            }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </label>
      </div>
    </div>
  );
};

export default Navbar;
