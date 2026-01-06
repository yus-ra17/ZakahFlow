import { Request, Response, NextFunction } from "express";
import { RolePower } from "../constants/roles";

export default function authorize(minRole: keyof typeof RolePower) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user)
      return res.status(401).json({ error: "Unauthenticated" });

    const userPower = RolePower[req.user.role];
    const requiredPower = RolePower[minRole];

    if (userPower < requiredPower)
      return res.status(403).json({ error: "Access denied" });

    next();
  };
}
