import { Router } from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";

// Middleware to protect routes
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/:userId", protect, getCart);
router.post("/:userId/add", protect, addToCart);
router.delete("/:userId/remove/:productId", protect, removeFromCart);

export default router;
