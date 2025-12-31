import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import donationsRoutes from './routes/donations';
import zakatRoutes from './routes/metalZakat';
import livestockZakatRouter from "./routes/livestockZakat";
import cropZakatRouter from "./routes/cropsZakat";
import businessZakatRouter from "./routes/businessZakat"
import rikazZakatRouter from "./routes/rikazZakat";
import beneficiaryRoutes from "./routes/beneficiary";
import donationRoutes from "./routes/donation";
import distributionRoutes from "./routes/distribution";


dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/donations', donationsRoutes);
app.use('/metal', zakatRoutes);
app.use("/livestock", livestockZakatRouter);
app.use("/crops", cropZakatRouter )
app.use("/business", businessZakatRouter )
app.use("/rikaz", rikazZakatRouter)
app.use("/beneficiaries", beneficiaryRoutes);
app.use("/donations", donationRoutes);
app.use("/distributions", distributionRoutes);
app.get('/', (_req, res) => res.send('Server is running!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
