// import { Router, Request, Response } from "express";
// import prisma from "../lib/prisma";
// import bcrypt from "bcrypt";
// import authenticate from "../middleware/authenticate";
// import { Roles } from "../constants/roles";

// const router = Router();

// // Extend Express Request typing
// interface AuthRequest extends Request {
//   user?: {
//     id: string;
//     role: string;
//     mosqueId?: string | null;
//     email: string;
//     name?: string;
//   };
// }

// // -------------------- CREATE NEW ZAKAH OFFICER --------------------
// router.post(
//   "/create-zakah-officer",
//   authenticate,
//   async (req: AuthRequest, res: Response) => {
//     // Only branch admins can create zakah officers
//     if (!req.user || req.user.role !== Roles.ADMIN) {
//       return res.status(403).json({ error: "Only branch admins allowed" });
//     }

//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ error: "name, email, and password are required" });
//     }

//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);

//       const zakahOfficer = await prisma.user.create({
//         data: {
//           name,
//           email,
//           password: hashedPassword,
//           role: Roles.ZAKAH_OFFICER,
//           mosqueId: req.user.mosqueId!, // Assign to branch admin's mosque
//         },
//       });

//       res.json({ success: true, zakahOfficer });
//     } catch (err) {
//       res
//         .status(400)
//         .json({ error: "Email already exists or invalid data", details: err });
//     }
//   }
// );

// // -------------------- GET ALL ZAKAH OFFICERS FOR THIS BRANCH --------------------
// router.get(
//   "/all-zakah-officers",
//   authenticate,
//   async (req: AuthRequest, res: Response) => {
//     if (!req.user || req.user.role !== Roles.ADMIN) {
//       return res.status(403).json({ error: "Only branch admins allowed" });
//     }

//     try {
//       const officers = await prisma.user.findMany({
//         where: {
//           role: Roles.ZAKAH_OFFICER,
//           mosqueId: req.user.mosqueId, // Only officers in the same mosque
//         },
//       });

//       res.json(officers);
//     } catch (err) {
//       res
//         .status(500)
//         .json({ error: "Failed to fetch zakah officers", details: err });
//     }
//   }
// );

// export default router;
