import { useState } from "react";
import "/src/app/anders.css";
import LogOut from "../components/logoutbtn";

const Navbar = () => {
  return (
    <div className="profil-overskrift">
      <h2 className="profil-person">Mikkel Høj Ruby</h2>
      <LogOut />
    </div>
  );
};

export default Navbar;
