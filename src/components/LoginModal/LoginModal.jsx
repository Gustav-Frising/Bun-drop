import React from 'react';
import "./LoginModal.css";

function LoginModal({ setShowLoginModal, setIsLoggedIn }) {
  const [currState, setCurrState] = useState("Login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
