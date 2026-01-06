import { Router } from "express";
import authenticate from "../middleware/authenticate";
import superAdminOnly from "../middleware/superAdminOnly";
import prisma from "../lib/prisma";

const router = Router();

// Donations across all mosques (SUPERADMIN)
router.get("/donations", authenticate, superAdminOnly, async (req, res) => {
  const donations = await prisma.donation.findMany({ include: { user: true, project: true } });
  res.json(donations);
});

// Beneficiary distributions (SUPERADMIN)
router.get("/distributions", authenticate, superAdminOnly, async (req, res) => {
  const distributions = await prisma.distribution.findMany({
    include: { donation: true, beneficiary: true },
  });
  res.json(distributions);
});

export default router;
