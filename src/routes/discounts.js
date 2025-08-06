import { Router } from "express";

import {
  getAllDiscounts,
  getDiscountById,
  createDiscount,
  updateDiscount,
  delteDiscount,
} from "../controllers/discountsController.js";

// Middleware to protect routes
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Example: Get all discounts
router.get('/', protect, getAllDiscounts);
router.get("/:id", protect, getDiscountById);
router.post("/", protect, createDiscount);
router.patch("/:id", protect, updateDiscount);
router.delete("/:id", protect, delteDiscount);

export default router;