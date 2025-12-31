import { Router } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/auth";
import axios from "axios";

const router = Router();
const METALPRICE_API_KEY = process.env.METALPRICE_API_KEY;

router.post("/calculate", authenticate, async (req: any, res) => {
  try {
    const { wealthType, grams, cashAmount } = req.body;

    // ---------- GOLD / SILVER ----------
    if (wealthType === "GOLD" || wealthType === "SILVER") {
      if (!grams) return res.status(400).json({ error: "grams is required" });

      const nisab = wealthType === "GOLD" ? 87.48 : 612.36; // grams
      const zakatRate = 0.025;

      let zakatDue = 0;
      let message = "";

      if (grams < nisab) {
        message = `Your ${wealthType.toLowerCase()} is below nisab — no zakat due`;
      } else {
        zakatDue = grams * zakatRate;
        message = `You must give ${zakatDue.toFixed(2)} grams of ${wealthType.toLowerCase()} as zakat`;
      }

      const record = await prisma.zakatCalculation.create({
        data: {
          userId: req.user.userId,
          zakatType: "MAL",
          wealthType,
          wealthAmount: grams,
          nisabValue: nisab,
          zakatRate,
          zakatDue,
          explanation: message,
        },
      });

      return res.json({
        nisabValue: nisab,
        zakatRate,
        zakatDue,
        message,
      });
    }

    // ---------- CASH ----------
    if (wealthType === "CASH") {
      if (!cashAmount) return res.status(400).json({ error: "cashAmount is required" });

      const zakatRate = 0.025;
      const SILVER_NISAB_GRAMS = 612.36;

      // 1️⃣ Get silver price in USD per ounce from MetalPrice API
      const metalRes = await axios.get(
        `https://api.metalpriceapi.com/v1/latest?api_key=${METALPRICE_API_KEY}&base=USD&currencies=XAG,USDXAG`
      );

      // ✅ Use USD per ounce
      const silverUSDPerOunce = metalRes.data?.rates?.USDXAG;
      if (!silverUSDPerOunce) return res.status(500).json({ error: "Failed to fetch silver price" });

      // 2️⃣ Get USD → ETB live rate from FloatRates
      const fxRes = await axios.get("https://www.floatrates.com/daily/usd.json");
      const usdToETB = fxRes.data?.etb?.rate;
      if (!usdToETB) return res.status(500).json({ error: "Failed to fetch exchange rate" });

      // 3️⃣ Silver price per gram in ETB
      const silverETBPerGram = (silverUSDPerOunce * usdToETB) / 31.1035;

      // 4️⃣ Cash nisab in ETB
      const nisabCashETB = SILVER_NISAB_GRAMS * silverETBPerGram;

      let zakatDue = 0;
      let message = "";

      // 5️⃣ Check against nisab
      if (cashAmount < nisabCashETB) {
        message = `Cash amount is below silver nisab (${nisabCashETB.toFixed(2)} ETB) — no zakat due`;
      } else {
        zakatDue = cashAmount * zakatRate;
        message = `You must give ${zakatDue.toFixed(2)} ETB as zakat (2.5% of cash above nisab)`;
      }

      const record = await prisma.zakatCalculation.create({
        data: {
          userId: req.user.userId,
          zakatType: "MAL",
          wealthType,
          wealthAmount: cashAmount,
          nisabValue: nisabCashETB,
          zakatRate,
          zakatDue,
          explanation: message,
        },
      });

      return res.json({
        nisabValue: nisabCashETB,
        zakatRate,
        zakatDue,
        message,
      });
    }

    // ---------- INVALID ----------
    return res.status(400).json({ error: "Invalid wealthType. Must be GOLD, SILVER, or CASH" });

  } catch (err) {
    console.error("Zakat Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
