import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

function Navbar({ setShowLoginModal, isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { logoutUser } = useLocalStorage();

  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <>
      <nav className={`navbar ${isHomePage ? "home-navbar" : "navbar"}`}>
        <div className="navbar-left">
          <ul className="navbar-links">
            <Link to={"/"}>
              <li className="home">Home</li>
            </Link>
            <a href="#footer">About</a>
            <a href="#category-menu">Menu</a>
            <a href="#footer">Contact</a>
          </ul>
        </div>
        <div className="logo">
          <img src="/Bun_drop_logo.png" alt="image" />
        </div>
        <div className="navbar-right">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => setShowLoginModal(true)}>Login</button>
          )}
          <Link to={"/cart"}>
            <button>Cart</button>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
