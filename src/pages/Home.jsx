import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-donation.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState(null);
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  /* ================= SCROLL ANIMATION ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".hope").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ================= LOGIN FIRST HANDLER ================= */
  const goToRole = (rolePath) => {
    if (isLoggedIn) {
      navigate(rolePath);
    } else {
      navigate("/login", { state: { redirectTo: rolePath } });
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <div className="hero">
        <nav className="navbar">
          <h3 className="logo hope delay-1" onClick={() => navigate("/")}>
            ❤️ HopeDrop<span className="logo-text">HopeDrop</span>
          </h3>

          <div className="nav-center">
            <span onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}>
              Features
            </span>
            <span onClick={() => document.getElementById("how").scrollIntoView({ behavior: "smooth" })}>
              How It Works
            </span>
            <span onClick={() => document.getElementById("roles").scrollIntoView({ behavior: "smooth" })}>
              Roles
            </span>
          </div>

          <div className="nav-right">
  {localStorage.getItem("loggedIn") === "true" ? (
    <div className="user-menu">
      <span className="user-name">
        👤 {localStorage.getItem("userName") || "User"}
      </span>

      <button
        className="logout-btn"
        onClick={() => {
          const confirmLogout = window.confirm(
            "Are you sure you want to log out?"
          );

          if (confirmLogout) {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("userName");
            navigate("/");
          }
        }}
      >
        Logout
      </button>
    </div>
  ) : (
    <>
      <span
  className="link"
  onClick={() => navigate("/login", { replace: true })}
>
  Log in
</span>
      <button onClick={() => navigate("/register")}>Get Started</button>
    </>
  )}
</div>
        </nav>

        <div className="hero-content">
          <div className="hope delay-1">
            <h1>Donate Essentials,<br />Save Lives</h1>
            <p>
              Connect donors with communities in need during emergencies.
              Food, clothing, medicine, and blankets — delivered where they matter most.
            </p>
            <button onClick={() => navigate("/register")}>
              Start Donating
            </button>
          </div>

          <div className="hero-image hope delay-2">
            <img src={heroImage} alt="Donation Drive" />
          </div>
        </div>

        <div className="stats">
          <div className="hope delay-1"><h2>12,450+</h2><p>Items Donated</p></div>
          <div className="hope delay-2"><h2>3,200+</h2><p>Families Helped</p></div>
          <div className="hope delay-3"><h2>85+</h2><p>Emergency Drives</p></div>
          <div className="hope delay-4"><h2>98%</h2><p>Delivery Rate</p></div>
        </div>
      </div>

      {/* ================= FEATURES ================= */}
      <section id="features" className="section">
        <h2 className="hope">Everything You Need</h2>
        <p className="subtitle hope delay-1">
          A comprehensive platform built for transparency, speed and impact.
        </p>

        <div className="grid">
          <div className="box hope delay-1">Item Catalog</div>
          <div className="box hope delay-2">Real-time Alerts</div>
          <div className="box hope delay-3">Logistics Tracking</div>
          <div className="box hope delay-4">Transparency</div>
          <div className="box hope delay-5">Community Drives</div>
          <div className="box hope delay-6">Analytics</div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="section light">
        <h2 className="hope">How It Works</h2>
        <p className="subtitle hope delay-1">Simple steps to make a difference.</p>

        <div className="steps">
          <div className="hope delay-1"><span>01</span><h4>Register</h4></div>
          <div className="hope delay-2"><span>02</span><h4>List or Request</h4></div>
          <div className="hope delay-3"><span>03</span><h4>Match & Deliver</h4></div>
          <div className="hope delay-4"><span>04</span><h4>Track & Rate</h4></div>
        </div>
      </section>

      {/* ================= ROLES ================= */}
      <section id="roles" className="section">
        <h2 className="hope">Choose Your Role</h2>
        <p className="subtitle hope delay-1">Everyone plays a part in emergency relief.</p>

        <div className="role-grid">
          {[
            { id: "donor", title: "Donor", desc: "List items, join drives, track donations", path: "/donor" },
            { id: "recipient", title: "Recipient", desc: "Request essentials, track fulfillment", path: "/recipient" },
            { id: "logistics", title: "Logistics", desc: "Manage inventory and deliveries", path: "/logistics" },
            { id: "admin", title: "Admin", desc: "Oversee operations and analytics", path: "/admin" },
          ].map((role, index) => (
            <div
              key={role.id}
              className={`role-card hope delay-${index + 1} ${activeRole === role.id ? "active" : ""}`}
              onClick={() => setActiveRole(activeRole === role.id ? null : role.id)}
            >
              <h3>{role.title}</h3>

              <div className={`role-expand ${activeRole === role.id ? "open" : ""}`}>
                <p>{role.desc}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToRole(role.path);
                  }}
                >
                  Continue →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta">
        <h2 className="hope">Ready to Make a Difference?</h2>
        <p className="hope delay-1">Join thousands helping communities in crisis.</p>
        <button className="hope delay-2" onClick={() => navigate("/register")}>
          Join Now
        </button>
      </section>
    </>
  );
}