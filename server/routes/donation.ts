import { Router } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/auth";

const router = Router();

router.post("/create", authenticate, async (req: any, res) => {
  const { zakatCalcId, projectId, amount, zakatType } = req.body;

  const donation = await prisma.donation.create({
    data: {
      userId: req.user.userId,
      zakatCalcId,
      projectId,
      amount,
      zakatType,
    },
  });

  res.json(donation);
});

export default router;
