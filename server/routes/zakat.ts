import { Router } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/auth";

const router = Router();

router.post("/calculate", authenticate, async (req: any, res) => {
  const { wealthAmount, wealthType, goldPrice, silverPrice } = req.body;

  const nisabGold = 87.48 * goldPrice;
  const nisabSilver = 612.36 * silverPrice;
  const nisab = nisabSilver; // silver standard
  const zakatRate = 0.025;

  if (wealthAmount < nisab) {
    return res.json({
      zakatDue: 0,
      nisab,
      message: "Wealth is below nisab — no zakat due."
    });
  }

  const zakatDue = wealthAmount * zakatRate;

  const record = await prisma.zakatCalculation.create({
    data: {
      userId: req.user.userId,
      zakatType: "MAL",
      wealthType,
      wealthAmount,
      nisabValue: nisab,
      zakatRate,
      zakatDue,
      explanation: "2.5% zakat on wealth above nisab (silver standard)"
    }
  });

  res.json(record);
});

export default router;
