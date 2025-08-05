import { Router } from "express";
// Middleware to protect routes
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Example: Get all users
router.get('/', protect, async (req, res) => {
  res.json({ message: 'Get all users' });
});

export default router;