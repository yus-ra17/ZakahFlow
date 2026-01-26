// src/pages/MosqueAdminsList.tsx

import { useEffect, useState } from "react";
import { api } from "../api";

// Remove the import of MosqueAdmin at runtime
// import { MosqueAdmin } from "../types/admin"; // ❌ remove this

// You can still declare the type locally in the file for TS type checking
interface MosqueAdmin {
  id: string;
  name?: string;
  email: string;
  mosqueId?: string;
  createdAt: string;
}

const MosqueAdminsList = () => {
  const [admins, setAdmins] = useState<MosqueAdmin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await api.get<{ admins: MosqueAdmin[] }>("/admins");
        setAdmins(res.data.admins);
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.data?.error || "Failed to fetch mosque admins");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mosque Admins</h2>

      {admins.length === 0 ? (
        <p>No mosque admins found.</p>
      ) : (
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mosque ID</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.name || "—"}</td>
                <td>{admin.email}</td>
                <td>{admin.mosqueId || "Not Assigned"}</td>
                <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MosqueAdminsList;
