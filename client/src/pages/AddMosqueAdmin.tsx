import { useEffect, useState } from "react";
import { api } from "../api";

interface Mosque {
  id: string;
  name: string;
}

const AddMosqueAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mosqueId, setMosqueId] = useState("");
  const [mosques, setMosques] = useState<Mosque[]>([]);

  useEffect(() => {
    api.get<Mosque[]>("/mosques").then((res) => {
      setMosques(res.data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post("/admins", {
      name,
      email,
      password,
      mosqueId,
    });

    alert("Mosque admin created");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Mosque Admin</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />

        <select
          value={mosqueId}
          onChange={(e) => setMosqueId(e.target.value)}
          required
        >
          <option value="">Select Mosque</option>
          {mosques.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <br />
        <br />
        <button type="submit">Create Admin</button>
      </form>
    </div>
  );
};

export default AddMosqueAdmin;
