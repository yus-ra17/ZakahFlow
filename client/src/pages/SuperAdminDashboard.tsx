import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import Header3 from "../components/layout/header/Header3";
import Footer3 from "../components/layout/footer/Footer3";
import styles from "./SuperAdminDashboard.module.css";

interface Mosque {
  id: string;
  name: string;
  location: string;
  createdAt: string;
}

interface MosqueAdmin {
  id: string;
  name?: string;
  email: string;
  mosqueId?: string;
  createdAt: string;
}

const SuperAdminDashboard = () => {
  const [superAdmin, setSuperAdmin] = useState<{
    name: string;
    role: string;
  } | null>(null);

  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [admins, setAdmins] = useState<MosqueAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showAdminsList, setShowAdminsList] = useState(false);

  // Admin edit/delete modals
  const [showEditAdminModal, setShowEditAdminModal] = useState(false);
  const [showDeleteAdminModal, setShowDeleteAdminModal] = useState(false);

  // Edit/Delete mesjid state
  const [currentMosque, setCurrentMosque] = useState<Mosque | null>(null);
  const [newMosqueName, setNewMosqueName] = useState("");
  const [newMosqueLocation, setNewMosqueLocation] = useState("");
  const [addError, setAddError] = useState("");
  const [editError, setEditError] = useState("");

  // Add admin state
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminMosqueId, setAdminMosqueId] = useState("");

  // Current admin for edit/delete
  const [currentAdmin, setCurrentAdmin] = useState<MosqueAdmin | null>(null);
  const [editAdminName, setEditAdminName] = useState("");
  const [editAdminEmail, setEditAdminEmail] = useState("");
  const [editAdminMosqueId, setEditAdminMosqueId] = useState("");
  const [editAdminPassword, setEditAdminPassword] = useState(""); // optional
  const [adminEditError, setAdminEditError] = useState("");

  // Build quick lookup mosqueId -> mosqueName
  const mosqueNameById = useMemo(() => {
    const map = new Map<string, string>();
    mosques.forEach((m) => map.set(m.id, m.name));
    return map;
  }, [mosques]);

  // Load superadmin info
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setSuperAdmin({ name: user.name, role: user.role });
    }
  }, []);

  // Fetch mosques
  const fetchMosques = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in!");
      const res = await api.get<Mosque[]>("/mosque", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMosques(
        res.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to fetch mosques");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMosques();
  }, []);

  // Fetch admins
  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in!");

      const res = await api.get<MosqueAdmin[]>("/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAdmins(res.data);
    } catch (err: any) {
      console.error("Fetch admins error:", err);
      alert(
        err.response?.data?.error ||
          `Failed to fetch admins (HTTP ${err.response?.status})`,
      );
    }
  };

  // Add Mosque
  const handleAddMosque = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in!");
      await api.post(
        "/mosque",
        { name: newMosqueName, location: newMosqueLocation },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNewMosqueName("");
      setNewMosqueLocation("");
      setShowAddModal(false);
      fetchMosques();
    } catch (err: any) {
      setAddError(err.response?.data?.error || "Failed to create Mesjid");
    }
  };

  // Edit Mosque
  const openEditModal = (m: Mosque) => {
    setCurrentMosque(m);
    setNewMosqueName(m.name);
    setNewMosqueLocation(m.location);
    setShowEditModal(true);
    setEditError("");
  };

  const handleSaveEdit = async () => {
    if (!currentMosque) return;
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/mosque/${currentMosque.id}`,
        { name: newMosqueName, location: newMosqueLocation },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setShowEditModal(false);
      setCurrentMosque(null);
      fetchMosques();
    } catch (err: any) {
      setEditError(err.response?.data?.error || "Failed to update mosque");
    }
  };

  // Delete Mosque
  const openDeleteModal = (m: Mosque) => {
    setCurrentMosque(m);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!currentMosque) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/mosque/${currentMosque.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowDeleteModal(false);
      setCurrentMosque(null);
      fetchMosques();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to delete mosque");
    }
  };

  // Add admin
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in!");

      const res = await api.post(
        "/admin",
        {
          name: adminName,
          email: adminEmail,
          password: adminPassword,
          mosqueId: adminMosqueId,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (res.data?.success) {
        alert("Admin created successfully!");
        setShowAddAdminModal(false);
        setAdminName("");
        setAdminEmail("");
        setAdminPassword("");
        setAdminMosqueId("");

        if (showAdminsList) fetchAdmins();
      } else {
        alert(res.data?.error || "Failed to create admin");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to create admin");
    }
  };

  // Admin edit/delete
  const openEditAdminModal = (a: MosqueAdmin) => {
    setCurrentAdmin(a);
    setEditAdminName(a.name || "");
    setEditAdminEmail(a.email);
    setEditAdminMosqueId(a.mosqueId || "");
    setEditAdminPassword("");
    setAdminEditError("");
    setShowEditAdminModal(true);
  };

  const handleSaveAdminEdit = async () => {
    if (!currentAdmin) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in!");

      const payload: any = {
        name: editAdminName,
        email: editAdminEmail,
        mosqueId: editAdminMosqueId,
      };

      if (editAdminPassword.trim()) payload.password = editAdminPassword.trim();

      await api.put(`/admin/${currentAdmin.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowEditAdminModal(false);
      setCurrentAdmin(null);
      fetchAdmins();
    } catch (err: any) {
      console.error(err);
      setAdminEditError(err.response?.data?.error || "Failed to update admin");
    }
  };

  const openDeleteAdminModal = (a: MosqueAdmin) => {
    setCurrentAdmin(a);
    setShowDeleteAdminModal(true);
  };

  const handleDeleteAdmin = async () => {
    if (!currentAdmin) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in!");

      await api.delete(`/admin/${currentAdmin.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowDeleteAdminModal(false);
      setCurrentAdmin(null);
      fetchAdmins();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to delete admin");
    }
  };

  return (
    <div className={styles.page}>
      <Header3
        scroll={false}
        handlePopup={() => {}}
        handleMobileMenu={() => {}}
      />

      <main className={styles.main}>
        {superAdmin && (
          <div className={styles.superAdminCard}>
            <div>
              <p className={styles.superAdminName}>Name: {superAdmin.name}</p>
              <p className={styles.superAdminRole}>Role: {superAdmin.role}</p>
            </div>
            <div className={styles.verseWrap}>
              <p className={styles.verse}>
                "Indeed, Allah commands you to render trusts to whom they are
                due and when you judge between people to judge with justice..."
                <span className={styles.verseBold}> (Quran 4:58)</span>
              </p>
            </div>
          </div>
        )}

        <h2 className={styles.title}>
          {showAdminsList ? "List of Mesjid Admins" : "List of Mesjids"}
        </h2>

        <div className={styles.buttonRow}>
          <button
            onClick={() => {
              setShowAdminsList(false);
              setShowAddModal(true);
            }}
            className={styles.actionBtn}
          >
            Add Mesjid
          </button>

          <button
            onClick={() => setShowAddAdminModal(true)}
            className={styles.actionBtn}
          >
            Add Mesjid Admin
          </button>

          <button
            onClick={() => {
              setShowAdminsList(true);
              fetchAdmins();
            }}
            className={styles.actionBtn}
          >
            List Mesjid Admins
          </button>
        </div>

        {/* Tables + Modals: your JSX is unchanged except className swaps */}
        {/* NOTE: Keep the rest of your JSX exactly the same, just replace className strings with styles.* as in this file */}

        {/* --- START: TABLES (same logic, same layout) --- */}
        {!showAdminsList && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Location</th>
                  <th className={styles.th}>Created</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mosques.map((m) => (
                  <tr key={m.id} className={styles.tr}>
                    <td className={styles.td}>{m.name}</td>
                    <td className={styles.td}>{m.location}</td>
                    <td className={styles.td}>
                      {new Date(m.createdAt).toLocaleDateString()}
                    </td>
                    <td className={styles.actionsCell}>
                      <button
                        onClick={() => openEditModal(m)}
                        className={`${styles.smallBtn} ${styles.editBtn}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(m)}
                        className={`${styles.smallBtn} ${styles.deleteBtn}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <p style={{ marginTop: 12 }}>Loading...</p>}
          </div>
        )}

        {showAdminsList && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Mesjid</th>
                  <th className={styles.th}>Created</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <tr key={a.id} className={styles.tr}>
                    <td className={styles.td}>{a.name || "—"}</td>
                    <td className={styles.td}>{a.email}</td>
                    <td className={styles.td}>
                      {(a.mosqueId && mosqueNameById.get(a.mosqueId)) || "—"}
                    </td>
                    <td className={styles.td}>
                      {new Date(a.createdAt).toLocaleDateString()}
                    </td>
                    <td className={styles.actionsCell}>
                      <button
                        onClick={() => openEditAdminModal(a)}
                        className={`${styles.smallBtn} ${styles.editBtn}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteAdminModal(a)}
                        className={`${styles.smallBtn} ${styles.deleteBtn}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {admins.length === 0 && (
                  <tr>
                    <td className={styles.td} colSpan={5}>
                      No mesjid admins found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* --- END: TABLES --- */}

        {/* --- MODALS: same structure, CSS module classes --- */}
        {showAddModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Add Mesjid</h2>
              {addError && <p className={styles.errorText}>{addError}</p>}
              <form onSubmit={handleAddMosque} className={styles.form}>
                <input
                  className={styles.input}
                  placeholder="Mesjid Name"
                  value={newMosqueName}
                  onChange={(e) => setNewMosqueName(e.target.value)}
                  required
                />
                <input
                  className={styles.input}
                  placeholder="Location"
                  value={newMosqueLocation}
                  onChange={(e) => setNewMosqueLocation(e.target.value)}
                  required
                />
                <div className={styles.modalButtons}>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className={styles.btnGray}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.btnYellow}>
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddAdminModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Add Mesjid Admin</h2>
              <form onSubmit={handleAddAdmin} className={styles.form}>
                <input
                  className={styles.input}
                  placeholder="Name"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  required
                />
                <input
                  className={styles.input}
                  placeholder="Email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
                <select
                  className={styles.select}
                  value={adminMosqueId}
                  onChange={(e) => setAdminMosqueId(e.target.value)}
                  required
                >
                  <option value="">Select Mesjid</option>
                  {mosques.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>

                <div className={styles.modalButtons}>
                  <button
                    type="button"
                    onClick={() => setShowAddAdminModal(false)}
                    className={styles.btnGray}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.btnYellow}>
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showEditModal && currentMosque && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Edit Mesjid</h2>
              {editError && <p className={styles.errorText}>{editError}</p>}
              <div className={styles.form}>
                <input
                  className={styles.input}
                  value={newMosqueName}
                  onChange={(e) => setNewMosqueName(e.target.value)}
                  placeholder="Mesjid Name"
                />
                <input
                  className={styles.input}
                  value={newMosqueLocation}
                  onChange={(e) => setNewMosqueLocation(e.target.value)}
                  placeholder="Location"
                />
                <div className={styles.modalButtons}>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className={styles.btnGray}
                  >
                    Cancel
                  </button>
                  <button onClick={handleSaveEdit} className={styles.btnGreen}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && currentMosque && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitleDanger}>Delete Mesjid</h2>
              <p className={`${styles.centerText} ${styles.errorText}`}>
                Are you sure you want to delete this Mesjid from the list?
              </p>
              <div
                className={styles.modalButtons}
                style={{ justifyContent: "center" as const, gap: "1rem" }}
              >
                <button onClick={handleDelete} className={styles.btnRed}>
                  Yes
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={styles.btnGray}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditAdminModal && currentAdmin && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Edit Mesjid Admin</h2>
              {adminEditError && (
                <p className={styles.errorText}>{adminEditError}</p>
              )}

              <div className={styles.form}>
                <input
                  className={styles.input}
                  placeholder="Name"
                  value={editAdminName}
                  onChange={(e) => setEditAdminName(e.target.value)}
                  required
                />
                <input
                  className={styles.input}
                  placeholder="Email"
                  value={editAdminEmail}
                  onChange={(e) => setEditAdminEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className={styles.input}
                  placeholder="New Password (optional)"
                  value={editAdminPassword}
                  onChange={(e) => setEditAdminPassword(e.target.value)}
                />
                <select
                  className={styles.select}
                  value={editAdminMosqueId}
                  onChange={(e) => setEditAdminMosqueId(e.target.value)}
                  required
                >
                  <option value="">Select Mesjid</option>
                  {mosques.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>

                <div className={styles.modalButtons}>
                  <button
                    onClick={() => setShowEditAdminModal(false)}
                    className={styles.btnGray}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAdminEdit}
                    className={styles.btnGreen}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showDeleteAdminModal && currentAdmin && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard} style={{ background: "#FEF2F2" }}>
              <h2 className={styles.modalTitleDanger}>Delete Mesjid Admin</h2>
              <p className={`${styles.centerText} ${styles.errorText}`}>
                Are you sure you want to delete this admin?
              </p>
              <div
                className={styles.modalButtons}
                style={{ justifyContent: "center" as const, gap: "1rem" }}
              >
                <button onClick={handleDeleteAdmin} className={styles.btnRed}>
                  Yes
                </button>
                <button
                  onClick={() => setShowDeleteAdminModal(false)}
                  className={styles.btnGray}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer3 />
    </div>
  );
};

export default SuperAdminDashboard;
