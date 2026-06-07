import { useEffect, useState, useMemo } from "react";
import { api } from "../api";
import DashboardLayout from "../components/layout/DashboardLayout";

interface Mesjid {
  id: string;
  name: string;
  location: string;
  createdAt: string;
}

interface MesjidAdmin {
  id: string;
  name?: string;
  email: string;
  mesjidId?: string;
  createdAt: string;
}

interface Donation {
  id: string;
  amount: number;
  type: string;
  note?: string;
  status: string;
  donorId: string;
  donor?: { name?: string; email?: string };
  donorName?: string;
  createdAt: string;
}

interface DonationRequest {
  id: string;
  amount: number;
  description?: string;
  status: string;
  createdAt: string;
  admin?: { name?: string; mesjid?: { name?: string; location?: string } };
  requesterName?: string;
  mesjidName?: string;
  mesjidLocation?: string;
}

type View = "overview" | "mesjids" | "admins" | "donations" | "requests";

const SuperAdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [view, setView] = useState<View>("overview");
  const [mesjids, setMesjids] = useState<Mesjid[]>([]);
  const [admins, setAdmins] = useState<MesjidAdmin[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [systemBalance, setSystemBalance] = useState<number>(0);

  // Modals
  const [showAddMesjidModal, setShowAddMesjidModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  const mesjidNameMap = useMemo(() => {
    const map = new Map<string, string>();
    mesjids.forEach((m) => map.set(m.id, m.name));
    return map;
  }, [mesjids]);

  // Fetch functions
  const fetchMesjids = async () => {
    try {
      const res = await api.get<Mesjid[]>("/mosque", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMesjids(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchAdmins = async () => {
    try {
      const res = await api.get<MesjidAdmin[]>("/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchDonations = async () => {
    try {
      const res = await api.get<Donation[]>("/donation", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const donationsWithName = res.data.map((d) => ({
        ...d,
        donorName: d.donor?.name || "Anonymous",
        status: d.status.toUpperCase(),
      }));
      donationsWithName.sort((a, b) => {
        if (a.status === "PENDING" && b.status !== "PENDING") return -1;
        if (a.status !== "PENDING" && b.status === "PENDING") return 1;
        return 0;
      });
      setDonations(donationsWithName);
    } catch (err) { console.error(err); }
  };

  const fetchRequests = async () => {
    try {
      const res = await api.get<DonationRequest[]>("/donation/request", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = res.data.map((r: any) => ({
        ...r,
        requesterName: r.admin?.name || "Unknown",
        mesjidName: r.admin?.mesjid?.name || "Unknown",
        mesjidLocation: r.admin?.mesjid?.location || "Unknown",
      }));
      setRequests(response);
    } catch (err) { console.error(err); }
  };

  const fetchSystemBalance = async () => {
    try {
      const res = await api.get<{ balance: number }>("/donation/system/balance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSystemBalance(res.data.balance);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchSystemBalance();
    fetchMesjids();
    fetchAdmins();
  }, []);

  const handleApproveDonation = async (donationId: string) => {
    try {
      await api.put(`/donation/${donationId}/review`, { review: "Approved" }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDonations();
      fetchSystemBalance();
    } catch (err: any) { console.error(err.message); }
  };

  const handleRejectDonation = async (donationId: string) => {
    try {
      await api.put(`/donation/${donationId}/review`, { review: "Rejected", status: "REJECTED" }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonations((prev) => prev.map((d) => d.id === donationId ? { ...d, status: "REJECTED" } : d));
    } catch (err) { console.error(err); }
  };

  const handleApproveRequest = async (requestId: string, amount: number) => {
    if (amount <= 0) return alert("Enter a valid amount");
    try {
      await api.put(`/donation/request/${requestId}/approve`, { sentAmount: amount }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRequests();
      fetchSystemBalance();
    } catch (err) { console.error(err); alert("Failed to approve request"); }
  };

  const handleRejectRequest = async (requestId: string, reason: string) => {
    if (!reason) return alert("Enter reason");
    try {
      await api.put(`/donation/request/${requestId}/reject`, { reason }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRequests();
    } catch (err) { console.error(err); alert("Failed to reject request"); }
  };

  const navItems = [
    {
      label: "Overview",
      active: view === "overview",
      onClick: () => setView("overview"),
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    },
    {
      label: "Mesjids",
      active: view === "mesjids",
      onClick: () => { setView("mesjids"); fetchMesjids(); },
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    },
    {
      label: "Mesjid Admins",
      active: view === "admins",
      onClick: () => { setView("admins"); fetchAdmins(); fetchMesjids(); },
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    },
    {
      label: "Donations",
      active: view === "donations",
      onClick: () => { setView("donations"); fetchDonations(); },
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      label: "Requests",
      active: view === "requests",
      onClick: () => { setView("requests"); fetchRequests(); },
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    },
  ];

  return (
    <DashboardLayout title="Super Admin Dashboard" navItems={navItems}>
      {/* Overview */}
      {view === "overview" && (
        <div className="space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">System Balance</p>
                  <p className="text-2xl font-bold text-gray-900">{systemBalance.toLocaleString()} Birr</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mesjids</p>
                  <p className="text-2xl font-bold text-gray-900">{mesjids.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Admins</p>
                  <p className="text-2xl font-bold text-gray-900">{admins.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{requests.filter(r => r.status === "PENDING").length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => { setShowAddMesjidModal(true); fetchMesjids(); }} className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors">
                + Add Mesjid
              </button>
              <button onClick={() => { setShowAddAdminModal(true); fetchMesjids(); }} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                + Add Admin
              </button>
              <button onClick={() => { setView("donations"); fetchDonations(); }} className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                Review Donations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mesjids View */}
      {view === "mesjids" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Mesjids</h2>
            <button onClick={() => setShowAddMesjidModal(true)} className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700">
              + Add Mesjid
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mesjids.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{m.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{m.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(m.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {mesjids.length === 0 && (
                  <tr><td colSpan={3} className="px-6 py-8 text-center text-sm text-gray-500">No mesjids found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Admins View */}
      {view === "admins" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Mesjid Admins</h2>
            <button onClick={() => setShowAddAdminModal(true)} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
              + Add Admin
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mesjid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {admins.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{a.name || "—"}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{a.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{mesjidNameMap.get(a.mesjidId || "") || "—"}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(a.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {admins.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">No admins found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Donations View */}
      {view === "donations" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Donations</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{d.donorName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{d.amount} Birr</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{d.type || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        d.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                        d.status === "RECEIVED" || d.status === "APPROVED" ? "bg-green-100 text-green-700" :
                        "bg-red-100 text-red-700"
                      }`}>{d.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(d.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      {d.status === "PENDING" && (
                        <div className="flex gap-2">
                          <button onClick={() => handleApproveDonation(d.id)} className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200">Approve</button>
                          <button onClick={() => handleRejectDonation(d.id)} className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200">Reject</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {donations.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">No donations found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Requests View */}
      {view === "requests" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Mesjid Donation Requests</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requester</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mesjid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{r.requesterName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{r.mesjidName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{r.amount} Birr</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        r.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                        r.status === "APPROVED" ? "bg-green-100 text-green-700" :
                        "bg-red-100 text-red-700"
                      }`}>{r.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      {r.status === "PENDING" && (
                        <div className="flex gap-2">
                          <button onClick={() => handleApproveRequest(r.id, r.amount)} className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200">Approve</button>
                          <button onClick={() => handleRejectRequest(r.id, "Rejected by admin")} className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200">Reject</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">No requests found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Mesjid Modal */}
      {showAddMesjidModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Mesjid</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const name = (form.elements.namedItem("name") as HTMLInputElement).value;
              const location = (form.elements.namedItem("location") as HTMLInputElement).value;
              try {
                await api.post("/mosque", { name, location }, { headers: { Authorization: `Bearer ${token}` } });
                fetchMesjids();
                setShowAddMesjidModal(false);
              } catch (err) { alert("Failed to add mesjid"); }
            }}>
              <div className="space-y-4">
                <input name="name" placeholder="Mesjid Name" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
                <input name="location" placeholder="Location" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowAddMesjidModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700">Add Mesjid</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Admin Modal */}
      {showAddAdminModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Mesjid Admin</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const name = (form.elements.namedItem("name") as HTMLInputElement).value;
              const email = (form.elements.namedItem("email") as HTMLInputElement).value;
              const mesjidId = (form.elements.namedItem("mesjidId") as HTMLSelectElement).value;
              try {
                await api.post("/admin", { name, email, mesjidId }, { headers: { Authorization: `Bearer ${token}` } });
                fetchAdmins();
                setShowAddAdminModal(false);
              } catch (err) { alert("Failed to add admin"); }
            }}>
              <div className="space-y-4">
                <input name="name" placeholder="Name" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
                <input name="email" type="email" placeholder="Email" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
                <select name="mesjidId" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none">
                  <option value="">Select Mesjid</option>
                  {mesjids.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowAddAdminModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Add Admin</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
