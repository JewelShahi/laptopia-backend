import { Router } from "express";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} from "../controllers/wishlistController.js";

// Middleware to protect routes
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/:userId", protect, getWishlist);
router.post("/:userId/add", protect, addToWishlist);
router.delete("/:userId/remove/:productId", protect, removeFromWishlist);

export default router;
