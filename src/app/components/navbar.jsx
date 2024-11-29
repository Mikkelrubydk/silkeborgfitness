import { useState } from 'react';
import '/src/app/anders.css';  // Husk at tilføje CSS-fil

const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <img className='navbar-pil-tilbage' src="" alt="" />
      </div>
      <div>
        <h2 className='navbar-overskrift'>Træningsoversigt</h2>
        </div>
      <div>
        <img className='navbar-profilbillede' src="" alt="" />
      </div>
    </div>
  );
};

export default Navbar;