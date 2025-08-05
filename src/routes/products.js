import { Router } from "express";
// Middleware to protect routes
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Example: Get all products
router.get('/', async (req, res) => {
  res.json({ message: 'Get all products' });
});

export default router;