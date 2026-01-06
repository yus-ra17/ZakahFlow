// Path: routes/admin.ts

import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { Roles } from "../constants/roles";
import superAdminOnly from "../middleware/superAdminOnly";
import adminOnly from "../middleware/adminOnly"; // new middleware for branch admin

const router = Router();

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    mosqueId?: string | null;
    email: string;
    name?: string;
  };
}

// -------------------- CREATE NEW ZAKAH OFFICER --------------------
// Accessible by SUPERADMIN (any mosque) or ADMIN (only their mosque)
router.post(
  "/create-zakah-officer",
  adminOnly, // allow SUPERADMIN and ADMIN
  async (req: AuthRequest, res: Response) => {
    const { name, email, password, mosqueId } = req.body;

    if (!req.user) return res.status(403).json({ error: "Unauthorized" });
    if (!password) return res.status(400).json({ error: "Password required" });

    // If ADMIN is adding, force mosqueId to their own mosque
    let finalMosqueId: string | undefined;
    if (req.user.role === Roles.ADMIN) {
      if (!req.user.mosqueId) return res.status(400).json({ error: "Admin has no mosque assigned" });
      finalMosqueId = req.user.mosqueId;
    } else if (req.user.role === Roles.SUPERADMIN) {
      if (!mosqueId) return res.status(400).json({ error: "mosqueId is required for SUPERADMIN" });
      finalMosqueId = mosqueId;
    } else {
      return res.status(403).json({ error: "Unauthorized role" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const officer = await prisma.user.create({
        data: {
          name: name ?? "",
          email,
          password: hashedPassword,
          role: Roles.ZAKAH_OFFICER,
          mosqueId: finalMosqueId,
        },
      });
      res.json({ success: true, officer });
    } catch (err) {
      res.status(400).json({ error: "Email already exists or invalid data", details: err });
    }
  }
);

export default router;
