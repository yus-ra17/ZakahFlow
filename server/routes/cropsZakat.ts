import { Router } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/auth";

const router = Router();

// -------------------- Route --------------------
router.post("/calculate", authenticate, async (req: any, res) => {
  try {
    const { cropType, weight, irrigationType } = req.body;

    if (!cropType || !weight || !irrigationType) {
      return res.status(400).json({ error: "cropType, weight, and irrigationType are required" });
    }

    // -------------------- Nisab --------------------
    // Nisab ≈ 612.36 kg (5 wasq)
    const NISAB_KG = 612.36;

    if (weight < NISAB_KG) {
      return res.json({
        cropType,
        weight,
        zakahDue: 0,
        message: `Your harvest is below nisab — no zakah due.`,
      });
    }

    // -------------------- Zakah Rate --------------------
    // 5% for natural (rain) irrigation, 10% for artificial irrigation
    const rate = irrigationType.toLowerCase() === "natural" ? 0.05 : 0.10;

    const zakahDue = weight * rate;

    // -------------------- Save to database --------------------
    await prisma.zakatCalculation.create({
      data: {
        userId: req.user.userId,
        zakatType: "CROP",
        wealthType: cropType.toUpperCase(),
        wealthAmount: weight,
        nisabValue: NISAB_KG,
        zakatRate: rate,
        zakatDue: zakahDue,
        explanation: `You must give ${zakahDue.toFixed(2)} kg of ${cropType} as zakah (${rate * 100}% for ${irrigationType} irrigation).`,
      },
    });

    return res.json({
      cropType,
      weight,
      zakahRate: rate,
      zakahDue: zakahDue.toFixed(2),
      message: `You must give ${zakahDue.toFixed(2)} kg of ${cropType} as zakah (${rate * 100}% for ${irrigationType} irrigation).`,
    });
  } catch (err) {
    console.error("Crops Zakat Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
