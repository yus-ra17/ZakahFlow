import { Router } from "express";
import prisma from "../lib/prisma";
import authenticate from "../middleware/auth";

const router = Router();

router.post("/calculate", authenticate, async (req: any, res) => {
  try {
    let { livestockType, quantity } = req.body;

    if (!livestockType || quantity == null) {
      return res.status(400).json({ error: "livestockType and quantity are required" });
    }

    livestockType = livestockType.toUpperCase();
    let zakahAnimals = "";
    let message = "";

    // -------------------- CAMELS --------------------
    if (livestockType === "CAMEL") {
      if (quantity < 5) zakahAnimals = "No zakah due (below nisab of 5 camels)";
      else if (quantity <= 9) zakahAnimals = "1 one-year-old camel";
      else if (quantity <= 14) zakahAnimals = "2 one-year-old camels";
      else if (quantity <= 19) zakahAnimals = "3 one-year-old camels";
      else if (quantity <= 24) zakahAnimals = "4 one-year-old camels";
      else if (quantity <= 35) zakahAnimals = "1 two-year-old camel";
      else if (quantity <= 45) zakahAnimals = "1 two-year-old camel + 1 one-year-old camel";
      else if (quantity <= 60) zakahAnimals = "1 three-year-old camel (Hiqqah)";
      else if (quantity <= 75) zakahAnimals = "2 three-year-old camels";
      else if (quantity <= 90) zakahAnimals = "3 three-year-old camels";
      else if (quantity <= 120) zakahAnimals = "4 three-year-old camels";
      else {
        const blocks = Math.floor(quantity / 50);
        const remainder = quantity % 50;
        zakahAnimals = `${blocks} three-year-old camels`;
        if (remainder > 0) zakahAnimals += " + additional camel(s) per fiqh chart";
      }
    }

    // -------------------- COWS --------------------
    else if (livestockType === "COW") {
      if (quantity < 30) zakahAnimals = "No zakah due (below nisab of 30 cows)";
      else {
        // Classical fiqh: 1 one-year-old calf (Tabi') per 30 cows
        const numberOfCalves = Math.floor(quantity / 30);
        zakahAnimals = `${numberOfCalves} one-year-old calf(s) (Tabi')`;
      }
    }

    // -------------------- SHEEP / GOATS --------------------
    else if (livestockType === "SHEEP" || livestockType === "GOAT") {
      if (quantity < 40) zakahAnimals = "No zakah due (below nisab of 40 sheep/goats)";
      else if (quantity <= 120) zakahAnimals = "1 sheep/goat";
      else if (quantity <= 200) zakahAnimals = "2 sheep/goats";
      else if (quantity <= 300) zakahAnimals = "3 sheep/goats";
      else {
        const sheepCount = Math.floor(quantity / 100);
        zakahAnimals = `${sheepCount} sheep/goats`;
      }
    }

    // -------------------- INVALID --------------------
    else {
      return res.status(400).json({ error: "Invalid livestockType. Must be CAMEL, COW, SHEEP, or GOAT" });
    }

    message = `You must give ${zakahAnimals} as zakah for your ${quantity} ${livestockType.toLowerCase()}(s)`;

    // -------------------- Save to Database --------------------
    await prisma.zakatCalculation.create({
      data: {
        userId: req.user.userId,
        zakatType: "ANIMAL",
        wealthType: livestockType,
        wealthAmount: quantity,
        nisabValue: 0,
        zakatRate: 0,
        zakatDue: 0,
        explanation: message
      },
    });

    return res.json({
      livestockType,
      quantity,
      zakahAnimals,
      message
    });
  } catch (err) {
    console.error("Livestock Zakat Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
