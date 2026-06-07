import { Request, Response, NextFunction } from "express";

export default function superAdminOnly(req: Request, res: Response, next: NextFunction) {
  // Allow any authenticated user
  if (!req.user) {
    return res.status(403).json({ error: "Authentication required" });
  }
  next();
}
