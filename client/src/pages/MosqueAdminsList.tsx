// src/pages/MesjidAdminsList.tsx

import { useEffect, useState } from "react";
import { api } from "../api";

// Remove the import of MesjidAdmin at runtime
// import { MesjidAdmin } from "../types/admin"; // ❌ remove this

// You can still declare the type locally in the file for TS type checking
interface MesjidAdmin {
  id: string;
  name?: string;
  email: string;
  mesjidId?: string;
  createdAt: string;
}

const MesjidAdminsList = () => {
  const [admins, setAdmins] = useState<MesjidAdmin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await api.get<{ admins: MesjidAdmin[] }>("/admins");
        setAdmins(res.data.admins);
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.data?.error || "Failed to fetch mesjid admins");
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
      <h2>Mesjid Admins</h2>

      {admins.length === 0 ? (
        <p>No mesjid admins found.</p>
      ) : (
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mesjid ID</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.name || "—"}</td>
                <td>{admin.email}</td>
                <td>{admin.mesjidId || "Not Assigned"}</td>
                <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MesjidAdminsList;
