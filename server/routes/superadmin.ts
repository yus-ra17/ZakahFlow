import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/authenticate";

const router = Router();

// GET all branch admins (SUPERADMIN only)
router.get("/admins", authenticate, async (req: Request, res: Response) => {
  try {
    // Check role
    if (!req.user || req.user.role !== "SUPERADMIN") {
      return res.status(403).json({ error: "Access denied. SUPERADMIN only." });
    }

    // Fetch all admins
    const admins = await prisma.user.findMany({
      where: {
        role: "ADMIN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        mosqueId: true,
        createdAt: true,
      },
    });

    res.json({ success: true, admins });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching admins" });
  }
});

export default router;
