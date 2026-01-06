import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
  mosqueId?: string | null;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = {
      id: payload.userId,
      role: payload.role,
      mosqueId: payload.mosqueId ?? null,
      email: "", // email not included in JWT, optional
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticate;
