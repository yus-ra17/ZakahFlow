import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/authenticate";
import { Roles } from "../constants/roles";

const router = Router();

/* =====================================================
   ASSIGN TASK
   POST /distribution-task
   Admin assigns a task to a distributor
===================================================== */
router.post("/", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;

    // ✅ Only Admins
    if (!user || user.role !== Roles.ADMIN) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { distributorId, beneficiaryId, amount, notes } = req.body;

    if (!distributorId || !beneficiaryId || amount <= 0) {
      return res
        .status(400)
        .json({ error: "Missing or invalid required fields" });
    }

    // Ensure distributor belongs to the same mosque
    const distributor = await prisma.user.findUnique({
      where: { id: distributorId },
    });

    if (!distributor || distributor.mosqueId !== user.mosqueId) {
      return res
        .status(403)
        .json({ error: "Distributor not valid for this mosque" });
    }

    // ✅ Atomic transaction: create task + deduct balance
    const task = await prisma.$transaction(async (tx) => {
      // 1️⃣ Get system balance
      const systemBalance = await tx.systemBalance.findUnique({
        where: { id: "SYSTEM" },
      });

      if (!systemBalance) {
        throw new Error("SYSTEM_BALANCE_NOT_FOUND");
      }

      if (systemBalance.balance < amount) {
        throw new Error("INSUFFICIENT_BALANCE");
      }

      // 2️⃣ Create the distribution task
      const createdTask = await tx.distributionTask.create({
        data: {
          mosqueId: user.mosqueId!,
          distributorId,
          beneficiaryId,
          amount,
          notes,
        },
        include: {
          distributor: true,
          beneficiary: true,
        },
      });

      // 3️⃣ Deduct the amount from system balance
      await tx.systemBalance.update({
        where: { id: "SYSTEM" },
        data: {
          balance: systemBalance.balance - amount, // decrement manually for MongoDB
        },
      });

      return createdTask;
    });

    res.json({ success: true, task });
  } catch (err: any) {
    console.error(err);

    if (err.message === "INSUFFICIENT_BALANCE") {
      return res.status(400).json({ error: "Insufficient system balance" });
    }

    if (err.message === "SYSTEM_BALANCE_NOT_FOUND") {
      return res.status(500).json({ error: "System balance not initialized" });
    }

    res.status(500).json({ error: "Failed to create distribution task" });
  }
});

/* =====================================================
   GET ALL TASKS (ADMIN)
   GET /distribution-task/admin
   Admin can view all tasks in their mosque
===================================================== */
router.get("/admin", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user || user.role !== Roles.ADMIN) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const tasks = await prisma.distributionTask.findMany({
      where: { mosqueId: user.mosqueId },
      include: {
        distributor: true,
        beneficiary: true,
        approver: true,
      },
      orderBy: { assignedAt: "desc" },
    });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks", details: err });
  }
});

/* =====================================================
   GET SYSTEM BALANCE
   GET /distribution-task/system-balance
===================================================== */
router.get(
  "/system-balance",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const balance = await prisma.systemBalance.findUnique({
        where: { id: "SYSTEM" },
      });
      if (!balance) {
        return res.status(500).json({ error: "System balance not found" });
      }
      res.json(balance);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch system balance" });
    }
  },
);

/* =====================================================
   GET MY TASKS (DISTRIBUTOR)
   GET /distribution-task/my
   Distributor can view only their own tasks
===================================================== */

// GET /distribution-task/my-tasks
router.get("/my-tasks", authenticate, async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.distributionTask.findMany({
      where: { distributorId: req.user.id }, // only tasks assigned to logged-in distributor
      include: {
        beneficiary: true,
        distributor: true,
      },
    });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.get("/my", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user || user.role !== Roles.DISTRIBUTOR) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const tasks = await prisma.distributionTask.findMany({
      where: { distributorId: user.id },
      include: { beneficiary: true, approver: true },
      orderBy: { assignedAt: "desc" },
    });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks", details: err });
  }
});

/* =====================================================
   UPDATE TASK STATUS (DISTRIBUTOR)
   PUT /distribution-task/:id/status
===================================================== */

// PUT /distribution-task/:id/status
router.put("/:id/status", authenticate, async (req: Request, res: Response) => {
  const { status } = req.body;
  const validStatuses = ["IN_PROGRESS", "COMPLETED"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const task = await prisma.distributionTask.findUnique({
      where: { id: req.params.id },
    });

    if (!task) return res.status(404).json({ error: "Task not found" });
    if (task.distributorId !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updatedTask = await prisma.distributionTask.update({
      where: { id: req.params.id },
      data: { status },
    });

    // Optional: notify masjid admin (example, depending on your notification system)
    // notifyAdmin(task.mosqueId, `Task status updated by distributor`);

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

router.put("/:id/status", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { status } = req.body; // IN_PROGRESS | COMPLETED

    if (!user || user.role !== Roles.DISTRIBUTOR) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (!["IN_PROGRESS", "COMPLETED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const task = await prisma.distributionTask.findUnique({ where: { id } });
    if (!task || task.distributorId !== user.id) {
      return res
        .status(403)
        .json({ error: "Task not found or not assigned to you" });
    }

    const updatedTask = await prisma.distributionTask.update({
      where: { id },
      data: { status },
    });

    res.json({ success: true, task: updatedTask });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to update task status", details: err });
  }
});

/* =====================================================
   APPROVE OR REJECT TASK (ADMIN)
   PUT /distribution-task/:id/approve
   PUT /distribution-task/:id/reject
===================================================== */
/* =====================================================
   APPROVE TASK (MOSQUE ADMIN)
   PUT /distribution-task/:id/approve
===================================================== */
router.put(
  "/:id/approve",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const { id } = req.params;

      if (!user || user.role !== Roles.ADMIN) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const task = await prisma.distributionTask.findUnique({ where: { id } });
      if (!task || task.mosqueId !== user.mosqueId) {
        return res
          .status(403)
          .json({ error: "Task not found or not in your mosque" });
      }

      const updatedTask = await prisma.distributionTask.update({
        where: { id },
        data: {
          status: "COMPLETED",
          approvedBy: user.id,
          approvedAt: new Date(),
        },
      });

      res.json({ success: true, task: updatedTask });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to approve task" });
    }
  },
);

/* =====================================================
   REJECT TASK (MOSQUE ADMIN)
   PUT /distribution-task/:id/reject
===================================================== */
router.put("/:id/reject", authenticate, async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { rejectionNote } = req.body;

    if (!user || user.role !== Roles.ADMIN) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Transaction: update task + refund system balance
    const updatedTask = await prisma.$transaction(async (tx) => {
      const task = await tx.distributionTask.findUnique({ where: { id } });
      if (!task || task.mosqueId !== user.mosqueId) {
        throw new Error("TASK_NOT_FOUND");
      }

      // 1️⃣ Refund system balance
      await tx.systemBalance.update({
        where: { id: "SYSTEM" },
        data: { balance: { increment: task.amount } },
      });

      // 2️⃣ Update task status
      return tx.distributionTask.update({
        where: { id },
        data: {
          status: "REJECTED",
          approvedBy: user.id,
          approvedAt: new Date(),
          rejectionNote,
        },
      });
    });

    res.json({ success: true, task: updatedTask });
  } catch (err: any) {
    console.error(err);
    if (err.message === "TASK_NOT_FOUND") {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(500).json({ error: "Failed to reject task" });
  }
});

export default router;
