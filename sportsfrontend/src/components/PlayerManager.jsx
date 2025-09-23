import { useState, useEffect } from "react";
import '../style.css'

function PlayerManager() {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    sport: "",
    team: "",
    country: "",
    experience: "",
    email: "",
    contact: ""
  });
  const [message, setMessage] = useState(null);

  const API_URL = "http://localhost:2004/sportsapi";

  // Fetch all players
  const fetchPlayers = async () => {
    try {
      const res = await fetch(`${API_URL}/players`);
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      console.error("Error fetching players:", err);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update player
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = formData.id ? "PUT" : "POST";
    const endpoint = formData.id ? `${API_URL}/update-player` : `${API_URL}/add-player`;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({ type: "success", text: formData.id ? "Player updated!" : "Player added!" });
        fetchPlayers();
        setFormData({ id: "", name: "", sport: "", team: "", country: "", experience: "", email: "", contact: "" });
      } else {
        const errorMsg = await res.text();
        setMessage({ type: "error", text: errorMsg });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong!" });
    }
  };

  // Edit player
  const handleEdit = (player) => {
    setFormData(player);
  };

  // Delete player
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/delete-player/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "Player deleted!" });
        fetchPlayers();
      } else {
        setMessage({ type: "error", text: "Error deleting player" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong!" });
    }
  };

  return (
    <div className="container">
      <h2>Sports Player Manager</h2>

      {message && (
        <div className={`message-banner ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Player Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="sport" placeholder="Sport" value={formData.sport} onChange={handleChange} required />
          <input type="text" name="team" placeholder="Team" value={formData.team} onChange={handleChange} required />
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
          <input type="number" name="experience" placeholder="Experience (years)" value={formData.experience} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
          {/* ID field moved to bottom */}
          <input type="text" name="id" placeholder="ID (only for update)" value={formData.id} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-green">
          {formData.id ? "Update Player" : "Add Player"}
        </button>
      </form>

      {/* Players Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Sport</th>
              <th>Team</th>
              <th>Country</th>
              <th>Experience</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.sport}</td>
                <td>{p.team}</td>
                <td>{p.country}</td>
                <td>{p.experience}</td>
                <td>{p.email}</td>
                <td>{p.contact}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-blue" onClick={() => handleEdit(p)}>Edit</button>
                    <button className="btn btn-red" onClick={() => handleDelete(p.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlayerManager;
