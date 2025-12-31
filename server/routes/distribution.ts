import { Router } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/auth";

const router = Router();

router.post("/send", authenticate, async (req: any, res) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Admins only" });

  const { donationId, beneficiaryId, amount } = req.body;

  const distribution = await prisma.distribution.create({
    data: { donationId, beneficiaryId, amount },
  });

  res.json({
    message: "Zakah successfully distributed",
    distribution,
  });
});

export default router;
