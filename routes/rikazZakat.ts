import { Router } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/auth";

const router = Router();

router.post("/calculate", authenticate, async (req: any, res) => {
  try {
    const { itemType, foundValue } = req.body;

    if (!itemType || foundValue == null) {
      return res.status(400).json({ error: "itemType and foundValue are required" });
    }

    // Rikaz zakah rate is 20%
    const rate = 0.2;
    const zakatDue = foundValue * rate; // ✅ use zakatDue

    await prisma.zakatCalculation.create({
      data: {
        userId: req.user.userId,
        zakatType: "RIKAZ",
        wealthType: itemType.toUpperCase(),
        wealthAmount: foundValue,
        nisabValue: 0, // Rikaz does not require nisab
        zakatRate: rate,
        zakatDue,      // ✅ matches variable
        explanation: `You must give ${zakatDue.toFixed(2)} Birr as zakah (20% of found ${itemType}).`,
      },
    });

    return res.json({
      itemType: itemType.toUpperCase(),
      foundValue,
      zakatRate: rate,
      zakatDue: zakatDue.toFixed(2),
      message: `You must give ${zakatDue.toFixed(2)} Birr as zakah (20% of found ${itemType}).`,
    });
  } catch (err) {
    console.error("Rikaz Zakat Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
