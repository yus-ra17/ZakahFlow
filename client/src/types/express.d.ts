import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        mosqueId?: string | null;
        email?: string;
      };
    }
  }
}
