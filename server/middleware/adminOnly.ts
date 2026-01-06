import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function branchAdminOnly(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = decoded;

    if (decoded.role !== "ADMIN" && decoded.role !== "SUPERADMIN") {
      return res.status(403).json({ error: "Branch Admin access only" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
