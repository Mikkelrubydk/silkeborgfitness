import "/src/app/anders.css"; // Husk at tilføje CSS-fil
import Image from "next/image";
import logo from "/public/logo.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <Image
          className="navbar-pil-tilbage"
          src={logo}
          alt="SilkeborgFitness logo"
          width={200}
          height={200}
        />
      </div>
      <div>
        <h2 className="navbar-overskrift">Træningsoversigt</h2>
      </div>
      <div>
        <img className="navbar-profilbillede" src="" alt="" />
      </div>
    </div>
  );
};

export default Navbar;
