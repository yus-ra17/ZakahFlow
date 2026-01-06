import { Router } from "express";
import authenticate from "../middleware/authenticate";
import superAdminOnly from "../middleware/superAdminOnly";

const router = Router();

// Update global nisab rates or categories (SUPERADMIN only)
router.patch("/nisab", authenticate, superAdminOnly, async (req, res) => {
  const { nisabValue } = req.body;
  // save it in DB, config, or env
  res.json({ success: true, nisabValue });
});

router.patch("/categories", authenticate, superAdminOnly, async (req, res) => {
  const { categories } = req.body;
  // save it in DB or config
  res.json({ success: true, categories });
});

export default router;
