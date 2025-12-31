import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import authenticate from '../middleware/auth';


const prisma = new PrismaClient();
const router = Router();

router.post('/', authenticate, async (req: any, res) => {
  const donation = await prisma.donation.create({
    data: {
      amount: req.body.amount,
      zakatType: req.body.zakatType,
      userId: req.user.userId
    }
  });

  res.json(donation);
});

router.get('/', authenticate, async (req: any, res) => {
  const donations = await prisma.donation.findMany({
    where: { userId: req.user.userId }
  });

  res.json(donations);
});

export default router;
