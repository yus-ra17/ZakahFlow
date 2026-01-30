export default function DonationDetails() {
  const [donations, setDonations] = useState<
    Array<{
      id: number;
      amount: number;
      type: string;
      note: string;
      status: string;
      createdAt: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  return (
    <>
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          background: "#f8f9fa",
          borderRadius: "12px",
        }}
      >
        <h3>Your Past Donations</h3>
        {donations.length === 0 ? (
          <p>You have not made any donations yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className={styles.donationsTable}>
              <thead>
                <tr>
                  <th>Amount (Birr)</th>
                  <th>Type</th>
                  <th>Note</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d.id}>
                    <td>{d.amount}</td>
                    <td>{d.type || "-"}</td>
                    <td>{d.note || "-"}</td>
                    <td
                      style={{
                        color: d.status === "PENDING" ? "#856404" : "#155724",
                        fontWeight: 500,
                      }}
                    >
                      {d.status === "PENDING" ? "Pending" : "Reviewed"}
                    </td>

                    <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
