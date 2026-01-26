import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/authenticate";

const router = Router();

/* =====================================================
   CREATE BENEFICIARY
   POST /beneficiary
===================================================== */
router.post("/", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;

    // Only ADMIN (Mosque Admin) can create
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const {
      name,
      description,
      gender,
      maritalStatus,
      familiesCount,
      phone,
      address,
    } = req.body;

    if (!name || !description || !gender || !maritalStatus) {
      return res.status(400).json({
        error: "name, description, gender and maritalStatus are required",
      });
    }

    if (!user.mosqueId) {
      return res.status(403).json({ error: "Mosque not assigned" });
    }

    const beneficiary = await prisma.beneficiary.create({
      data: {
        name,
        description,
        gender: gender.toUpperCase(),
        maritalStatus: maritalStatus.toUpperCase(),
        familiesCount: familiesCount ?? 1,
        phone: phone || null,
        address: address || null,
        mosqueId: user.mosqueId,
        verified: true,
      },
      include: {
        mosque: {
          select: { id: true, name: true },
        },
      },
    });

    res.json({ success: true, beneficiary });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to create beneficiary",
      details: err,
    });
  }
});

/* =====================================================
   GET ALL BENEFICIARIES
   GET /beneficiary
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

    const beneficiaries = await prisma.beneficiary.findMany({
      where: { mosqueId: user.mosqueId },
      include: { mosque: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });

    res.json(beneficiaries);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch beneficiaries", details: err });
  }
});

/* =====================================================
   UPDATE BENEFICIARY
   PUT /beneficiary/:id
===================================================== */
router.put("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { id } = req.params;
    const {
      name,
      description,
      gender,
      maritalStatus,
      familiesCount,
      phone,
      address,
      verified,
    } = req.body;

    const beneficiary = await prisma.beneficiary.update({
      where: { id },
      data: {
        name,
        description,
        gender: gender?.toUpperCase(),
        maritalStatus: maritalStatus?.toUpperCase(),
        familiesCount,
        phone,
        address,
        verified,
      },
    });

    res.json({ success: true, beneficiary });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ error: "Failed to update beneficiary", details: err });
  }
});

/* =====================================================
   DELETE BENEFICIARY
   DELETE /beneficiary/:id
===================================================== */
router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { id } = req.params;
    await prisma.beneficiary.delete({ where: { id } });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ error: "Failed to delete beneficiary", details: err });
  }
});

export default router;
