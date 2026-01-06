import { Request, Response, NextFunction } from "express";

export default function superAdminOnly(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  if (!user || user.role !== "SUPERADMIN") {
    return res.status(403).json({ error: "SUPERADMIN access only" });
  }
  next();
}
