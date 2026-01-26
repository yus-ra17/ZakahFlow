import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/authenticate";
import superAdminOnly from "../middleware/superAdminOnly";

const router = Router();

// Create a new mosque
router.post(
  "/",
  authenticate,
  superAdminOnly,
  async (req: Request, res: Response) => {
    const { name, location } = req.body;
    if (!name || !location)
      return res.status(400).json({ error: "name and location are required" });
    try {
      const mosque = await prisma.mosque.create({ data: { name, location } });
      res.json({ success: true, mosque });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Failed to create mosque", details: err });
    }
  },
);

// Get all mosques
router.get("/", authenticate, superAdminOnly, async (_req, res) => {
  try {
    const mosques = await prisma.mosque.findMany();
    res.json(mosques);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch mosques", details: err });
  }
});

// Update mosque by ID
router.put(
  "/:id",
  authenticate,
  superAdminOnly,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, location } = req.body;
    if (!name || !location)
      return res.status(400).json({ error: "name and location are required" });
    try {
      const mosque = await prisma.mosque.update({
        where: { id },
        data: { name, location },
      });
      res.json({ success: true, mosque });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Failed to update mosque", details: err });
    }
  },
);

// Delete mosque by ID
router.delete(
  "/:id",
  authenticate,
  superAdminOnly,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.mosque.delete({ where: { id } });
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Failed to delete mosque", details: err });
    }
  },
);

export default router;
