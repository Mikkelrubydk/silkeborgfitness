import "/src/app/anders.css"; // Husk at tilføje CSS-fil
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "/public/logo.svg";
import arrow from "/public/arrow.svg";

const Navbar = () => {
  const router = useRouter();

  // Vælg billede baseret på den aktuelle rute
  const imageSrc = router.pathname === "/" ? logo : arrow;

  return (
    <div className="navbar">
      <div>
        <Image
          className="navbar-pil-tilbage"
          src={imageSrc}
          alt={
            router.pathname === "/" ? "SilkeborgFitness logo" : "Tilbage pil"
          }
          width={200}
          height={200}
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
        <Image
          className="navbar-profilbillede"
          src=""
          alt="Profilbillede"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default Navbar;
