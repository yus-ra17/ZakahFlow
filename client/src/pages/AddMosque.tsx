import { useState } from "react";
import { api } from "../api";

const AddMosque = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/mosque", { name, location });
      alert("Mosque created successfully");
      setName("");
      setLocation("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create mosque");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Mosque</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Mosque name"
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

        <button type="submit">Create Mosque</button>
      </form>
    </div>
  );
};

export default AddMosque;
