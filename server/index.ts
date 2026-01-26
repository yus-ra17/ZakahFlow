import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth";
import donationsRoutes from "./routes/donations";
import zakatRoutes from "./routes/metalZakat";
import livestockZakatRouter from "./routes/livestockZakat";
import cropZakatRouter from "./routes/cropsZakat";
import businessZakatRouter from "./routes/businessZakat";
import rikazZakatRouter from "./routes/rikazZakat";
import beneficiaryRoutes from "./routes/beneficiary";
import donationRoutes from "./routes/donation";
import distributionRoutes from "./routes/distribution";
import googleAuthRoutes from "./routes/googleAuth";
import mosqueRoutes from "./routes/mosque";
import adminRoutes from "./routes/admin";
import branchAdminRoutes from "./routes/branchAdmin";

dotenv.config();

const app = express();

/* -------------------- CORS FIX -------------------- */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.options("*", cors()); // handle preflight

app.use(express.json());
/* -------------------------------------------------- */

app.use("/auth", authRoutes);
app.use("/auth", googleAuthRoutes);

app.use("/donations", donationsRoutes);
app.use("/donations", donationRoutes);
app.use("/metal", zakatRoutes);
app.use("/livestock", livestockZakatRouter);
app.use("/crops", cropZakatRouter);
app.use("/business", businessZakatRouter);
app.use("/rikaz", rikazZakatRouter);
app.use("/beneficiaries", beneficiaryRoutes);
app.use("/beneficiary", beneficiaryRoutes);
app.use("/distributions", distributionRoutes);
app.use("/mosque", mosqueRoutes);
app.use("/admin", adminRoutes);
app.use("/branch-admin", branchAdminRoutes);


// Health check

app.get("/", (_req, res) => res.send("Server is running!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
