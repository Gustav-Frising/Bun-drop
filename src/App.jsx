import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Ceckout from "./pages/Checkout/Checkout";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/LoginModal/LoginModal";
import Confirmation from "./pages/Confirmation/Confirmation";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userInfo } = useLocalStorage(); // Retrieve userInfo from useLocalStorage hook

  useEffect(() => {
    setIsLoggedIn(!!userInfo); // Update isLoggedIn based on userInfo presence
  }, [userInfo]); // Watch for changes in userInfo to update isLoggedIn

  return (
    <>
      {showLoginModal ? (
        <LoginModal
          setShowLoginModal={setShowLoginModal}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <></>
      )}
      <div className="app">
        <Navbar
          setShowLoginModal={setShowLoginModal}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Ceckout />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
