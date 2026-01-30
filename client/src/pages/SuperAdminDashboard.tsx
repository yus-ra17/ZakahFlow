import { useEffect, useState, useMemo } from "react";
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

interface Donation {
  id: string;
  amount: number;
  type: string;
  note?: string;
  status: string;
  donorId: string;
  donorName?: string;
  createdAt: string;
}

interface MosqueRequest {
  id: string;
  requesterName: string;
  mosqueName: string;
  mosqueLocation: string;
  amount: number;
  createdAt: string;
}

const SuperAdminDashboard = () => {
  const token = localStorage.getItem("token");

  const [superAdmin, setSuperAdmin] = useState<{
    name: string;
    role: string;
  } | null>(null);
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [admins, setAdmins] = useState<MosqueAdmin[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [requests, setRequests] = useState<MosqueRequest[]>([]);
  const [systemBalance, setSystemBalance] = useState<number>(0);

  // Modal & Table visibility
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showMosquesList, setShowMosquesList] = useState(false);
  const [showAdminsList, setShowAdminsList] = useState(false);
  const [showDonationsList, setShowDonationsList] = useState(false);
  const [showRequestsList, setShowRequestsList] = useState(false);

  const [currentRequest, setCurrentRequest] = useState<MosqueRequest | null>(
    null,
  );
  const [approveAmount, setApproveAmount] = useState(0);
  const [approveDescription, setApproveDescription] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [sendDonationAmount, setSendDonationAmount] = useState(0);
  const [sendDonationDescription, setSendDonationDescription] = useState("");

  const mosqueNameMap = useMemo(() => {
    const map = new Map<string, string>();
    mosques.forEach((m) => map.set(m.id, m.name));
    return map;
  }, [mosques]);

  // ====== FETCH FUNCTIONS ======
  const fetchMosques = async () => {
    try {
      const res = await api.get<Mosque[]>("/mosque", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMosques(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch mosques");
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await api.get<MosqueAdmin[]>("/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch admins");
    }
  };

  const fetchDonations = async () => {
    try {
      const res = await api.get<Donation[]>("/donation", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonations(
        res.data.map((d) => ({ ...d, donorName: d.donorName || "Anonymous" })),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to fetch donations");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await api.get<MosqueRequest[]>("/donation/request", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch requests");
    }
  };

  const fetchSystemBalance = async () => {
    try {
      const res = await api.get<{ balance: number }>(
        "/donation/system/balance",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setSystemBalance(res.data.balance);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) setSuperAdmin(JSON.parse(userString));
    fetchSystemBalance();
  }, []);

  // ====== REQUEST ACTIONS ======
  const handleApproveRequest = async () => {
    if (!currentRequest || approveAmount <= 0)
      return alert("Enter a valid amount");
    try {
      await api.put(
        `/donation/request/${currentRequest.id}/approve`,
        { sentAmount: approveAmount, sentDescription: approveDescription },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchRequests();
      fetchSystemBalance();
      setCurrentRequest(null);
    } catch (err) {
      console.error(err);
      alert("Failed to approve request");
    }
  };

  const handleRejectRequest = async () => {
    if (!currentRequest || !rejectReason) return alert("Enter reason");
    try {
      await api.put(
        `/donation/request/${currentRequest.id}/reject`,
        { reason: rejectReason },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchRequests();
      setCurrentRequest(null);
    } catch (err) {
      console.error(err);
      alert("Failed to reject request");
    }
  };

  const handleSendDonation = async () => {
    if (!currentRequest || sendDonationAmount <= 0)
      return alert("Enter valid amount");
    try {
      await api.post(
        `/donation/request/send`,
        {
          beneficiaryId: currentRequest.id,
          amount: sendDonationAmount,
          description: sendDonationDescription,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchRequests();
      fetchSystemBalance();
      setCurrentRequest(null);
    } catch (err) {
      console.error(err);
      alert("Failed to send donation");
    }
  };

  // ====== RENDER ======
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
          </div>
        )}

        {/* ===== BUTTON ROW ===== */}
        <div className={styles.buttonRow}>
          <button
            className={styles.actionBtn}
            onClick={() => setShowAddModal(true)}
          >
            Add Mesjid
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => setShowAddAdminModal(true)}
          >
            Add Mesjid Admin
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => {
              setShowMosquesList(true);
              setShowAdminsList(false);
              setShowDonationsList(false);
              setShowRequestsList(false);
              fetchMosques();
            }}
          >
            List Mesjid
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => {
              setShowAdminsList(true);
              setShowMosquesList(false);
              setShowDonationsList(false);
              setShowRequestsList(false);
              fetchAdmins();
            }}
          >
            List Mesjid Admins
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => {
              setShowDonationsList(true);
              setShowMosquesList(false);
              setShowAdminsList(false);
              setShowRequestsList(false);
              fetchDonations();
            }}
          >
            Review Donations
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => {
              setShowRequestsList(true);
              setShowMosquesList(false);
              setShowAdminsList(false);
              setShowDonationsList(false);
              fetchRequests();
            }}
          >
            Mesjid Requests
          </button>
          <div
            style={{
              marginLeft: "auto",
              fontWeight: 700,
              color: "#854e0e",
              fontSize: "1.3rem",
              alignSelf: "center",
            }}
          >
            Total Balance: {systemBalance.toLocaleString()} Birr
          </div>
        </div>

        {/* ===== MODALS ===== */}
        {showAddModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Add Mesjid</h2>
              <form
                className={styles.form}
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const name = form.name.value;
                  const location = form.location.value;

                  try {
                    await api.post(
                      "/mosque",
                      { name, location },
                      { headers: { Authorization: `Bearer ${token}` } },
                    );
                    alert("Mesjid added!");
                    fetchMosques();
                    setShowAddModal(false);
                  } catch (err) {
                    console.error(err);
                    alert("Failed to add mesjid");
                  }
                }}
              >
                <input
                  name="name"
                  className={styles.input}
                  placeholder="Name"
                  required
                />
                <input
                  name="location"
                  className={styles.input}
                  placeholder="Location"
                  required
                />
                <div className={styles.modalButtons}>
                  <button type="submit" className={styles.btnYellow}>
                    Add
                  </button>
                  <button
                    type="button"
                    className={styles.btnGray}
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
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
              <form
                className={styles.form}
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const name = form.name.value;
                  const email = form.email.value;
                  const mosqueId = form.mosqueId.value;

                  try {
                    await api.post(
                      "/admin",
                      { name, email, mosqueId },
                      { headers: { Authorization: `Bearer ${token}` } },
                    );
                    alert("Admin added!");
                    fetchAdmins();
                    setShowAddAdminModal(false);
                  } catch (err) {
                    console.error(err);
                    alert("Failed to add admin");
                  }
                }}
              >
                <input
                  name="name"
                  className={styles.input}
                  placeholder="Name"
                  required
                />
                <input
                  name="email"
                  className={styles.input}
                  type="email"
                  placeholder="Email"
                  required
                />
                <select name="mosqueId" className={styles.select} required>
                  <option value="">Select Mosque</option>
                  {mosques.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <div className={styles.modalButtons}>
                  <button type="submit" className={styles.btnYellow}>
                    Add Admin
                  </button>
                  <button
                    type="button"
                    className={styles.btnGray}
                    onClick={() => setShowAddAdminModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===== TABLES (MOSQUES, ADMINS, DONATIONS, REQUESTS) ===== */}
        {showMosquesList && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Location</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mosques.length > 0 ? (
                  mosques.map((m) => (
                    <tr key={m.id} className={styles.tr}>
                      <td className={styles.td}>{m.name}</td>
                      <td className={styles.td}>{m.location}</td>
                      <td className={styles.actionsCell}>
                        <button
                          className={`${styles.smallBtn} ${styles.editBtn}`}
                        >
                          Edit
                        </button>
                        <button
                          className={`${styles.smallBtn} ${styles.deleteBtn}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className={styles.td}>
                      No mosques found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {showAdminsList && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Mosque</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.length > 0 ? (
                  admins.map((a) => (
                    <tr key={a.id} className={styles.tr}>
                      <td className={styles.td}>{a.name}</td>
                      <td className={styles.td}>{a.email}</td>
                      <td className={styles.td}>
                        {mosqueNameMap.get(a.mosqueId || "")}
                      </td>
                      <td className={styles.actionsCell}>
                        <button
                          className={`${styles.smallBtn} ${styles.editBtn}`}
                        >
                          Edit
                        </button>
                        <button
                          className={`${styles.smallBtn} ${styles.deleteBtn}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className={styles.td}>
                      No admins found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {showDonationsList && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  <th className={styles.th}>Donor</th>
                  <th className={styles.th}>Amount</th>
                  <th className={styles.th}>Type</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.length > 0 ? (
                  donations.map((d) => (
                    <tr key={d.id} className={styles.tr}>
                      <td className={styles.td}>{d.donorName}</td>
                      <td className={styles.td}>{d.amount}</td>
                      <td className={styles.td}>{d.type}</td>
                      <td className={styles.td}>{d.status}</td>
                      <td className={styles.td}>
                        {new Date(d.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className={styles.td}>
                      No donations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {showRequestsList && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  <th className={styles.th}>Requester</th>
                  <th className={styles.th}>Mesjid</th>
                  <th className={styles.th}>Location</th>
                  <th className={styles.th}>Amount</th>
                  <th className={styles.th}>Requested Date</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((r) => (
                    <tr key={r.id} className={styles.tr}>
                      <td className={styles.td}>{r.requesterName}</td>
                      <td className={styles.td}>{r.mosqueName}</td>
                      <td className={styles.td}>{r.mosqueLocation}</td>
                      <td className={styles.td}>{r.amount}</td>
                      <td className={styles.td}>
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td className={styles.actionsCell}>
                        <button
                          className={`${styles.smallBtn} ${styles.editBtn}`}
                          onClick={() => {
                            setCurrentRequest(r);
                            setApproveAmount(r.amount);
                          }}
                        >
                          Approve
                        </button>
                        <button
                          className={`${styles.smallBtn} ${styles.deleteBtn}`}
                          onClick={() => setCurrentRequest(r)}
                        >
                          Reject
                        </button>
                        <button
                          className={`${styles.smallBtn} ${styles.btnGray}`}
                          onClick={() => {
                            setCurrentRequest(r);
                            setSendDonationAmount(r.amount);
                          }}
                        >
                          Send
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className={styles.td}>
                      No requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer3 />
    </div>
  );
};

export default SuperAdminDashboard;
