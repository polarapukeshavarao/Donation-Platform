import { useNavigate } from "react-router-dom";
import { getDonations, saveDonations } from "../utils/storage";

export default function Admin() {
  const navigate = useNavigate();
  const donations = getDonations();

  const approveItem = (index) => {
    const updated = [...donations];
    updated[index].status = "Approved";
    saveDonations(updated);
    alert("Item Approved for Distribution");
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h3 className="brand">🛡 HopeDrop</h3>
        <span className="role-tag admin">Admin</span>
        <button onClick={() => navigate("/")}>← Back</button>
      </aside>

      <main className="content">
        <h2>Admin Control Panel</h2>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((d, i) => (
              <tr key={i}>
                <td>{d.item}</td>
                <td>{d.qty}</td>
                <td>{d.status}</td>
                <td>
                  {d.status === "Supplied" ? (
                    <button onClick={() => approveItem(i)}>
                      Approve
                    </button>
                  ) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}