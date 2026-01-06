import { Router } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/authenticate";
import superAdminOnly from "../middleware/superAdminOnly";

const router = Router();

// Create a new mosque (SUPERADMIN only)
router.post("/", authenticate, superAdminOnly, async (req, res) => {
  const { name, location } = req.body;
  try {
    const mosque = await prisma.mosque.create({ data: { name, location } });
    res.json(mosque);
  } catch (err) {
    res.status(400).json({ error: "Failed to create mosque" });
  }
});

// Get all mosques (SUPERADMIN only)
router.get("/", authenticate, superAdminOnly, async (req, res) => {
  const mosques = await prisma.mosque.findMany();
  res.json(mosques);
});

export default router;
