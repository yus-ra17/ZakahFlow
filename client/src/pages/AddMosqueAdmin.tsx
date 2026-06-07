import { useEffect, useState } from "react";
import { api } from "../api";

interface Mesjid {
  id: string;
  name: string;
}

const AddMesjidAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mesjidId, setMesjidId] = useState("");
  const [mesjids, setMesjids] = useState<Mesjid[]>([]);

  useEffect(() => {
    api.get<Mesjid[]>("/mosque").then((res) => {
      setMesjids(res.data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post("/admins", {
      name,
      email,
      password,
      mesjidId,
    });

    alert("Mesjid admin created");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Mesjid Admin</h2>

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
          value={mesjidId}
          onChange={(e) => setMesjidId(e.target.value)}
          required
        >
          <option value="">Select Mesjid</option>
          {mesjids.map((m) => (
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

export default AddMesjidAdmin;
