import { useEffect, useState } from "react";
import { api } from "../api";
import Header3 from "../components/layout/header/Header3";
import Footer3 from "../components/layout/footer/Footer3";
import styles from "./admin.module.css";

const ZAKAH_CATEGORIES = [
  "Poor (Al-Fuqara)",
  "Needy (Al-Masakin)",
  "Zakah Collectors (Al-‘Amilina ‘Alayha)",
  "Those Whose Hearts Are Reconciled",
  "Freeing Captives (Riqab)",
  "Debtors (Al-Gharimin)",
  "In the Cause of Allah",
  "Wayfarer (Ibn As-Sabil)",
];

interface Beneficiary {
  id: string;
  name: string;
  description: string;
  gender: string;
  maritalStatus: string;
  familiesCount: number;
  phone?: string;
  address?: string;
  createdAt: string;
}

interface DonationRequest {
  id: string;
  amount: number;
  note?: string;
  status: string;
  createdAt: string;
  rejectionNote?: string;
}

type View = "beneficiaries" | "requests";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState<{ name: string; role: string; mosqueName?: string } | null>(null);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [totalReceived, setTotalReceived] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const [current, setCurrent] = useState<Beneficiary | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    gender: "",
    maritalStatus: "",
    familiesCount: 1,
    phone: "",
    address: "",
  });

  const [requestForm, setRequestForm] = useState({
    amount: 0,
    note: "",
  });

  const [view, setView] = useState<View>("beneficiaries");

  /* ================= ADMIN INFO ================= */
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const u = JSON.parse(userStr);
      setAdmin({
        name: u.name,
        role: u.role,
        mosqueName: u.mosque?.name || "—",
      });
    }
  }, []);

  /* ================= FETCH ================= */
  const fetchBeneficiaries = async () => {
    setLoading(true);
    try {
      const res = await api.get("/beneficiary");
      setBeneficiaries(res.data);
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to fetch beneficiaries");
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await api.get("/donation/request/my-requests");
      setRequests(res.data);
      const received = res.data
        .filter((r: DonationRequest) => r.status === "APPROVED")
        .reduce((sum: number, r: DonationRequest) => sum + r.amount, 0);
      setTotalReceived(received);
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to fetch requests");
    }
  };

  useEffect(() => {
    fetchBeneficiaries();
    fetchRequests();
  }, []);

  /* ================= CREATE ================= */
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/beneficiary", form);
      setShowAddModal(false);
      setForm({ name: "", description: "", gender: "", maritalStatus: "", familiesCount: 1, phone: "", address: "" });
      fetchBeneficiaries();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to add beneficiary");
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    if (!current) return;
    try {
      await api.put(`/beneficiary/${current.id}`, form);
      setShowEditModal(false);
      fetchBeneficiaries();
    } catch (err: any) {
      alert(err.response?.data?.error || "Update failed");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!current) return;
    try {
      await api.delete(`/beneficiary/${current.id}`);
      setShowDeleteModal(false);
      fetchBeneficiaries();
    } catch (err: any) {
      alert(err.response?.data?.error || "Delete failed");
    }
  };

  /* ================= DONATION REQUEST ================= */
  const handleRequestDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (requestForm.amount <= 0) {
      alert("Enter a valid amount");
      return;
    }
    try {
      await api.post("/donation/request", requestForm);
      setShowRequestModal(false);
      setRequestForm({ amount: 0, note: "" });
      fetchRequests();
      alert("Donation request sent successfully!");
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to send request");
    }
  };

  return (
    <div className={styles.page}>
      <Header3 scroll={false} handlePopup={() => {}} handleMobileMenu={() => {}} />

      <main className={styles.main}>
        {admin && (
          <div className={styles.adminCard}>
            <div>
              <p className={styles.adminName}>Name: {admin.name}</p>
              <p className={styles.adminRole}>Role: {admin.role}</p>
              <p className={styles.adminRole}>Mesjid: {admin.mosqueName}</p>
            </div>
            <div className={styles.verseWrap}>
              <p className={styles.verse}>
                "Indeed, Allah commands you to render trusts to whom they are due and when you judge between people to judge with justice..."
                <span className={styles.verseBold}> (Quran 4:58)</span>
              </p>
            </div>
          </div>
        )}

        <h2 className={styles.title}>
          {view === "beneficiaries" ? "Beneficiaries" : "Donation Requests"}
        </h2>

        {/* ================= BUTTONS ROW ================= */}
        <div className={styles.buttonRow} style={{ display: "flex", alignItems: "center" }}>
          <button className={styles.actionBtn} onClick={() => setShowAddModal(true)}>Add Beneficiary</button>
          <button className={styles.actionBtn} onClick={() => setShowRequestModal(true)}>Request Donation</button>
          <button className={styles.actionBtn} onClick={() => setView("requests")}>View Requests</button>
          <button className={styles.actionBtn} onClick={() => setView("beneficiaries")}>View Beneficiaries</button>
          <div style={{
            marginLeft: "auto",
            fontWeight: 700,
            color: "#854e0e",
            fontSize: "1.3rem",
            alignSelf: "center",
          }}>
            Total Received: {totalReceived.toLocaleString()} Birr
          </div>
        </div>

        {/* ================= TABLES ================= */}
        {view === "beneficiaries" && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Gender</th>
                  <th>Marital Status</th>
                  <th>Family Number</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {beneficiaries.map((b) => (
                  <tr key={b.id} className={styles.tr}>
                    <td>{b.name}</td>
                    <td>{b.description}</td>
                    <td>{b.gender}</td>
                    <td>{b.maritalStatus}</td>
                    <td>{b.familiesCount}</td>
                    <td>{b.phone || "—"}</td>
                    <td>{b.address || "—"}</td>
                    <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td className={styles.actionsCell}>
                      <button className={`${styles.smallBtn} ${styles.editBtn}`} onClick={() => { setCurrent(b); setForm({ ...b }); setShowEditModal(true); }}>Edit</button>
                      <button className={`${styles.smallBtn} ${styles.deleteBtn}`} onClick={() => { setCurrent(b); setShowDeleteModal(true); }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <p>Loading...</p>}
          </div>
        )}

        {view === "requests" && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  <th>Amount</th>
                  <th>Note</th>
                  <th>Status</th>
                  <th>Requested At</th>
                  <th>Rejection Note</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id} className={styles.tr}>
                    <td>{r.amount}</td>
                    <td>{r.note || "—"}</td>
                    <td>{r.status}</td>
                    <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                    <td>{r.status === "REJECTED" ? r.rejectionNote || "—" : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= MODALS ================= */}
        {(showAddModal || showEditModal) && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h3 className={styles.modalTitle}>{showAddModal ? "Add Beneficiary" : "Edit Beneficiary"}</h3>
              <form className={styles.form} onSubmit={showAddModal ? handleCreate : (e) => { e.preventDefault(); handleUpdate(); }}>
                <input className={styles.input} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <select className={styles.select} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required>
                  <option value="" disabled>Category</option>
                  {ZAKAH_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select className={styles.select} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} required>
                  <option value="" disabled>Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
                <select className={styles.select} value={form.maritalStatus} onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })} required>
                  <option value="" disabled>Marital Status</option>
                  <option value="SINGLE">Single</option>
                  <option value="MARRIED">Married</option>
                  <option value="DIVORCED">Divorced</option>
                  <option value="WIDOWED">Widowed</option>
                </select>
                <input type="number" className={styles.input} placeholder="Family Number" value={form.familiesCount} onChange={(e) => setForm({ ...form, familiesCount: Number(e.target.value) })} required min={1} />
                <input className={styles.input} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input className={styles.input} placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                <div className={styles.modalButtons}>
                  <button type="button" className={styles.btnGray} onClick={() => { showAddModal ? setShowAddModal(false) : setShowEditModal(false); }}>Cancel</button>
                  <button type="submit" className={styles.btnGreen}>{showAddModal ? "Add" : "Update"}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteModal && current && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h3 className={styles.modalTitleDanger}>Delete Beneficiary</h3>
              <p>Are you sure you want to delete <b>{current.name}</b>?</p>
              <div className={styles.modalButtons}>
                <button className={styles.btnGray} onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className={styles.btnRed} onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}

        {showRequestModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h3 className={styles.modalTitle}>Request Donation</h3>
              <form className={styles.form} onSubmit={handleRequestDonation}>
                <input type="number" className={styles.input} placeholder="Amount" value={requestForm.amount} onChange={(e) => setRequestForm({ ...requestForm, amount: Number(e.target.value) })} required min={1} />
                <input className={styles.input} placeholder="Note (optional)" value={requestForm.note} onChange={(e) => setRequestForm({ ...requestForm, note: e.target.value })} />
                <div className={styles.modalButtons}>
                  <button type="button" className={styles.btnGray} onClick={() => setShowRequestModal(false)}>Cancel</button>
                  <button type="submit" className={styles.btnGreen}>Send Request</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
      <Footer3 />
    </div>
  );
};

export default AdminDashboard;
