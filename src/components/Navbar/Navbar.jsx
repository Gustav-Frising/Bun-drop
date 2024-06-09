import React from 'react';
import "./Navbar.css";


function Navbar() {
 
  return (
    <>
      <nav className={`navbar ${isHomePage ? "home-navbar" : "navbar"}`}>
        <div className="navbar-left">
          <ul className="navbar-links">
            <Link to={"/"}>
              <li className="home">Home</li>
            </Link>
            <li>About</li>
            <li>Menu</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="logo">
          <img src="/Bun_drop_logo.png" alt="image" />
        </div>
        <div className="navbar-right">
          
            <button onClick={handleLogout}>Logout</button>        
          <Link to={"/cart"}>
            <button>Cart</button>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
