import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDonations, saveDonations } from "../utils/storage";

export default function Donor() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    document.body.classList.add("dashboard-loaded");
    return () => document.body.classList.remove("dashboard-loaded");
  }, []);

  const donate = () => {
    if (!item || !qty) {
      alert("Please fill all fields");
      return;
    }

    const donations = getDonations();
    donations.push({
      item,
      qty: Number(qty),
      status: "Donated",
    });

    saveDonations(donations);
    setItem("");
    setQty(1);
    alert("Donation added successfully");
  };

  const donations = getDonations();

  return (
    <div className="dashboard">
      {/* ===== SIDEBAR ===== */}
      <div className="sidebar slide-in">
        <div>
          <h2 className="brand">❤️ HopeDrop</h2>
          <span className="role-badge">Donor</span>

          <nav>
            <p
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </p>
            <p
              className={activeTab === "data" ? "active" : ""}
              onClick={() => setActiveTab("data")}
            >
              My Data
            </p>
            <p
              className={activeTab === "notifications" ? "active" : ""}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </p>
            <p
              className={activeTab === "history" ? "active" : ""}
              onClick={() => setActiveTab("history")}
            >
              History
            </p>
          </nav>
        </div>

        <button className="back-home" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="content fade-in">
        {/* ================= OVERVIEW ================= */}
        {activeTab === "overview" && (
          <>
            <h1>Welcome back, Donor!</h1>
            <p className="subtitle">Your generosity matters.</p>

            <div className="stats-row">
              <div className="stat-card pop delay-1">
                <p>Items Donated</p>
                <h2>{donations.length}</h2>
              </div>
              <div className="stat-card pop delay-2">
                <p>Active Drives</p>
                <h2>2</h2>
              </div>
              <div className="stat-card pop delay-3">
                <p>Delivery Rate</p>
                <h2>95%</h2>
              </div>
              <div className="stat-card pop delay-4">
                <p>Notifications</p>
                <h2>3</h2>
              </div>
            </div>

            <div className="donate-card color-animate scale-in delay-3">
              <h3>Donate Items</h3>

              <input
                className="pop delay-1"
                placeholder="Item name"
                value={item}
                onChange={e => setItem(e.target.value)}
              />

              <div className="qty-counter pop delay-2">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>

              <button className="pop delay-3" onClick={donate}>
                Donate
              </button>
            </div>
          </>
        )}

        {/* ================= MY DATA ================= */}
        {activeTab === "data" && (
          <>
            <h1>My Donations</h1>
            <p className="subtitle">All items you’ve donated</p>

            <ul className="data-list">
              {donations.length === 0 && <p>No donations yet</p>}
              {donations.map((d, i) => (
                <li key={i}>
                  {d.item} — {d.qty} ({d.status})
                </li>
              ))}
            </ul>
          </>
        )}

        {/* ================= NOTIFICATIONS ================= */}
        {activeTab === "notifications" && (
          <>
            <h1>Notifications</h1>
            <ul className="notification-list">
              <li>✅ Donation successfully recorded</li>
              <li>🚚 Logistics assigned</li>
              <li>📢 New emergency drive launched</li>
            </ul>
          </>
        )}

        {/* ================= HISTORY ================= */}
        {activeTab === "history" && (
          <>
            <h1>Donation History</h1>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d, i) => (
                  <tr key={i}>
                    <td>{d.item}</td>
                    <td>{d.qty}</td>
                    <td>{d.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
}