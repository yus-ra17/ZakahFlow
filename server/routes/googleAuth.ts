// server/routes/googleAuth.ts
import { Router, Request, Response } from "express";
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  StrategyOptions,
} from "passport-google-oauth20";
import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const router = Router();

// -------------------- Extend Express User typing --------------------
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name?: string;
      role: string;
      mosqueId?: string | null;
    }
  }
}

// -------------------- Google OAuth Strategy --------------------
const googleOptions: StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/auth/google/callback",
  // passReqToCallback is NOT needed
};

passport.use(
  new GoogleStrategy(
    googleOptions,
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (err: Error | null, user?: Express.User | false) => void,
    ) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error("No email found in Google profile"));

        let user: User | null = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName ?? "",
              email,
              role: "DONOR",
              password: "", // Prisma requires password field
              mosqueId: null,
            },
          });
        }

        done(null, user as Express.User);
      } catch (err) {
        done(err as Error);
      }
    },
  ),
);
// -------------------- Routes --------------------
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req: Request, res: Response) => {
    const user = req.user as Express.User;
    if (!user) return res.status(401).json({ error: "User not found" });

    const token = jwt.sign(
      { userId: user.id, role: user.role, mosqueId: user.mosqueId ?? null },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
  },
);

export default router;
