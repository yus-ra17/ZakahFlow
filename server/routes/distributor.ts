import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/authenticate";
import bcrypt from "bcryptjs";

const router = Router();

/* =====================================================
   CREATE DISTRIBUTOR
   POST /distributor
   Masjid Admin only
===================================================== */
router.post("/", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (!user.mosqueId) {
      return res.status(403).json({ error: "Mosque not assigned" });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "name, email and password are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const distributor = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "DISTRIBUTOR",
        mosqueId: user.mosqueId,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        mosqueId: true,
        createdAt: true,
      },
    });

    res.json({ success: true, distributor });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to create distributor",
      details: err,
    });
  }
});

/* =====================================================
   GET ALL DISTRIBUTORS (WITH FULL INFO)
   GET /distributor
   Masjid Admin only
===================================================== */
router.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (!user.mosqueId) {
      return res.status(403).json({ error: "Mosque not assigned" });
    }

    const distributors = await prisma.user.findMany({
      where: {
        role: "DISTRIBUTOR",
        mosqueId: user.mosqueId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        mosqueId: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(distributors);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to fetch distributors",
      details: err,
    });
  }
});

/* =====================================================
   ACTIVATE / DEACTIVATE DISTRIBUTOR
   PATCH /distributor/:id/status
   Masjid Admin only
===================================================== */
router.patch(
  "/:id/status",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const user = req.user;

      if (!user || user.role !== "ADMIN") {
        return res.status(403).json({ error: "Unauthorized" });
      }

      if (!user.mosqueId) {
        return res.status(403).json({ error: "Mosque not assigned" });
      }

      const { id } = req.params;
      const { isActive } = req.body;

      if (typeof isActive !== "boolean") {
        return res.status(400).json({
          error: "isActive must be true or false",
        });
      }

      // ✅ SAFE + SCOPED UPDATE
      const result = await prisma.user.updateMany({
        where: {
          id,
          role: "DISTRIBUTOR",
          mosqueId: user.mosqueId,
        },
        data: { isActive },
      });

      if (result.count === 0) {
        return res.status(404).json({
          error: "Distributor not found or not under your mosque",
        });
      }

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Failed to update distributor status",
      });
    }
  },
);

export default router;
