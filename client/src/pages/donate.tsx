export default function DonatePage() {
  const [donateAmount, setDonateAmount] = useState("");
  const [donateType, setDonateType] = useState("");
  return (
    <>
      {/* DONATE CARD */}
      <div className={styles.donateCard}>
        <h3>Donate Now</h3>

        <p>
          Send Zakah to: <strong>CBE Account 1234567890 (Superadmin)</strong>
        </p>

        <input
          type="number"
          placeholder="Amount (required)"
          value={donateAmount}
          className={styles.input}
          onChange={(e) => setDonateAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type (optional)"
          value={donateType}
          className={styles.input}
          onChange={(e) => setDonateType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add a note (optional)"
          value={donateNote}
          className={styles.input}
          onChange={(e) => setDonateNote(e.target.value)}
        />

        {/* CURRENT DONATION STATUS */}
        {donationStatus && (
          <div
            style={{
              background:
                donationStatus.status === "pending" ? "#fff3cd" : "#d4edda",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "10px",
              border:
                donationStatus.status === "pending"
                  ? "1px solid #ffeeba"
                  : "1px solid #c3e6cb",
              color:
                donationStatus.status === "pending" ? "#856404" : "#155724",
              fontWeight: 500,
            }}
          >
            <strong>Status: </strong>
            {donationStatus.status === "pending"
              ? "Pending Review"
              : "Received"}
            <br />
            {donationStatus.note && (
              <>
                <strong>Note:</strong> {donationStatus.note}
                <br />
              </>
            )}
            May Allah accept your Zakah. <br />
            <em>
              "Indeed, Allah loves those who rely upon Him." (Qur’an 3:159)
            </em>
          </div>
        )}

        {donateError && <p className={styles.error}>{donateError}</p>}

        <button
          className={styles.donateBtn}
          onClick={handleDonate}
          disabled={donateLoading}
        >
          {donateLoading ? "Submitting..." : "Donate Now"}
        </button>
      </div>
    </>
  );
}
