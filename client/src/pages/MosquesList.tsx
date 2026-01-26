import { useEffect, useState } from "react";
import { api } from "../api";

interface Mosque {
  id: string;
  name: string;
  location: string;
  createdAt: string;
}

const MosquesList = () => {
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMosques = async () => {
      try {
        const res = await api.get<Mosque[]>("/mosque");
        setMosques(res.data);
      } catch {
        alert("Failed to fetch mosques");
      } finally {
        setLoading(false);
      }
    };

    fetchMosques();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Mosques</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {mosques.map((m) => (
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

export default MosquesList;
