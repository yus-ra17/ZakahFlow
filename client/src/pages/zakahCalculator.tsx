"use client";

import { useState, useEffect } from "react";
import { api } from "../api";
import styles from "./ZakahCalculator.module.css";

// Import header and footer
import Header3 from "../components/layout/header/Header3";
import Footer3 from "../components/layout/footer/Footer3";

type ZakatType = "METAL" | "LIVESTOCK" | "CROPS" | "BUSINESS" | "RIKAZ";

interface Donation {
  id: string;
  amount: number;
  type?: string;
  note?: string;
  status: "pending" | "received";
  createdAt: string;
}

export default function ZakahCalculatorPage() {
  const [zakatType, setZakatType] = useState<ZakatType | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [donateAmount, setDonateAmount] = useState("");
  const [donateType, setDonateType] = useState("");
  const [donateNote, setDonateNote] = useState("");
  const [donationStatus, setDonationStatus] = useState<Donation | null>(null);
  const [donateError, setDonateError] = useState("");
  const [donateLoading, setDonateLoading] = useState(false);

  const [donations, setDonations] = useState<Donation[]>([]);

  const routeMap: Record<ZakatType, string> = {
    METAL: "/metal/calculate",
    LIVESTOCK: "/livestock/calculate",
    CROPS: "/crops/calculate",
    BUSINESS: "/business/calculate",
    RIKAZ: "/rikaz/calculate",
  };

  // ------------------ FETCH ALL USER DONATIONS ------------------
  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/donation/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonations(res.data);
    } catch (err) {
      console.error("Failed to fetch donations", err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // ------------------ ZAKAH CALCULATION ------------------
  const handleCalculate = async () => {
    setError("");
    setResult(null);

    if (!zakatType) {
      setError("Please select a Zakat type");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(routeMap[zakatType], formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Calculation failed");
    } finally {
      setLoading(false);
    }
  };

  // ------------------ DONATE NOW ------------------
  const handleDonate = async () => {
    setDonateError("");
    setDonationStatus(null);

    if (!donateAmount || isNaN(Number(donateAmount))) {
      setDonateError("Please enter a valid amount");
      return;
    }

    setDonateLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/donation",
        {
          amount: Number(donateAmount),
          type: donateType || null,
          note: donateNote || null,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Show current pending donation
      setDonationStatus({
        id: res.data.id,
        amount: res.data.amount,
        type: res.data.type,
        note: res.data.note,
        status: "pending",
        createdAt: res.data.createdAt,
      });

      // Reset form fields
      setDonateAmount("");
      setDonateType("");
      setDonateNote("");

      // Refresh all donations table
      fetchDonations();
    } catch (err: any) {
      setDonateError(err.response?.data?.error || "Failed to submit donation");
    } finally {
      setDonateLoading(false);
    }
  };

  // ------------------ DYNAMIC ZAKAH FIELDS ------------------
  const renderFields = () => {
    switch (zakatType) {
      case "METAL":
        return (
          <>
            <select
              className={styles.input}
              onChange={(e) =>
                setFormData({ ...formData, wealthType: e.target.value })
              }
            >
              <option value="">Select Metal Type</option>
              <option value="GOLD">Gold</option>
              <option value="SILVER">Silver</option>
              <option value="CASH">Cash</option>
            </select>
            {formData.wealthType !== "CASH" && (
              <input
                type="number"
                className={styles.input}
                placeholder="Amount in grams"
                onChange={(e) =>
                  setFormData({ ...formData, grams: Number(e.target.value) })
                }
              />
            )}
            {formData.wealthType === "CASH" && (
              <input
                type="number"
                className={styles.input}
                placeholder="Amount in cash"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cashAmount: Number(e.target.value),
                  })
                }
              />
            )}
          </>
        );
      case "LIVESTOCK":
        return (
          <>
            <select
              className={styles.input}
              onChange={(e) =>
                setFormData({ ...formData, livestockType: e.target.value })
              }
            >
              <option value="">Select livestock type</option>
              <option value="CAMEL">Camel</option>
              <option value="COW">Cow</option>
              <option value="SHEEP">Sheep</option>
              <option value="GOAT">Goat</option>
            </select>
            <input
              type="number"
              className={styles.input}
              placeholder="Quantity"
              onChange={(e) =>
                setFormData({ ...formData, quantity: Number(e.target.value) })
              }
            />
          </>
        );
      case "CROPS":
        return (
          <>
            <input
              type="text"
              className={styles.input}
              placeholder="Crop type"
              onChange={(e) =>
                setFormData({ ...formData, cropType: e.target.value })
              }
            />
            <input
              type="number"
              className={styles.input}
              placeholder="Weight (kg)"
              onChange={(e) =>
                setFormData({ ...formData, weight: Number(e.target.value) })
              }
            />
            <select
              className={styles.input}
              onChange={(e) =>
                setFormData({ ...formData, irrigationType: e.target.value })
              }
            >
              <option value="">Select irrigation type</option>
              <option value="natural">Natural (rain)</option>
              <option value="artificial">Artificial</option>
            </select>
          </>
        );
      case "BUSINESS":
        return (
          <>
            <input
              type="number"
              className={styles.input}
              placeholder="Cash amount"
              onChange={(e) =>
                setFormData({ ...formData, cash: Number(e.target.value) })
              }
            />
            <input
              type="number"
              className={styles.input}
              placeholder="Stock value"
              onChange={(e) =>
                setFormData({ ...formData, stockValue: Number(e.target.value) })
              }
            />
            <input
              type="number"
              className={styles.input}
              placeholder="Debts (if any)"
              onChange={(e) =>
                setFormData({ ...formData, debts: Number(e.target.value) })
              }
            />
          </>
        );
      case "RIKAZ":
        return (
          <>
            <input
              type="text"
              className={styles.input}
              placeholder="Item type"
              onChange={(e) =>
                setFormData({ ...formData, itemType: e.target.value })
              }
            />
            <input
              type="number"
              className={styles.input}
              placeholder="Found value (Birr)"
              onChange={(e) =>
                setFormData({ ...formData, foundValue: Number(e.target.value) })
              }
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header3 />

      <div className={styles.page}>
        {/* PAGE HEADER */}
        <div className={styles.header}>
          <h1>Simplify Your Zakat Calculation</h1>
          <p>
            Calculating Zakat doesn’t have to be complicated. We break your
            assets into categories like Zakatable assets and deductible
            liabilities, making it simple.
          </p>
          <p>
            Enter your assets and liabilities over the lunar year, and our
            calculator will show the Zakat you owe according to Nisab
            thresholds.
          </p>
        </div>

        {/* ZAKAH GUIDANCE */}
        <div className={styles.guidanceCard}>
          <h2>Who Is Eligible to Receive Zakah?</h2>
          <ul>
            <li>The poor (Al-Fuqara)</li>
            <li>The needy (Al-Masakin)</li>
            <li>Those in debt</li>
            <li>Wayfarers in need</li>
            <li>Those striving in the path of Allah</li>
            <li>Zakah administrators</li>
            <li>Those whose hearts are to be reconciled</li>
            <li>Those in bondage</li>
          </ul>
          <p className={styles.ayah}>
            “Zakah expenditures are only for the poor and the needy, for those
            employed to administer it, for those whose hearts are attracted ˹to
            the faith˺, for ˹freeing˺ slaves, for those in debt, for Allah’s
            cause, and for ˹needy˺ travellers. ˹This is˺ an obligation from
            Allah. And Allah is All-Knowing, All-Wise.” (Qur’an 9:60)
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className={styles.container}>
          {/* FORM CARD */}
          <div className={styles.formCard}>
            <div className={styles.typeButtons}>
              {(
                [
                  "METAL",
                  "LIVESTOCK",
                  "CROPS",
                  "BUSINESS",
                  "RIKAZ",
                ] as ZakatType[]
              ).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setZakatType(type);
                    setFormData({});
                    setResult(null);
                    setError("");
                  }}
                  className={`${styles.typeBtn} ${zakatType === type ? styles.active : ""}`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* DYNAMIC FIELDS */}
            {renderFields()}

            {error && <p className={styles.error}>{error}</p>}

            {zakatType && (
              <button className={styles.calculateBtn} onClick={handleCalculate}>
                {loading ? "Calculating..." : "Calculate Zakat"}
              </button>
            )}
          </div>

          {/* RESULT CARD */}
          {result && (
            <div className={styles.resultCard}>
              <h3>Your Zakah Result</h3>
              <p>{result.message}</p>
              {result.zakatDue !== undefined && (
                <div className={styles.zakatAmount}>{result.zakatDue}</div>
              )}
            </div>
          )}
        </div>

        {/* ----------------- DONATION FORM + TABLE ----------------- */}
        <>
          {/* DONATE CARD */}
          <div className={styles.donateCard}>
            <h3>Donate Now</h3>

            <p>
              Send Zakah to:{" "}
              <strong>CBE Account 1234567890 (Superadmin)</strong>
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

          {/* SEPARATE TABLE */}
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
                            color:
                              d.status === "PENDING" ? "#856404" : "#155724",
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
      </div>

      <Footer3 />
    </>
  );
}
