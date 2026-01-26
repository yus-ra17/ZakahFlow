import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = Router();

interface AuthRequest extends Request {
  body: {
    name?: string;
    email?: string;
    password?: string;
  };
}

// -------------------- REGISTER --------------------
router.post("/register", async (req: AuthRequest, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password!, 10);

    const user = await prisma.user.create({
      data: {
        name: name!,
        email: email!,
        password: hashedPassword,
        role: "DONOR",
      },
    });

    res.json({ success: true, userId: user.id });
  } catch (error) {
    res.status(400).json({ error: "Email already exists or invalid data" });
  }
});

// -------------------- LOGIN --------------------
router.post("/login", async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    // Fetch user including mosque relation
    const user = await prisma.user.findUnique({
      where: { email },
      include: { mosque: true }, // include mosque info
    });

    if (!user) return res.status(401).json({ error: "User not found" });

    const valid = await bcrypt.compare(password!, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        mosque: user.mosque, // now the mosque info is included
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
