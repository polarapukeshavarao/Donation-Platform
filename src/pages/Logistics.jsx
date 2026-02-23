import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getDonations, saveDonations } from "../utils/storage";

export default function Logistics() {
  const navigate = useNavigate();
  const donations = getDonations();

  // 🔑 TAB STATE
  const [activeTab, setActiveTab] = useState("overview");

  // STEP-3: Mark item as supplied
  const markSupplied = (index) => {
    const updated = [...donations];
    updated[index].status = "Supplied";
    saveDonations(updated);
    alert("Item marked as Supplied");
    window.location.reload();
  };

  return (
    <div className="dashboard">
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <h3 className="brand">💚 HopeDrop</h3>
        <span className="role-tag logistics">Logistics Coordinator</span>

        <nav className="menu">
          <div
            className={`menu-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </div>

          <div
            className={`menu-item ${activeTab === "assignments" ? "active" : ""}`}
            onClick={() => setActiveTab("assignments")}
          >
            Assignments
          </div>

          <div
            className={`menu-item ${activeTab === "inventory" ? "active" : ""}`}
            onClick={() => setActiveTab("inventory")}
          >
            Inventory
          </div>

          <div
            className={`menu-item ${activeTab === "deliveries" ? "active" : ""}`}
            onClick={() => setActiveTab("deliveries")}
          >
            Deliveries
          </div>

          <div
            className={`menu-item ${activeTab === "routes" ? "active" : ""}`}
            onClick={() => setActiveTab("routes")}
          >
            Routes
          </div>
        </nav>

        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="content">

        {/* ================= OVERVIEW (UNCHANGED) ================= */}
        {activeTab === "overview" && (
          <>
            <h2>Logistics Dashboard</h2>

            <div className="stats-grid">
              <div className="stat-card">
                <p>Pending Supplies</p>
                <h3>{donations.filter(d => d.status === "Donated").length}</h3>
              </div>

              <div className="stat-card">
                <p>Items Supplied</p>
                <h3>{donations.filter(d => d.status === "Supplied").length}</h3>
              </div>

              <div className="stat-card">
                <p>Total Items</p>
                <h3>{donations.length}</h3>
              </div>

              <div className="stat-card">
                <p>Delivery Rate</p>
                <h3>96%</h3>
              </div>
            </div>

            <div className="panel">
              <h3>Items Ready for Delivery</h3>

              {donations.length === 0 ? (
                <p>No donations available.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {donations.map((d, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{d.item}</td>
                        <td>{d.qty}</td>
                        <td>
                          <span className={`status ${d.status === "Supplied" ? "done" : "pending"}`}>
                            {d.status}
                          </span>
                        </td>
                        <td>
                          {d.status === "Donated" ? (
                            <button className="supply-btn" onClick={() => markSupplied(i)}>
                              Mark Supplied
                            </button>
                          ) : "✔"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* ================= ASSIGNMENTS ================= */}
        {activeTab === "assignments" && (
          <>
            <h2>Assignments</h2>
            <ul className="data-list">
              {donations.map((d, i) => (
                <li key={i}>
                  Delivery #{i + 1} → {d.item} ({d.qty})
                </li>
              ))}
            </ul>
          </>
        )}

        {/* ================= INVENTORY ================= */}
        {activeTab === "inventory" && (
          <>
            <h2>Inventory</h2>
            <ul className="data-list">
              {donations.map((d, i) => (
                <li key={i}>
                  {d.item} — {d.qty} units ({d.status})
                </li>
              ))}
            </ul>
          </>
        )}

        {/* ================= DELIVERIES ================= */}
        {activeTab === "deliveries" && (
          <>
            <h2>Deliveries</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d, i) => (
                  <tr key={i}>
                    <td>DEL-{i + 1}</td>
                    <td>{d.item}</td>
                    <td>{d.qty}</td>
                    <td>{d.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ================= ROUTES ================= */}
        {activeTab === "routes" && (
          <>
            <h2>Routes</h2>
            <ul className="data-list">
              <li>Warehouse → Chennai Relief Camp</li>
              <li>Warehouse → Mumbai Shelter</li>
              <li>Warehouse → Delhi Hub</li>
            </ul>
          </>
        )}

      </main>
    </div>
  );
}