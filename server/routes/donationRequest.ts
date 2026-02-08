import { Router, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = Router();

/* -------------------- AUTH MIDDLEWARE -------------------- */
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

/* -------------------- CREATE DONATION REQUEST -------------------- */
router.post("/", authMiddleware, async (req: any, res: Response) => {
  const { amount, description } = req.body;

  try {
    const request = await prisma.donationRequest.create({
      data: {
        mosqueAdminId: req.user.userId,

        amount: Number(amount),
        description: description || "",
        status: "PENDING",
      },
      include: {
        admin: {
          include: { mosque: true },
        },
      },
    });

    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create donation request" });
  }
});

/* -------------------- GET MY REQUESTS (MOSQUE ADMIN) -------------------- */
router.get("/my-requests", authMiddleware, async (req: any, res: Response) => {
  try {
    const requests = await prisma.donationRequest.findMany({
      where: { mosqueAdminId: req.user.userId },
      orderBy: { createdAt: "desc" },
      include: {
        admin: {
          include: { mosque: true },
        },
      },
    });

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

/* -------------------- SUPERADMIN: GET ALL REQUESTS -------------------- */
router.get("/", authMiddleware, async (req: any, res: Response) => {
  if (req.user.role !== "SUPERADMIN")
    return res.status(403).json({ error: "Forbidden" });

  try {
    const requests = await prisma.donationRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        admin: {
          include: { mosque: true },
        },
      },
    });

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

/* -------------------- SUPERADMIN: APPROVE REQUEST -------------------- */
router.put("/:id/approve", authMiddleware, async (req: any, res: Response) => {
  if (req.user.role !== "SUPERADMIN")
    return res.status(403).json({ error: "Forbidden" });

  const { sentAmount, sentDescription } = req.body;

  try {
    const system = await prisma.systemBalance.findUnique({
      where: { id: "SYSTEM" },
    });

    if (!system || system.balance < sentAmount)
      return res.status(400).json({ error: "Insufficient funds" });

    const updated = await prisma.donationRequest.update({
      where: { id: req.params.id },
      data: {
        status: "APPROVED",
        approvedBy: req.user.userId,
        approvedAt: new Date(),
        sentAmount,
        description: sentDescription,
      },
      include: {
        admin: { include: { mosque: true } },
      },
    });

    await prisma.systemBalance.update({
      where: { id: "SYSTEM" },
      data: { balance: { decrement: sentAmount } },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to approve request" });
  }
});

/* -------------------- SUPERADMIN: REJECT REQUEST -------------------- */
router.put("/:id/reject", authMiddleware, async (req: any, res: Response) => {
  if (req.user.role !== "SUPERADMIN")
    return res.status(403).json({ error: "Forbidden" });

  const { reason } = req.body;

  try {
    const updated = await prisma.donationRequest.update({
      where: { id: req.params.id },
      data: {
        status: "REJECTED",
        rejectedBy: req.user.userId,
        rejectedAt: new Date(),
        description: reason,
      },
      include: {
        admin: { include: { mosque: true } },
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reject request" });
  }
});

export { router as donationRequestRoutes };
