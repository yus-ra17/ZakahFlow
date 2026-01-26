import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import authenticate from "../middleware/authenticate";
import superAdminOnly from "../middleware/superAdminOnly";
import { Roles } from "../constants/roles";

const router = Router();

// Extend Express Request typing
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    mosqueId?: string | null;
    email: string;
    name?: string;
  };
}

/* =====================================================
   CREATE NEW MESJID ADMIN
   POST /admin
===================================================== */
router.post(
  "/",
  authenticate,
  superAdminOnly,
  async (req: AuthRequest, res: Response) => {
    const { name, email, password, mosqueId } = req.body;

    if (!name || !email || !password || !mosqueId) {
      return res.status(400).json({
        error: "name, email, password, mosqueId are required",
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const admin = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: Roles.ADMIN,
          mosqueId,
        },
      });

      res.json({ success: true, admin });
    } catch (err) {
      console.error(err);
      res.status(400).json({
        error: "Failed to create admin (email may already exist)",
        details: err,
      });
    }
  },
);

/* =====================================================
   GET ALL MESJID ADMINS (WITH MOSQUE NAME)
   GET /admin
===================================================== */
router.get(
  "/",
  authenticate,
  superAdminOnly,
  async (_req: Request, res: Response) => {
    try {
      const admins = await prisma.user.findMany({
        where: {
          role: Roles.ADMIN,
        },
        include: {
          mosque: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json(admins);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Failed to fetch admins",
        details: err,
      });
    }
  },
);

/* =====================================================
   UPDATE MESJID ADMIN
   PUT /admin/:id
===================================================== */
router.put(
  "/:id",
  authenticate,
  superAdminOnly,
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { name, email, password, mosqueId } = req.body;

    try {
      const data: any = {
        name,
        email,
        mosqueId,
      };

      if (password && password.trim() !== "") {
        data.password = await bcrypt.hash(password, 10);
      }

      const updatedAdmin = await prisma.user.update({
        where: { id },
        data,
      });

      res.json({ success: true, admin: updatedAdmin });
    } catch (err) {
      console.error(err);
      res.status(400).json({
        error: "Failed to update admin",
        details: err,
      });
    }
  },
);

/* =====================================================
   DELETE MESJID ADMIN
   DELETE /admin/:id
===================================================== */
router.delete(
  "/:id",
  authenticate,
  superAdminOnly,
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
      await prisma.user.delete({
        where: { id },
      });

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(400).json({
        error: "Failed to delete admin",
        details: err,
      });
    }
  },
);

export default router;
