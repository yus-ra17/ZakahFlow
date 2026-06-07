"use client";

import { useState } from "react";
import Header from "../components/layout/header/Header";
import { Link } from "@tanstack/react-router";

type ZakatType = "METAL" | "LIVESTOCK" | "CROPS" | "BUSINESS" | "RIKAZ";

export default function ZakahCalculatorPage() {
  const [zakatType, setZakatType] = useState<ZakatType | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setError("");
    setResult(null);

    if (!zakatType) {
      setError("Please select a Zakat type");
      return;
    }

    setLoading(true);
    
    // Client-side calculation (no backend/login required)
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // brief delay for UX
      
      let calcResult: any = null;

      switch (zakatType) {
        case "METAL": {
          const { wealthType, grams, cashAmount } = formData;
          if (!wealthType) { setError("Please select a metal type"); setLoading(false); return; }
          
          if (wealthType === "GOLD") {
            if (!grams || grams <= 0) { setError("Please enter grams of gold"); setLoading(false); return; }
            const nisab = 85;
            if (grams < nisab) {
              calcResult = { message: `Your gold (${grams}g) is below nisab (${nisab}g) — no Zakah due.`, zakatDue: 0, nisabValue: nisab, zakatRate: 0.025 };
            } else {
              const due = grams * 0.025;
              calcResult = { message: `You must give ${due.toFixed(2)} grams of gold as Zakah (2.5%).`, zakatDue: due, nisabValue: nisab, zakatRate: 0.025 };
            }
          } else if (wealthType === "SILVER") {
            if (!grams || grams <= 0) { setError("Please enter grams of silver"); setLoading(false); return; }
            const nisab = 595;
            if (grams < nisab) {
              calcResult = { message: `Your silver (${grams}g) is below nisab (${nisab}g) — no Zakah due.`, zakatDue: 0, nisabValue: nisab, zakatRate: 0.025 };
            } else {
              const due = grams * 0.025;
              calcResult = { message: `You must give ${due.toFixed(2)} grams of silver as Zakah (2.5%).`, zakatDue: due, nisabValue: nisab, zakatRate: 0.025 };
            }
          } else if (wealthType === "CASH") {
            if (!cashAmount || cashAmount <= 0) { setError("Please enter cash amount"); setLoading(false); return; }
            // Using approximate silver nisab in ETB (595g * ~50 ETB/g = ~29,750 ETB)
            const nisabETB = 29750;
            if (cashAmount < nisabETB) {
              calcResult = { message: `Your cash (${cashAmount} Birr) is below nisab (~${nisabETB} Birr) — no Zakah due.`, zakatDue: 0, nisabValue: nisabETB, zakatRate: 0.025 };
            } else {
              const due = cashAmount * 0.025;
              calcResult = { message: `You must give ${due.toFixed(2)} Birr as Zakah (2.5% of your cash).`, zakatDue: due, nisabValue: nisabETB, zakatRate: 0.025 };
            }
          }
          break;
        }
        case "LIVESTOCK": {
          const { livestockType, quantity } = formData;
          if (!livestockType) { setError("Please select a livestock type"); setLoading(false); return; }
          if (!quantity || quantity <= 0) { setError("Please enter quantity"); setLoading(false); return; }

          let zakahAnimals = "";
          if (livestockType === "CAMEL") {
            if (quantity < 5) zakahAnimals = "No Zakah due (below nisab of 5 camels)";
            else if (quantity <= 9) zakahAnimals = "1 one-year-old she-camel (Bint Makhad)";
            else if (quantity <= 14) zakahAnimals = "2 one-year-old she-camels";
            else if (quantity <= 19) zakahAnimals = "3 one-year-old she-camels";
            else if (quantity <= 24) zakahAnimals = "4 one-year-old she-camels";
            else if (quantity <= 35) zakahAnimals = "1 two-year-old she-camel (Bint Labun)";
            else if (quantity <= 45) zakahAnimals = "1 three-year-old she-camel (Hiqqah)";
            else if (quantity <= 60) zakahAnimals = "1 four-year-old she-camel (Jadh'ah)";
            else if (quantity <= 75) zakahAnimals = "2 two-year-old she-camels";
            else if (quantity <= 90) zakahAnimals = "2 three-year-old she-camels";
            else if (quantity <= 120) zakahAnimals = "2 four-year-old she-camels";
            else zakahAnimals = `${Math.floor(quantity / 40)} two-year-old + ${Math.floor(quantity / 50)} three-year-old she-camels`;
          } else if (livestockType === "COW") {
            if (quantity < 30) zakahAnimals = "No Zakah due (below nisab of 30 cattle)";
            else {
              const calves = Math.floor(quantity / 30);
              zakahAnimals = `${calves} one-year-old calf (Tabi')`;
            }
          } else if (livestockType === "SHEEP" || livestockType === "GOAT") {
            if (quantity < 40) zakahAnimals = `No Zakah due (below nisab of 40 ${livestockType.toLowerCase()}s)`;
            else if (quantity <= 120) zakahAnimals = `1 ${livestockType.toLowerCase()}`;
            else if (quantity <= 200) zakahAnimals = `2 ${livestockType.toLowerCase()}s`;
            else if (quantity <= 300) zakahAnimals = `3 ${livestockType.toLowerCase()}s`;
            else zakahAnimals = `${Math.floor(quantity / 100)} ${livestockType.toLowerCase()}s`;
          }
          calcResult = { message: `For ${quantity} ${livestockType.toLowerCase()}(s): ${zakahAnimals}`, zakahAnimals };
          break;
        }
        case "CROPS": {
          const { cropType, weight, irrigationType } = formData;
          if (!cropType) { setError("Please enter crop type"); setLoading(false); return; }
          if (!weight || weight <= 0) { setError("Please enter weight in kg"); setLoading(false); return; }
          if (!irrigationType) { setError("Please select irrigation type"); setLoading(false); return; }

          const nisabKg = 653;
          if (weight < nisabKg) {
            calcResult = { message: `Your harvest (${weight}kg) is below nisab (${nisabKg}kg) — no Zakah due.`, zakatDue: 0, nisabValue: nisabKg };
          } else {
            const rate = irrigationType === "natural" ? 0.10 : 0.05;
            const due = weight * rate;
            calcResult = { message: `You must give ${due.toFixed(2)} kg of ${cropType} as Zakah (${rate * 100}% for ${irrigationType} irrigation).`, zakatDue: due, nisabValue: nisabKg, zakatRate: rate };
          }
          break;
        }
        case "BUSINESS": {
          const { cash = 0, stockValue = 0, debts = 0 } = formData;
          if (cash <= 0 && stockValue <= 0) { setError("Please enter at least cash or stock value"); setLoading(false); return; }

          const netWealth = (cash || 0) + (stockValue || 0) - (debts || 0);
          const nisabETB = 29750; // approximate silver nisab in ETB
          if (netWealth < nisabETB) {
            calcResult = { message: `Net business wealth (${netWealth.toFixed(2)} Birr) is below nisab (~${nisabETB} Birr) — no Zakah due.`, zakatDue: 0, nisabValue: nisabETB, zakatRate: 0.025 };
          } else {
            const due = netWealth * 0.025;
            calcResult = { message: `You must give ${due.toFixed(2)} Birr as Zakah (2.5% of net business wealth).`, zakatDue: due, nisabValue: nisabETB, zakatRate: 0.025 };
          }
          break;
        }
        case "RIKAZ": {
          const { itemType, foundValue } = formData;
          if (!itemType) { setError("Please enter item type"); setLoading(false); return; }
          if (!foundValue || foundValue <= 0) { setError("Please enter found value"); setLoading(false); return; }

          const rate = 0.20;
          const due = foundValue * rate;
          calcResult = { message: `You must give ${due.toFixed(2)} Birr as Zakah (20% of found ${itemType}).`, zakatDue: due, nisabValue: 0, zakatRate: rate };
          break;
        }
      }

      if (calcResult) {
        setResult(calcResult);
      }
    } catch (err: any) {
      setError("Calculation failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const typeInfo: Record<ZakatType, { icon: string; desc: string }> = {
    METAL: { icon: "💰", desc: "Gold, Silver & Cash" },
    LIVESTOCK: { icon: "🐪", desc: "Camels, Cattle, Sheep" },
    CROPS: { icon: "🌾", desc: "Agricultural Produce" },
    BUSINESS: { icon: "📊", desc: "Trade & Business Assets" },
    RIKAZ: { icon: "⛏️", desc: "Buried Treasures" },
  };

  const renderFields = () => {
    const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-gray-700";
    const selectClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all text-gray-700 bg-white";

    switch (zakatType) {
      case "METAL":
        return (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Metal Type</label>
              <select
                className={selectClass}
                onChange={(e) => setFormData({ ...formData, wealthType: e.target.value })}
                value={formData.wealthType || ""}
              >
                <option value="">Select Metal Type</option>
                <option value="GOLD">Gold</option>
                <option value="SILVER">Silver</option>
                <option value="CASH">Cash</option>
              </select>
            </div>
            {formData.wealthType && formData.wealthType !== "CASH" && (
              <div className="animate-fade-in-up">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount in grams</label>
                <input
                  type="number"
                  className={inputClass}
                  placeholder="e.g., 100"
                  onChange={(e) => setFormData({ ...formData, grams: Number(e.target.value) })}
                />
              </div>
            )}
            {formData.wealthType === "CASH" && (
              <div className="animate-fade-in-up">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount in Birr</label>
                <input
                  type="number"
                  className={inputClass}
                  placeholder="e.g., 50000"
                  onChange={(e) => setFormData({ ...formData, cashAmount: Number(e.target.value) })}
                />
              </div>
            )}
          </div>
        );
      case "LIVESTOCK":
        return (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Livestock Type</label>
              <select
                className={selectClass}
                onChange={(e) => setFormData({ ...formData, livestockType: e.target.value })}
                value={formData.livestockType || ""}
              >
                <option value="">Select livestock type</option>
                <option value="CAMEL">Camel</option>
                <option value="COW">Cow</option>
                <option value="SHEEP">Sheep</option>
                <option value="GOAT">Goat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                className={inputClass}
                placeholder="e.g., 40"
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
              />
            </div>
          </div>
        );
      case "CROPS":
        return (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g., Wheat, Barley, Teff"
                onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                className={inputClass}
                placeholder="e.g., 1000"
                onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Irrigation Type</label>
              <select
                className={selectClass}
                onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value })}
                value={formData.irrigationType || ""}
              >
                <option value="">Select irrigation type</option>
                <option value="natural">Natural (rain) — 10% Zakah</option>
                <option value="artificial">Artificial — 5% Zakah</option>
              </select>
            </div>
          </div>
        );
      case "BUSINESS":
        return (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cash Amount (Birr)</label>
              <input
                type="number"
                className={inputClass}
                placeholder="e.g., 100000"
                onChange={(e) => setFormData({ ...formData, cash: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock/Inventory Value (Birr)</label>
              <input
                type="number"
                className={inputClass}
                placeholder="e.g., 50000"
                onChange={(e) => setFormData({ ...formData, stockValue: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Debts to Deduct (Birr)</label>
              <input
                type="number"
                className={inputClass}
                placeholder="e.g., 10000"
                onChange={(e) => setFormData({ ...formData, debts: Number(e.target.value) })}
              />
            </div>
          </div>
        );
      case "RIKAZ":
        return (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Type</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g., Gold coins, Artifacts"
                onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Found Value (Birr)</label>
              <input
                type="number"
                className={inputClass}
                placeholder="e.g., 25000"
                onChange={(e) => setFormData({ ...formData, foundValue: Number(e.target.value) })}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-100 rounded-full opacity-40 animate-float"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-100 rounded-full opacity-30 animate-float delay-500"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-4 animate-fade-in-down">
            Zakah Calculator
          </span>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up delay-100">
            Simplify Your <span className="text-amber-600">Zakah</span> Calculation
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Enter your assets and liabilities, and our calculator will show the Zakah you owe according to Nisab thresholds based on Islamic rulings.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Zakah Type Selection */}
          <div className="mb-8 animate-fade-in-up delay-300">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Select Zakah Type</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {(["METAL", "LIVESTOCK", "CROPS", "BUSINESS", "RIKAZ"] as ZakatType[]).map((type, i) => (
                <button
                  key={type}
                  onClick={() => {
                    setZakatType(type);
                    setFormData({});
                    setResult(null);
                    setError("");
                  }}
                  className={`p-4 rounded-xl border-2 transition-all text-center hover-scale ${
                    zakatType === type
                      ? "border-amber-500 bg-amber-50 shadow-lg shadow-amber-100 scale-105"
                      : "border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50/50"
                  }`}
                >
                  <span className="text-2xl block mb-2">{typeInfo[type].icon}</span>
                  <span className="font-semibold text-sm text-gray-900 block">{type}</span>
                  <span className="text-xs text-gray-500">{typeInfo[type].desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Calculator & Result */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-fade-in-left delay-400">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Enter Your Details
              </h3>

              {zakatType ? (
                <>
                  {renderFields()}
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-fade-in-up">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}
                  <button
                    className="w-full mt-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-200 hover:shadow-xl disabled:opacity-50 hover:-translate-y-0.5"
                    onClick={handleCalculate}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Calculating...
                      </span>
                    ) : (
                      "Calculate Zakah"
                    )}
                  </button>
                </>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-200 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="font-medium">Select a Zakah type above to begin</p>
                </div>
              )}
            </div>

            {/* Result & Info */}
            <div className="space-y-6 animate-fade-in-right delay-400">
              {result && (
                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-amber-500 animate-bounce-in">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Your Zakah Result
                  </h3>
                  <p className="text-gray-600 mb-4">{result.message}</p>
                  {(result.zakatDue !== undefined || result.zakahDue !== undefined) && (
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 text-center animate-pulse-glow">
                      <p className="text-sm text-amber-700 mb-1">Zakah Due</p>
                      <p className="text-4xl font-bold text-amber-600">
                        {(() => {
                          const due = result.zakatDue ?? result.zakahDue;
                          if (due === 0) return "0";
                          return typeof due === 'number' ? due.toFixed(2) : due;
                        })()}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {zakatType === "CROPS" ? "kg" : zakatType === "METAL" && formData.wealthType !== "CASH" ? "grams" : "Birr"}
                      </p>
                    </div>
                  )}
                  {result.zakahAnimals && (
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 text-center mt-4">
                      <p className="text-sm text-amber-700 mb-1">Zakah Due</p>
                      <p className="text-xl font-bold text-amber-600">{result.zakahAnimals}</p>
                    </div>
                  )}
                  {result.nisabValue !== undefined && result.nisabValue !== 0 && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                      <p>Nisab: <strong>{typeof result.nisabValue === 'number' ? result.nisabValue.toFixed(2) : result.nisabValue}</strong></p>
                      {result.zakatRate && <p>Rate: <strong>{(result.zakatRate * 100).toFixed(1)}%</strong></p>}
                    </div>
                  )}
                </div>
              )}

              {/* Eligible Recipients - always shown */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Who Is Eligible to Receive Zakah?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "The Poor (Al-Fuqara)",
                    "The Needy (Al-Masakin)",
                    "Those in Debt",
                    "Wayfarers in Need",
                    "In Allah's Cause",
                    "Zakah Administrators",
                    "New Muslims",
                    "Those in Bondage",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-700 text-xs font-bold">{i + 1}</span>
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="text-sm text-gray-700 italic leading-relaxed">
                    "Zakah expenditures are only for the poor and the needy, for those employed to administer it..." 
                  </p>
                  <p className="text-amber-700 font-medium text-xs mt-2">— Quran 9:60</p>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-3 text-sm">Quick Reference</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between py-1 border-b border-gray-50">
                    <span>Gold Nisab</span>
                    <span className="font-medium text-amber-700">85 grams</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-50">
                    <span>Silver Nisab</span>
                    <span className="font-medium text-amber-700">595 grams</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-50">
                    <span>Standard Rate</span>
                    <span className="font-medium text-amber-700">2.5%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-50">
                    <span>Crops (Rain-fed)</span>
                    <span className="font-medium text-amber-700">10%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Rikaz</span>
                    <span className="font-medium text-amber-700">20%</span>
                  </div>
                </div>
                <Link to="/nisab" className="inline-flex items-center gap-1 text-amber-600 text-sm font-medium mt-4 hover:text-amber-700 group">
                  Learn more about Nisab
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/assets/images/resources/logo-1.png" alt="ZakahFlow" className="h-10 w-auto" />
              </div>
              <p className="text-sm leading-relaxed">
                A transparent platform for Zakah calculation, collection, and distribution.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
                <li><Link to="/nisab" className="hover:text-amber-400 transition-colors">Nisab</Link></li>
                <li><Link to="/quran-hadith" className="hover:text-amber-400 transition-colors">Quran & Hadith</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">About</h4>
              <p className="text-sm leading-relaxed">ZakahFlow helps mesjids and communities manage Zakah distribution with full transparency and accountability.</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
            <p>&copy; 2026 ZakahFlow. All rights reserved.</p>
            <p className="mt-2 text-gray-500">Developed by <span className="text-amber-400 font-medium">Yusra Mohammed</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
