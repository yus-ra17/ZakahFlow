import { useEffect, useState } from "react";
import { api } from "../api";
import DashboardLayout from "../components/layout/DashboardLayout";

interface Beneficiary { id: string; name: string; description: string; }
interface DistributorTask { id: string; beneficiary: Beneficiary; amount: number; notes?: string; status: "ASSIGNED" | "IN_PROGRESS" | "COMPLETED"; assignedAt: string; updatedAt: string; }

const DistributorDashboard = () => {
  const [tasks, setTasks] = useState<DistributorTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED">("ALL");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/distribution-task/my-tasks");
      setTasks(res.data);
    } catch (err: any) { alert(err.response?.data?.error || "Failed to fetch tasks"); }
    finally { setLoading(false); }
  };

  const updateStatus = async (taskId: string, status: "IN_PROGRESS" | "COMPLETED") => {
    try { await api.put(`/distribution-task/${taskId}/status`, { status }); fetchTasks(); }
    catch (err: any) { alert(err.response?.data?.error || "Failed to update status"); }
  };

  useEffect(() => { fetchTasks(); }, []);

  const filteredTasks = filter === "ALL" ? tasks : tasks.filter(t => t.status === filter);
  const stats = {
    total: tasks.length,
    assigned: tasks.filter(t => t.status === "ASSIGNED").length,
    inProgress: tasks.filter(t => t.status === "IN_PROGRESS").length,
    completed: tasks.filter(t => t.status === "COMPLETED").length,
  };

  const navItems = [
    { label: "All Tasks", active: filter === "ALL", onClick: () => setFilter("ALL"),
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
    { label: "Assigned", active: filter === "ASSIGNED", onClick: () => setFilter("ASSIGNED"),
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { label: "In Progress", active: filter === "IN_PROGRESS", onClick: () => setFilter("IN_PROGRESS"),
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
    { label: "Completed", active: filter === "COMPLETED", onClick: () => setFilter("COMPLETED"),
      icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  ];

  return (
    <DashboardLayout title="Distributor Dashboard" navItems={navItems}>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Tasks</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Assigned</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.assigned}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
      </div>

      {/* Tasks Table */}
      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beneficiary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTasks.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{t.beneficiary.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{t.amount} Birr</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{t.notes || "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      t.status === "ASSIGNED" ? "bg-yellow-100 text-yellow-700" :
                      t.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-700" :
                      "bg-green-100 text-green-700"
                    }`}>{t.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(t.assignedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {t.status === "ASSIGNED" && (
                        <button onClick={() => updateStatus(t.id, "IN_PROGRESS")} className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">Start</button>
                      )}
                      {t.status !== "COMPLETED" && (
                        <button onClick={() => updateStatus(t.id, "COMPLETED")} className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200">Complete</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTasks.length === 0 && <tr><td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">No tasks found</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DistributorDashboard;
