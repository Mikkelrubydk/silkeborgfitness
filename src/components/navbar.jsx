import "/src/app/anders.css"; // Husk at tilføje CSS-fil
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("/profileimage.webp");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result); // Sætter det valgte billede som `src`.
      };
      reader.readAsDataURL(file);
    }
  };

  // Vælg billede baseret på den aktuelle rute
  const imageSrc = router.pathname === "/" ? "/logo.svg" : "/arrow.svg"; // Brug stien til billederne i public-mappen

  return (
    <div className="navbar flex justify-between px-5 py-10 items-center">
      <div>
        <Image
          className="navbar-pil-tilbage"
          src={imageSrc}
          alt={
            router.pathname === "/" ? "SilkeborgFitness logo" : "Tilbage pil"
          }
          width={100}
          height={100}
          onClick={() => {
            if (router.pathname !== "/") {
              router.back();
            }
          }}
        />
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
            width={40}
            height={40}
            style={{ cursor: "pointer" }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }} // Skjuler filvælgeren
          />
        </label>
      </div>
    </div>
  );
};

export default Navbar;
