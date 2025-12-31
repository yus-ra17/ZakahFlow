import { Router } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/auth";

const router = Router();

router.post("/create", authenticate, async (req: any, res) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Only admins allowed" });

  const { name, category, description, mosqueName, mosqueAddress } = req.body;

  const beneficiary = await prisma.beneficiary.create({
    data: { name, category, description, mosqueName, mosqueAddress },
  });

  res.json(beneficiary);
});

router.get("/all", authenticate, async (req, res) => {
  const list = await prisma.beneficiary.findMany();
  res.json(list);
});

export default router;
