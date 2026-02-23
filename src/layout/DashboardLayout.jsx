import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ role, children }) {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>❤️ FSAD-PS04</h2>

        <span className={`badge ${role}`}>{role}</span>

        <nav>
          <a className="active">Overview</a>
          <a>My Data</a>
          <a>Notifications</a>
          <a>History</a>
        </nav>

        <button className="back-home" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}