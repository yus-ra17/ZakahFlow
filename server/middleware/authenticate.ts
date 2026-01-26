import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        role: true,
        mosqueId: true,
        email: true, // include if you want
      },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; // ✅ NOW TYPES MATCH
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticate;
