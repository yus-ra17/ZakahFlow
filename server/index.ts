import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import donationsRoutes from './routes/donations';
import zakatRoutes from './routes/zakat';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/donations', donationsRoutes);
app.use('/zakat', zakatRoutes);

app.get('/', (_req, res) => res.send('Server is running!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
