import { useEffect, useState } from "react";
import { api } from "../api";
import DashboardLayout from "../components/layout/DashboardLayout";

const ZAKAH_CATEGORIES = [
  "Poor (Al-Fuqara)",
  "Needy (Al-Masakin)",
  "Zakah Collectors (Al-'Amilina 'Alayha)",
  "Those Whose Hearts Are Reconciled",
  "Freeing Captives (Riqab)",
  "Debtors (Al-Gharimin)",
  "In the Cause of Allah",
  "Wayfarer (Ibn As-Sabil)",
];

interface Distributor { id: string; name: string; email: string; role?: string; isActive?: boolean; createdAt: string; }
interface DistributionTask { id: string; distributor: Distributor; beneficiary: Beneficiary; amount: number; notes?: string; status: string; assignedAt: string; updatedAt: string; }
interface Beneficiary { id: string; name: string; description: string; gender: string; maritalStatus: string; familiesCount: number; phone?: string; address?: string; createdAt: string; }
interface DonationRequest { id: string; amount: number; note?: string; status: string; createdAt: string; rejectionNote?: string; }

type View = "beneficiaries" | "requests" | "distribution" | "distributors";

const AdminDashboard = () => {
  const [view, setView] = useState<View>("beneficiaries");
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [tasks, setTasks] = useState<DistributionTask[]>([]);
  const [totalReceived, setTotalReceived] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showDistributorModal, setShowDistributorModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [current, setCurrent] = useState<Beneficiary | null>(null);

  const [form, setForm] = useState({ name: "", description: "", gender: "", maritalStatus: "", familiesCount: 1, phone: "", address: "" });
  const [requestForm, setRequestForm] = useState({ amount: 0, note: "" });
  const [distributorForm, setDistributorForm] = useState({ name: "", email: "", password: "" });
  const [taskForm, setTaskForm] = useState({ distributorId: "", beneficiaryId: "", amount: 0, notes: "" });

  // Fetchers
  const fetchBeneficiaries = async () => {
    setLoading(true);
    try { const res = await api.get("/beneficiary"); setBeneficiaries(res.data); }
    catch (err: any) { alert(err.response?.data?.error || "Failed to fetch beneficiaries"); }
    finally { setLoading(false); }
  };

  const fetchRequests = async () => {
    try {
      const res = await api.get("/donation/request/my-requests");
      setRequests(res.data);
      const received = res.data.filter((r: DonationRequest) => r.status === "APPROVED").reduce((sum: number, r: DonationRequest) => sum + r.amount, 0);
      setTotalReceived(received);
    } catch (err: any) { alert(err.response?.data?.error || "Failed to fetch requests"); }
  };

  const fetchDistributors = async () => {
    try { const res = await api.get("/distributor"); setDistributors(res.data); }
    catch (err: any) { alert(err.response?.data?.error || "Failed to fetch distributors"); }
  };

  const fetchTasks = async () => {
    try { const res = await api.get("/distribution-task/admin"); setTasks(res.data); }
    catch (err: any) { alert(err.response?.data?.error || "Failed to fetch tasks"); }
  };

  useEffect(() => { fetchBeneficiaries(); fetchRequests(); }, []);
  useEffect(() => {
    if (view === "distribution") { fetchDistributors(); fetchBeneficiaries(); fetchTasks(); }
    else if (view === "distributors") { fetchDistributors(); }
  }, [view]);

  // Handlers
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await api.post("/beneficiary", form); setShowAddModal(false); setForm({ name: "", description: "", gender: "", maritalStatus: "", familiesCount: 1, phone: "", address: "" }); fetchBeneficiaries(); }
    catch (err: any) { alert(err.response?.data?.error || "Failed to add beneficiary"); }
  };

  const handleUpdate = async () => {
    if (!current) return;
    try { await api.put(`/beneficiary/${current.id}`, form); setShowEditModal(false); fetchBeneficiaries(); }
    catch (err: any) { alert(err.response?.data?.error || "Update failed"); }
  };

  const handleDelete = async () => {
    if (!current) return;
    try { await api.delete(`/beneficiary/${current.id}`); setShowDeleteModal(false); fetchBeneficiaries(); }
    catch (err: any) { alert(err.response?.data?.error || "Delete failed"); }
  };

  const handleRequestDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (requestForm.amount <= 0) return alert("Enter a valid amount");
    try { await api.post("/donation/request", requestForm); setShowRequestModal(false); setRequestForm({ amount: 0, note: "" }); fetchRequests(); alert("Request sent!"); }
    catch (err: any) { alert(err.response?.data?.error || "Failed to send request"); }
  };

  const handleCreateDistributor = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await api.post("/distributor", distributorForm); setShowDistributorModal(false); setDistributorForm({ name: "", email: "", password: "" }); fetchDistributors(); alert("Distributor added!"); }
    catch (err: any) { alert(err.response?.data?.error || "Failed to add distributor"); }
  };

  const handleAssignTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.distributorId || !taskForm.beneficiaryId || taskForm.amount <= 0) return alert("Fill all fields");
    try { await api.post("/distribution-task", taskForm); setShowTaskModal(false); setTaskForm({ distributorId: "", beneficiaryId: "", amount: 0, notes: "" }); fetchTasks(); setTotalReceived((prev) => prev - taskForm.amount); alert("Task assigned!"); }
    catch (err: any) { alert(err.response?.data?.error || "Failed to assign task"); }
  };

  const navItems = [
    { label: "Beneficiaries", active: view === "beneficiaries", onClick: () => setView("beneficiaries"),
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { label: "Requests", active: view === "requests", onClick: () => { setView("requests"); fetchRequests(); },
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
    { label: "Distribution", active: view === "distribution", onClick: () => setView("distribution"),
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg> },
    { label: "Distributors", active: view === "distributors", onClick: () => setView("distributors"),
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
  ];

  return (
    <DashboardLayout title="Mosque Admin Dashboard" navItems={navItems}>
      {/* Balance card */}
      <div className="mb-6 bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Received</p>
          <p className="text-2xl font-bold text-amber-700">{totalReceived.toLocaleString()} Birr</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700">+ Beneficiary</button>
          <button onClick={() => setShowRequestModal(true)} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">Request Donation</button>
          <button onClick={() => { fetchDistributors(); fetchBeneficiaries(); setShowTaskModal(true); }} className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700">Assign Task</button>
          <button onClick={() => setShowDistributorModal(true)} className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700">+ Distributor</button>
        </div>
      </div>

      {/* Beneficiaries */}
      {view === "beneficiaries" && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Families</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {beneficiaries.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{b.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{b.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{b.gender}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{b.familiesCount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{b.phone || "—"}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => { setCurrent(b); setForm({ ...b }); setShowEditModal(true); }} className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">Edit</button>
                      <button onClick={() => { setCurrent(b); setShowDeleteModal(true); }} className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {beneficiaries.length === 0 && <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">No beneficiaries found</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Requests */}
      {view === "requests" && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Note</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{r.amount} Birr</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{r.note || "—"}</td>
                  <td className="px-6 py-4"><span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${r.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : r.status === "APPROVED" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{r.status}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {requests.length === 0 && <tr><td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">No requests found</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Distributors */}
      {view === "distributors" && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {distributors.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{d.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{d.email}</td>
                  <td className="px-6 py-4"><span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${d.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{d.isActive ? "Active" : "Inactive"}</span></td>
                  <td className="px-6 py-4">
                    <button onClick={async () => { try { await api.patch(`/distributor/${d.id}/status`, { isActive: !d.isActive }); fetchDistributors(); } catch (err: any) { alert(err.response?.data?.error || "Failed"); } }} className={`px-3 py-1 text-xs font-medium rounded-lg ${d.isActive ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
                      {d.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
              {distributors.length === 0 && <tr><td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">No distributors found</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Distribution Tasks */}
      {view === "distribution" && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distributor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beneficiary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{t.distributor.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{t.beneficiary.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{t.amount} Birr</td>
                  <td className="px-6 py-4"><span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${t.status === "COMPLETED" ? "bg-green-100 text-green-700" : t.status === "ASSIGNED" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>{t.status}</span></td>
                  <td className="px-6 py-4">
                    {t.status === "ASSIGNED" && (
                      <div className="flex gap-2">
                        <button onClick={async () => { try { await api.put(`/distribution-task/${t.id}/approve`); fetchTasks(); } catch (err: any) { alert(err.response?.data?.error || "Failed"); } }} className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200">Approve</button>
                        <button onClick={async () => { try { await api.put(`/distribution-task/${t.id}/reject`, { rejectionNote: "Rejected" }); fetchTasks(); setTotalReceived((prev) => prev + t.amount); } catch (err: any) { alert(err.response?.data?.error || "Failed"); } }} className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200">Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">No tasks found</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Beneficiary Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{showAddModal ? "Add Beneficiary" : "Edit Beneficiary"}</h3>
            <form onSubmit={showAddModal ? handleCreate : (e) => { e.preventDefault(); handleUpdate(); }} className="space-y-4">
              <input className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required>
                <option value="" disabled>Category</option>
                {ZAKAH_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} required>
                <option value="" disabled>Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={form.maritalStatus} onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })} required>
                <option value="" disabled>Marital Status</option>
                <option value="SINGLE">Single</option>
                <option value="MARRIED">Married</option>
                <option value="DIVORCED">Divorced</option>
                <option value="WIDOWED">Widowed</option>
              </select>
              <input type="number" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Family Count" value={form.familiesCount} onChange={(e) => setForm({ ...form, familiesCount: Number(e.target.value) })} min={1} required />
              <input className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700">{showAddModal ? "Add" : "Update"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && current && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Delete Beneficiary</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete <strong>{current.name}</strong>?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Request Donation Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Donation</h3>
            <form onSubmit={handleRequestDonation} className="space-y-4">
              <input type="number" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Amount" value={requestForm.amount} onChange={(e) => setRequestForm({ ...requestForm, amount: Number(e.target.value) })} min={1} required />
              <input className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Note (optional)" value={requestForm.note} onChange={(e) => setRequestForm({ ...requestForm, note: e.target.value })} />
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowRequestModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Send Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Distributor Modal */}
      {showDistributorModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Distributor</h3>
            <form onSubmit={handleCreateDistributor} className="space-y-4">
              <input className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Name" value={distributorForm.name} onChange={(e) => setDistributorForm({ ...distributorForm, name: e.target.value })} required />
              <input type="email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Email" value={distributorForm.email} onChange={(e) => setDistributorForm({ ...distributorForm, email: e.target.value })} required />
              <input type="password" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Password" value={distributorForm.password} onChange={(e) => setDistributorForm({ ...distributorForm, password: e.target.value })} />
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowDistributorModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Assign Distribution Task</h3>
            <form onSubmit={handleAssignTask} className="space-y-4">
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={taskForm.distributorId} onChange={(e) => setTaskForm({ ...taskForm, distributorId: e.target.value })} required>
                <option value="" disabled>Select Distributor</option>
                {distributors.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={taskForm.beneficiaryId} onChange={(e) => setTaskForm({ ...taskForm, beneficiaryId: e.target.value })} required>
                <option value="" disabled>Select Beneficiary</option>
                {beneficiaries.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
              <input type="number" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Amount" value={taskForm.amount} onChange={(e) => setTaskForm({ ...taskForm, amount: Number(e.target.value) })} min={1} required />
              <input className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Notes (optional)" value={taskForm.notes} onChange={(e) => setTaskForm({ ...taskForm, notes: e.target.value })} />
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowTaskModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">Assign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
