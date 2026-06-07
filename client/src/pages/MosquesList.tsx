import { useEffect, useState } from "react";
import { api } from "../api";

interface Mesjid {
  id: string;
  name: string;
  location: string;
  createdAt: string;
}

const MesjidsList = () => {
  const [mesjids, setMesjids] = useState<Mesjid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMesjids = async () => {
      try {
        const res = await api.get<Mesjid[]>("/mesjid");
        setMesjids(res.data);
      } catch {
        alert("Failed to fetch mesjids");
      } finally {
        setLoading(false);
      }
    };

    fetchMesjids();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Mesjids</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {mesjids.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.location}</td>
              <td>{new Date(m.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MesjidsList;
