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
  donor?: {
    name?: string;
    email?: string;
  };
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
  const [approveAmount, setApproveAmount] = useState<number | null>();
  const [approveDescription, setApproveDescription] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [sendDonationAmount, setSendDonationAmount] = useState(0);
  const [sendDonationDescription, setSendDonationDescription] = useState("");
  const [currentDonation, setCurrentDonation] = useState<Donation | null>(null);
  const [donationReview, setDonationReview] = useState("");
  const [showDonationApproveModal, setShowDonationApproveModal] =
    useState(false);
  const [showDonationRejectModal, setShowDonationRejectModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleApproveDonation = async () => {
    if (!currentDonation) return;
    try {
      console.log({ id: currentDonation.id });
      await api.put(
        `/donation/${currentDonation.id}/review`,
        { review: "Approved" },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      fetchDonations();
      fetchSystemBalance();
      setCurrentDonation(null);
      setShowDonationApproveModal(false);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleRejectDonation = async () => {
    if (!currentDonation) return;

    try {
      await api.put(
        `/donation/${currentDonation.id}/review`,
        {
          review: "Rejected",
          status: "REJECTED",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Update local donations state
      setDonations((prev) =>
        prev.map((d) =>
          d.id === currentDonation.id ? { ...d, status: "REJECTED" } : d,
        ),
      );

      setCurrentDonation(null);
      setShowDonationRejectModal(false);
    } catch (err) {
      console.error(err);
    }
  };

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
      console.log("Donations fetched:", res.data);

      // Map donorName
      const donationsWithName = res.data.map((d) => ({
        ...d,
        donorName: d.donor?.name || "Anonymous",
        status: d.status.toUpperCase(),
      }));

      // Sort: PENDING first
      donationsWithName.sort((a, b) => {
        if (a.status === "PENDING" && b.status !== "PENDING") return -1;
        if (a.status !== "PENDING" && b.status === "PENDING") return 1;
        return 0; // keep original order if same
      });

      setDonations(donationsWithName);
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
      const response: MosqueRequest[] = res.data.map((r) => ({
        ...r,
        requesterName: r.admin?.name || "Unknown",
        mosqueName: r.admin?.mosque?.name || "Unknown",
        mosqueLocation: r.admin?.mosque?.location || "Unknown",
      }));
      setRequests(response);
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
    console.log("Approving request:", approveAmount);
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
      const res = await api.put(
        `/donation/request/${currentRequest.id}/reject`,
        { reason: rejectReason },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Update local requests state
      setRequests((prev) =>
        prev.map((r) =>
          r.id === currentRequest.id
            ? { ...r, status: "REJECTED", description: rejectReason }
            : r,
        ),
      );

      setCurrentRequest(null); // close modal
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
        {showDonationRejectModal && currentDonation && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Reject Donation</h2>

              <div className={styles.modalButtons}>
                <button
                  className={styles.btnRed}
                  onClick={handleRejectDonation}
                >
                  Confirm Reject
                </button>
                <button
                  className={styles.btnGray}
                  onClick={() => {
                    setCurrentDonation(null);
                    setShowDonationRejectModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {currentRequest && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Reject Request</h2>

              <textarea
                className={styles.textarea}
                placeholder="Enter rejection reason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />

              <div className={styles.modalButtons}>
                <button className={styles.btnRed} onClick={handleRejectRequest}>
                  Confirm Reject
                </button>

                <button
                  className={styles.btnGray}
                  onClick={() => setCurrentRequest(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {currentRequest && approveAmount !== null && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Approve Donation</h2>

              <input
                type="number"
                className={styles.input}
                value={approveAmount}
                onChange={(e) => setApproveAmount(Number(e.target.value))}
                placeholder="Amount"
              />

              <input
                className={styles.input}
                value={approveDescription}
                onChange={(e) => setApproveDescription(e.target.value)}
                placeholder="Description (optional)"
              />

              <div className={styles.modalButtons}>
                <button
                  className={styles.btnGreen}
                  onClick={handleApproveRequest}
                >
                  Confirm
                </button>
                <button
                  className={styles.btnGray}
                  onClick={() => setCurrentRequest(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {showDonationApproveModal && currentDonation && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalCard}>
              <h2 className={styles.modalTitle}>Approve Donation</h2>

              <div className={styles.modalButtons}>
                <button
                  className={styles.btnGreen}
                  onClick={handleApproveDonation}
                >
                  Confirm
                </button>

                <button
                  className={styles.btnGray}
                  onClick={() => {
                    setCurrentDonation(null);
                    setShowDonationApproveModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
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
                      No Mesjid found
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
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.length > 0 ? (
                  donations.map((donation) => (
                    <tr key={donation.id} className={styles.tr}>
                      <td className={styles.td}>{donation.donorName}</td>
                      <td className={styles.td}>{donation.amount}</td>
                      <td className={styles.td}>{donation.type}</td>
                      <td className={styles.td}>{donation.status}</td>
                      <td className={styles.td}>
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                      <td className={styles.actionsCell}>
                        {r.status === "PENDING" ? (
                          <>
                            <button
                              className={`${styles.smallBtn} ${styles.editBtn}`}
                              onClick={() => {
                                setApproveAmount(r.amount);
                                setApproveDescription("");
                                setCurrentRequest(r);
                              }}
                            >
                              Approve
                            </button>
                            <button
                              className={`${styles.smallBtn} ${styles.deleteBtn}`}
                              onClick={() => {
                                setRejectReason("");
                                setCurrentRequest(r);
                              }}
                            >
                              Reject
                            </button>
                            <button
                              className={`${styles.smallBtn} ${styles.btnGray}`}
                              onClick={() => {
                                setSendDonationAmount(r.amount);
                                setSendDonationDescription("");
                                setCurrentRequest(r);
                              }}
                            >
                              Send
                            </button>
                          </>
                        ) : (
                          <span
                            style={{
                              fontWeight: 700,
                              color: r.status === "APPROVED" ? "green" : "red",
                            }}
                          >
                            {r.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className={styles.td}>
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
                            setApproveAmount(r.amount);
                            setApproveDescription("");
                            setCurrentRequest(r);
                          }}
                        >
                          Approve
                        </button>
                        <button
                          className={`${styles.smallBtn} ${styles.deleteBtn}`}
                          onClick={() => {
                            setRejectReason("");
                            setCurrentRequest(r);
                            setShowRejectModal(true);
                          }}
                        >
                          Reject
                        </button>
                        <button
                          className={`${styles.smallBtn} ${styles.btnGray}`}
                          onClick={() => {
                            setSendDonationAmount(r.amount);
                            setSendDonationDescription("");
                            setCurrentRequest(r);
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
        {showRejectModal && currentRequest && (
  <div className={styles.modalOverlay}>
    <div className={styles.modalCard}>
      <h2 className={styles.modalTitle}>Reject Request</h2>

      <textarea
        className={styles.textarea}
        placeholder="Enter rejection reason"
        value={rejectReason}
        onChange={(e) => setRejectReason(e.target.value)}
      />

      <div className={styles.modalButtons}>
        <button
          className={styles.btnRed}
          onClick={async () => {
            await handleRejectRequest();
            setShowRejectModal(false); // close modal after reject
          }}
        >
          Confirm Reject
        </button>

        <button
          className={styles.btnGray}
          onClick={() => setShowRejectModal(false)}
        >
          Cancel
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
