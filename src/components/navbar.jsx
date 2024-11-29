import { useState } from "react";
import "/src/app/anders.css"; // Husk at tilføje CSS-fil
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <Image
          className="navbar-pil-tilbage"
          src={logo}
          alt="SilkeborgFitness logo"
          width={100}
          height={100}
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
