import React, { useEffect, useState } from "react";
import "./LoginModal.css";
import useLocalStorage from "../../hooks/useLocalStorage";

function LoginModal({ setShowLoginModal, setIsLoggedIn }) {
  const { logInUser } = useLocalStorage();

  const [currState, setCurrState] = useState("Login");

  const [users, setUsers] = useState({});

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  function signUpUser() {
    const postBody = {
      name: username,
      password: password,
      email: email,
      favorites: [],
    };
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBody),
    };
    fetch(`http://localhost:3000/users`, postOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    signUpUser();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const success = logInUser(username, password, users);
    if (success) {
      alert("Login successful!");
      setShowLoginModal(false);
      setIsLoggedIn(true);
      window.location.reload();
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-modal">
      <form
        className="login-modal-container"
        onSubmit={currState === "Login" ? handleLogin : handleSignUp}
      >
        <div className="login-modal-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLoginModal(false)}
            src="/small_logo.png"
            alt=""
          />
        </div>
        <div className="login-modal-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="email"
              placeholder="Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <input
            type="text"
            placeholder="Your name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">
          {currState === "Sign up" ? "Sign up" : "Login"}
        </button>
        {currState === "Login" ? (
          <p>
            Don't have an account?{" "}
            <span onClick={() => setCurrState("Sign up")}>Sign Up</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginModal;
