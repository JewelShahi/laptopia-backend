import { Router } from "express";
// Middleware to protect routes
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Example: Get all discounts
router.get('/', async (req, res) => {
  res.json({ message: 'Get all discounts' });
});

export default router;