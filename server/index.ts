import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth";
import zakatRoutes from "./routes/metalZakat";
import livestockZakatRouter from "./routes/livestockZakat";
import cropZakatRouter from "./routes/cropsZakat";
import businessZakatRouter from "./routes/businessZakat";
import rikazZakatRouter from "./routes/rikazZakat";
import beneficiaryRoutes from "./routes/beneficiary";
import donationRouter from "./routes/donation";
import googleAuthRoutes from "./routes/googleAuth";
import mosqueRoutes from "./routes/mosque";
import adminRoutes from "./routes/admin";
import branchAdminRoutes from "./routes/branchAdmin";
import donationRequestRoutes from "./routes/donationRequest";

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
app.use("/donation", donationRouter);
app.use("/metal", zakatRoutes);
app.use("/livestock", livestockZakatRouter);
app.use("/crops", cropZakatRouter);
app.use("/business", businessZakatRouter);
app.use("/rikaz", rikazZakatRouter);
app.use("/beneficiaries", beneficiaryRoutes);
app.use("/beneficiary", beneficiaryRoutes);
app.use("/mosque", mosqueRoutes);
app.use("/admin", adminRoutes);
app.use("/branch-admin", branchAdminRoutes);
app.use("/donation/request", donationRequestRoutes);

// Health check

app.get("/", (_req, res) => res.send("Server is running!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
