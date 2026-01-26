import { Router } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/auth";
import axios from "axios";
const router = Router();
const METALPRICE_API_KEY = process.env.METALPRICE_API_KEY;

router.post("/calculate", authenticate, async (req: any, res) => {
  try {
    const { cash, stockValue, debts } = req.body;

    if (cash == null || stockValue == null || debts == null) {
      return res
        .status(400)
        .json({ error: "cash, stockValue, and debts are required" });
    }

    // -------------------- Net Business Wealth --------------------
    const netWealth = cash + stockValue - debts;

    // -------------------- Get Silver Price in USD per Ounce --------------------
    const metalRes = await axios.get(
      `https://api.metalpriceapi.com/v1/latest?api_key=${METALPRICE_API_KEY}&base=USD&currencies=XAG`
    );
    const silverUSDPerOunce = metalRes.data?.rates?.XAG;
    if (!silverUSDPerOunce)
      return res.status(500).json({ error: "Failed to fetch silver price" });

    // -------------------- Get USD → ETB Exchange Rate --------------------
    const fxRes = await axios.get("https://www.floatrates.com/daily/usd.json");
    const usdToETB = fxRes.data?.etb?.rate;
    if (!usdToETB)
      return res.status(500).json({ error: "Failed to fetch exchange rate" });

    // -------------------- Silver Price per Gram in ETB --------------------
    const silverETBPerGram = (silverUSDPerOunce * usdToETB) / 31.1035;

    // -------------------- Nisab in ETB (Silver Standard) --------------------
    const SILVER_NISAB_GRAMS = 612.36;
    const nisabETB = SILVER_NISAB_GRAMS * silverETBPerGram;

    // -------------------- Check Nisab --------------------
    if (netWealth < nisabETB) {
      return res.json({
        netWealth,
        nisabETB: nisabETB.toFixed(2),
        zakatDue: 0,
        message: "Business wealth is below nisab — no zakah due.",
      });
    }

    // -------------------- Zakah Rate --------------------
    const rate = 0.025; // 2.5%
    const zakatDue = netWealth * rate; // ✅ variable name matches Prisma

    // -------------------- Save to Database --------------------
    await prisma.zakatCalculation.create({
      data: {
        userId: req.user.userId,
        zakatType: "BUSINESS",
        wealthType: "TRADE",
        wealthAmount: netWealth,
        nisabValue: nisabETB,
        zakatRate: rate,
        zakatDue, // ✅ matches variable
        explanation: `You must give ${zakatDue.toFixed(
          2
        )} Birr as zakah (2.5% of net business wealth).`,
      },
    });

    // -------------------- Response --------------------
    return res.json({
      netWealth,
      nisabETB: nisabETB.toFixed(2),
      zakahRate: rate,
      zakatDue: zakatDue.toFixed(2),
      message: `You must give ${zakatDue.toFixed(
        2
      )} Birr as zakah (2.5% of net business wealth).`,
    });
  } catch (err) {
    console.error("Business Zakat Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
