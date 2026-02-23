import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  // where user wanted to go (donor / recipient / etc.)
  const redirectTo = location.state?.redirectTo || "/";

  // MODE CONTROLLED BY URL
  const [isRegister, setIsRegister] = useState(
    location.pathname === "/register"
  );

  // keep mode in sync with URL
  useEffect(() => {
    setIsRegister(location.pathname === "/register");
  }, [location.pathname]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password || (isRegister && !name)) {
      alert("Please fill all fields");
      return;
    }

    // FAKE AUTH (frontend only)
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userName", name || "User");

    navigate(redirectTo);
  };

  const switchMode = () => {
    navigate(isRegister ? "/login" : "/register", {
      state: { redirectTo }
    });
  };

  return (
    <div className={`auth-wrapper ${isRegister ? "switch" : ""}`}>
      
      {/* LEFT PANEL */}
      <div className="auth-panel left">
        <h1>{isRegister ? "Welcome Back!" : "Hello There!"}</h1>
        <p>
          {isRegister
            ? "Already have an account?"
            : "New to HopeDrop?"}
        </p>

        <button onClick={switchMode}>
          {isRegister ? "Login →" : "Register →"}
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-panel right">
        <h2>{isRegister ? "Register" : "Login"}</h2>

        {isRegister && (
          <input
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="primary" onClick={handleSubmit}>
          {isRegister ? "Create Account" : "Login"}
        </button>
      </div>
    </div>
  );
}