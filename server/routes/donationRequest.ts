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
  const { beneficiaryId, amount, description } = req.body;

  if (!req.user?.userId) return res.status(401).json({ error: "Invalid user" });

  try {
    const request = await prisma.donationRequest.create({
      data: {
        mosqueAdminId: req.user.userId,
        beneficiaryId,
        amount: Number(amount),
        description: description || "",
        status: "PENDING",
      },
      include: {
        beneficiary: true,
        admin: true,
      },
    });

    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create donation request" });
  }
});

/* -------------------- GET ALL REQUESTS FOR MOSQUE ADMIN -------------------- */
router.get("/my-requests", authMiddleware, async (req: any, res: Response) => {
  try {
    const requests = await prisma.donationRequest.findMany({
      where: { mosqueAdminId: req.user.userId },
      orderBy: { createdAt: "desc" },
      include: { beneficiary: true, admin: true },
    });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

/* -------------------- SUPERADMIN: GET ALL REQUESTS -------------------- */


/* -------------------- SUPERADMIN: APPROVE REQUEST -------------------- */
router.put("/:id/approve", authMiddleware, async (req: any, res: Response) => {
  if (req.user.role !== "SUPERADMIN")
    return res.status(403).json({ error: "Forbidden" });

  const { sentAmount, sentDescription } = req.body;
  if (!sentAmount || sentAmount <= 0)
    return res.status(400).json({ error: "Invalid sent amount" });

  try {
    // Fetch system balance
    const system = await prisma.systemBalance.findUnique({
      where: { id: "SYSTEM" },
    });
    if (!system || system.balance < sentAmount)
      return res.status(400).json({ error: "Insufficient system funds" });

    // Update request
    const updated = await prisma.donationRequest.update({
      where: { id: req.params.id },
      data: {
        status: "APPROVED",
        approvedBy: req.user.userId,
        approvedAt: new Date(),
        sentAmount,
        description: sentDescription || undefined,
      },
      include: { beneficiary: true, admin: true },
    });

    // Deduct from system balance
    await prisma.systemBalance.update({
      where: { id: "SYSTEM" },
      data: { balance: { decrement: sentAmount } },
    });

    res.json({
      message: "Donation request approved and funds sent",
      request: updated,
    });
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
  if (!reason)
    return res.status(400).json({ error: "Rejection reason required" });

  try {
    const updated = await prisma.donationRequest.update({
      where: { id: req.params.id },
      data: {
        status: "REJECTED",
        rejectedBy: req.user.userId,
        rejectedAt: new Date(),
        description: reason,
      },
      include: { beneficiary: true, admin: true },
    });

    res.json({ message: "Donation request rejected", request: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reject request" });
  }
});

/* -------------------- SUPERADMIN: SEND DONATION WITHOUT REQUEST -------------------- */
router.post("/send", authMiddleware, async (req: any, res: Response) => {
  if (req.user.role !== "SUPERADMIN")
    return res.status(403).json({ error: "Forbidden" });

  const { beneficiaryId, amount, description } = req.body;
  if (!beneficiaryId || !amount || amount <= 0)
    return res.status(400).json({ error: "Invalid beneficiary or amount" });

  try {
    const system = await prisma.systemBalance.findUnique({
      where: { id: "SYSTEM" },
    });
    if (!system || system.balance < amount)
      return res.status(400).json({ error: "Insufficient system funds" });

    // Create donation request directly as approved
    const donation = await prisma.donationRequest.create({
      data: {
        mosqueAdminId: req.user.userId,
        beneficiaryId,
        amount,
        description: description || "",
        status: "APPROVED",
        approvedBy: req.user.userId,
        approvedAt: new Date(),
      },
      include: { beneficiary: true, admin: true },
    });

    await prisma.systemBalance.update({
      where: { id: "SYSTEM" },
      data: { balance: { decrement: amount } },
    });

    res.json({ message: "Donation sent successfully", donation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send donation" });
  }
});

export default router;
