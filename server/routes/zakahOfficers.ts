import { Router } from "express";
import prisma from "../lib/prisma";
import zakahOfficerOnly from "../middleware/zakahOfficerOnly";

const router = Router();

// -------------------- CREATE BENEFICIARY --------------------
router.post("/beneficiary", zakahOfficerOnly, async (req, res) => {
  const { name, description, imageUrl } = req.body;

  if (!name || !description)
    return res.status(400).json({ error: "Name and description required" });

  try {
    const beneficiary = await prisma.beneficiary.create({
      data: {
        name,
        description,
        imageUrl,
        mosqueId: req.user.mosqueId!, // assign officer's mosque
        verified: false,
      },
    });

    res.json({ success: true, beneficiary });
  } catch (err) {
    res.status(500).json({ error: "Could not create beneficiary" });
  }
});

// -------------------- PREPARE ZAKAH DISTRIBUTION --------------------
router.post("/distribution", zakahOfficerOnly, async (req, res) => {
  const { donationId, beneficiaryId, amount } = req.body;

  if (!donationId || !beneficiaryId || !amount)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const distribution = await prisma.distribution.create({
      data: {
        donationId,
        beneficiaryId,
        amount,
      },
    });

    res.json({ success: true, distribution });
  } catch (err) {
    res.status(500).json({ error: "Could not create distribution" });
  }
});

export default router;
