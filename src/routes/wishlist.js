import { Router } from "express";
// Middleware to protect routes
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Example: Get all wishlist items
router.get('/', protect, async (req, res) => {
  res.json({ message: 'Get all wishlist items' });
});

export default router;