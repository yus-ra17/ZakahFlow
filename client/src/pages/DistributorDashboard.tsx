import { useEffect, useState } from "react";
import { api } from "../api";
import Header3 from "../components/layout/header/Header3";
import Footer3 from "../components/layout/footer/Footer3";
import styles from "./distributor.module.css";

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

interface DistributorTask {
  id: string;
  beneficiary: Beneficiary;
  amount: number;
  notes?: string;
  status: "ASSIGNED" | "IN_PROGRESS" | "COMPLETED";
  assignedAt: string;
  updatedAt: string;
}

const DistributorDashboard = () => {
  const [tasks, setTasks] = useState<DistributorTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [distributor, setDistributor] = useState<{
    name: string;
    role: string;
  }>({
    name: "",
    role: "DISTRIBUTOR",
  });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setDistributor({ name: user.name, role: user.role });

      const res = await api.get("/distribution-task/my-tasks");
      setTasks(res.data);
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    taskId: string,
    status: "IN_PROGRESS" | "COMPLETED",
  ) => {
    try {
      await api.put(`/distribution-task/${taskId}/status`, { status });
      alert("Task status updated!");
      fetchTasks();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={styles.page}>
      <Header3
        scroll={false}
        handlePopup={() => {}}
        handleMobileMenu={() => {}}
      />

      <main className={styles.main}>
        {/* Distributor info card */}
        <div className={styles.distributorCard}>
          <div className={styles.infoLeft}>
            <h2 className={styles.distributorName}>{distributor.name}</h2>
            <p className={styles.distributorRole}>{distributor.role}</p>
          </div>
          <div className={styles.quranWrap}>
            <p className={styles.quranVerse}>
              "And whoever saves one [life] – it is as if he had saved mankind
              entirely." – Quran 5:32
            </p>
          </div>
        </div>

        <h2 className={styles.title}>My Distribution Tasks</h2>

        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks assigned.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  <th>Beneficiary</th>
                  <th>Amount</th>
                  <th>Notes</th>
                  <th>Status</th>
                  <th>Assigned At</th>
                  <th>Updated At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr key={t.id} className={styles.tr}>
                    <td>{t.beneficiary.name}</td>
                    <td>{t.amount}</td>
                    <td>{t.notes || "—"}</td>
                    <td>{t.status}</td>
                    <td>{new Date(t.assignedAt).toLocaleDateString()}</td>
                    <td>{new Date(t.updatedAt).toLocaleDateString()}</td>
                    <td className={styles.actionsCell}>
                      {t.status === "ASSIGNED" && (
                        <button
                          className={`${styles.smallBtn} ${styles.btnBlue}`}
                          onClick={() => updateStatus(t.id, "IN_PROGRESS")}
                        >
                          Start
                        </button>
                      )}
                      {t.status !== "COMPLETED" && (
                        <button
                          className={`${styles.smallBtn} ${styles.btnGreen}`}
                          onClick={() => updateStatus(t.id, "COMPLETED")}
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer3 />
    </div>
  );
};

export default DistributorDashboard;
