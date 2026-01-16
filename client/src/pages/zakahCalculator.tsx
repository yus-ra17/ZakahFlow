"use client";

import { useState } from "react";
import { api } from "../api";
import styles from "./ZakahCalculator.module.css";

// Import header and footer
import Header3 from "../components/layout/header/Header3";
import Footer3 from "../components/layout/footer/Footer3";

type ZakatType = "METAL" | "LIVESTOCK" | "CROPS" | "BUSINESS" | "RIKAZ";

export default function ZakahCalculatorPage() {
  const [zakatType, setZakatType] = useState<ZakatType | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const routeMap: Record<ZakatType, string> = {
    METAL: "/metal/calculate",
    LIVESTOCK: "/livestock/calculate",
    CROPS: "/crops/calculate",
    BUSINESS: "/business/calculate",
    RIKAZ: "/rikaz/calculate",
  };

  const handleCalculate = async () => {
    setError("");
    setResult(null);

    if (!zakatType) {
      setError("Please select a Zakat type");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(routeMap[zakatType], formData);
      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Calculation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
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

        {/* ZAKAH GUIDANCE CARD */}
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
            {/* ZAKAT TYPE BUTTONS */}
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
                  className={`${styles.typeBtn} ${
                    zakatType === type ? styles.active : ""
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* FORM FIELDS */}
            {zakatType === "METAL" && (
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
                      setFormData({
                        ...formData,
                        grams: Number(e.target.value),
                      })
                    }
                  />
                )}
                {formData.wealthType === "CASH" && (
                  <input
                    type="number"
                    className={styles.input}
                    placeholder="gram"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cashAmount: Number(e.target.value),
                      })
                    }
                  />
                )}
              </>
            )}

            {zakatType === "LIVESTOCK" && (
              <>
                <select
                  className={styles.input}
                  onChange={(e) =>
                    setFormData({ ...formData, livestockType: e.target.value })
                  }
                >
                  <option value="">Select Livestock</option>
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
                    setFormData({
                      ...formData,
                      quantity: Number(e.target.value),
                    })
                  }
                />
              </>
            )}

            {zakatType === "CROPS" && (
              <>
                <input
                  className={styles.input}
                  placeholder="Crop Type"
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
                  <option value="">Irrigation Type</option>
                  <option value="natural">Natural (Rain)</option>
                  <option value="artificial">Artificial</option>
                </select>
              </>
            )}

            {zakatType === "BUSINESS" && (
              <>
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Cash"
                  onChange={(e) =>
                    setFormData({ ...formData, cash: Number(e.target.value) })
                  }
                />
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Stock Value"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stockValue: Number(e.target.value),
                    })
                  }
                />
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Debts"
                  onChange={(e) =>
                    setFormData({ ...formData, debts: Number(e.target.value) })
                  }
                />
              </>
            )}

            {zakatType === "RIKAZ" && (
              <>
                <input
                  className={styles.input}
                  placeholder="Found item type (gold, silver, treasure)"
                  onChange={(e) =>
                    setFormData({ ...formData, itemType: e.target.value })
                  }
                />
                <input
                  type="number"
                  className={styles.input}
                  placeholder="Found value (ETB)"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      foundValue: Number(e.target.value),
                    })
                  }
                />
              </>
            )}

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
      </div>

      {/* FOOTER */}
      <Footer3 />
    </>
  );
}
