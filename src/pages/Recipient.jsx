import { useNavigate } from "react-router-dom";
import { getDonations, saveDonations } from "../utils/storage";

export default function Recipient() {
  const navigate = useNavigate();
  const donations = getDonations().filter(d => d.status === "Approved");

  const requestItem = (index) => {
    const updated = getDonations();
    updated[index].status = "Allocated";
    saveDonations(updated);
    alert("Item Allocated to You");
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h3 className="brand">🤝 HopeDrop</h3>
        <span className="role-tag recipient">Recipient</span>
        <button onClick={() => navigate("/")}>← Back</button>
      </aside>

      <main className="content">
        <h2>Available Supplies</h2>

        {donations.length === 0 ? (
          <p>No items available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {donations.map((d, i) => (
                <tr key={i}>
                  <td>{d.item}</td>
                  <td>{d.qty}</td>
                  <td>
                    <button onClick={() => requestItem(i)}>
                      Request
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}