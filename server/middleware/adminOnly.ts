import { Request, Response, NextFunction } from "express";

export default function adminOnly(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(403).json({ error: "Authentication required" });
  }
  next();
}
