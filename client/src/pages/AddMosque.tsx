import { useState } from "react";
import { api } from "../api";

const AddMesjid = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/mosque", { name, location });
      alert("Mesjid created successfully");
      setName("");
      setLocation("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create mesjid");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Mesjid</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Mesjid name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <br />
        <br />

        <button type="submit">Create Mesjid</button>
      </form>
    </div>
  );
};

export default AddMesjid;
