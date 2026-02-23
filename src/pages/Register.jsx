import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  // if user came from role page
  const redirectTo = location.state?.redirectTo || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // fake register + login
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userName", name);

    navigate(redirectTo);
  };

  return (
    <div className="auth-page">
      {/* LEFT */}
      <div className="auth-left teal">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        <h1>Create Account</h1>
        <p>Join HopeDrop and start helping communities today.</p>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <h2>Register</h2>

        <label>Name</label>
        <input
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="primary" onClick={handleRegister}>
          Create Account →
        </button>

        <p>
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}