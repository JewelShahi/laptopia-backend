import { Router } from "express";
// Middleware to protect routes
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Example: Get all orders
router.get('/', protect, async (req, res) => {
  res.json({ message: 'Get all orders' });
});

export default router;