import { Router, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = Router();

// -------------------- AUTH MIDDLEWARE --------------------
const authMiddleware = async (req: any, res: Response, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded.userId)
      return res.status(401).json({ error: "Invalid token" });

    req.user = decoded; // { userId, role }
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// -------------------- CREATE DONATION --------------------
router.post("/", authMiddleware, async (req: any, res: Response) => {
  const { amount, type, note } = req.body;

  if (!req.user?.userId) {
    return res.status(401).json({ error: "Invalid user" });
  }

  try {
    const donation = await prisma.donation.create({
      data: {
        amount: Number(amount),
        type: type || "ZAKAH",
        note: note || null,
        donorId: req.user.userId,
        status: "PENDING",
      },
    });

    res.json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create donation" });
  }
});

// -------------------- GET LOGGED-IN USER DONATIONS --------------------
router.get("/user", authMiddleware, async (req: any, res: Response) => {
  try {
    const donations = await prisma.donation.findMany({
      where: {
        donorId: req.user.userId,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

// -------------------- SUPERADMIN: GET ALL DONATIONS --------------------
router.get("/", authMiddleware, async (req: any, res: Response) => {
  if (req.user.role !== "SUPERADMIN") {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

// -------------------- SUPERADMIN: REVIEW & APPROVE DONATION --------------------
router.put("/:id/review", authMiddleware, async (req: any, res: Response) => {
  if (req.user.role !== "SUPERADMIN") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { review } = req.body;

  if (!review || !review.trim()) {
    return res.status(400).json({ error: "Review cannot be empty" });
  }

  try {
    const donation = await prisma.donation.findUnique({
      where: { id: req.params.id },
    });

    if (!donation) return res.status(404).json({ error: "Donation not found" });

    // Update note, status, and approval info
    const updatedDonation = await prisma.donation.update({
      where: { id: req.params.id },
      data: {
        note: review.trim(),
        status: "RECEIVED",
        approvedBy: req.user.userId,
        approvedAt: new Date(),
      },
    });

    // Update system balance
    await prisma.systemBalance.upsert({
      where: { id: "SYSTEM" },
      update: { balance: { increment: donation.amount } },
      create: { id: "SYSTEM", balance: donation.amount },
    });

    res.json({
      message: "Donation reviewed and approved successfully",
      donation: updatedDonation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit review" });
  }
});

// -------------------- SUPERADMIN: SYSTEM BALANCE --------------------
router.get(
  "/system/balance",
  authMiddleware,
  async (req: any, res: Response) => {
    if (req.user.role !== "SUPERADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    try {
      const balance = await prisma.systemBalance.findUnique({
        where: { id: "SYSTEM" },
      });

      res.json({ balance: balance?.balance || 0 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch system balance" });
    }
  },
);

export default router;
