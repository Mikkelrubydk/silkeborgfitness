import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import Image from "next/image";
import Link from "next/link"; // Importer Link komponenten
import { auth, database } from "@/lib/firebase";

// Mikkel

const Navbar = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [theme, setTheme] = useState("standard");

  // Sørg for, at vi kun kører kode på klienten
  useEffect(() => {
    setIsClient(true);

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

        get(profileImageRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setProfileImage(snapshot.val());
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

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      if (base64Image && auth.currentUser) {
        const userId = auth.currentUser.uid;
        const profileImageRef = ref(
          database,
          `user_profiles/${userId}/profileImage`
        );

        try {
          await set(profileImageRef, base64Image);
          setProfileImage(base64Image);
        } catch (error) {
          console.error("Fejl ved gemning af billede:", error);
          alert("Kunne ikke uploade profilbillede. Prøv igen.");
        }
      } else {
        alert("Ingen bruger logget ind.");
      }
    };

    reader.readAsDataURL(file);
  };

  const imageSrc = router.pathname === "/" ? "./logo.svg" : "./arrow.svg";

  let navbarHeading;
  switch (router.pathname) {
    case "/":
      navbarHeading = "";
      break;
    case "/profile":
      navbarHeading = "Profil";
      break;
    case "/achievement":
      navbarHeading = "Præstationer";
      break;
    case "/workouttracker":
      navbarHeading = "Logbog";
      break;
    case "/teamtraining":
      navbarHeading = "Holdtræning";
      break;
    case "/addworkout":
      navbarHeading = "Opret Øvelse";
      break;
    case "/illustration":
      navbarHeading = "Benpress";
      break;
    case "/machines":
      navbarHeading = "Maskiner";
      break;
    case "/illustration2":
      navbarHeading = "Squat";
      break;
    case "/illustration3":
      navbarHeading = "Pull up";
      break;
    case "/illustration4":
      navbarHeading = "Bænkpress";
      break;
    case "/bookteam":
      navbarHeading = "Holdbooking";
      break;
  }

  if (!isClient) {
    return null;
  }

  return (
    <div className="navbar flex justify-between px-5 py-10 items-center">
      <div>
        {router.pathname === "/" ? (
          <Image
            src="./logo.svg"
            alt="Silkeborg Fitness Logo"
            width={150}
            height={150}
          />
        ) : (
          <svg
            className={`navbar-pil-tilbage theme-${theme}`}
            onClick={() => router.back()}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 58.78 110.01"
            fill="none"
            stroke="currentColor"
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
        <h2 className="navbar-overskrift">{navbarHeading}</h2>
      </div>
      <div>
        {router.pathname === "/profile" ? (
          <label className="navbar-profil-label">
            <Image
              className="navbar-profilbillede rounded-full"
              src={profileImage || "./profileimage.webp"}
              alt="Profilbillede"
              width={70}
              height={70}
              style={{
                cursor: "pointer",
                height: "70px",
                objectFit: "cover",
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none", marginTop: "10px" }}
            />
          </label>
        ) : (
          <Link href="/profile">
            <Image
              className="navbar-profilbillede rounded-full"
              src={profileImage || "./profileimage.webp"}
              alt="Profilbillede"
              width={70}
              height={70}
              style={{
                cursor: "pointer",
                height: "70px",
                objectFit: "cover",
              }}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
