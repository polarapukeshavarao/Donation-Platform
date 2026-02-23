import { useState } from "react";
import { useNavigate } from "react-router-dom";
import donateImg from "../assets/donate.jpg";
import helpImg from "../assets/help.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = () => {
    // frontend-only auth
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userName", "HopeDrop User");
    navigate("/");
  };

  return (
    <div className={`auth-wrapper ${isRegister ? "register" : ""}`}>
      
      {/* IMAGE PANEL */}
      <div className="auth-image">
        <h1>❤️ HopeDrop</h1>
        <p>Donate essentials. Save lives.</p>

        <img
          src={isRegister ? helpImg : donateImg}
          alt="Donation"
        />

        <button
          className="toggle-btn"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login →"
            : "New here? Register →"}
        </button>
      </div>

      {/* FORM PANEL */}
      <div className="auth-form">
        <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>

        {isRegister && <input placeholder="Full Name" />}

        <input placeholder="Email address" />
        <input type="password" placeholder="Password" />

        {isRegister && (
          <input type="password" placeholder="Confirm Password" />
        )}

        <button className="auth-btn" onClick={handleSubmit}>
          {isRegister ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}